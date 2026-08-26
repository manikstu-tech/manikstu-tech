"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

const languageLabels: Record<string, { native: string; en: string }> = {
  en: { native: "English", en: "English" },
  hi: { native: "हिन्दी", en: "Hindi" },
  bn: { native: "বাংলা", en: "Bengali" },
  ta: { native: "தமிழ்", en: "Tamil" },
  te: { native: "తెలుగు", en: "Telugu" },
  mr: { native: "मराठी", en: "Marathi" },
  gu: { native: "ગુજરાતી", en: "Gujarati" },
  kn: { native: "ಕನ್ನಡ", en: "Kannada" },
  ml: { native: "മലയാളം", en: "Malayalam" },
  or: { native: "ଓଡ଼ିଆ", en: "Odia" },
  ja: { native: "日本語", en: "Japanese" },
  de: { native: "Deutsch", en: "German" },
  fr: { native: "Français", en: "French" },
  es: { native: "Español", en: "Spanish" },
};

const groupedLocales = {
  indian: ["hi", "bn", "ta", "te", "mr", "gu", "kn", "ml", "or"],
  foreign: ["ja", "de", "fr", "es"],
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname() || "/";
  const t = useTranslations("LanguageSwitcher");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSwitch(newLocale: string) {
    router.push(pathname, { locale: newLocale });
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-grey hover:text-manikstu-green transition-colors"
        aria-label={t("label")}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden md:inline">{locale.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-light-grey bg-white shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-grey">
              {t("groupEnglish")}
            </p>
            <button
              onClick={() => handleSwitch("en")}
              className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                locale === "en"
                  ? "bg-manikstu-green text-white"
                  : "text-charcoal hover:bg-manikstu-cream"
              }`}
            >
              {t("en")}
            </button>
          </div>

          <div className="border-t border-light-grey p-2">
            <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-grey">
              {t("groupIndian")}
            </p>
            {groupedLocales.indian.map((loc) => (
              <button
                key={loc}
                onClick={() => handleSwitch(loc)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  locale === loc
                    ? "bg-manikstu-green text-white"
                    : "text-charcoal hover:bg-manikstu-cream"
                }`}
              >
                {languageLabels[loc].native}
              </button>
            ))}
          </div>

          <div className="border-t border-light-grey p-2">
            <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-grey">
              {t("groupInternational")}
            </p>
            {groupedLocales.foreign.map((loc) => (
              <button
                key={loc}
                onClick={() => handleSwitch(loc)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  locale === loc
                    ? "bg-manikstu-green text-white"
                    : "text-charcoal hover:bg-manikstu-cream"
                }`}
              >
                {languageLabels[loc].native}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
