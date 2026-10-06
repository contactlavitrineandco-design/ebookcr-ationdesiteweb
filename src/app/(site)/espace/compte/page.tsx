import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { DashHead } from "@/components/DashHead";
import { DeleteForm, NameForm, PasswordForm } from "@/components/AccountForms";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Compte et données", robots: { index: false } };

export default async function AccountPage() {
  const user = await requireUser("/espace/compte");
  return (
    <div className="wrap">
      <DashHead name={user.name} current="compte" />
      <div className="two-col">
        <div className="panel">
          <h2>Identité</h2>
          <p className="muted small">E-mail du compte : {user.email}</p>
          <NameForm name={user.name} />
        </div>
        <div className="panel">
          <h2>Sécurité</h2>
          <p className="muted small">Changer de mot de passe déconnecte vos autres appareils.</p>
          <PasswordForm />
        </div>
      </div>

      <div className="panel">
        <h2>Vos données</h2>
        <p>
          Nous conservons uniquement votre nom, votre e-mail, vos commandes, vos accès et votre progression de lecture.
          Aucun outil publicitaire ni de mesure d&rsquo;audience tiers. Détails dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
        <a className="btn btn-ghost" href="/api/compte/export" download>
          Télécharger mes données (JSON)
        </a>
        <p className="small muted" style={{ marginTop: 14 }}>
          Pour toute demande (rectification, opposition, limitation) :{" "}
          <a href={`mailto:${SITE.emailDpo}`}>{SITE.emailDpo}</a>. Réponse sous un mois maximum.
        </p>
      </div>

      <div className="panel danger">
        <h2>Supprimer mon compte</h2>
        <p>
          Votre compte, vos accès aux livres et votre progression seront effacés immédiatement et définitivement. Les
          factures déjà émises sont conservées sous forme anonymisée pendant la durée légale (10 ans), comme
          l&rsquo;exige le Code de commerce.
        </p>
        <DeleteForm />
      </div>
    </div>
  );
}
