import type { MetadataRoute } from "next";
import { getFormations } from "@/lib/catalogue";
import { appUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = appUrl();
  const formations = getFormations();
  return [
    { url: base, priority: 1 },
    { url: `${base}/formations`, priority: 0.9 },
    ...formations.map((f) => ({ url: `${base}/formations/${f.slug}`, priority: 0.8 })),
    ...formations.flatMap((f) =>
      f.chapters.filter((c) => c.preview).map((c) => ({ url: `${base}/lire/${f.slug}/${c.slug}`, priority: 0.6 })),
    ),
    ...["mentions-legales", "cgv", "confidentialite", "cookies"].map((p) => ({ url: `${base}/${p}`, priority: 0.2 })),
  ];
}
