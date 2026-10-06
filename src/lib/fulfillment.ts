import "server-only";
import { db } from "./db";
import { fulfillOrder, getOrder } from "./orders";
import { sendMail } from "./mail";
import { appUrl } from "./site";

/** Valide une commande payée, accorde les accès et prévient l'acheteur (une seule fois). */
export async function completeOrder(orderId: string, paymentRef: string | null, paidAmountCents?: number) {
  const changed = fulfillOrder(orderId, paymentRef, paidAmountCents);
  if (!changed) return false;
  const order = getOrder(orderId);
  const user = order?.user_id
    ? (db().prepare("SELECT email, name FROM users WHERE id = ?").get(order.user_id) as
        | { email: string; name: string }
        | undefined)
    : undefined;
  if (order && user) {
    await sendMail(
      user.email,
      `Votre achat : ${order.product_label}`,
      `Bonjour ${user.name},\n\nMerci pour votre achat. « ${order.product_label} » est disponible dans votre bibliothèque :\n${appUrl()}/espace\n\nRéférence de commande : ${order.id.slice(0, 8).toUpperCase()}\nSi un paiement a eu lieu, votre facture vous est adressée par notre prestataire de paiement (Stripe).\n\nBonne lecture.`,
    );
  }
  return true;
}
