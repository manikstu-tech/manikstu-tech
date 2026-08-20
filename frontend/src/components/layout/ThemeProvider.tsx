"use client";

import { createContext, useContext, useEffect } from "react";

const ThemeCtx = createContext({ toggle: () => {} });

export function useThemeToggle() {
  return useContext(ThemeCtx);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggle() {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return <ThemeCtx.Provider value={{ toggle }}>{children}</ThemeCtx.Provider>;
}
