"use server";

import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { getFormation } from "@/lib/catalogue";
import {
  attachStripeSession,
  cancelOrder,
  createPendingOrder,
  quote,
} from "@/lib/orders";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { completeOrder } from "@/lib/fulfillment";
import { demoCheckout, stripe, stripeEnabled } from "@/lib/stripe";
import { appUrl, SITE } from "@/lib/site";

export type CheckoutState = { error?: string };

export async function startCheckout(_: CheckoutState, form: FormData): Promise<CheckoutState> {
  const productId = String(form.get("product") ?? "");
  const user = await currentUser();
  if (!user) redirect(`/inscription?suite=${encodeURIComponent(`/commande/${productId}`)}`);

  if (!rateLimit(`checkout:${user.id}`, 10, 10 * 60_000) || !rateLimit(`checkout-ip:${await clientIp()}`, 30, 10 * 60_000))
    return { error: "Trop de tentatives. Patientez quelques minutes." };

  // Consentements exigés par le Code de la consommation (art. L221-28 13° et L221-13).
  if (form.get("cgv") !== "on") return { error: "Merci d'accepter les conditions générales de vente." };
  if (form.get("waiver") !== "on")
    return {
      error:
        "Pour un accès immédiat au contenu numérique, la loi impose votre accord exprès et la reconnaissance de la perte du droit de rétractation.",
    };

  const q = quote(productId, user.id);
  if (!q) return { error: "Ce produit n'existe pas." };
  if (q.missing.length === 0) return { error: "Vous possédez déjà tout le contenu de ce produit." };

  const order = createPendingOrder(user.id, user.email, q);

  // Cas 1 : rien à payer (pack entièrement couvert par vos achats précédents).
  // Cas 2 : mode démo en développement, sans clé Stripe.
  if (q.price === 0 || demoCheckout()) {
    await completeOrder(order.id, q.price === 0 ? "credit" : "demo");
    redirect(`/commande/merci?commande=${order.id}`);
  }

  if (!stripeEnabled()) return { error: "Le paiement est momentanément indisponible. Réessayez plus tard." };

  const description =
    q.product.kind === "pack"
      ? `${q.missing.length} formation(s) en e-book : ${q.missing.map((s) => getFormation(s)?.title).join(", ")}`
      : `Formation en e-book — accès à vie, mises à jour incluses`;

  let url: string | null = null;
  try {
    const session = await stripe().checkout.sessions.create(
      {
        mode: "payment",
        locale: "fr",
        customer_email: user.email,
        client_reference_id: order.id,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "eur",
              unit_amount: order.amount_cents,
              product_data: { name: `${SITE.nom} — ${q.product.title}`, description },
            },
          },
        ],
        metadata: { order_id: order.id },
        payment_intent_data: { metadata: { order_id: order.id } },
        invoice_creation: {
          enabled: true,
          invoice_data: {
            metadata: { order_id: order.id },
            footer: SITE.tva.franchise ? SITE.tva.mention : undefined,
          },
        },
        custom_text: {
          submit: {
            message:
              "En payant, vous demandez l'accès immédiat au contenu et renoncez à votre droit de rétractation (art. L221-28 13° C. conso.).",
          },
        },
        expires_at: Math.floor(Date.now() / 1000) + 60 * 60,
        success_url: `${appUrl()}/commande/merci?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl()}/commande/${productId}?annule=1`,
      },
      { idempotencyKey: `checkout-${order.id}` },
    );
    attachStripeSession(order.id, session.id);
    url = session.url;
  } catch (err) {
    console.error("[checkout] Stripe", err);
    cancelOrder(order.id);
    return { error: "Le paiement n'a pas pu démarrer. Aucun montant n'a été débité. Réessayez dans un instant." };
  }

  if (!url) return { error: "Le paiement n'a pas pu démarrer." };
  redirect(url);
}
