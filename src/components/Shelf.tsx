import Link from "next/link";
import type { Formation } from "@/lib/catalogue";

const HEIGHTS = [86, 100, 92, 80, 96, 88, 94];

export function Shelf({ formations }: { formations: Formation[] }) {
  return (
    <div className="shelf" aria-label="Les formations, comme des livres sur une étagère">
      {formations.map((f, i) => (
        <Link
          key={f.slug}
          href={`/formations/${f.slug}`}
          className={`spine${i === formations.length - 1 ? " leaning" : ""}`}
          style={{ background: f.spine, height: `${HEIGHTS[i % HEIGHTS.length]}%` }}
          title={f.title}
        >
          <span className="spine-band" style={{ top: 34 }} />
          <span className="spine-title">{f.title}</span>
          <span className="spine-num">{String(i + 1).padStart(2, "0")}</span>
        </Link>
      ))}
      <span className="shelf-note">six livres, un seul paiement par livre. et c&rsquo;est tout.</span>
    </div>
  );
}

export function Cover({ formation, index }: { formation: Formation; index: number }) {
  return (
    <div className="cover" style={{ background: formation.spine }}>
      <span className="cover-foot">
        <span>Charpente</span>
        <span>N° {String(index).padStart(2, "0")}</span>
      </span>
      <span className="cover-title">{formation.title}</span>
      <span className="cover-foot">
        <span>{formation.chapters.length} chapitres</span>
        <span>~{Math.round(formation.minutes / 60) || 1} h de lecture</span>
      </span>
    </div>
  );
}
