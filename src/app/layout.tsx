import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SITE, appUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl()),
  title: {
    default: `${SITE.nom} — Apprendre à créer des sites web, sans abonnement`,
    template: `%s · ${SITE.nom}`,
  },
  description:
    "Six formations en e-book pour apprendre à construire des sites web, du premier fichier HTML à la livraison d'un projet. Paiement unique, accès à vie, mises à jour incluses.",
  openGraph: { type: "website", locale: "fr_FR", siteName: SITE.nom },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#f3eee4" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Lire les en-têtes rend la page dynamique : indispensable pour le nonce CSP.
  await headers();
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body>
        <a href="#contenu" className="skip">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
