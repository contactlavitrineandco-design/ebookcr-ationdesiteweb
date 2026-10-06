import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { SITE } from "@/lib/site";
import { TrussMark } from "./Logo";

export async function Header() {
  const user = await currentUser();
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label={`${SITE.nom}, accueil`}>
          <TrussMark />
          {SITE.nom}
        </Link>
        <nav className="nav" aria-label="Navigation principale">
          <span className="nav nav-links">
            <Link href="/formations">Formations</Link>
            <Link href="/#tarifs">Tarifs</Link>
            <Link href="/#questions">Questions</Link>
          </span>
          {user ? (
            <Link href="/espace" className="btn">
              Mes formations
            </Link>
          ) : (
            <>
              <Link href="/connexion">Connexion</Link>
              <Link href="/formations" className="btn">
                Commencer
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
