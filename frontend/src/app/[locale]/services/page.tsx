import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import ServiceAccordion, {
  type AccordionItem,
} from "@/components/services/ServiceAccordion";
import InsurancePanel from "@/components/services/InsurancePanel";
import type { ReactNode } from "react";
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
import { getTranslations } from "next-intl/server";

type Block = {
  title: string;
  subtitle?: string;
  highlight?: string;
  description: string;
  icon: LucideIcon;
  /** Optional custom panel rendered instead of the icon panel. */
  panel?: ReactNode;
};

// Accordion items for the "Goat Care Services" block
const goatCareItems: AccordionItem[] = [
  {
    title: "Vaccination",
    highlight: "Year-Round Immunization",
    detail:
      "Goats require four critical vaccines each year to protect against viral and genetic diseases. Our PSAs provide comprehensive vaccination services within their assigned areas to keep goats healthy. Farmers outside our service area can still access our support through vaccine delivery and guided video-call instructions for safe administration.",
  },
  {
    title: "Treatment",
    detail:
      "Timely diagnosis and treatment of common and complex goat ailments by our trained Pashu Seva Adhikaris, with on-call and on-field support to minimise losses and keep herds productive.",
  },
  {
    title: "Pregnancy Care",
    detail:
      "End-to-end care for pregnant does — nutrition guidance, health monitoring and safe-delivery preparation to protect both mother and kids through every stage of gestation.",
  },
  {
    title: "Goat Kid Birth",
    detail:
      "Expert assistance during kidding, from safe delivery to newborn care, ensuring healthy kids and reduced mortality in the critical first days of life.",
  },
  {
    title: "Natural Breeding",
    detail:
      "Selective natural breeding programmes using quality bucks to improve herd genetics, growth rates and overall productivity for farmers.",
  },
  {
    title: "Artificial Insemination (AI)",
    detail:
      "Access to superior genetics through AI services, enabling farmers to raise healthier, higher-yielding goats without the cost of maintaining breeding bucks.",
  },
];

// Accordion items for the "Goat Farming Solution" block
const farmingSolutions: AccordionItem[] = [
  {
    title: "Goat Shed Construction",
    detail:
      "Guidance and support to build well-ventilated, hygienic and cost-effective goat sheds designed for healthy, productive herds.",
  },
  {
    title: "Breeder Selection",
    detail:
      "Expert help choosing the right breeds and quality breeding stock suited to your climate, goals and market.",
  },
  {
    title: "Livestock Procurement",
    detail:
      "Sourcing of healthy, verified goats through our trusted network, so farmers start with strong, disease-free animals.",
  },
  {
    title: "Fodder Management",
    detail:
      "Planning and support for year-round green and dry fodder — from cultivation to storage — for balanced, low-cost nutrition.",
  },
  {
    title: "Feed and Supplements",
    detail:
      "Quality feed, minerals and supplements to boost growth, immunity and productivity across every life stage.",
  },
  {
    title: "Supply of Veterinary Equipment",
    detail:
      "Access to essential veterinary tools and equipment for safe, timely on-farm care.",
  },
  {
    title: "Manpower Solutions",
    detail:
      "Trained manpower and workforce support to help farms run smoothly and scale with confidence.",
  },
];

// Prose content for the "Goat Insurance" block panel
const insuranceParagraphs = [
  "Goat farming can be an extremely lucrative venture, yet many farmers remain hesitant to engage in it due to the inherent risks associated with the industry. One of the primary concerns is that goats are particularly susceptible to communicable diseases, which can significantly impact their health and the overall viability of a farm. Although proper vaccination protocols and a well-balanced diet can reduce mortality rates by as much as 60%, the average mortality still hovers around 8% to 12%. This means that even with preventative measures in place, farmers face a considerable risk of losing a significant portion of their livestock.",
  "Moreover, in the event of a disease outbreak, it can be incredibly challenging to detect infected goats and effectively isolate them from the rest of the herd. This difficulty complicates the management of livestock and can lead to further losses if the disease spreads.",
  "To address these pressing challenges, Manikstu has established collaborations with various insurance companies to provide Livestock Insurance specifically for farmers' goats. This insurance product is designed to help mitigate the financial risks associated with livestock mortality, allowing farmers to recover from potential losses more effectively. By offering this support, Manikstu aims to enhance the stability and sustainability of goat farming as a viable business option.",
  "Functioning as a vital link between farmers and insurance providers, Manikstu offers comprehensive support throughout the entire process. This includes services such as tagging the goats, facilitating the insurance coverage, and streamlining the claims settlement process. By managing these aspects, Manikstu helps to alleviate some of the burdens that farmers face when dealing with livestock insurance.",
  "Farmers interested in this service can benefit from competitive premium rates offered by Manikstu, making it more accessible for them to protect their investments. Additionally, the company provides convenient features such as doorstep tagging and high-priority claim settlements, ensuring that farmers receive timely support when they need it most. Ultimately, Manikstu's initiatives aim to foster a more resilient and profitable goat farming industry, encouraging more farmers to take advantage of this opportunity without the looming fear of substantial losses.",
];

