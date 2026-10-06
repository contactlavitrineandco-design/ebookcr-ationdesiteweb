import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { currentUser } from "@/lib/auth";
import { formatPrice, getFormation, getFormations } from "@/lib/catalogue";
import { renderMarkdown } from "@/lib/markdown";
import { markRead, ownsFormation, readChapters } from "@/lib/orders";
import { db } from "@/lib/db";
import { ReaderTheme } from "@/components/ReaderTheme";
import { TrussMark } from "@/components/Logo";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string; chapitre: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, chapitre } = await params;
  const f = getFormation(slug);
  const c = f?.chapters.find((x) => x.slug === chapitre);
  if (!f || !c) return {};
  return {
    title: `${c.title} — ${f.title}`,
    description: c.summary || f.description,
    robots: c.preview ? { index: true, follow: true } : { index: false, follow: false },
  };
}

function escapeXml(s: string) {
  return s.replace(/[<>&'"]/g, (ch) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[ch]!);
}

/** Filigrane nominatif : dissuade la diffusion des captures et impressions. */
function watermark(text: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="260"><text x="20" y="150" transform="rotate(-24 210 130)" font-family="monospace" font-size="13" fill="#000">${escapeXml(text)}</text></svg>`;
  return `url("data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}")`;
}

export default async function ReaderPage({ params }: Props) {
  const { slug, chapitre } = await params;
  const formation = getFormation(slug);
  const chapter = formation?.chapters.find((c) => c.slug === chapitre);
  if (!formation || !chapter) notFound();

  const user = await currentUser();
  const owned = user ? ownsFormation(user.id, slug) : false;

  if (!owned && !chapter.preview) {
    redirect(user ? `/formations/${slug}` : `/connexion?suite=${encodeURIComponent(`/lire/${slug}/${chapitre}`)}`);
  }

  let licence: string | null = null;
  let done = new Set<string>();
  if (owned && user) {
    markRead(user.id, slug, chapter.slug);
    done = readChapters(user.id, slug);
    const ent = db()
      .prepare("SELECT order_id FROM entitlements WHERE user_id = ? AND formation_slug = ?")
      .get(user.id, slug) as { order_id: string };
    licence = `${user.name} · ${user.email} · ${ent.order_id.slice(0, 8).toUpperCase()}`;
  }

  const { html, headings } = renderMarkdown(chapter.body);
  const idx = formation.chapters.indexOf(chapter);
  const prev = formation.chapters[idx - 1];
  const next = formation.chapters[idx + 1];
  const canOpen = (c: { preview: boolean }) => owned || c.preview;
  const bookNumber = getFormations().findIndex((f) => f.slug === slug) + 1;

  return (
    <div className="reader" data-theme="clair">
      {licence && <div className="watermark" style={{ backgroundImage: watermark(licence) }} aria-hidden="true" />}
      <header className="reader-bar">
        <div className="wrap">
          <Link href={owned ? "/espace" : `/formations/${slug}`} className="brand" style={{ fontSize: 18 }}>
            <TrussMark />
            <span className="reader-title">{formation.title}</span>
          </Link>
          <ReaderTheme />
        </div>
      </header>

      <div className="reader-layout">
        <nav className="reader-nav" aria-label="Chapitres">
          <details open>
            <summary className="label" style={{ cursor: "pointer" }}>
              Livre N° {String(bookNumber).padStart(2, "0")} · Sommaire
            </summary>
            <ol>
              {formation.chapters.map((c) => (
                <li key={c.slug}>
                  {canOpen(c) ? (
                    <Link href={`/lire/${slug}/${c.slug}`} aria-current={c.slug === chapter.slug ? "page" : undefined}>
                      <span className={done.has(c.slug) ? "done" : undefined}>
                        {done.has(c.slug) ? "✓" : String(c.number).padStart(2, "0")}
                      </span>
                      <span>{c.title}</span>
                    </Link>
                  ) : (
                    <a aria-disabled="true" style={{ opacity: 0.5 }}>
                      <span>{String(c.number).padStart(2, "0")}</span>
                      <span>{c.title}</span>
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </details>
          {headings.length > 2 && (
            <details style={{ marginTop: 28 }}>
              <summary className="label" style={{ cursor: "pointer" }}>Dans ce chapitre</summary>
              <ol>
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} style={{ gridTemplateColumns: "1fr" }}>
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          )}
        </nav>

        <article className="prose">
          <span className="chapter-kicker">
            Chapitre {chapter.number} · {chapter.minutes} min de lecture
          </span>
          <h1>{chapter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />

          {!owned && (
            <div className="preview-banner">
              <span className="label" style={{ color: "#b3aa98" }}>Fin de l&rsquo;extrait gratuit</span>
              <h3>La suite est dans le livre.</h3>
              <p>
                {formation.chapters.length - 1} autres chapitres, des exercices à chaque étape. Paiement unique de{" "}
                {formatPrice(formation.price)}, accès à vie.
              </p>
              <Link className="btn" href={`/formations/${slug}`}>
                Voir le sommaire complet <span className="arrow">→</span>
              </Link>
            </div>
          )}

          {owned && (
            <nav className="chapter-nav" aria-label="Chapitre précédent et suivant">
              {prev ? (
                <Link href={`/lire/${slug}/${prev.slug}`}>
                  <small>← Précédent</small>
                  {prev.title}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link className="next" href={`/lire/${slug}/${next.slug}`}>
                  <small>Suivant →</small>
                  {next.title}
                </Link>
              ) : (
                <Link className="next" href="/espace">
                  <small>Livre terminé</small>
                  Retour à la bibliothèque
                </Link>
              )}
            </nav>
          )}

          <p className="licence">
            {licence
              ? `Licence personnelle et non cessible accordée à ${licence}. `
              : "Extrait gratuit. "}
            © {new Date().getFullYear()} {SITE.nom}. Toute reproduction ou diffusion, même partielle, est interdite
            sans autorisation (art. L122-4 et L335-2 du Code de la propriété intellectuelle).
          </p>
        </article>
      </div>
    </div>
  );
}
