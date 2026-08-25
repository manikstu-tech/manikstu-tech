import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import {
  GraduationCap,
  Handshake,
  Users,
  ArrowRight,
  Sprout,
  Layers,
} from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Training & Awareness",
    description:
      "Comprehensive training programs for farmers on goat farming best practices, healthcare, and modern techniques.",
    href: "/training",
  },
  {
    icon: Handshake,
    title: "Collaborate With Us",
    description:
      "Partner with Manikstu to create sustainable rural livelihoods through livestock-based interventions.",
    href: "/collaborate",
  },
  {
    icon: Users,
    title: "Project AJAH",
    description:
      "An integrated livestock program empowering women farmers across rural Odisha with goats, training, and market access.",
    href: "/collaborate/ajah",
  },
];

export default function ServicesPage() {
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
                What We Do
              </p>
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            </div>

            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
              End-to-End
              <br />
              <span className="text-manikstu-green">
                Livelihood Services.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-grey">
              From farmer training and veterinary support to strategic
              partnerships, we deliver integrated services that make goat
              farming a viable and scalable livelihood.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#services-grid"
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-manikstu-gold/20 bg-manikstu-cream shadow-sm">
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

        <section id="services-grid" className="section-padding bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="group rounded-2xl border-2 border-saura-red/30 bg-white p-6 transition-shadow hover:shadow-lg"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-manikstu-green/10">
                      <Icon className="h-6 w-6 text-manikstu-green" />
                    </div>
                    <h2 className="mt-4 font-heading text-xl font-bold text-charcoal group-hover:text-manikstu-green transition-colors">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm text-grey leading-relaxed">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-manikstu-green">
                      Learn More <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