// Accordion items (ERP modules) for the "Farm Management ERP" block
const erpModules: AccordionItem[] = [
  {
    title: "Goat Farm Management Application",
    detail:
      "A complete digital toolkit for farmers to manage herds, track health, breeding and feed, and plan day-to-day farm operations from a single dashboard.",
  },
  {
    title: "Livelihood Program Management Application",
    detail:
      "Purpose-built for development organisations to plan, monitor and report on livestock-based livelihood programmes at scale.",
  },
  {
    title: "PSA Application",
    detail:
      "Equips Pashu Seva Adhikaris to schedule visits, record treatments and vaccinations, and coordinate field service across their assigned areas.",
  },
  {
    title: "Goat Care Application",
    detail:
      "Puts expert goat-care guidance, reminders and remote support in farmers' hands — vaccination schedules, symptom help and video consultations.",
  },
];

// Top-level service categories (data from the "Goat Care Services" page)
const categories: Block[] = [
  {
    title: "Goat Care Services",
    subtitle: "Veterinary & breeding support",
    description:
      "Manikstu Agro is dedicated to the health and productivity of goats through our team of skilled Pashu Seva Adhikaris (PSAs), who provide essential veterinary and breeding services. We are committed to supporting farmers with reliable, expert care across all stages of goat health management.",
    icon: HeartPulse,
    panel: (
      <ServiceAccordion heading="Our Goat Care Services" items={goatCareItems} />
    ),
  },
  {
    title: "Farm Management ERP",
    subtitle: "Technology for scale",
    description:
      "Technology is essential for scaling operations and streamlining daily tasks in goat farming. Recognizing this need, Manikstu has developed a comprehensive suite of ERP (Enterprise Resource Planning) modules tailored specifically for the diverse stakeholders in the goat farming ecosystem. These modules aim to enhance efficiency, improve management practices, and ultimately boost profitability for farmers and organizations alike. Here's a closer look at the various ERP modules offered by Manikstu:",
    icon: LayoutDashboard,
    panel: <ServiceAccordion heading="Our ERP Modules" items={erpModules} />,
  },
  {
    title: "Goat Farming Solution",
    subtitle: "Scientific & sustainable",
    description:
      "Goat farming can be a highly profitable and sustainable business when farmers follow proper scientific methods and proven solutions. Manikstu is committed to supporting farmers by offering a range of comprehensive goat farming solutions tailored to their needs:",
    icon: Sprout,
    panel: (
      <ServiceAccordion
        heading="Our Goat Farming Solutions"
        items={farmingSolutions}
      />
    ),
  },
  {
    title: "Goat Insurance",
    subtitle: "Protecting your investment",
    description:
      "Goat farming can be an extremely lucrative venture, yet many farmers remain hesitant to engage in it due to the inherent risks associated with the industry. Our insurance support helps farmers safeguard their livestock and invest with confidence.",
    icon: ShieldCheck,
    panel: (
      <InsurancePanel
        heading="Reducing Risk, Boosting Productivity"
        paragraphs={insuranceParagraphs}
      />
    ),
  },
];

function AlternatingBlock({ item, index }: { item: Block; index: number }) {
  const Icon = item.icon;
  const flipped = index % 2 === 1;
  // Stagger the village-figures art position so each card looks different
  const artOffset = `${(index * 33) % 100}% bottom`;

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Text side — mission-card design language */}
      <div className={`relative h-full ${flipped ? "lg:order-2" : ""}`}>
        <div className="group relative h-full overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-manikstu-cream/90 pt-8 pb-28 px-6 shadow-sm transition-all duration-300 hover:shadow-xl md:px-8 dark:bg-gray-800/90 flex flex-col">
          {/* Inner dashed border */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
          />

          {/* Bottom Warli village art */}
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
            {/* Icon with dashed decorative ring */}
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

            <h3 className="mt-2 font-heading text-2xl italic font-bold leading-snug text-manikstu-leaf group-hover:text-manikstu-green transition-colors dark:text-white md:text-3xl">
              {item.title}
            </h3>

            {/* Line-diamond-line ornament */}
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

            <p className="mt-4 text-sm leading-relaxed text-grey dark:text-gray-300 md:text-base">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Custom panel or icon / illustration panel */}
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

