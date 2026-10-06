import Link from "next/link";
import type { Metadata } from "next";
import { getFormations, getPacks, formatPrice, sumOfParts } from "@/lib/catalogue";
import { Cover } from "@/components/Shelf";
import { currentUser } from "@/lib/auth";
import { ownedFormations } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Les formations",
  description: "Six e-books pour apprendre à créer des sites web. Paiement unique, accès à vie.",
};

export default async function FormationsPage() {
  const formations = getFormations();
  const pack = getPacks()[0];
  const user = await currentUser();
  const owned = user ? ownedFormations(user.id) : new Set<string>();

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <span className="label">Le catalogue</span>
          <h1>Les formations</h1>
          <p className="lead">
            Chaque livre s&rsquo;achète seul, pour toujours. Le premier chapitre de chacun est en lecture libre.
            {pack && (
              <>
                {" "}
                Ou prenez <Link href={`/commande/${pack.id}`}>l&rsquo;intégrale à {formatPrice(pack.price)}</Link> au
                lieu de {formatPrice(sumOfParts(pack))}.
              </>
            )}
          </p>
        </div>
      </div>
      <div className="wrap">
        <div className="library">
          {formations.map((f, i) => (
            <Link key={f.slug} href={`/formations/${f.slug}`} className="book">
              <Cover formation={f} index={i + 1} />
              <div className="book-meta">
                <strong>{f.title}</strong>
              </div>
              <div className="book-meta muted">
                <span>{f.level}</span>
                {owned.has(f.slug) ? <span className="tag tag-green">Possédé</span> : <span>{formatPrice(f.price)}</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
