import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sprout,
  ShieldCheck,
  ArrowRight,
  Handshake,
  Layers,
  Warehouse,
  Smartphone,
  Stethoscope,
} from "lucide-react";
import GoatBodyIcon from "@/components/icons/GoatBodyIcon";
import { getTranslations, setRequestLocale } from "next-intl/server";


export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive goat farming services including veterinary care, insurance, goat bank programs, training, and ethical partnerships from Manikstu Agri Solutions.",
  alternates: { canonical: "https://manikstu.com/services" },
  openGraph: {
    title: "Goat Farming Services, Veterinary, Insurance, Training | Manikstu Agri Solutions",
    description:
      "Professional goat farming services: veterinary care, livestock insurance, goat bank programs, and training.",
  },
};

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services");


  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `https://manikstu.com` },
            { "@type": "ListItem", position: 2, name: "Services", item: `https://manikstu.com/services` },
          ],
        }}
      />
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
              {t("heroTitle").split(".")[1]?.trim() && (
                <>
                  <br />
                  <span className="text-manikstu-green">
                    {t("heroTitle").split(".")[1]?.trim()}.
                  </span>
                </>
              )}
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal">
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
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                <Sprout className="h-4 w-4 shrink-0 text-manikstu-green" />
              </span>
              <p className="text-sm text-charcoal">
                {t("microStatement")}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-manikstu-cream">
              <Image
                src="/services-hero.webp"
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

        {/* Service highlights strip, four core supports directly under the hero */}
        <section id="what-we-offer" aria-label="Service highlights" className="relative z-10 -mt-6 sm:-mt-10 lg:-mt-16 scroll-mt-24 border-b border-light-grey/60 bg-manikstu-cream/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-2 gap-x-5 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-light-grey/80">
              {[
                { icon: GoatBodyIcon, title: "Animal Health", subtitle: "Healthier goats, stronger farms" },
                { icon: Warehouse, title: "Farm Infrastructure", subtitle: "Modern & climate-smart solutions" },
                { icon: Smartphone, title: "Digital Tools", subtitle: "Data-driven farm management" },
                { icon: ShieldCheck, title: "Livestock Protection", subtitle: "Greater security for your assets" },
              ].map(({ icon: Icon, title, subtitle }) => (
                <div key={title} className="flex items-center gap-3.5 py-4 lg:px-6 lg:py-6">
                  <Icon className="h-8 w-8 shrink-0 text-manikstu-green" strokeWidth={1.5} aria-hidden />
                  <div className="min-w-0">
                    <p className="font-heading text-[15px] font-bold leading-tight text-manikstu-green">{title}</p>
                    <p className="mt-0.5 text-xs leading-snug text-charcoal/70">{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* One ecosystem — detailed service cards */}
        <section aria-labelledby="ecosystem-heading" className="bg-manikstu-cream/40 py-14 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
            <div className="mb-10 text-center sm:mb-12">
              <h2 id="ecosystem-heading" className="font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                One ecosystem. <span className="text-manikstu-green">Practical support.</span>
              </h2>
              <div className="mt-5 flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-14 bg-manikstu-gold/70 sm:w-20" />
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <div aria-hidden className="relative flex items-center justify-center">
                  <span className="h-3.5 w-3.5 rotate-45 border border-manikstu-gold bg-transparent" />
                  <span className="absolute h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                </div>
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <span aria-hidden className="h-px w-14 bg-manikstu-gold/70 sm:w-20" />
              </div>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-charcoal/80">
                Choose the support you need today — build a stronger farm for tomorrow.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {[
                {
                  num: "01",
                  title: "Goat Care Services",
                  description: "On-ground healthcare and breeding support from trained Pashu Seva Adhikaris.",
                  tags: ["Vaccination", "Treatment", "Pregnancy & kidding", "Natural breeding"],
                  icon: Stethoscope,
                  image: "/goat-care-vet.webp",
                  wide: true,
                },
                {
                  num: "02",
                  title: "Goat Farming Solutions",
                  description: "Scientific farm planning, quality livestock sourcing and daily operating essentials.",
                  tags: ["Shed construction", "Breeder selection", "Livestock procurement", "Feed & fodder"],
                  icon: Warehouse,
                  image: "/goat-farming-shed.webp",
                  wide: true,
                },
                {
                  num: "03",
                  title: "Farm Management ERP",
                  description: "Digital tools to help teams track farms, visits, livestock and service delivery.",
                  tags: ["Farm management app", "PSA app", "Goat Care app", "Program management"],
                  icon: Smartphone,
                  image: "/farm-erp-app.webp",
                  wide: true,
                },
                {
                  num: "04",
                  title: "Goat Insurance Support",
                  description: "Practical livestock risk support so farmers can protect their assets with greater confidence.",
                  tags: ["Livestock protection", "Documentation", "Risk awareness"],
                  icon: ShieldCheck,
                  image: "/goat-insurance-farmer.webp",
                  wide: true,
                },
              ].map(({ num, title, description, tags, icon: Icon, image, wide }) => (
                <article
                  key={num}
                  className={`group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-light-grey/70 bg-white shadow-sm transition-shadow hover:shadow-md sm:flex-row ${wide ? "lg:col-span-2" : ""}`}
                >
                  <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-2/5">
                    <Image
                      src={image}
                      alt={title}
                      width={640}
                      height={480}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                    <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <p className="font-heading text-sm font-bold tracking-wide text-manikstu-gold">{num}</p>
                    <h3 className="mt-1 pr-12 font-heading text-xl font-bold leading-tight text-charcoal sm:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-manikstu-green/15 bg-manikstu-sage/50 px-2.5 py-1 text-[11px] font-medium text-manikstu-green"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-manikstu-green">
                      Explore service <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}


