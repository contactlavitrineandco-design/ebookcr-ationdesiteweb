import "server-only";
import { randomUUID } from "node:crypto";
import { db, now, transaction } from "./db";
import { getFormation, getPacks, getProduct, type Product } from "./catalogue";
import { SITE } from "./site";

export type Order = {
  id: string;
  user_id: string | null;
  customer_email: string | null;
  product_id: string;
  product_label: string;
  amount_cents: number;
  currency: string;
  status: "pending" | "paid" | "refunded" | "cancelled";
  stripe_session_id: string | null;
  stripe_payment_ref: string | null;
  cgv_version: string;
  waiver_accepted_at: number;
  created_at: number;
  paid_at: number | null;
  refunded_at: number | null;
};

/**
 * Les acheteurs d'un pack « toutes les formations » reçoivent automatiquement
 * celles publiées après leur achat (promesse commerciale des CGV, art. 8).
 */
function grantFutureFormations(userId: string) {
  const packs = getPacks().filter((p) => p.includesFuture);
  if (packs.length === 0) return;
  const placeholders = packs.map(() => "?").join(",");
  const orders = db()
    .prepare(`SELECT id, product_id FROM orders WHERE user_id = ? AND status = 'paid' AND product_id IN (${placeholders})`)
    .all(userId, ...packs.map((p) => p.id)) as { id: string; product_id: string }[];
  if (orders.length === 0) return;
  const grant = db().prepare(
    "INSERT OR IGNORE INTO entitlements (user_id, formation_slug, order_id, granted_at) VALUES (?, ?, ?, ?)",
  );
  for (const order of orders) {
    const pack = packs.find((p) => p.id === order.product_id)!;
    for (const slug of pack.formations) grant.run(userId, slug, order.id, now());
  }
}

export function ownedFormations(userId: string): Set<string> {
  grantFutureFormations(userId);
  const rows = db()
    .prepare("SELECT formation_slug FROM entitlements WHERE user_id = ?")
    .all(userId) as { formation_slug: string }[];
  return new Set(rows.map((r) => r.formation_slug));
}

export function ownsFormation(userId: string, slug: string): boolean {
  grantFutureFormations(userId);
  return !!db()
    .prepare("SELECT 1 FROM entitlements WHERE user_id = ? AND formation_slug = ?")
    .get(userId, slug);
}

export type Quote = {
  product: Product;
  listPrice: number;
  credit: number;
  price: number;
  missing: string[];
};

/**
 * Prix réellement facturé. Règle commerciale : on ne paie jamais deux fois la
 * même formation. Pour un pack, les formations déjà possédées sont déduites à
 * leur prix catalogue (« vous ne paierez jamais plus que l'intégrale »).
 */
export function quote(productId: string, userId: string | null): Quote | null {
  const product = getProduct(productId);
  if (!product) return null;
  const owned = userId ? ownedFormations(userId) : new Set<string>();
  const missing = product.formations.filter((slug) => !owned.has(slug));
  const credit =
    product.kind === "pack"
      ? product.formations
          .filter((slug) => owned.has(slug))
          .reduce((sum, slug) => sum + (getFormation(slug)?.price ?? 0), 0)
      : 0;
  const price = Math.max(0, Math.round((product.price - credit) * 100) / 100);
  return { product, listPrice: product.price, credit, price, missing };
}

export function createPendingOrder(userId: string, email: string, q: Quote): Order {
  const id = randomUUID();
  db()
    .prepare(
      `INSERT INTO orders (id, user_id, customer_email, product_id, product_label, amount_cents,
        currency, status, cgv_version, waiver_accepted_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'eur', 'pending', ?, ?, ?)`,
    )
    .run(id, userId, email, q.product.id, q.product.title, Math.round(q.price * 100), SITE.cgvVersion, now(), now());
  return getOrder(id)!;
}

export function attachStripeSession(orderId: string, sessionId: string) {
  db().prepare("UPDATE orders SET stripe_session_id = ? WHERE id = ?").run(sessionId, orderId);
}

export function getOrder(id: string): Order | undefined {
  const row = db().prepare("SELECT * FROM orders WHERE id = ?").get(id) as Order | undefined;
  return row ? { ...row } : undefined;
}

export function getOrderByStripeSession(sessionId: string): Order | undefined {
  const row = db().prepare("SELECT * FROM orders WHERE stripe_session_id = ?").get(sessionId) as Order | undefined;
  return row ? { ...row } : undefined;
}

export function userOrders(userId: string): Order[] {
  return (db()
    .prepare("SELECT * FROM orders WHERE user_id = ? AND status != 'pending' ORDER BY created_at DESC")
    .all(userId) as Order[]).map((o) => ({ ...o }));
}

/** Idempotent : un webhook rejoué ne crée pas de doublon. */
export function fulfillOrder(orderId: string, paymentRef: string | null, paidAmountCents?: number): boolean {
  return transaction(() => {
    const order = getOrder(orderId);
    if (!order || order.status === "paid") return false;
    if (order.status !== "pending") return false;
    if (paidAmountCents !== undefined && paidAmountCents !== order.amount_cents) {
      throw new Error(`Montant incohérent pour la commande ${orderId}`);
    }
    if (!order.user_id) return false;
    const product = getProduct(order.product_id);
    if (!product) throw new Error(`Produit inconnu : ${order.product_id}`);

    db()
      .prepare("UPDATE orders SET status = 'paid', paid_at = ?, stripe_payment_ref = ? WHERE id = ?")
      .run(now(), paymentRef, orderId);
    const grant = db().prepare(
      "INSERT OR IGNORE INTO entitlements (user_id, formation_slug, order_id, granted_at) VALUES (?, ?, ?, ?)",
    );
    for (const slug of product.formations) grant.run(order.user_id, slug, orderId, now());
    return true;
  });
}

/** Remboursement : on retire uniquement les accès accordés par cette commande. */
export function refundOrder(orderId: string) {
  transaction(() => {
    db().prepare("UPDATE orders SET status = 'refunded', refunded_at = ? WHERE id = ?").run(now(), orderId);
    db().prepare("DELETE FROM entitlements WHERE order_id = ?").run(orderId);
  });
}

export function cancelOrder(orderId: string) {
  db().prepare("UPDATE orders SET status = 'cancelled' WHERE id = ? AND status = 'pending'").run(orderId);
}

export function markRead(userId: string, formation: string, chapter: string) {
  db()
    .prepare(
      "INSERT OR REPLACE INTO progress (user_id, formation_slug, chapter_slug, read_at) VALUES (?, ?, ?, ?)",
    )
    .run(userId, formation, chapter, now());
}

export function readChapters(userId: string, formation: string): Set<string> {
  const rows = db()
    .prepare("SELECT chapter_slug FROM progress WHERE user_id = ? AND formation_slug = ?")
    .all(userId, formation) as { chapter_slug: string }[];
  return new Set(rows.map((r) => r.chapter_slug));
}

/** Webhooks Stripe déjà traités (protection contre le rejeu). */
export function rememberWebhookEvent(id: string): boolean {
  const res = db().prepare("INSERT OR IGNORE INTO webhook_events (id, received_at) VALUES (?, ?)").run(id, now());
  return res.changes > 0;
}

export function forgetWebhookEvent(id: string) {
  db().prepare("DELETE FROM webhook_events WHERE id = ?").run(id);
}
