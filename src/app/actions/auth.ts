"use server";

import { redirect } from "next/navigation";
import {
  createSession,
  destroyAllSessions,
  destroySession,
  findUserByEmail,
  insertUser,
  safeNext,
} from "@/lib/auth";
import { db, now } from "@/lib/db";
import { dummyVerify, hashPassword, randomToken, sha256, verifyPassword } from "@/lib/password";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendMail } from "@/lib/mail";
import { appUrl, SITE } from "@/lib/site";

export type FormState = { error?: string; ok?: string; fields?: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_FAILED = 8;
const LOCK_MS = 15 * 60_000;

function str(form: FormData, key: string, max = 200): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function passwordProblem(password: string): string | null {
  if (password.length < 10) return "Le mot de passe doit contenir au moins 10 caractères.";
  if (password.length > 200) return "Le mot de passe est trop long.";
  if (!/[a-zA-Z]/.test(password) || !/[^a-zA-Z]/.test(password))
    return "Mélangez des lettres et au moins un chiffre ou symbole.";
  return null;
}

export async function signup(_: FormState, form: FormData): Promise<FormState> {
  const name = str(form, "name", 80);
  const email = str(form, "email", 160).toLowerCase();
  const password = typeof form.get("password") === "string" ? (form.get("password") as string) : "";
  const fields = { name, email };

  // Champ piège invisible : rempli uniquement par les robots.
  if (str(form, "website")) return { error: "Inscription impossible.", fields };
  if (!rateLimit(`signup:${await clientIp()}`, 5, 60 * 60_000))
    return { error: "Trop de tentatives. Réessayez dans une heure.", fields };

  if (name.length < 2) return { error: "Indiquez votre prénom ou votre nom.", fields };
  if (!EMAIL_RE.test(email)) return { error: "Cette adresse e-mail ne semble pas valide.", fields };
  const pwError = passwordProblem(password);
  if (pwError) return { error: pwError, fields };
  if (form.get("privacy") !== "on")
    return { error: "Merci de prendre connaissance de la politique de confidentialité.", fields };

  if (findUserByEmail(email)) {
    // Message neutre : ne confirme pas l'existence du compte à un tiers.
    return { error: "Impossible de créer ce compte. Si vous en avez déjà un, connectez-vous.", fields };
  }

  const userId = insertUser(email, name, await hashPassword(password));
  await createSession(userId);
  await sendMail(
    email,
    `Bienvenue chez ${SITE.nom}`,
    `Bonjour ${name},\n\nVotre compte est créé. Vos formations apparaîtront dans votre espace : ${appUrl()}/espace\n\nBonne lecture.`,
  );
  redirect(safeNext(form.get("next")));
}

export async function login(_: FormState, form: FormData): Promise<FormState> {
  const email = str(form, "email", 160).toLowerCase();
  const password = typeof form.get("password") === "string" ? (form.get("password") as string).slice(0, 200) : "";
  const fields = { email };
  const generic = "E-mail ou mot de passe incorrect.";

  if (!rateLimit(`login:${await clientIp()}`, 20, 15 * 60_000))
    return { error: "Trop de tentatives. Patientez quelques minutes.", fields };

  const user = findUserByEmail(email);
  if (!user) {
    await dummyVerify(password);
    return { error: generic, fields };
  }
  if (user.locked_until && user.locked_until > now()) {
    return { error: "Compte temporairement verrouillé après plusieurs échecs. Réessayez dans 15 minutes.", fields };
  }
  if (!(await verifyPassword(password, user.password_hash))) {
    const failed = user.failed_logins + 1;
    db()
      .prepare("UPDATE users SET failed_logins = ?, locked_until = ? WHERE id = ?")
      .run(failed >= MAX_FAILED ? 0 : failed, failed >= MAX_FAILED ? now() + LOCK_MS : null, user.id);
    return { error: generic, fields };
  }

  db().prepare("UPDATE users SET failed_logins = 0, locked_until = NULL WHERE id = ?").run(user.id);
  await createSession(user.id);
  redirect(safeNext(form.get("next")));
}

export async function logout() {
  await destroySession();
  redirect("/");
}

export async function requestReset(_: FormState, form: FormData): Promise<FormState> {
  const email = str(form, "email", 160).toLowerCase();
  const done = {
    ok: "Si un compte existe pour cette adresse, un lien de réinitialisation vient d'y être envoyé. Il est valable une heure.",
  };
  if (!EMAIL_RE.test(email)) return { error: "Cette adresse e-mail ne semble pas valide.", fields: { email } };
  if (!rateLimit(`reset:${await clientIp()}`, 5, 60 * 60_000) || !rateLimit(`reset:${email}`, 3, 60 * 60_000))
    return done;

  const user = findUserByEmail(email);
  if (user) {
    const token = randomToken();
    db()
      .prepare("INSERT INTO password_resets (token_hash, user_id, expires_at) VALUES (?, ?, ?)")
      .run(sha256(token), user.id, now() + 60 * 60_000);
    await sendMail(
      email,
      "Réinitialiser votre mot de passe",
      `Bonjour ${user.name},\n\nPour choisir un nouveau mot de passe, ouvrez ce lien (valable une heure) :\n${appUrl()}/reinitialiser?jeton=${token}\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail : rien ne changera.`,
    );
  }
  return done;
}

export async function resetPassword(_: FormState, form: FormData): Promise<FormState> {
  const token = str(form, "token", 100);
  const password = typeof form.get("password") === "string" ? (form.get("password") as string) : "";
  const pwError = passwordProblem(password);
  if (pwError) return { error: pwError };

  const row = db()
    .prepare("SELECT user_id FROM password_resets WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?")
    .get(sha256(token), now()) as { user_id: string } | undefined;
  if (!row) return { error: "Ce lien a expiré ou a déjà servi. Faites une nouvelle demande." };

  db().prepare("UPDATE password_resets SET used_at = ? WHERE token_hash = ?").run(now(), sha256(token));
  db()
    .prepare("UPDATE users SET password_hash = ?, failed_logins = 0, locked_until = NULL WHERE id = ?")
    .run(await hashPassword(password), row.user_id);
  destroyAllSessions(row.user_id);
  await createSession(row.user_id);
  redirect("/espace");
}
