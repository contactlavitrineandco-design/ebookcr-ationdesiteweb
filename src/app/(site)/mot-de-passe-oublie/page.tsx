import type { Metadata } from "next";
import { RequestResetForm } from "@/components/AuthForms";

export const metadata: Metadata = { title: "Mot de passe oublié", robots: { index: false } };

export default function ForgotPage() {
  return (
    <div className="wrap">
      <div className="auth">
        <span className="label">Mot de passe</span>
        <h1>Ça arrive.</h1>
        <p className="muted">Indiquez l&rsquo;adresse de votre compte, on vous envoie un lien pour en choisir un nouveau.</p>
        <RequestResetForm />
      </div>
    </div>
  );
}
