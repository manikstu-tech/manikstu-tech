"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import { Menu, X, Phone, Moon, Sun } from "lucide-react";
import { useThemeToggle } from "./ThemeProvider";
import { getNavigation } from "@/lib/api";
import type { NavigationMenuItem } from "@/types";
// import LanguageSwitcher from "./LanguageSwitcher";

const fallbackLinks: NavigationMenuItem[] = [
  { id: 1, label: "Home", url: "/", parent_id: null, order: 1, is_active: true, target: "_self" },
  { id: 2, label: "About Us", url: "/about", parent_id: null, order: 2, is_active: true, target: "_self" },
  { id: 3, label: "Services", url: "/services", parent_id: null, order: 3, is_active: true, target: "_self" },
  { id: 4, label: "Products", url: "/products", parent_id: null, order: 4, is_active: true, target: "_self" },
  { id: 5, label: "Media", url: "/blog", parent_id: null, order: 5, is_active: true, target: "_self" },
  { id: 6, label: "Collaborate", url: "/collaborate", parent_id: null, order: 6, is_active: true, target: "_self" },
  { id: 7, label: "Training & Awareness", url: "/training", parent_id: null, order: 7, is_active: true, target: "_self" },
];

const FALLBACK_NAV: NavigationMenuItem[] = [
  { id: -1, label: "Home", url: "/", order: 1 } as NavigationMenuItem,
  { id: -2, label: "About Us", url: "/about", order: 2 } as NavigationMenuItem,
  { id: -3, label: "Services", url: "/services", order: 3 } as NavigationMenuItem,
  { id: -4, label: "Products", url: "/products", order: 4 } as NavigationMenuItem,
  { id: -5, label: "Media", url: "/blog", order: 5 } as NavigationMenuItem,
  { id: -6, label: "Collaborate", url: "/collaborate", order: 6 } as NavigationMenuItem,
  { id: -7, label: "Training", url: "/training", order: 7 } as NavigationMenuItem,
  { id: -8, label: "Careers", url: "/careers", order: 8 } as NavigationMenuItem,
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavigationMenuItem[]>(fallbackLinks);
  const { toggle } = useThemeToggle();
  const pathname = usePathname() ?? "/";
  const t = useTranslations("Navigation");

  useEffect(() => {
    getNavigation()
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) setNavLinks(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-charcoal shadow-sm transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Manikstu Agro"
            width={120}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.url);
            // Map known static links to translation keys, otherwise use API label
            const labelKey = link.label.toLowerCase().replace(/\s+/g, '');
            const translatedLabel = t.has(labelKey) ? t(labelKey) : link.label;

            return (
              <Link
                key={link.id}
                href={link.url}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-sm font-semibold text-manikstu-green transition-colors"
                    : "text-sm font-medium text-charcoal dark:text-white hover:text-manikstu-green transition-colors"
                }
              >
                {translatedLabel}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={toggle} className="flex items-center justify-center h-9 w-9 rounded-full text-charcoal dark:text-white hover:text-manikstu-green hover:bg-manikstu-cream/60 dark:hover:bg-white/10 transition-colors" aria-label={t("toggleDarkMode")}>
            <Moon className="h-5 w-5 dark:hidden" />
            <Sun className="h-5 w-5 hidden dark:block" />
          </button>
          {/* <LanguageSwitcher /> */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center rounded-full bg-manikstu-green px-5 py-2 text-sm font-semibold text-white hover:bg-manikstu-leaf transition-colors"
          >
            {t("contactUs")}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-charcoal"
            aria-label={open ? t("closeMenu") : t("openMenu")}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-manikstu-leaf text-white">
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.url);
              const labelKey = link.label.toLowerCase().replace(/\s+/g, '');
              const translatedLabel = t.has(labelKey) ? t(labelKey) : link.label;
              return (
                <Link
                  key={link.id}
                  href={link.url}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "py-3 text-sm font-semibold text-manikstu-gold border-b border-white/10"
                      : "py-3 text-sm font-medium border-b border-white/10 hover:text-manikstu-gold transition-colors"
                  }
                >
                  {translatedLabel}
                </Link>
              );
            })}
            <a
              href="tel:+918270331856"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-manikstu-green py-3 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" />
              {t("callUs")}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}
