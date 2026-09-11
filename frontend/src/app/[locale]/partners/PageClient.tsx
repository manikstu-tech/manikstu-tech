"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { getPartners } from "@/lib/api";
import type { Partner } from "@/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

const CATEGORIES = [
  { key: "all", label: "All Partners" },
  { key: "operational", label: "Operational" },
  { key: "incubation", label: "Incubation" },
  { key: "supporting", label: "Supporting" },
  { key: "csr", label: "CSR" },
  { key: "investing", label: "Investing" },
  { key: "banking", label: "Banking" },
];

const CATEGORY_COLORS: Record<string, string> = {
  operational: "bg-manikstu-green/10 text-manikstu-green",
  incubation: "bg-blue-50 text-blue-700",
  supporting: "bg-amber-50 text-amber-700",
  csr: "bg-purple-50 text-purple-700",
  investing: "bg-emerald-50 text-emerald-700",
  banking: "bg-rose-50 text-rose-700",
};

export default function PartnersPage() {
  const t = useTranslations("Partners");
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    getPartners()
      .then((res) => {
        if (Array.isArray(res.data)) setPartners(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "all"
    ? partners
    : partners.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main id="main-content" className="bg-white">
        <PageHero
          background={
            <Image
              src="/patterns/mandala-top-right-corner.png"
              alt=""
              aria-hidden
              width={504}
              height={560}
              className="pointer-events-none select-none absolute right-0 top-0 h-auto w-64 sm:w-80 md:w-96 lg:w-[28rem] opacity-[0.10] sm:opacity-[0.14]"
            />
          }
        >
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                {t("pill")}
              </p>
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-grey">
              {t("description")}
            </p>
          </div>
          <div className="relative lg:self-start lg:mt-2 -mt-3 sm:-mt-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-manikstu-cream shadow-lg ring-1 ring-black/5">
              <Image
                src="/patterns/village-figures.png"
                alt="Partner network"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8 opacity-30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-5xl font-bold text-manikstu-green">{partners.length}</span>
                  <span className="text-sm font-medium text-grey">{t("partnerCount")}</span>
                </div>
              </div>
            </div>
          </div>
        </PageHero>

        {/* Category Filter */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.key
                    ? "bg-manikstu-green text-white"
                    : "bg-manikstu-cream text-charcoal hover:bg-manikstu-green/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Partners Grid */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:px-8">
          {loading ? (
            <div className="py-20 text-center text-grey">{t("loading")}</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-grey">{t("noPartners")}</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((partner) => (
                <div
                  key={partner.id}
                  className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/30 bg-white p-6 transition-all hover:border-manikstu-green/50 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    {partner.logo && (
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-manikstu-cream">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-lg font-bold text-charcoal">
                        {partner.name}
                      </h3>
                      {partner.category && (
                        <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[partner.category] || "bg-grey/10 text-grey"}`}>
                          {partner.category.charAt(0).toUpperCase() + partner.category.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                  {partner.description && (
                    <p className="mt-4 text-sm leading-relaxed text-grey">
                      {partner.description}
                    </p>
                  )}
                  {partner.website_url && (
                    <a
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-manikstu-green hover:underline"
                    >
                      {t("visitWebsite")}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-manikstu-cream px-4 pt-10 pb-24 text-center sm:px-6 sm:pt-12 sm:pb-28 md:px-8">
          {/* Top tribal floral border */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 h-4 sm:h-6 bg-repeat-x -scale-y-100 opacity-60"
            style={{
              backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
              backgroundSize: "auto 100%",
            }}
          />

          {/* Top-left mandala corner */}
          <Image
            src="/patterns/mandala-corner-top.png"
            alt=""
            aria-hidden
            width={1370}
            height={1155}
            className="pointer-events-none select-none absolute left-0 top-0 h-auto w-36 sm:w-48 md:w-60 lg:w-72 opacity-[0.14] sm:opacity-[0.18]"
          />
          {/* Top-right mandala corner (mirrored) */}
          <Image
            src="/patterns/mandala-corner-top.png"
            alt=""
            aria-hidden
            width={1370}
            height={1155}
            className="pointer-events-none select-none absolute right-0 top-0 h-auto w-36 sm:w-48 md:w-60 lg:w-72 opacity-[0.14] sm:opacity-[0.18] -scale-x-100"
          />

          {/* Bottom village panoramic scene */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-5 sm:-bottom-5 md:-bottom-6 lg:-bottom-7 z-0 flex sm:justify-between overflow-hidden select-none opacity-40 sm:opacity-50"
          >
            {/* Left figures (desktop/tablet only) */}
            <Image
              src="/patterns/village-figures.png"
              alt=""
              width={1920}
              height={300}
              className="hidden sm:block h-22 sm:h-26 md:h-30 lg:h-36 xl:h-40 w-auto max-w-none -scale-x-100 object-contain object-left"
            />
            {/* Mobile full-width banner */}
            <Image
              src="/patterns/village-figures.png"
              alt=""
              width={1920}
              height={300}
              className="sm:hidden w-full h-16 object-cover object-bottom"
            />
            {/* Right figures (desktop/tablet only) */}
            <Image
              src="/patterns/village-figures.png"
              alt=""
              width={1920}
              height={300}
              className="hidden sm:block h-22 sm:h-26 md:h-30 lg:h-36 xl:h-40 w-auto max-w-none object-contain object-right"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <h2 className="font-heading text-3xl font-bold text-charcoal">{t("ctaTitle")}</h2>
            <p className="mt-3 text-grey">{t("ctaDesc")}</p>
            <Link
              href="/collaborate"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white hover:bg-manikstu-leaf transition-colors"
            >
              {t("becomePartner")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
