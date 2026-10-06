"use client";

import Link from "next/link";
import { useActionState } from "react";
import { startCheckout, type CheckoutState } from "@/app/actions/checkout";

export function CheckoutForm({ product, label, free }: { product: string; label: string; free: boolean }) {
  const [state, action, pending] = useActionState<CheckoutState, FormData>(startCheckout, {});
  return (
    <form action={action}>
      <input type="hidden" name="product" value={product} />
      <div className="legal-box">
        <label className="check">
          <input type="checkbox" name="cgv" required />
          <span>
            J&rsquo;ai lu et j&rsquo;accepte les{" "}
            <Link href="/cgv" target="_blank">
              conditions générales de vente
            </Link>
            , y compris la licence d&rsquo;utilisation personnelle des e-books.
          </span>
        </label>
        <label className="check">
          <input type="checkbox" name="waiver" required />
          <span>
            Je demande l&rsquo;accès immédiat à « {label} » dès la confirmation du paiement et je reconnais perdre
            ainsi mon droit de rétractation (art. L221-28 13° du Code de la consommation).
          </span>
        </label>
      </div>
      {state.error && (
        <p className="alert alert-error" role="alert" style={{ marginTop: 20 }}>
          {state.error}
        </p>
      )}
      <button className="btn btn-accent btn-block" style={{ marginTop: 24 }} disabled={pending}>
        {pending ? "Redirection…" : free ? "Obtenir gratuitement" : "Payer par carte"} <span className="arrow">→</span>
      </button>
      {!free && (
        <p className="small muted" style={{ marginTop: 12, textAlign: "center" }}>
          Commande avec obligation de paiement. Vous serez redirigé vers la page sécurisée de Stripe.
        </p>
      )}
    </form>
  );
}
