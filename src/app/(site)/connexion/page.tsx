import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { LoginForm } from "@/components/AuthForms";
import { currentUser, safeNext } from "@/lib/auth";

export const metadata: Metadata = { title: "Connexion", robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ suite?: string }> }) {
  const next = safeNext((await searchParams).suite);
  if (await currentUser()) redirect(next);
  return (
    <div className="wrap">
      <div className="auth">
        <span className="label">Votre espace</span>
        <h1>Bon retour.</h1>
        <p className="muted">Vos livres vous attendent là où vous les avez laissés.</p>
        <LoginForm next={next} />
        <p className="small muted" style={{ marginTop: 24 }}>
          Pas encore de compte ?{" "}
          <Link href={`/inscription${next !== "/espace" ? `?suite=${encodeURIComponent(next)}` : ""}`}>Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}
