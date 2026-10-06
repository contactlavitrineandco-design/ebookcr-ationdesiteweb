import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { readLegal } from "@/lib/catalogue";
import { renderMarkdown } from "@/lib/markdown";
import { fillPlaceholders } from "@/lib/site";

// Les textes légaux sont des fichiers Markdown dans content/legal/.
// Les {{variables}} sont remplies depuis content/site.json.
const PAGES: Record<string, string> = {
  "mentions-legales": "Mentions légales",
  cgv: "Conditions générales de vente",
  confidentialite: "Politique de confidentialité",
  cookies: "Cookies et traceurs",
};

type Props = { params: Promise<{ legal: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = PAGES[(await params).legal];
  return title ? { title } : {};
}

export default async function LegalPage({ params }: Props) {
  const { legal } = await params;
  if (!PAGES[legal]) notFound();
  const { html } = renderMarkdown(fillPlaceholders(readLegal(legal)));
  return (
    <div className="wrap">
      <article className="legal">
        <span className="label">Informations légales</span>
        <h1>{PAGES[legal]}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}
