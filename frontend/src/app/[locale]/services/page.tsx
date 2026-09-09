import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import ServiceAccordion, {
  type AccordionItem,
} from "@/components/services/ServiceAccordion";
import InsurancePanel from "@/components/services/InsurancePanel";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HeartPulse,
  LayoutDashboard,
  Sprout,
  ShieldCheck,
  ArrowRight,
  Handshake,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Block = {
  title: string;
  subtitle?: string;
  highlight?: string;
  description: string;
  icon: LucideIcon;
  panel?: ReactNode;
};

function AlternatingBlock({ item, index }: { item: Block; index: number }) {
  const Icon = item.icon;
  const flipped = index % 2 === 1;
  const artOffset = `${(index * 33) % 100}% bottom`;

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
      <div className={`relative h-full ${flipped ? "lg:order-2" : ""}`}>
        <div className="group relative h-full overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-manikstu-cream/90 py-10 px-6 shadow-sm transition-all duration-300 hover:shadow-xl md:px-8 flex flex-col items-center justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-no-repeat bg-bottom opacity-45 z-0"
            style={{
              backgroundImage: "url('/patterns/village-figures.png')",
              backgroundSize: "400% auto",
              backgroundPosition: artOffset,
            }}
          />
          <div className="relative z-10 text-center">
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
              <Icon className="h-7 w-7 text-manikstu-green" />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-[-6px] rounded-full border-2 border-dashed border-saura-red/50"
              />
            </div>
            {item.subtitle && (
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-xs">
                {item.subtitle}
              </p>
            )}
            <h3 className="mt-2 font-heading text-2xl italic font-bold leading-snug text-manikstu-leaf group-hover:text-manikstu-green transition-colors md:text-3xl">
              {item.title}
            </h3>
            <div className="mt-3 flex items-center justify-center gap-1.5">
              <span aria-hidden className="h-px w-10 bg-manikstu-gold" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-10 bg-manikstu-gold" />
            </div>
            {item.highlight && (
              <p className="mt-3 text-sm font-semibold text-manikstu-green">
                {item.highlight}
              </p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-grey md:text-base">
              {item.description}
            </p>
          </div>
        </div>
      </div>
      <div className={`h-full ${flipped ? "lg:order-1" : ""}`}>
        {item.panel ? (
          item.panel
        ) : (
          <div className="flex aspect-[4/3] h-full items-center justify-center rounded-2xl border border-manikstu-gold/20 bg-manikstu-cream shadow-sm">
            <Icon className="h-24 w-24 text-manikstu-green/40" strokeWidth={1.5} />
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive goat farming services including veterinary care, insurance, goat bank programs, training, and ethical partnerships from Manikstu Agro.",
  openGraph: {
    title: "Goat Farming Services — Veterinary, Insurance, Training | Manikstu Agro",
    description:
      "Professional goat farming services: veterinary care, livestock insurance, goat bank programs, and training.",
  },
};

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services");

  const goatCareItems: AccordionItem[] = [
    {
      title: t("vaccination"),
      highlight: t("yearRoundImmunization"),
      detail: t("vaccinationDesc"),
    },
    {
      title: t("treatment"),
      detail: t("treatmentDesc"),
    },
    {
      title: t("pregnancyCare"),
      detail: t("pregnancyCareDesc"),
    },
    {
      title: t("goatKidBirth"),
      detail: t("goatKidBirthDesc"),
    },
    {
      title: t("naturalBreeding"),
      detail: t("naturalBreedingDesc"),
    },
    {
      title: t("artificialInsemination"),
      detail: t("artificialInseminationDesc"),
    },
  ];

  const farmingSolutions: AccordionItem[] = [
    {
      title: t("goatShedConstruction"),
      detail: t("goatShedDesc"),
    },
    {
      title: t("breederSelection"),
      detail: t("breederSelectionDesc"),
    },
    {
      title: t("livestockProcurement"),
      detail: t("livestockProcurementDesc"),
    },
    {
      title: t("fodderManagement"),
      detail: t("fodderManagementDesc"),
    },
    {
      title: t("feedSupplements"),
      detail: t("feedSupplementsDesc"),
    },
    {
      title: t("vetEquipment"),
      detail: t("vetEquipmentDesc"),
    },
    {
      title: t("manpowerSolutions"),
      detail: t("manpowerSolutionsDesc"),
    },
  ];

  const insuranceParagraphs = [
    t("insuranceDesc1"),
    t("insuranceDesc2"),
    t("insuranceDesc3"),
    t("insuranceDesc4"),
    t("insuranceDesc5"),
  ];

  const erpModules: AccordionItem[] = [
    {
      title: t("goatFarmApp"),
      detail: t("goatFarmAppDesc"),
    },
    {
      title: t("livelihoodApp"),
      detail: t("livelihoodAppDesc"),
    },
    {
      title: t("psaApp"),
      detail: t("psaAppDesc"),
    },
    {
      title: t("goatCareApp"),
      detail: t("goatCareAppDesc"),
    },
  ];

  const categories: Block[] = [
    {
      title: t("goatCare"),
      subtitle: t("goatCareSubtitle"),
      description: t("goatCareDesc"),
      icon: HeartPulse,
      panel: (
        <ServiceAccordion heading={t("ourGoatCare")} items={goatCareItems} />
      ),
    },
    {
      title: t("farmManagementERP"),
      subtitle: t("farmManagementSubtitle"),
      description: t("farmManagementDesc"),
      icon: LayoutDashboard,
      panel: <ServiceAccordion heading={t("ourERPModules")} items={erpModules} />,
    },
    {
      title: t("goatFarmingSolution"),
      subtitle: t("goatFarmingSubtitle"),
      description: t("goatFarmingDesc"),
      icon: Sprout,
      panel: (
        <ServiceAccordion
          heading={t("ourGoatFarmingSolutions")}
          items={farmingSolutions}
        />
      ),
    },
    {
      title: t("goatInsurance"),
      subtitle: t("goatInsuranceSubtitle"),
      description: t("goatInsuranceDesc"),
      icon: ShieldCheck,
      panel: (
        <InsurancePanel
          heading={t("reducingRisk")}
          paragraphs={insuranceParagraphs}
          showLess={t("showLess")}
          readMore={t("readMore")}
        />
      ),
    },
  ];

  return (
    <>
      <Header />
      <main id="main-content">
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
              <br />
              <span className="text-manikstu-green">
                {t("heroTitle").split(".")[1]?.trim()}.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-grey">
              {t("heroDesc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#what-we-offer"
                className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                {t("browseServices")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-manikstu-green bg-white px-6 py-3 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                {t("talkToUs")}
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-manikstu-green/10">
                <Sprout className="h-3.5 w-3.5 text-manikstu-green" />
              </span>
              <p className="text-sm text-grey">
                {t("microStatement")}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-manikstu-cream">
              <Image
                src="/services-hero.png"
                alt={t("heroAlt")}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
                <Layers className="h-4 w-4 text-manikstu-green" />
                <span className="text-xs font-semibold text-charcoal">
                  {t("cornerBadge")}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-2 hidden h-14 w-14 items-center justify-center rounded-full bg-manikstu-green shadow-md md:flex">
              <Handshake className="h-6 w-6 text-white" />
            </div>
          </div>
        </PageHero>

        <section id="what-we-offer" className="section-padding !pt-4 sm:!pt-12 md:!pt-16 bg-white scroll-mt-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                  {t("whatWeOffer")}
                </p>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
              </div>

              <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                {t("ourServices")}{" "}
                <span className="text-manikstu-green">{t("servicesTitle")}</span>
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

              <p className="mx-auto mt-6 max-w-2xl text-grey leading-relaxed">
                {t("servicesDesc")}
              </p>
            </div>
            <div className="space-y-16 md:space-y-24">
              {categories.map((item, i) => (
                <AlternatingBlock key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
