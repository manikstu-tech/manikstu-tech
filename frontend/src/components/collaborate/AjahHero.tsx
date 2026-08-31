import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Users, Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export default function AjahHero() {
  const t = useTranslations("Ajah");

  return (
    <PageHero>
      {/* Left — copy */}
      <div>
        <Link
          href="/collaborate"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-manikstu-green transition-colors hover:text-manikstu-leaf mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToCollaborate")}
        </Link>

        {/* Ornamental pill badge */}
        <div className="flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
          <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
            {t("pill")}
          </p>
          <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
        </div>

        <h1 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-charcoal">
          Women-Led{" "}
          <br className="hidden sm:inline" />
          <span className="text-manikstu-green">
            Integrated Livestock
          </span>
        </h1>

        <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-grey">
          {t("heroDesc")}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/get-in-touch"
            className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-manikstu-leaf hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
          >
            {t("partnerAjah")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Micro-statement */}
        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
            <Users className="h-4 w-4 text-manikstu-green" />
          </span>
          <p className="text-xs sm:text-sm font-medium text-grey">
            {t("microStatement")}
          </p>
        </div>
      </div>

      {/* Right — visual panel */}
      <div className="relative">
        <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-[#FAF4EB] p-6 shadow-md transition-all duration-300 hover:shadow-xl">
          {/* Top tribal floral border */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 h-4 bg-repeat-x opacity-60 -scale-y-100"
            style={{
              backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
              backgroundSize: "auto 100%",
            }}
          />

          {/* Background tribal watermark illustration */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-no-repeat bg-contain bg-bottom opacity-35 transition-opacity duration-300 group-hover:opacity-50"
            style={{
              backgroundImage: "url('/patterns/training-women-youth.png')",
            }}
          />

          {/* Central content overlay */}
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="hidden sm:flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-manikstu-green shadow-xs ring-1 ring-manikstu-green/20 backdrop-blur-xs">
                <Sparkles className="h-3.5 w-3.5 text-manikstu-gold" />
                Empowerment Model
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-manikstu-gold/15 px-3 py-1 text-xs font-semibold text-charcoal">
                Odisha Heartland
              </span>
            </div>

            <div className="my-auto text-center px-4">
              <div className="relative mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-manikstu-green/20">
                <HeartHandshake className="h-8 w-8 text-manikstu-green" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-[-5px] rounded-full border-2 border-dashed border-saura-red/50"
                />
              </div>
              <h3 className="font-heading text-xl font-bold text-charcoal">
                Project <span className="text-[#9F5233]">AJAH</span>
              </h3>
              <p className="mt-1 text-xs text-grey">
                Holistic goat & poultry livelihood ecosystem
              </p>
            </div>

            {/* Bottom badge */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 shadow-sm ring-1 ring-black/5 backdrop-blur-xs">
                <Users className="h-4 w-4 text-manikstu-green" />
                <span className="text-xs font-semibold text-charcoal">
                  {t("cornerAccent")}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-manikstu-green bg-manikstu-green/10 rounded-full px-2.5 py-1">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% Verified
              </div>
            </div>
          </div>

          {/* Bottom tribal floral border */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-4 bg-repeat-x opacity-60"
            style={{
              backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
              backgroundSize: "auto 100%",
            }}
          />
        </div>

        {/* Floating circular icon badge */}
        <div className="absolute -bottom-3 -right-3 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-manikstu-green text-white shadow-lg ring-4 ring-white">
          <Users className="h-6 w-6" />
        </div>
      </div>
    </PageHero>
  );
}