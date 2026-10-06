import Link from "next/link";
import { getFormations, getPacks, formatPrice, sumOfParts } from "@/lib/catalogue";
import { Shelf } from "@/components/Shelf";
import { SITE } from "@/lib/site";

export default function Home() {
  const formations = getFormations();
  const pack = getPacks()[0];
  const totalChapters = formations.reduce((n, f) => n + f.chapters.length, 0);
  const totalHours = Math.round(formations.reduce((n, f) => n + f.minutes, 0) / 60);
  const firstPreview = formations[0]?.chapters.find((c) => c.preview);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="label">
              <b>●</b> Formations en e-book · paiement unique
            </span>
            <h1>
              Apprendre à construire des sites web, <em>comme on apprend un métier.</em>
            </h1>
            <p className="lead">
              Six e-books écrits pour être lus, relus et appliqués : du premier fichier HTML jusqu&rsquo;au moment où
              vous êtes prêt à proposer vos services. Vous payez une fois. Ils restent à vous, mises à jour comprises.
            </p>
            <div className="hero-actions">
              <Link href="/formations" className="btn">
                Voir les six formations <span className="arrow">→</span>
              </Link>
              {firstPreview && (
                <Link href={`/lire/${formations[0].slug}/${firstPreview.slug}`} className="btn btn-ghost">
                  Lire un chapitre gratuit
                </Link>
              )}
            </div>
            <ul className="hero-facts">
              <li>Pas d&rsquo;abonnement</li>
              <li>Accès à vie</li>
              <li>À partir de {formatPrice(Math.min(...formations.map((f) => f.price)))}</li>
            </ul>
          </div>
          <Shelf formations={formations} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="label">01 — Le parti pris</span>
            <div>
              <h2>Ce que vous ne trouverez pas ici.</h2>
              <p className="lead">On a enlevé tout ce qui nous agaçait quand on cherchait nous-mêmes à apprendre.</p>
            </div>
          </div>
          <div className="nots">
            <div>
              <h3>
                <s>Un abonnement</s>
              </h3>
              <p className="muted">
                Une formation s&rsquo;achète comme un livre. Pas de prélèvement mensuel, pas de résiliation à
                chercher au fond d&rsquo;un menu, pas d&rsquo;accès qui disparaît.
              </p>
            </div>
            <div>
              <h3>
                <s>Quarante heures de vidéo</s>
              </h3>
              <p className="muted">
                Un texte se lit à votre rythme, se parcourt, se retrouve en dix secondes. Chaque chapitre se termine
                par un exercice concret.
              </p>
            </div>
            <div>
              <h3>
                <s>Des promesses de revenus</s>
              </h3>
              <p className="muted">
                On vous apprend un savoir-faire, sérieusement. Ce que vous en ferez dépend de vous — et on ne vous
                dira pas le contraire.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="programme">
        <div className="wrap">
          <div className="section-head">
            <span className="label">02 — Le programme</span>
            <div>
              <h2>Six livres, dans l&rsquo;ordre où l&rsquo;on apprend.</h2>
              <p className="lead">
                {totalChapters} chapitres, environ {totalHours} heures de lecture, et autant de pratique. Chaque
                formation s&rsquo;achète seule ; elles sont pensées pour s&rsquo;enchaîner.
              </p>
            </div>
          </div>
          <ol className="toc">
            {formations.map((f, i) => (
              <li key={f.slug}>
                <Link href={`/formations/${f.slug}`} className="toc-row">
                  <span className="toc-num">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <h3>{f.title}</h3>
                    <p>{f.subtitle}</p>
                  </span>
                  <span className="toc-meta">
                    {f.level}
                    <br />
                    {f.chapters.length} chapitres
                  </span>
                  <span className="toc-price">{formatPrice(f.price)}</span>
                  <span className="toc-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          {pack && (
            <div className="pack" id="tarifs">
              <div className="pack-body">
                <span className="label">Le plus choisi</span>
                <h3>{pack.title}</h3>
                <p>{pack.subtitle}</p>
                <ul>
                  <li>Les {pack.formations.length} e-books, lisibles en ligne sur tous vos écrans</li>
                  <li>Les futures formations ajoutées au programme, sans supplément</li>
                  <li>Mises à jour des contenus incluses, à vie</li>
                  <li>Déjà acheté un livre ? Son prix est déduit automatiquement</li>
                </ul>
              </div>
              <div className="pack-price">
                <div>
                  <div className="amount">{formatPrice(pack.price)}</div>
                  <div className="was">
                    au lieu de <s>{formatPrice(sumOfParts(pack))}</s> à l&rsquo;unité · une seule fois
                  </div>
                </div>
                <Link href={`/commande/${pack.id}`} className="btn btn-block">
                  Prendre l&rsquo;intégrale <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="label">03 — Comment ça marche</span>
            <h2>Trois étapes, et vous lisez.</h2>
          </div>
          <ol className="steps">
            <li>
              <h3>Vous choisissez</h3>
              <p>Une formation, plusieurs, ou l&rsquo;intégrale. Le premier chapitre de chaque livre est en accès libre.</p>
            </li>
            <li>
              <h3>Vous payez une fois</h3>
              <p>
                Paiement sécurisé par Stripe. Nous ne voyons jamais votre numéro de carte. Facture envoyée
                automatiquement.
              </p>
            </li>
            <li>
              <h3>Vous lisez, à vie</h3>
              <p>
                Votre bibliothèque est dans votre espace, sur ordinateur, tablette ou téléphone. Mode nuit et suivi
                de lecture inclus.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="note">
            <span className="label">04 — Pourquoi ces prix</span>
            <blockquote>
              <p>
                Un e-book ne coûte presque rien à distribuer. Il nous paraissait malhonnête de le vendre au prix
                d&rsquo;un abonnement annuel.
              </p>
              <p className="muted" style={{ fontSize: "0.7em", fontFamily: "var(--sans)", fontStyle: "normal" }}>
                Le travail est dans l&rsquo;écriture, la relecture et la mise à jour. C&rsquo;est ça que vous payez, une
                fois — et c&rsquo;est pour ça que les mises à jour sont incluses.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section" id="questions">
        <div className="wrap">
          <div className="section-head">
            <span className="label">05 — Questions</span>
            <h2>Ce qu&rsquo;on nous demande avant d&rsquo;acheter.</h2>
          </div>
          <div className="faq">
            <details>
              <summary>Je pars vraiment de zéro. C&rsquo;est pour moi ?</summary>
              <p>
                Oui. « Les fondations du web » ne suppose aucune connaissance technique. Chaque livre indique ses
                prérequis sur sa fiche, et le premier chapitre est lisible gratuitement pour vous faire une idée.
              </p>
            </details>
            <details>
              <summary>Est-ce que je paie une seule fois, vraiment ?</summary>
              <p>
                Oui. Aucun prélèvement récurrent, aucun renouvellement. L&rsquo;accès est illimité dans le temps, et
                les mises à jour des livres achetés sont incluses.
              </p>
            </details>
            <details>
              <summary>Puis-je télécharger les e-books ?</summary>
              <p>
                Les livres se lisent dans votre espace, en ligne, sur tous vos appareils. Vous pouvez imprimer un
                chapitre pour votre usage personnel ; chaque page porte alors votre nom de licence.
              </p>
            </details>
            <details>
              <summary>Vous apprenez aussi à trouver des clients ?</summary>
              <p>
                Non, et c&rsquo;est volontaire. Le programme vous mène jusqu&rsquo;à la ligne de départ : savoir-faire,
                statut, portfolio, offre, prix, documents et méthode de travail. La prospection commerciale est un
                autre métier, que nous ne prétendons pas enseigner ici.
              </p>
            </details>
            <details>
              <summary>Et si j&rsquo;ai déjà acheté un livre et que je veux l&rsquo;intégrale ?</summary>
              <p>
                Le prix des livres que vous possédez déjà est déduit automatiquement. Vous ne paierez jamais plus que
                le prix de l&rsquo;intégrale au total.
              </p>
            </details>
            <details>
              <summary>Puis-je être remboursé ?</summary>
              <p>
                S&rsquo;agissant d&rsquo;un contenu numérique fourni immédiatement, vous renoncez à votre droit de
                rétractation au moment de l&rsquo;achat, comme le prévoit la loi (art. L221-28 du Code de la
                consommation). En cas de problème technique empêchant la lecture, écrivez-nous à{" "}
                <a href={`mailto:${SITE.emailContact}`}>{SITE.emailContact}</a> : on trouve une solution.
              </p>
            </details>
            <details>
              <summary>Que faites-vous de mes données ?</summary>
              <p>
                Le strict nécessaire : votre nom, votre e-mail et l&rsquo;historique de vos achats. Pas de pixel
                publicitaire, pas de revente, pas d&rsquo;outil de suivi. Vous pouvez exporter ou supprimer vos
                données depuis votre espace. Détails dans la <Link href="/confidentialite">politique de
                confidentialité</Link>.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
