import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY manquante");
  client ??= new Stripe(key, { appInfo: { name: "Charpente" } });
  return client;
}

export function stripeEnabled(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}

/** Mode démo : achats simulés, uniquement hors production et sans clé Stripe. */
export function demoCheckout(): boolean {
  return !stripeEnabled() && process.env.NODE_ENV !== "production" && process.env.DEMO_CHECKOUT !== "false";
}
