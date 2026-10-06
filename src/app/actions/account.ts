"use server";

import { redirect } from "next/navigation";
import { currentUser, destroyAllSessions, createSession, destroySession } from "@/lib/auth";
import { db, transaction } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { rateLimit } from "@/lib/rate-limit";
import type { FormState } from "./auth";

function passwordOf(userId: string): string {
  return (db().prepare("SELECT password_hash FROM users WHERE id = ?").get(userId) as { password_hash: string })
    .password_hash;
}

export async function changePassword(_: FormState, form: FormData): Promise<FormState> {
  const user = await currentUser();
  if (!user) redirect("/connexion");
  if (!rateLimit(`pw:${user.id}`, 5, 15 * 60_000)) return { error: "Trop de tentatives. Patientez un peu." };
  const current = String(form.get("current") ?? "");
  const next = String(form.get("next") ?? "");
  if (!(await verifyPassword(current, passwordOf(user.id)))) return { error: "Mot de passe actuel incorrect." };
  if (next.length < 10 || !/[a-zA-Z]/.test(next) || !/[^a-zA-Z]/.test(next))
    return { error: "Le nouveau mot de passe doit faire 10 caractères minimum, avec un chiffre ou un symbole." };
  db().prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(await hashPassword(next), user.id);
  destroyAllSessions(user.id);
  await createSession(user.id);
  return { ok: "Mot de passe modifié. Vos autres appareils ont été déconnectés." };
}

export async function updateName(_: FormState, form: FormData): Promise<FormState> {
  const user = await currentUser();
  if (!user) redirect("/connexion");
  const name = String(form.get("name") ?? "").trim().slice(0, 80);
  if (name.length < 2) return { error: "Nom trop court." };
  db().prepare("UPDATE users SET name = ? WHERE id = ?").run(name, user.id);
  return { ok: "Nom mis à jour." };
}

/**
 * Droit à l'effacement (art. 17 RGPD). Le compte, les sessions, la progression et
 * les accès sont supprimés. Les commandes payées sont anonymisées mais conservées :
 * la loi impose de garder les pièces comptables 10 ans (art. L123-22 C. com.).
 */
export async function deleteAccount(_: FormState, form: FormData): Promise<FormState> {
  const user = await currentUser();
  if (!user) redirect("/connexion");
  if (!rateLimit(`del:${user.id}`, 5, 15 * 60_000)) return { error: "Trop de tentatives. Patientez un peu." };
  if (String(form.get("confirm") ?? "").trim().toUpperCase() !== "SUPPRIMER")
    return { error: "Tapez SUPPRIMER pour confirmer." };
  if (!(await verifyPassword(String(form.get("password") ?? ""), passwordOf(user.id))))
    return { error: "Mot de passe incorrect." };

  transaction(() => {
    db().prepare("DELETE FROM orders WHERE user_id = ? AND status IN ('pending', 'cancelled')").run(user.id);
    db().prepare("UPDATE orders SET customer_email = NULL WHERE user_id = ?").run(user.id);
    db().prepare("DELETE FROM entitlements WHERE user_id = ?").run(user.id);
    db().prepare("DELETE FROM users WHERE id = ?").run(user.id);
  });
  await destroySession();
  redirect("/?compte=supprime");
}
