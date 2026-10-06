import Link from "next/link";
import { logout } from "@/app/actions/auth";

export function DashHead({ name, current }: { name: string; current: "biblio" | "commandes" | "compte" }) {
  const tabs = [
    { id: "biblio", href: "/espace", label: "Bibliothèque" },
    { id: "commandes", href: "/espace/commandes", label: "Commandes" },
    { id: "compte", href: "/espace/compte", label: "Compte & données" },
  ] as const;
  return (
    <div className="dash-head">
      <div>
        <span className="label">Espace de {name}</span>
        <h1>{tabs.find((t) => t.id === current)!.label}</h1>
      </div>
      <nav className="dash-tabs" aria-label="Espace client">
        {tabs.map((t) => (
          <Link key={t.id} href={t.href} aria-current={t.id === current ? "page" : undefined}>
            {t.label}
          </Link>
        ))}
        <form action={logout}>
          <button className="link-arrow" style={{ background: "none", border: 0, cursor: "pointer", font: "inherit", padding: 0 }}>
            Déconnexion
          </button>
        </form>
      </nav>
    </div>
  );
}
