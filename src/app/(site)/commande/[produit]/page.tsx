import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { currentUser } from "@/lib/auth";
import { formatPrice, getFormation } from "@/lib/catalogue";
import { quote } from "@/lib/orders";
import { CheckoutForm } from "@/components/CheckoutForm";
import { demoCheckout } from "@/lib/stripe";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Commande", robots: { index: false } };

type Props = { params: Promise<{ produit: string }>; searchParams: Promise<{ annule?: string }> };

export default async function CheckoutPage({ params, searchParams }: Props) {
  const { produit } = await params;
  const { annule } = await searchParams;
  const user = await currentUser();
  if (!quote(produit, null)) notFound();
  if (!user) redirect(`/inscription?suite=${encodeURIComponent(`/commande/${produit}`)}`);

  const q = quote(produit, user.id)!;

  return (
    <div className="wrap">
      <div className="checkout">
        <span className="label">Récapitulatif de commande</span>
        <h1>{q.product.title}</h1>

        {annule && (
          <p className="alert alert-error" style={{ marginBottom: 24 }}>
            Paiement annulé. Aucun montant n&rsquo;a été débité.
          </p>
        )}

        {q.missing.length === 0 ? (
          <div className="panel">
            <h2>Vous avez déjà tout.</h2>
            <p>Le contenu de ce produit est déjà dans votre bibliothèque.</p>
            <Link className="btn" href="/espace">
              Aller à ma bibliothèque
            </Link>
          </div>
        ) : (
          <>
            <div className="recap">
              {q.product.formations.map((slug) => {
                const f = getFormation(slug)!;
                const has = !q.missing.includes(slug);
                return (
                  <div className="recap-row" key={slug}>
                    <span>
                      {f.title} {has && <span className="tag tag-green">déjà possédé</span>}
                    </span>
                    <span className="muted">{q.product.kind === "formation" ? formatPrice(f.price) : ""}</span>
                  </div>
                );
              })}
              {q.product.kind === "pack" && (
                <div className="recap-row">
                  <span>Prix du pack</span>
                  <span>{formatPrice(q.listPrice)}</span>
                </div>
              )}
              {q.credit > 0 && (
                <div className="recap-row">
                  <span>Livres déjà achetés, déduits</span>
                  <span>− {formatPrice(Math.min(q.credit, q.listPrice))}</span>
                </div>
              )}
              <div className="recap-row">
                <strong>Total à payer, une seule fois</strong>
                <span className="recap-total">{formatPrice(q.price)}</span>
              </div>
            </div>
            <p className="small muted" style={{ marginTop: 10 }}>
              Prix TTC. {SITE.tva.franchise ? SITE.tva.mention + "." : ""} Facture au nom de {user.name} ({user.email}).
            </p>

            {demoCheckout() && (
              <p className="alert alert-ok" style={{ marginTop: 20 }}>
                Mode démonstration : aucune clé Stripe n&rsquo;est configurée, l&rsquo;achat sera simulé sans
                paiement. Ce mode est désactivé automatiquement en production.
              </p>
            )}

            <CheckoutForm product={q.product.id} label={q.product.title} free={q.price === 0} />
          </>
        )}
      </div>
    </div>
  );
}
