// Vérifie le catalogue avant publication : `npm run check:content`
// Contrôle les fiches formation, les chapitres et les packs.
import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "content");
const dir = path.join(root, "formations");
const errors = [];
const warn = [];
const slugs = [];

for (const slug of fs.readdirSync(dir)) {
  const fdir = path.join(dir, slug);
  if (!fs.statSync(fdir).isDirectory()) continue;
  const metaPath = path.join(fdir, "formation.json");
  if (!fs.existsSync(metaPath)) { errors.push(`${slug} : formation.json manquant`); continue; }
  let meta;
  try { meta = JSON.parse(fs.readFileSync(metaPath, "utf8")); }
  catch (e) { errors.push(`${slug}/formation.json : JSON invalide (${e.message})`); continue; }
  slugs.push(slug);
  if (!/^[a-z0-9-]+$/.test(slug)) errors.push(`${slug} : le nom du dossier doit être en minuscules, chiffres et tirets`);
  for (const k of ["titre", "sousTitre", "description", "prix", "niveau"]) if (meta[k] === undefined || meta[k] === "") errors.push(`${slug} : champ « ${k} » manquant`);
  if (!(Number(meta.prix) > 0)) errors.push(`${slug} : prix invalide`);

  const chapters = fs.readdirSync(fdir).filter((f) => f.endsWith(".md"));
  if (chapters.length === 0) errors.push(`${slug} : aucun chapitre`);
  let previews = 0;
  for (const file of chapters) {
    if (!/^\d+-[a-z0-9-]+\.md$/.test(file)) errors.push(`${slug}/${file} : nom attendu « 01-mon-chapitre.md »`);
    const raw = fs.readFileSync(path.join(fdir, file), "utf8");
    const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
    if (!fm) { errors.push(`${slug}/${file} : en-tête --- manquant`); continue; }
    if (!/^titre:/m.test(fm[1])) errors.push(`${slug}/${file} : « titre » manquant`);
    if (!/^resume:/m.test(fm[1])) warn.push(`${slug}/${file} : « resume » conseillé`);
    if (/^apercu:\s*true/m.test(fm[1])) previews++;
    if (/^#\s/m.test(raw.slice(fm[0].length))) warn.push(`${slug}/${file} : évitez les titres « # » (le titre du chapitre est déjà affiché)`);
  }
  if (previews === 0) warn.push(`${slug} : aucun chapitre en aperçu gratuit`);
}

const packs = JSON.parse(fs.readFileSync(path.join(root, "packs.json"), "utf8")).packs;
for (const p of packs) {
  if (slugs.includes(p.id)) errors.push(`pack « ${p.id} » : même identifiant qu'une formation`);
  if (!(Number(p.prix) > 0)) errors.push(`pack « ${p.id} » : prix invalide`);
  if (p.formations !== "*") for (const s of p.formations) if (!slugs.includes(s)) errors.push(`pack « ${p.id} » : formation inconnue « ${s} »`);
}

for (const w of warn) console.warn("⚠ ", w);
for (const e of errors) console.error("✖ ", e);
console.log(errors.length ? `\n${errors.length} erreur(s).` : `\n✔ Catalogue valide : ${slugs.length} formations, ${packs.length} pack(s).`);
process.exit(errors.length ? 1 : 0);