export default async function ServicesPage() {
  const t = await getTranslations("Services");
  return (
    <>
      <Header />
      <main id="main-content">
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
                Browse Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-manikstu-green bg-white px-6 py-3 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                Talk to Us
              </Link>
            </div>

            {/* Micro-statement */}
            <div className="mt-8 flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-manikstu-green/10">
                <Sprout className="h-3.5 w-3.5 text-manikstu-green" />
              </span>
              <p className="text-sm text-grey">
                Practical support at every stage of the farmer&apos;s journey
              </p>
            </div>
          </div>

          {/* Right — visual panel */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-manikstu-cream">
              {/* Services / stacked-support line-art illustration */}
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
                {/* Ground line */}
                <path d="M40 300 H440" opacity="0.35" />
                {/* Three stacked service layers */}
                <rect x="140" y="245" width="200" height="30" rx="6" fill="#4A8C3F" fillOpacity="0.10" />
                <rect x="160" y="210" width="160" height="30" rx="6" fill="#C4952A" fillOpacity="0.18" />
                <rect x="180" y="175" width="120" height="30" rx="6" fill="#4A8C3F" fillOpacity="0.14" />
                {/* Sprout on top */}
                <path d="M240 175 V145" />
                <path d="M240 165 C224 162 214 152 214 138 C230 141 240 152 240 165 Z" fill="#4A8C3F" fillOpacity="0.18" />
                <path d="M240 155 C256 152 266 142 266 128 C250 131 240 142 240 155 Z" fill="#4A8C3F" fillOpacity="0.12" />
                <circle cx="240" cy="128" r="8" fill="#C4952A" fillOpacity="0.55" stroke="none" />
                {/* Two supporting figures on either side */}
                <circle cx="90" cy="230" r="18" />
                <path d="M90 248 V300" />
                <path d="M90 265 L70 285" />
                <path d="M90 265 L110 282" />
                <circle cx="390" cy="230" r="18" />
                <path d="M390 248 V300" />
                <path d="M390 265 L370 282" />
                <path d="M390 265 L410 285" />
                {/* Connecting dashed arcs to central stack */}
                <path d="M108 225 C150 205 165 200 175 195" opacity="0.5" strokeDasharray="4 6" />
                <path d="M372 225 C330 205 315 200 305 195" opacity="0.5" strokeDasharray="4 6" />
                {/* Small leaves */}
                <path d="M60 130 C70 115 90 110 100 120 C90 135 70 140 60 130 Z" fill="#4A8C3F" fillOpacity="0.15" />
                <path d="M395 105 C405 90 425 85 435 95 C425 110 405 115 395 105 Z" fill="#C4952A" fillOpacity="0.2" />
              </svg>

              {/* Corner accent */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
                <Layers className="h-4 w-4 text-manikstu-green" />
                <span className="text-xs font-semibold text-charcoal">
                  Integrated service stack
                </span>
              </div>
            </div>

            {/* Small floating badge */}
            <div className="absolute -bottom-4 -right-2 hidden h-14 w-14 items-center justify-center rounded-full bg-manikstu-green shadow-md md:flex">
              <Handshake className="h-6 w-6 text-white" />
            </div>
          </div>
        </PageHero>

        {/* Service categories */}
        <section id="what-we-offer" className="section-padding bg-white scroll-mt-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              {/* Ornamental pill heading */}
              <div className="flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                  What We Offer
                </p>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
              </div>

              <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl dark:text-white">
                Our{" "}
                <span className="text-manikstu-green">Services</span>
              </h2>

              {/* Ornamental Divider with Framed Diamond */}
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

              <p className="mx-auto mt-6 max-w-2xl text-grey leading-relaxed dark:text-gray-300">
                Integrated support for every stage of the goat-farming journey —
                veterinary care, farm management, insurance and technology under
                one roof.
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
