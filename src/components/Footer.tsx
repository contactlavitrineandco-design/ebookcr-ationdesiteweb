import Link from "next/link";
import { SITE } from "@/lib/site";
import { getFormations } from "@/lib/catalogue";
import { TrussMark } from "./Logo";

export function Footer() {
  const formations = getFormations();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand">
              <TrussMark />
              {SITE.nom}
            </Link>
            <p className="muted small" style={{ marginTop: 14, maxWidth: 340 }}>
              {SITE.baseline}. Des e-books achetés une fois, lus en ligne, mis à jour sans supplément.
            </p>
            <p className="small">
              <a href={`mailto:${SITE.emailContact}`}>{SITE.emailContact}</a>
            </p>
          </div>
          <div>
            <h4>Formations</h4>
            <ul>
              {formations.map((f) => (
                <li key={f.slug}>
                  <Link href={`/formations/${f.slug}`}>{f.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Compte</h4>
            <ul>
              <li><Link href="/connexion">Connexion</Link></li>
              <li><Link href="/inscription">Créer un compte</Link></li>
              <li><Link href="/espace">Mes formations</Link></li>
              <li><Link href="/espace/compte">Mes données</Link></li>
            </ul>
          </div>
          <div>
            <h4>Légal</h4>
            <ul>
              <li><Link href="/mentions-legales">Mentions légales</Link></li>
              <li><Link href="/cgv">Conditions générales de vente</Link></li>
              <li><Link href="/confidentialite">Confidentialité</Link></li>
              <li><Link href="/cookies">Cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {SITE.nom}. Textes et e-books protégés par le Code de la propriété intellectuelle.
          </span>
          <span>Paiement sécurisé par Stripe · Aucun cookie publicitaire</span>
        </div>
      </div>
    </footer>
  );
}
