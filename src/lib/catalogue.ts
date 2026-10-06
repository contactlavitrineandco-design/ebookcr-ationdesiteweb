import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

// Tout le catalogue vit dans /content : un dossier par formation, un fichier
// Markdown par chapitre. Modifier un texte ou un prix = modifier un fichier.

const CONTENT_DIR = path.join(process.cwd(), "content");
const FORMATIONS_DIR = path.join(CONTENT_DIR, "formations");

export type Chapter = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  preview: boolean;
  minutes: number;
  body: string;
};

export type Formation = {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  price: number; // en euros TTC
  level: string;
  audience: string;
  outcomes: string[];
  prerequisites: string;
  spine: string; // couleur du dos du livre
  chapters: Chapter[];
  minutes: number;
};

export type Pack = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  formations: string[];
  /** true si le pack inclut aussi les formations ajoutées plus tard */
  includesFuture: boolean;
};

export type Product =
  | { kind: "formation"; id: string; title: string; price: number; formations: string[] }
  | { kind: "pack"; id: string; title: string; price: number; formations: string[] };

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (/^".*"$/.test(value) || /^'.*'$/.test(value)) value = value.slice(1, -1);
    data[key] = value;
  }
  return { data, body: raw.slice(match[0].length) };
}

function readingMinutes(text: string): number {
  // Le code se lit plus lentement que la prose : on le compte à part.
  const code = (text.match(/```[\s\S]*?```/g) ?? []).join(" ");
  const prose = text.replace(/```[\s\S]*?```/g, " ");
  const count = (s: string) => s.split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(count(prose) / 200 + count(code) / 60));
}

function loadFormation(slug: string): Formation {
  const dir = path.join(FORMATIONS_DIR, slug);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, "formation.json"), "utf8"));
  const files = fs
    .readdirSync(dir)
    .filter((f) => /^\d+-.+\.md$/.test(f))
    .sort();

  const chapters: Chapter[] = files.map((file, i) => {
    const { data, body } = parseFrontmatter(fs.readFileSync(path.join(dir, file), "utf8"));
    return {
      slug: file.replace(/^\d+-/, "").replace(/\.md$/, ""),
      number: i + 1,
      title: data.titre || file,
      summary: data.resume || "",
      preview: data.apercu === "true",
      minutes: readingMinutes(body),
      body,
    };
  });

  return {
    slug,
    order: meta.ordre ?? 99,
    title: meta.titre,
    subtitle: meta.sousTitre,
    description: meta.description,
    price: Number(meta.prix),
    level: meta.niveau,
    audience: meta.publicCible,
    outcomes: meta.objectifs ?? [],
    prerequisites: meta.prerequis ?? "",
    spine: meta.couleur ?? "#1b1a17",
    chapters,
    minutes: chapters.reduce((sum, c) => sum + c.minutes, 0),
  };
}

export const getFormations = cache((): Formation[] => {
  return fs
    .readdirSync(FORMATIONS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(FORMATIONS_DIR, d.name, "formation.json")))
    .map((d) => loadFormation(d.name))
    .sort((a, b) => a.order - b.order);
});

export function getFormation(slug: string): Formation | undefined {
  return getFormations().find((f) => f.slug === slug);
}

export const getPacks = cache((): Pack[] => {
  const raw = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, "packs.json"), "utf8"));
  const all = getFormations().map((f) => f.slug);
  return (raw.packs as Array<Record<string, unknown>>).map((p) => ({
    id: String(p.id),
    title: String(p.titre),
    subtitle: String(p.sousTitre ?? ""),
    price: Number(p.prix),
    formations: p.formations === "*" ? all : (p.formations as string[]),
    includesFuture: p.formations === "*",
  }));
});

export function getProduct(id: string): Product | undefined {
  const formation = getFormation(id);
  if (formation) {
    return { kind: "formation", id, title: formation.title, price: formation.price, formations: [formation.slug] };
  }
  const pack = getPacks().find((p) => p.id === id);
  if (pack) return { kind: "pack", id, title: pack.title, price: pack.price, formations: pack.formations };
  return undefined;
}

export function sumOfParts(pack: Pack): number {
  return pack.formations.reduce((sum, slug) => sum + (getFormation(slug)?.price ?? 0), 0);
}

export function formatPrice(euros: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(euros) ? 0 : 2,
  }).format(euros);
}

export function readLegal(name: string): string {
  const safe = name.replace(/[^a-z-]/g, "");
  return fs.readFileSync(path.join(CONTENT_DIR, "legal", `${safe}.md`), "utf8");
}
