import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { getOrder, getOrderByStripeSession, type Order } from "@/lib/orders";
import { stripe, stripeEnabled } from "@/lib/stripe";
import { completeOrder } from "@/lib/fulfillment";
import { getProduct } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Merci", robots: { index: false } };

type Props = { searchParams: Promise<{ session_id?: string; commande?: string }> };

export default async function ThanksPage({ searchParams }: Props) {
  const user = await requireUser("/espace");
  const { session_id, commande } = await searchParams;

  let order: Order | undefined = session_id ? getOrderByStripeSession(session_id) : commande ? getOrder(commande) : undefined;
  if (order && order.user_id !== user.id) order = undefined;

  // Si le webhook n'est pas encore arrivé, on interroge Stripe directement (côté serveur).
  if (order && order.status === "pending" && session_id && stripeEnabled()) {
    try {
      const session = await stripe().checkout.sessions.retrieve(session_id);
      if (session.payment_status === "paid" && session.metadata?.order_id === order.id) {
        const ref = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
        await completeOrder(order.id, ref ?? session.id, session.amount_total ?? undefined);
        order = getOrder(order.id);
      }
    } catch (err) {
      console.error("[merci]", err);
    }
  }

  const product = order ? getProduct(order.product_id) : undefined;
  const paid = order?.status === "paid";

  return (
    <div className="wrap">
      <div className="checkout">
        <span className="label">Commande</span>
        {paid ? (
          <>
            <h1>C&rsquo;est à vous.</h1>
            <p className="lead">
              « {order!.product_label} » est rangé dans votre bibliothèque. Un e-mail de confirmation est en route.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
              <Link className="btn" href="/espace">
                Ouvrir ma bibliothèque <span className="arrow">→</span>
              </Link>
              {product?.kind === "formation" && (
                <Link className="btn btn-ghost" href={`/formations/${product.id}`}>
                  Voir le sommaire
                </Link>
              )}
            </div>
          </>
        ) : order ? (
          <>
            <h1>Paiement en cours de confirmation.</h1>
            <p className="lead">
              Cela prend généralement quelques secondes. Rechargez cette page, ou retrouvez votre achat dans votre
              bibliothèque dès qu&rsquo;il est confirmé.
            </p>
            <Link className="btn" href="/espace">
              Ma bibliothèque
            </Link>
          </>
        ) : (
          <>
            <h1>Commande introuvable.</h1>
            <p className="lead">Si vous avez été débité, écrivez-nous : nous réglerons ça rapidement.</p>
            <Link className="btn" href="/espace">
              Ma bibliothèque
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
