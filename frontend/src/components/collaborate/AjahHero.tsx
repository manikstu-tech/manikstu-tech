import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Users } from "lucide-react";

export default function AjahHero() {
  const t = useTranslations("Ajah");

  return (
    <section className="relative overflow-hidden bg-white">
<div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — copy */}
          <div>
            <Link
              href="/collaborate"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-grey transition-colors hover:text-manikstu-green"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToCollaborate")}
            </Link>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-manikstu-green">
              {t("pill")}
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
              {t("heroTitle").split("Entrepreneurship")[0]}
              <span className="text-manikstu-green">
                {t("heroTitle").split("Entrepreneurship")[1]?.trim()}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-grey">
              {t("heroDesc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/get-in-touch"
                className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                {t("partnerAjah")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Micro-statement */}
            <div className="mt-8 flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-manikstu-green/10">
                <Users className="h-3.5 w-3.5 text-manikstu-green" />
              </span>
              <p className="text-sm text-grey">
                {t("microStatement")}
              </p>
            </div>
          </div>

          {/* Right — visual panel */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-manikstu-cream">
              {/* Community / livelihood line-art illustration */}
              <svg
                aria-hidden="true"
                viewBox="0 0 480 360"
                className="pointer-events-none absolute inset-0 h-full w-full"
                fill="none"
                stroke="#4A8C3F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M40 300 H440" opacity="0.35" />
                <path d="M240 300 V210" />
                <path d="M240 240 C220 235 205 220 205 200 C225 205 240 220 240 240 Z" fill="#4A8C3F" fillOpacity="0.12" />
                <path d="M240 240 C260 235 275 220 275 200 C255 205 240 220 240 240 Z" />
                <circle cx="240" cy="192" r="10" fill="#C4952A" fillOpacity="0.5" stroke="none" />
                <circle cx="140" cy="200" r="22" />
                <path d="M140 222 V300" />
                <path d="M140 245 L110 270" />
                <path d="M140 245 L170 265" />
                <circle cx="340" cy="200" r="22" />
                <path d="M340 222 V300" />
                <path d="M340 245 L310 265" />
                <path d="M340 245 L370 270" />
                <path d="M162 180 C200 140 280 140 318 180" opacity="0.5" strokeDasharray="4 6" />
                <path d="M90 120 C100 105 120 100 130 110 C120 125 100 130 90 120 Z" fill="#4A8C3F" fillOpacity="0.15" />
                <path d="M370 100 C380 85 400 80 410 90 C400 105 380 110 370 100 Z" fill="#C4952A" fillOpacity="0.2" />
              </svg>

              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
                <Users className="h-4 w-4 text-manikstu-green" />
                <span className="text-xs font-semibold text-charcoal">
                  {t("cornerAccent")}
                </span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-2 hidden h-14 w-14 items-center justify-center rounded-full bg-manikstu-green shadow-md md:flex">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}