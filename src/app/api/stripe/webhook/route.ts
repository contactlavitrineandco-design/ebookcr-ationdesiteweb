import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { completeOrder } from "@/lib/fulfillment";
import { cancelOrder, forgetWebhookEvent, refundOrder, rememberWebhookEvent } from "@/lib/orders";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// Seule source de vérité pour valider un paiement : un événement signé par Stripe.
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!secret || !signature) return new Response("Configuration manquante", { status: 400 });

  const body = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(body, signature, secret);
  } catch {
    return new Response("Signature invalide", { status: 400 });
  }

  if (!rememberWebhookEvent(event.id)) return Response.json({ received: true, duplicate: true });

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;
        const orderId = session.metadata?.order_id;
        if (orderId && session.payment_status === "paid") {
          const ref = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
          await completeOrder(orderId, ref ?? session.id, session.amount_total ?? undefined);
        }
        break;
      }
      case "checkout.session.expired":
      case "checkout.session.async_payment_failed": {
        const orderId = event.data.object.metadata?.order_id;
        if (orderId) cancelOrder(orderId);
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object;
        const pi = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
        if (pi && charge.refunded) {
          const order = db().prepare("SELECT id FROM orders WHERE stripe_payment_ref = ?").get(pi) as
            | { id: string }
            | undefined;
          if (order) refundOrder(order.id);
        }
        break;
      }
    }
  } catch (err) {
    console.error("[webhook]", event.type, err);
    // On oublie l'événement pour que Stripe puisse le renvoyer.
    forgetWebhookEvent(event.id);
    return new Response("Erreur de traitement", { status: 500 });
  }

  return Response.json({ received: true });
}
