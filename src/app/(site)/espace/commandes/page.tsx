import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { userOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/catalogue";
import { DashHead } from "@/components/DashHead";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Mes commandes", robots: { index: false } };

const STATUS: Record<string, string> = { paid: "Payée", refunded: "Remboursée", cancelled: "Annulée" };

export default async function OrdersPage() {
  const user = await requireUser("/espace/commandes");
  const orders = userOrders(user.id).filter((o) => o.status !== "cancelled");
  return (
    <div className="wrap">
      <DashHead name={user.name} current="commandes" />
      {orders.length === 0 ? (
        <p className="muted" style={{ marginTop: 32 }}>Aucune commande pour le moment.</p>
      ) : (
        <div className="table-wrap" style={{ marginTop: 32 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Référence</th>
                <th>Produit</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{new Date(o.created_at).toLocaleDateString("fr-FR")}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 13 }}>{o.id.slice(0, 8).toUpperCase()}</td>
                  <td>{o.product_label}</td>
                  <td>{formatPrice(o.amount_cents / 100)}</td>
                  <td>{STATUS[o.status] ?? o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="small muted" style={{ marginTop: 24 }}>
        Les factures sont envoyées par e-mail par notre prestataire de paiement au moment de l&rsquo;achat. Besoin
        d&rsquo;un duplicata ? Écrivez à <a href={`mailto:${SITE.emailContact}`}>{SITE.emailContact}</a> en indiquant
        la référence.
      </p>
    </div>
  );
}
