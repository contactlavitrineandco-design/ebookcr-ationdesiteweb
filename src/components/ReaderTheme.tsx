"use client";

import { useEffect, useState } from "react";

const THEMES = [
  { id: "clair", label: "Thème clair", bg: "#fbf8f2", fg: "#1e1c18" },
  { id: "sepia", label: "Thème sépia", bg: "#f1e6cf", fg: "#3a2e1d" },
  { id: "nuit", label: "Thème nuit", bg: "#16151a", fg: "#e6e1d6" },
] as const;

export function ReaderTheme() {
  const [theme, setTheme] = useState<string>("clair");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("charpente-theme");
      if (saved) setTheme(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.querySelector(".reader")?.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("charpente-theme", theme);
    } catch {}
  }, [theme]);

  return (
    <div className="theme-switch" role="group" aria-label="Thème de lecture">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          aria-label={t.label}
          aria-pressed={theme === t.id}
          onClick={() => setTheme(t.id)}
          style={{ background: t.bg, color: t.fg }}
        >
          A
        </button>
      ))}
    </div>
  );
}
