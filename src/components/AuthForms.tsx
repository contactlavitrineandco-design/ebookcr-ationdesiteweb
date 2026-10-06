"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, requestReset, resetPassword, signup, type FormState } from "@/app/actions/auth";

const initial: FormState = {};

function Feedback({ state }: { state: FormState }) {
  if (state.error)
    return (
      <p className="alert alert-error" role="alert">
        {state.error}
      </p>
    );
  if (state.ok)
    return (
      <p className="alert alert-ok" role="status">
        {state.ok}
      </p>
    );
  return null;
}

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(login, initial);
  return (
    <form action={action} className="form">
      <Feedback state={state} />
      <input type="hidden" name="next" value={next} />
      <div className="field">
        <label htmlFor="email">Adresse e-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" required defaultValue={state.fields?.email} />
      </div>
      <div className="field">
        <label htmlFor="password">Mot de passe</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
        <p className="hint">
          <Link href="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
        </p>
      </div>
      <button className="btn btn-block" disabled={pending}>
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}

export function SignupForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(signup, initial);
  return (
    <form action={action} className="form">
      <Feedback state={state} />
      <input type="hidden" name="next" value={next} />
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor="name">Prénom et nom</label>
        <input id="name" name="name" type="text" autoComplete="name" required defaultValue={state.fields?.name} />
        <p className="hint">Il figurera sur vos factures et sur votre licence de lecture.</p>
      </div>
      <div className="field">
        <label htmlFor="email">Adresse e-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" required defaultValue={state.fields?.email} />
      </div>
      <div className="field">
        <label htmlFor="password">Mot de passe</label>
        <input id="password" name="password" type="password" autoComplete="new-password" minLength={10} required />
        <p className="hint">10 caractères minimum, avec au moins un chiffre ou un symbole.</p>
      </div>
      <label className="check">
        <input type="checkbox" name="privacy" required />
        <span>
          J&rsquo;ai lu la <Link href="/confidentialite" target="_blank">politique de confidentialité</Link>. Mes données
          servent uniquement à gérer mon compte et mes achats.
        </span>
      </label>
      <button className="btn btn-block" disabled={pending}>
        {pending ? "Création…" : "Créer mon compte"}
      </button>
    </form>
  );
}

export function RequestResetForm() {
  const [state, action, pending] = useActionState(requestReset, initial);
  return (
    <form action={action} className="form">
      <Feedback state={state} />
      <div className="field">
        <label htmlFor="email">Adresse e-mail du compte</label>
        <input id="email" name="email" type="email" autoComplete="email" required defaultValue={state.fields?.email} />
      </div>
      <button className="btn btn-block" disabled={pending}>
        {pending ? "Envoi…" : "Recevoir un lien"}
      </button>
    </form>
  );
}

export function ResetForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetPassword, initial);
  return (
    <form action={action} className="form">
      <Feedback state={state} />
      <input type="hidden" name="token" value={token} />
      <div className="field">
        <label htmlFor="password">Nouveau mot de passe</label>
        <input id="password" name="password" type="password" autoComplete="new-password" minLength={10} required />
        <p className="hint">Toutes vos autres sessions seront déconnectées.</p>
      </div>
      <button className="btn btn-block" disabled={pending}>
        {pending ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
