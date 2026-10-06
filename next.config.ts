import type { NextConfig } from "next";

// En-têtes de sécurité appliqués à toutes les réponses.
// La Content-Security-Policy (avec nonce) est posée dans src/proxy.ts.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Les e-books sont lus depuis le disque au moment de la requête : on les embarque dans le build.
  outputFileTracingIncludes: { "/**": ["./content/**/*"] },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/(espace|admin|commande)/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
