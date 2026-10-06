"use client";

import { useActionState } from "react";
import { changePassword, deleteAccount, updateName } from "@/app/actions/account";
import type { FormState } from "@/app/actions/auth";

function Feedback({ state }: { state: FormState }) {
  if (state.error) return <p className="alert alert-error" role="alert">{state.error}</p>;
  if (state.ok) return <p className="alert alert-ok" role="status">{state.ok}</p>;
  return null;
}

export function NameForm({ name }: { name: string }) {
  const [state, action, pending] = useActionState(updateName, {});
  return (
    <form action={action} className="form">
      <Feedback state={state} />
      <div className="field">
        <label htmlFor="name">Nom affiché sur vos licences</label>
        <input id="name" name="name" type="text" defaultValue={name} required />
      </div>
      <button className="btn btn-ghost" disabled={pending}>Enregistrer</button>
    </form>
  );
}

export function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, {});
  return (
    <form action={action} className="form">
      <Feedback state={state} />
      <div className="field">
        <label htmlFor="current">Mot de passe actuel</label>
        <input id="current" name="current" type="password" autoComplete="current-password" required />
      </div>
      <div className="field">
        <label htmlFor="next">Nouveau mot de passe</label>
        <input id="next" name="next" type="password" autoComplete="new-password" minLength={10} required />
      </div>
      <button className="btn btn-ghost" disabled={pending}>Changer le mot de passe</button>
    </form>
  );
}

export function DeleteForm() {
  const [state, action, pending] = useActionState(deleteAccount, {});
  return (
    <form action={action} className="form">
      <Feedback state={state} />
      <div className="field">
        <label htmlFor="confirm">Tapez SUPPRIMER</label>
        <input id="confirm" name="confirm" type="text" autoComplete="off" required />
      </div>
      <div className="field">
        <label htmlFor="password-del">Mot de passe</label>
        <input id="password-del" name="password" type="password" autoComplete="current-password" required />
      </div>
      <button className="btn" style={{ background: "#7a2606", borderColor: "#7a2606" }} disabled={pending}>
        Supprimer définitivement mon compte
      </button>
    </form>
  );
}
