import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { SITE } from "./site";

let transport: Transporter | null = null;

function getTransport() {
  if (!process.env.SMTP_HOST) return null;
  transport ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined,
  });
  return transport;
}

export async function sendMail(to: string, subject: string, text: string) {
  const t = getTransport();
  if (!t) {
    if (process.env.NODE_ENV === "production") {
      console.error(`[mail] SMTP non configuré — e-mail « ${subject} » non envoyé.`);
    } else {
      console.info(`\n[mail → ${to}] ${subject}\n${text}\n`);
    }
    return;
  }
  try {
    await t.sendMail({
      from: process.env.MAIL_FROM || `${SITE.nom} <${SITE.emailContact}>`,
      to,
      subject,
      text: `${text}\n\n—\n${SITE.nom} · ${SITE.domaine}\nCet e-mail transactionnel est lié à votre compte. Aucune lettre d'information ne vous sera envoyée sans votre accord.`,
    });
  } catch (err) {
    console.error("[mail] échec d'envoi", err);
  }
}
