import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  HeartHandshake,
  Building2,
  Banknote,
  Target,
  LineChart,
  Award,
  BadgeCheck,
  Users,
  MapPin,
  ShieldCheck,
  Sprout,
  Handshake,
  Mail,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Investors & Funders",
  description:
    "Partner with Manikstu Agro to fund a proven, scalable goat-farming model that creates rural livelihoods and measurable social impact across India. Impact equity, grants, CSR and debt partnerships.",
  alternates: { canonical: "https://manikstu.com/investors" },
  openGraph: {
    title: "Invest in Rural Prosperity | Manikstu Agro",
    description:
      "Fund a proven, scalable goat-farming model delivering social returns and sustainable growth. Impact equity, grants, CSR and debt partnerships.",
  },
};

/** Ornamental pill + heading + framed-diamond divider used across sections. */
function SectionHead({
  pill,
  heading,
  accent,
  desc,
  tone = "dark",
}: {
  pill: string;
  heading: string;
  accent: string;
  desc?: string;
  tone?: "dark" | "light";
}) {
  const pillColor = tone === "light" ? "text-manikstu-gold" : "text-manikstu-green";
  const headingColor = tone === "light" ? "text-white" : "text-charcoal";
  const accentColor = tone === "light" ? "text-manikstu-gold" : "text-manikstu-green";
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2">
        <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
        <p className={`text-xs font-bold uppercase tracking-[0.25em] sm:text-sm ${pillColor}`}>
          {pill}
        </p>
        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
        <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
      </div>

      <h2 className={`mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${headingColor}`}>
        {heading} <span className={accentColor}>{accent}</span>
      </h2>

      <div className="mt-4 flex items-center justify-center gap-2">
        <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
        <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
        <div aria-hidden className="relative flex items-center justify-center">
          <span className="h-3.5 w-3.5 rotate-45 border border-manikstu-gold bg-transparent" />
          <span className="absolute h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
        </div>
        <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
        <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
      </div>

      {desc && (
        <p className={`mx-auto mt-6 max-w-2xl leading-relaxed ${tone === "light" ? "text-white/85" : "text-grey"}`}>
          {desc}
        </p>
      )}
    </div>
  );
}

/** Training-style decorative card: red border, dashed icon ring, diamond ornament. */
function OrnateCard({
  icon: Icon,
  title,
  desc,
  italic = false,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  italic?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-manikstu-cream/30 px-5 pb-8 pt-6 shadow-sm transition-all duration-300 hover:shadow-xl sm:px-6">
      <div className="relative text-center">
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
          <Icon className="h-6 w-6 text-manikstu-green" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-[-6px] rounded-full border-2 border-dashed border-saura-red/50"
          />
        </div>

        <h3
          className={`mt-6 font-heading text-lg font-bold leading-snug ${
            italic ? "italic text-manikstu-leaf" : "text-charcoal"
          }`}
        >
          {title}
        </h3>

        <div className="mt-3 flex items-center justify-center gap-1.5">
          <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
          <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-grey">{desc}</p>
      </div>
    </div>
  );
}

