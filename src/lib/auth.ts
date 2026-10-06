import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { randomUUID } from "node:crypto";
import { db, now } from "./db";
import { randomToken, sha256 } from "./password";

export const SESSION_COOKIE = "charpente_session";
const SESSION_DAYS = 30;

export type User = { id: string; email: string; name: string; created_at: number };

export async function createSession(userId: string) {
  const token = randomToken();
  const expires = now() + SESSION_DAYS * 86_400_000;
  db()
    .prepare("INSERT INTO sessions (token_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)")
    .run(sha256(token), userId, now(), expires);
  // Nettoyage opportuniste des sessions expirées.
  db().prepare("DELETE FROM sessions WHERE expires_at < ?").run(now());

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expires),
  });
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) db().prepare("DELETE FROM sessions WHERE token_hash = ?").run(sha256(token));
  store.delete(SESSION_COOKIE);
}

export function destroyAllSessions(userId: string) {
  db().prepare("DELETE FROM sessions WHERE user_id = ?").run(userId);
}

export const currentUser = cache(async (): Promise<User | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || token.length > 100) return null;
  const row = db()
    .prepare(
      `SELECT u.id, u.email, u.name, u.created_at FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token_hash = ? AND s.expires_at > ?`,
    )
    .get(sha256(token), now()) as User | undefined;
  return row ? { ...row } : null;
});

export async function requireUser(next?: string): Promise<User> {
  const user = await currentUser();
  if (!user) redirect(`/connexion${next ? `?suite=${encodeURIComponent(next)}` : ""}`);
  return user;
}

export function isAdmin(user: User | null): boolean {
  if (!user) return false;
  const admins = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return admins.includes(user.email.toLowerCase());
}

export function findUserByEmail(email: string) {
  return db().prepare("SELECT * FROM users WHERE email = ?").get(email) as
    | (User & { password_hash: string; failed_logins: number; locked_until: number | null })
    | undefined;
}

export function insertUser(email: string, name: string, passwordHash: string): string {
  const id = randomUUID();
  db()
    .prepare("INSERT INTO users (id, email, name, password_hash, created_at) VALUES (?, ?, ?, ?, ?)")
    .run(id, email, name, passwordHash, now());
  return id;
}

/** N'accepte que des chemins internes pour éviter les redirections ouvertes. */
export function safeNext(value: unknown, fallback = "/espace"): string {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}
