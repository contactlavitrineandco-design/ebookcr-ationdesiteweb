import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

// Droit d'accès et à la portabilité (art. 15 et 20 RGPD) : export JSON lisible.
export async function GET() {
  const user = await currentUser();
  if (!user) return new Response("Non connecté", { status: 401 });
  const q = (sql: string) => db().prepare(sql).all(user.id);
  const data = {
    exporte_le: new Date().toISOString(),
    responsable_du_traitement: `${SITE.editeur.raisonSociale} — ${SITE.emailDpo}`,
    compte: { id: user.id, nom: user.name, email: user.email, cree_le: new Date(user.created_at).toISOString() },
    commandes: q(
      "SELECT id, product_label AS produit, amount_cents / 100.0 AS montant_eur, status AS statut, cgv_version, datetime(created_at/1000,'unixepoch') AS date, datetime(waiver_accepted_at/1000,'unixepoch') AS renonciation_retractation FROM orders WHERE user_id = ?",
    ),
    acces: q("SELECT formation_slug AS formation, datetime(granted_at/1000,'unixepoch') AS depuis FROM entitlements WHERE user_id = ?"),
    progression: q("SELECT formation_slug AS formation, chapter_slug AS chapitre, datetime(read_at/1000,'unixepoch') AS lu_le FROM progress WHERE user_id = ?"),
    sessions_actives: q("SELECT datetime(created_at/1000,'unixepoch') AS ouverte_le, datetime(expires_at/1000,'unixepoch') AS expire_le FROM sessions WHERE user_id = ?"),
  };
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="mes-donnees-${SITE.nom.toLowerCase()}.json"`,
      "Cache-Control": "private, no-store",
    },
  });
}
