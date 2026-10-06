import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { currentUser, isAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/catalogue";
import { stripeEnabled } from "@/lib/stripe";

export const metadata: Metadata = { title: "Tableau de bord", robots: { index: false } };

type Row = { id: string; product_label: string; amount_cents: number; status: string; created_at: number; customer_email: string | null };

export default async function AdminPage() {
  const user = await currentUser();
  // 404 plutôt que 403 : on ne révèle pas l'existence de la page.
  if (!isAdmin(user)) notFound();

  const one = <T,>(sql: string) => db().prepare(sql).get() as T;
  const revenue = one<{ v: number | null }>("SELECT SUM(amount_cents) v FROM orders WHERE status = 'paid'").v ?? 0;
  const month = one<{ v: number | null }>(
    "SELECT SUM(amount_cents) v FROM orders WHERE status = 'paid' AND paid_at > (strftime('%s','now','start of month') * 1000)",
  ).v ?? 0;
  const customers = one<{ v: number }>("SELECT COUNT(DISTINCT user_id) v FROM orders WHERE status = 'paid'").v;
  const users = one<{ v: number }>("SELECT COUNT(*) v FROM users").v;
  const orders = db()
    .prepare("SELECT id, product_label, amount_cents, status, created_at, customer_email FROM orders WHERE status != 'pending' ORDER BY created_at DESC LIMIT 50")
    .all() as Row[];
  const byProduct = db()
    .prepare("SELECT product_label, COUNT(*) n, SUM(amount_cents) total FROM orders WHERE status = 'paid' GROUP BY product_label ORDER BY total DESC")
    .all() as { product_label: string; n: number; total: number }[];

  return (
    <div className="wrap">
      <div className="dash-head">
        <div>
          <span className="label">Administration · {stripeEnabled() ? "Stripe connecté" : "Stripe non configuré"}</span>
          <h1>Tableau de bord</h1>
        </div>
      </div>
      <div className="stats">
        <div className="stat"><span className="label">Chiffre d&rsquo;affaires</span><strong>{formatPrice(revenue / 100)}</strong></div>
        <div className="stat"><span className="label">Ce mois-ci</span><strong>{formatPrice(month / 100)}</strong></div>
        <div className="stat"><span className="label">Clients</span><strong>{customers}</strong></div>
        <div className="stat"><span className="label">Comptes</span><strong>{users}</strong></div>
      </div>

      <h2 style={{ fontSize: 28, margin: "48px 0 16px" }}>Ventes par produit</h2>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Produit</th><th>Ventes</th><th>Total</th></tr></thead>
          <tbody>
            {byProduct.map((p) => (
              <tr key={p.product_label}><td>{p.product_label}</td><td>{p.n}</td><td>{formatPrice(p.total / 100)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: 28, margin: "48px 0 16px" }}>50 dernières commandes</h2>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Date</th><th>Réf.</th><th>Client</th><th>Produit</th><th>Montant</th><th>Statut</th></tr></thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{new Date(o.created_at).toLocaleString("fr-FR")}</td>
                <td style={{ fontFamily: "var(--mono)", fontSize: 13 }}>{o.id.slice(0, 8).toUpperCase()}</td>
                <td>{o.customer_email ?? <em className="muted">compte supprimé</em>}</td>
                <td>{o.product_label}</td>
                <td>{formatPrice(o.amount_cents / 100)}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="small muted" style={{ marginTop: 20 }}>
        Remboursements : effectuez-les depuis le tableau de bord Stripe. Le webhook retire automatiquement les accès
        correspondants.
      </p>
    </div>
  );
}
