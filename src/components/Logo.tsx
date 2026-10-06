// Ferme de charpente stylisée : le logo est dessiné à la main, en SVG, pas généré.
export function TrussMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M3 25 L16 6 L29 25 Z" />
      <path d="M16 6 V25 M9.5 15.5 L16 25 L22.5 15.5" strokeWidth="1.5" />
      <path d="M1 25 H31" strokeWidth="2.5" />
    </svg>
  );
}