export default async function InvestorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Investors");

  const ways: { title: string; desc: string; icon: LucideIcon }[] = [
    { title: t("way1Title"), desc: t("way1Desc"), icon: TrendingUp },
    { title: t("way2Title"), desc: t("way2Desc"), icon: HeartHandshake },
    { title: t("way3Title"), desc: t("way3Desc"), icon: Building2 },
    { title: t("way4Title"), desc: t("way4Desc"), icon: Banknote },
  ];

  const whys: { title: string; desc: string; icon: LucideIcon }[] = [
    { title: t("why1Title"), desc: t("why1Desc"), icon: Target },
    { title: t("why2Title"), desc: t("why2Desc"), icon: LineChart },
    { title: t("why3Title"), desc: t("why3Desc"), icon: Award },
    { title: t("why4Title"), desc: t("why4Desc"), icon: BadgeCheck },
  ];

  const stats: { value: string; label: string; icon: LucideIcon }[] = [
    { value: t("stat1Number"), label: t("stat1Label"), icon: Users },
    { value: t("stat2Number"), label: t("stat2Label"), icon: MapPin },
    { value: t("stat3Number"), label: t("stat3Label"), icon: ShieldCheck },
    { value: t("stat4Number"), label: t("stat4Label"), icon: Sprout },
  ];

  const pillars: { line1: string; line2: string; icon: LucideIcon }[] = [
    { line1: t("ctaPillar1Line1"), line2: t("ctaPillar1Line2"), icon: Users },
    { line1: t("ctaPillar2Line1"), line2: t("ctaPillar2Line2"), icon: LineChart },
    { line1: t("ctaPillar3Line1"), line2: t("ctaPillar3Line2"), icon: Handshake },
    { line1: t("ctaPillar4Line1"), line2: t("ctaPillar4Line2"), icon: Sprout },
  ];

  const backers = [t("backer1"), t("backer2"), t("backer3"), t("backer4")];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `https://manikstu.com/${locale}` },
            { "@type": "ListItem", position: 2, name: "Investors & Funders", item: `https://manikstu.com/${locale}/investors` },
          ],
        }}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <PageHero>
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
              {t("heroTitle").split(".")[0]}.
              {t("heroTitle").split(".")[1]?.trim() && (
                <>
                  <br />
                  <span className="text-manikstu-green">
                    {t("heroTitle").split(".")[1]?.trim()}.
                  </span>
                </>
              )}
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-grey">
              {t("heroDesc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                {t("partnerCta")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#impact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-manikstu-green bg-white px-6 py-3 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                {t("impactCta")}
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                <TrendingUp className="h-4 w-4 shrink-0 text-manikstu-green" />
              </span>
              <p className="text-sm text-grey">{t("microStatement")}</p>
            </div>
          </div>

          {/* Right, ornate highlight panel */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-manikstu-cream/90 p-8 shadow-sm md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
              />
              <div className="relative text-center">
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                  <Sprout className="h-7 w-7 text-manikstu-green" />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-[-6px] rounded-full border-2 border-dashed border-saura-red/50"
                  />
                </div>
                <h2 className="mt-5 font-heading text-2xl font-bold italic leading-snug text-manikstu-leaf md:text-3xl">
                  {t("heroCardTitle")}
                </h2>
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  <span aria-hidden className="h-px w-8 bg-manikstu-gold" />
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <span aria-hidden className="h-px w-8 bg-manikstu-gold" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-grey md:text-base">
                  {t("heroCardDesc")}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/70 p-4 text-center shadow-sm">
                    <p className="font-heading text-2xl font-bold text-manikstu-green md:text-3xl">
                      {t("heroStatA")}
                    </p>
                    <p className="mt-1 text-xs font-medium text-grey">
                      {t("heroStatALabel")}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/70 p-4 text-center shadow-sm">
                    <p className="font-heading text-2xl font-bold text-manikstu-green md:text-3xl">
                      {t("heroStatB")}
                    </p>
                    <p className="mt-1 text-xs font-medium text-grey">
                      {t("heroStatBLabel")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageHero>

        {/* Ways to partner — Training "Programs" style section */}
        <section id="ways" className="relative section-padding bg-manikstu-cream overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 h-6 sm:h-8 bg-repeat-x -scale-y-100"
            style={{
              backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
              backgroundSize: "auto 100%",
            }}
          />
          <Image
            src="/patterns/mandala-corner-top.png"
            alt=""
            aria-hidden
            width={1370}
            height={1155}
            className="pointer-events-none select-none absolute left-0 top-0 h-auto w-48 sm:w-64 md:w-80 lg:w-96 opacity-[0.14] sm:opacity-[0.18]"
          />
          <Image
            src="/patterns/mandala-corner-top.png"
            alt=""
            aria-hidden
            width={1370}
            height={1155}
            className="pointer-events-none select-none absolute right-0 top-0 h-auto w-48 sm:w-64 md:w-80 lg:w-96 opacity-[0.14] sm:opacity-[0.18] -scale-x-100"
          />
          <Image
            src="/patterns/training-bottom-left.png"
            alt=""
            aria-hidden
            width={1536}
            height={1024}
            className="pointer-events-none select-none absolute left-0 bottom-0 h-auto w-28 sm:w-36 md:w-48 lg:w-64 opacity-20 sm:opacity-25"
          />
          <Image
            src="/patterns/training-bottom-right.png"
            alt=""
            aria-hidden
            width={1802}
            height={900}
            className="pointer-events-none select-none absolute right-0 bottom-0 h-auto w-28 sm:w-36 md:w-48 lg:w-64 opacity-20 sm:opacity-25"
          />
          <div className="relative mx-auto max-w-6xl">
            <SectionHead
              pill={t("waysPill")}
              heading={t("waysHeading")}
              accent={t("waysHeadingAccent")}
              desc={t("waysDesc")}
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ways.map((w) => (
                <OrnateCard key={w.title} icon={w.icon} title={w.title} desc={w.desc} italic />
              ))}
            </div>
          </div>
        </section>

        {/* Why partner — Training "Awareness" style section */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              pill={t("whyPill")}
              heading={t("whyHeading")}
              accent={t("whyHeadingAccent")}
              desc={t("whyDesc")}
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whys.map((w) => (
                <OrnateCard key={w.title} icon={w.icon} title={w.title} desc={w.desc} />
              ))}
            </div>

            {/* Backers */}
            <div className="mt-14 text-center">
              <h3 className="font-heading text-xl font-bold text-charcoal">
                {t("backersHeading")}
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-grey">{t("backersDesc")}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {backers.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-2 rounded-full border border-manikstu-gold/40 bg-manikstu-cream/70 px-4 py-2 text-sm font-semibold text-charcoal"
                  >
                    <BadgeCheck className="h-4 w-4 text-manikstu-green" />
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact — Training green-gradient glassy band */}
        <section
          id="impact"
          className="relative overflow-hidden bg-gradient-to-b from-[#23581D] via-manikstu-green to-[#1F4E1A] py-12 text-white scroll-mt-6 md:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 h-5 sm:h-6 bg-repeat-x opacity-60 brightness-0 invert -scale-y-100"
            style={{
              backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
              backgroundSize: "auto 100%",
            }}
          />
          <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none opacity-15 brightness-0 invert">
            <Image
              src="/patterns/mandala-left.png"
              alt=""
              width={320}
              height={576}
              className="h-auto w-32 sm:w-44 md:w-52 max-h-[90%] object-contain object-left"
            />
          </div>
          <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none opacity-15 brightness-0 invert">
            <Image
              src="/patterns/mandala-right.png"
              alt=""
              width={320}
              height={576}
              className="h-auto w-32 sm:w-44 md:w-52 max-h-[90%] object-contain object-right"
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
            <SectionHead
              pill={t("impactPill")}
              heading={t("impactHeading")}
              accent={t("impactHeadingAccent")}
              tone="light"
            />
            <div className="mt-9 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group relative flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/[0.08] px-4 py-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/[0.14] hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:border-white/60 group-hover:bg-white/20">
                      <Icon className="h-5 w-5 stroke-[1.75]" />
                    </div>
                    <p className="mt-3 font-heading text-3xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-manikstu-gold md:text-4xl lg:text-5xl">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-xs sm:text-sm font-medium text-white/90">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-5 sm:h-6 bg-repeat-x opacity-60 brightness-0 invert"
            style={{
              backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
              backgroundSize: "auto 100%",
            }}
          />
        </section>

        {/* CTA — Training cream pillar band */}
        <section
          id="get-involved"
          className="relative overflow-hidden bg-[#FAF4EB] py-10 sm:py-12 md:py-14"
        >
          <Image
            src="/patterns/mandala-top-right.png"
            alt=""
            aria-hidden
            width={600}
            height={600}
            className="pointer-events-none select-none absolute -left-6 -top-6 h-auto w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-30 -scale-x-100"
          />
          <Image
            src="/patterns/mandala-top-right.png"
            alt=""
            aria-hidden
            width={600}
            height={600}
            className="pointer-events-none select-none absolute -right-6 -top-6 h-auto w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-30"
          />

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-8 sm:w-10 bg-manikstu-gold/80" />
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                  {t("ctaPill")}
                </p>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-8 sm:w-10 bg-manikstu-gold/80" />
              </div>

              <div className="mt-2 flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-10 sm:w-14 bg-manikstu-gold/70" />
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <div aria-hidden className="relative flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rotate-45 border border-manikstu-gold bg-transparent" />
                  <span className="absolute h-1 w-1 rotate-45 bg-manikstu-gold" />
                </div>
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <span aria-hidden className="h-px w-10 sm:w-14 bg-manikstu-gold/70" />
              </div>

              <h2 className="mx-auto mt-3 max-w-3xl font-heading text-2xl font-bold leading-tight text-charcoal sm:text-3xl lg:text-4xl">
                {t("ctaHeading")}
              </h2>

              <p className="mx-auto mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-grey">
                {t("ctaDesc")}
              </p>

              <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#3D7830] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#326327] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
                >
                  {t("ctaButton")} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href="mailto:info@manikstu.com"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-manikstu-green px-6 py-2.5 text-xs sm:text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
                >
                  <Mail className="h-3.5 w-3.5" /> info@manikstu.com
                </a>
              </div>
            </div>

            {/* 4 pillars with dashed-ring badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:mt-10 sm:gap-7 md:gap-3 lg:gap-7">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.line1 + pillar.line2} className="flex items-center">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#F5ECDC] shadow-inner transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20">
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-[-4px] rounded-full border-2 border-dashed border-manikstu-gold/70"
                        />
                        <Icon className="h-6 w-6 text-[#6B4423] sm:h-7 sm:w-7" strokeWidth={1.75} />
                      </div>
                      <p className="mt-2.5 font-heading text-xs sm:text-sm font-bold leading-tight text-charcoal">
                        {pillar.line1}
                        <br />
                        {pillar.line2}
                      </p>
                    </div>

                    {index < pillars.length - 1 && (
                      <div
                        aria-hidden
                        className="ml-3 hidden flex-col items-center justify-center gap-1 opacity-60 md:flex lg:ml-7"
                      >
                        <span className="h-6 w-px bg-manikstu-gold/70" />
                        <span className="h-1 w-1 rotate-45 bg-manikstu-gold" />
                        <span className="h-6 w-px bg-manikstu-gold/70" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Image
            src="/patterns/training-bottom-left.png"
            alt=""
            aria-hidden
            width={1536}
            height={1024}
            className="pointer-events-none select-none absolute left-0 bottom-1.5 sm:bottom-2 h-auto w-24 sm:w-32 md:w-44 lg:w-52 opacity-20 sm:opacity-25"
          />
          <Image
            src="/patterns/training-bottom-right.png"
            alt=""
            aria-hidden
            width={1802}
            height={900}
            className="pointer-events-none select-none absolute right-0 bottom-1.5 sm:bottom-2 h-auto w-24 sm:w-32 md:w-44 lg:w-52 opacity-20 sm:opacity-25"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-3.5 sm:h-4 bg-repeat-x opacity-60"
            style={{
              backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
              backgroundSize: "auto 100%",
            }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
