import Link from "next/link";
import type { Metadata } from "next";
import { ResetForm } from "@/components/AuthForms";

export const metadata: Metadata = { title: "Nouveau mot de passe", robots: { index: false } };

export default async function ResetPage({ searchParams }: { searchParams: Promise<{ jeton?: string }> }) {
  const token = (await searchParams).jeton ?? "";
  return (
    <div className="wrap">
      <div className="auth">
        <span className="label">Mot de passe</span>
        <h1>Nouveau mot de passe.</h1>
        {token ? (
          <ResetForm token={token} />
        ) : (
          <p className="alert alert-error" style={{ marginTop: 24 }}>
            Lien incomplet. <Link href="/mot-de-passe-oublie">Refaire une demande</Link>.
          </p>
        )}
      </div>
    </div>
  );
}
