import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SignupForm } from "@/components/AuthForms";
import { currentUser, safeNext } from "@/lib/auth";

export const metadata: Metadata = { title: "Créer un compte", robots: { index: false } };

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ suite?: string }> }) {
  const next = safeNext((await searchParams).suite);
  if (await currentUser()) redirect(next);
  return (
    <div className="wrap">
      <div className="auth">
        <span className="label">Un compte, toute votre bibliothèque</span>
        <h1>Créer un compte.</h1>
        <p className="muted">C&rsquo;est là que vos formations seront rangées après achat. Gratuit, sans engagement.</p>
        <SignupForm next={next} />
        <p className="small muted" style={{ marginTop: 24 }}>
          Déjà inscrit ?{" "}
          <Link href={`/connexion${next !== "/espace" ? `?suite=${encodeURIComponent(next)}` : ""}`}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
