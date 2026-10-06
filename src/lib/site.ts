import site from "../../content/site.json";

export const SITE = site;

export function appUrl(): string {
  return (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
}

/** Remplace les {{chemin.vers.valeur}} des textes légaux par les valeurs de content/site.json. */
export function fillPlaceholders(text: string): string {
  return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key: string) => {
    const value = key.split(".").reduce<unknown>((obj, k) => (obj as Record<string, unknown>)?.[k], site);
    return value === undefined ? `{{${key}}}` : String(value);
  });
}
