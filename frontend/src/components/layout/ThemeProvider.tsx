"use client";

import { useCallback, useEffect, useState } from "react";

export function useThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
      return next;
    });
  }, []);

  return { toggle, dark };
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
