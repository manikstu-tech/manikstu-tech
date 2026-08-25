import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import ServiceAccordion, {
  type AccordionItem,
} from "@/components/services/ServiceAccordion";
import InsurancePanel from "@/components/services/InsurancePanel";
import type { ReactNode } from "react";
import {
  HeartPulse,
  LayoutDashboard,
  Sprout,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

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

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Text side */}
      <div className={`relative h-full ${flipped ? "lg:order-2" : ""}`}>
        <div className="relative flex h-full flex-col rounded-2xl bg-gray-100 p-8 shadow-md ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl md:p-10">
          {item.subtitle && (
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-manikstu-green">
              {item.subtitle}
            </p>
          )}
          <h3 className="font-heading text-2xl font-bold text-charcoal md:text-3xl">
            {item.title}
          </h3>
          {item.highlight && (
            <p className="mt-3 font-semibold text-manikstu-green">
              {item.highlight}
            </p>
          )}
          <p className="mt-4 leading-relaxed text-grey">{item.description}</p>
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

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero background={null}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
              What We Do
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
              Goat Care <span className="text-manikstu-green">Services</span>
            </h1>
            <p className="mt-4 max-w-lg text-grey">
              Manikstu Agro is dedicated to the health and productivity of goats
              through our team of skilled Pashu Seva Adhikaris (PSAs), who
              provide essential veterinary and breeding services across all
              stages of goat health management.
            </p>
          </div>
          <div className="flex items-center justify-center rounded-2xl bg-manikstu-cream p-8">
            <HeartPulse className="h-24 w-24 text-manikstu-green/30" strokeWidth={1.5} />
          </div>
        </PageHero>

        {/* Service categories */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
                What We Offer
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal md:text-4xl">
                Our Services
              </h2>
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
