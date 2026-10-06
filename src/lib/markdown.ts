import "server-only";
import { Marked } from "marked";

// Rendu Markdown → HTML. Les textes viennent de /content (écrits par l'équipe),
// mais on neutralise tout de même le HTML brut par défense en profondeur.
const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export type Heading = { id: string; text: string };

export function renderMarkdown(source: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const marked = new Marked({
    gfm: true,
    renderer: {
      html({ text }) {
        return escape(text);
      },
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = slugify(text);
        if (depth === 2) headings.push({ id, text: text.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${text}</h${depth}>`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const safe = /^(https?:|mailto:|\/|#)/i.test(href) ? href : "#";
        const external = /^https?:/i.test(safe);
        return `<a href="${escape(safe)}"${title ? ` title="${escape(title)}"` : ""}${
          external ? ' target="_blank" rel="noopener noreferrer"' : ""
        }>${text}</a>`;
      },
      blockquote({ tokens }) {
        const inner = this.parser.parse(tokens);
        // > **À retenir** … devient un encadré
        const m = /^<p><strong>(À retenir|Attention|Exercice|Astuce|Le piège)<\/strong>/.exec(inner);
        if (m) {
          const kind = slugify(m[1]);
          return `<aside class="callout callout-${kind}">${inner}</aside>`;
        }
        return `<blockquote>${inner}</blockquote>`;
      },
    },
  });
  const html = marked.parse(source, { async: false }) as string;
  return { html, headings };
}
