import "server-only";
import { headers } from "next/headers";

// Limiteur en mémoire (fenêtre glissante). Suffisant pour une instance unique ;
// pour plusieurs instances, brancher Redis à la place de cette Map.
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 10_000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return true;
}

export async function clientIp(): Promise<string> {
  const h = await headers();
  if (process.env.TRUST_PROXY === "true") {
    const fwd = h.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0].trim();
    const real = h.get("x-real-ip");
    if (real) return real;
  }
  return "local";
}
