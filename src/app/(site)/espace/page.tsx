import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { formatPrice, getFormations, getPacks } from "@/lib/catalogue";
import { ownedFormations, quote, readChapters } from "@/lib/orders";
import { Cover } from "@/components/Shelf";
import { DashHead } from "@/components/DashHead";

export const metadata: Metadata = { title: "Ma bibliothèque", robots: { index: false } };

export default async function LibraryPage() {
  const user = await requireUser("/espace");
  const owned = ownedFormations(user.id);
  const formations = getFormations();
  const mine = formations.filter((f) => owned.has(f.slug));
  const others = formations.filter((f) => !owned.has(f.slug));
  const pack = getPacks()[0];
  const packQuote = pack && others.length > 0 ? quote(pack.id, user.id) : null;

  return (
    <div className="wrap">
      <DashHead name={user.name} current="biblio" />

      {mine.length === 0 ? (
        <div className="panel">
          <h2>Votre bibliothèque est vide pour l&rsquo;instant.</h2>
          <p className="muted">
            Commencez par « {formations[0]?.title} » si vous partez de zéro, ou lisez un chapitre gratuit pour vous
            faire une idée.
          </p>
          <Link className="btn" href="/formations">
            Parcourir les formations <span className="arrow">→</span>
          </Link>
        </div>
      ) : (
        <div className="library">
          {mine.map((f) => {
            const read = readChapters(user.id, f.slug);
            const pct = Math.round((read.size / f.chapters.length) * 100);
            const resume = f.chapters.find((c) => !read.has(c.slug)) ?? f.chapters[0];
            return (
              <Link key={f.slug} className="book" href={`/lire/${f.slug}/${resume.slug}`}>
                <Cover formation={f} index={formations.indexOf(f) + 1} />
                <div className="book-meta">
                  <strong>{f.title}</strong>
                </div>
                <div className="book-meta muted">
                  <span>{pct === 100 ? "Terminé" : pct === 0 ? "Pas encore commencé" : `Chapitre ${resume.number}`}</span>
                  <span>{pct} %</span>
                </div>
                <div className="progress" aria-hidden="true">
                  <span style={{ width: `${pct}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {others.length > 0 && (
        <>
          <h2 style={{ fontSize: 30, marginTop: 72 }}>Pour compléter votre étagère</h2>
          {packQuote && packQuote.price > 0 && mine.length > 0 && (
            <p className="muted" style={{ marginTop: 8 }}>
              Les {others.length} livres restants vous coûtent{" "}
              <Link href={`/commande/${pack.id}`}>{formatPrice(packQuote.price)} avec l&rsquo;intégrale</Link> : vos
              achats précédents sont déduits.
            </p>
          )}
          <div className="library">
            {others.map((f) => (
              <Link key={f.slug} className="book locked" href={`/formations/${f.slug}`}>
                <Cover formation={f} index={formations.indexOf(f) + 1} />
                <div className="book-meta">
                  <strong>{f.title}</strong>
                  <span>{formatPrice(f.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
