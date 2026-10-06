import type { MetadataRoute } from "next";
import { appUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/espace", "/admin", "/commande", "/api", "/reinitialiser"] }],
    sitemap: `${appUrl()}/sitemap.xml`,
  };
}
