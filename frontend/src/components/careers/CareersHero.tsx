import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Leaf, Sprout, Users } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export default function CareersHero() {
  const t = useTranslations("Careers");

  return (
    <PageHero>
          {/* Left — copy */}
          <div>
            <div className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                {t("pill")}
              </p>
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            </div>

            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
              {t("heroTitle").split("Rural")[0]}
              <br />
              <span className="text-manikstu-green">
                {t("heroTitle").split("Rural")[1]?.trim()}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-grey">
              {t("heroDesc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#open-positions"
                className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                {t("viewPositions")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#why-join-us"
                className="inline-flex items-center gap-2 rounded-full border-2 border-manikstu-green bg-white px-6 py-3 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                {t("lifeAt")}
              </Link>
            </div>

            {/* Micro-statement */}
            <div className="mt-8 flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                <Leaf className="h-4 w-4 shrink-0 text-manikstu-green" />
              </span>
              <p className="text-sm text-grey">
                {t("microStatement")}
              </p>
            </div>
          </div>

          {/* Right — visual panel */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-manikstu-cream shadow-lg ring-1 ring-black/5">
              {/* Team / awards group photo */}
              <Image
                src="/careers-hero.webp"
                alt={t("heroTitle")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Corner accent */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 shadow-sm">
                <Sprout className="h-4 w-4 text-manikstu-green" />
                <span className="text-xs font-semibold text-charcoal">
                  {t("cornerAccent")}
                </span>
              </div>
            </div>

            {/* Small floating badge */}
            <div className="absolute -bottom-4 -right-2 hidden h-14 w-14 items-center justify-center rounded-full bg-manikstu-green shadow-md md:flex">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
    </PageHero>
  );
}