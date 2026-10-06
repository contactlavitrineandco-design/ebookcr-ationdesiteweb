import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getFormation, getFormations, getPacks, formatPrice } from "@/lib/catalogue";
import { Cover } from "@/components/Shelf";
import { currentUser } from "@/lib/auth";
import { ownsFormation } from "@/lib/orders";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = getFormation((await params).slug);
  if (!f) return {};
  return { title: f.title, description: f.description };
}

export default async function FormationPage({ params }: Props) {
  const { slug } = await params;
  const formation = getFormation(slug);
  if (!formation) notFound();

  const index = getFormations().findIndex((f) => f.slug === slug) + 1;
  const user = await currentUser();
  const owned = user ? ownsFormation(user.id, slug) : false;
  const pack = getPacks().find((p) => p.formations.includes(slug));
  const preview = formation.chapters.find((c) => c.preview);
  const hours = Math.max(1, Math.round(formation.minutes / 60));

  return (
    <>
      <section className="product-hero">
        <div className="wrap product-grid">
          <div>
            <nav className="breadcrumb" aria-label="Fil d'Ariane">
              <Link href="/formations">Formations</Link> / N° {String(index).padStart(2, "0")}
            </nav>
            <h1>{formation.title}</h1>
            <p className="lead">{formation.description}</p>
            <ul className="facts">
              <li>{formation.level}</li>
              <li>{formation.chapters.length} chapitres</li>
              <li>≈ {hours} h de lecture</li>
              <li>Exercices à chaque chapitre</li>
            </ul>

            <div className="two-col" style={{ marginTop: 56 }}>
              <div>
                <span className="label">À la fin, vous saurez</span>
                <ol className="outcomes" style={{ marginTop: 14 }}>
                  {formation.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ol>
              </div>
              <div>
                <span className="label">Pour qui</span>
                <p style={{ marginTop: 14 }}>{formation.audience}</p>
                <span className="label">Prérequis</span>
                <p style={{ marginTop: 14 }}>{formation.prerequisites}</p>
              </div>
            </div>
          </div>

          <aside className="buy-card" aria-label="Acheter cette formation">
            <Cover formation={formation} index={index} />
            {owned ? (
              <>
                <p>
                  <span className="tag tag-green">Dans votre bibliothèque</span>
                </p>
                <Link href={`/lire/${slug}/${formation.chapters[0].slug}`} className="btn btn-block">
                  Ouvrir le livre <span className="arrow">→</span>
                </Link>
              </>
            ) : (
              <>
                <div className="price-line">
                  <span className="price-big">{formatPrice(formation.price)}</span>
                  <span className="muted small">paiement unique</span>
                </div>
                <Link href={`/commande/${slug}`} className="btn btn-block" style={{ marginTop: 16 }}>
                  Acheter ce livre <span className="arrow">→</span>
                </Link>
                {preview && (
                  <Link href={`/lire/${slug}/${preview.slug}`} className="btn btn-ghost btn-block" style={{ marginTop: 10 }}>
                    Lire le chapitre gratuit
                  </Link>
                )}
                {pack && (
                  <p className="small muted" style={{ marginTop: 16 }}>
                    Ou <Link href={`/commande/${pack.id}`}>{pack.title.toLowerCase()}</Link> : les{" "}
                    {pack.formations.length} livres pour {formatPrice(pack.price)}.
                  </p>
                )}
                <ul>
                  <li>Accès immédiat et à vie</li>
                  <li>Mises à jour incluses</li>
                  <li>Lecture sur tous vos appareils</li>
                  <li>Facture automatique</li>
                </ul>
              </>
            )}
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="label">Sommaire</span>
            <h2>Ce qu&rsquo;il y a dans le livre.</h2>
          </div>
          <ol className="chapters">
            {formation.chapters.map((c) => (
              <li key={c.slug}>
                <span className="n">{String(c.number).padStart(2, "0")}</span>
                <span>
                  <h4>{c.title}</h4>
                  {c.summary && <p>{c.summary}</p>}
                </span>
                <span className="aside">
                  {c.preview && !owned ? (
                    <Link className="free" href={`/lire/${slug}/${c.slug}`}>
                      Lire gratuitement
                    </Link>
                  ) : (
                    `${c.minutes} min`
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
