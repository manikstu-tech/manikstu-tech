import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Handshake, MapPin, Sprout, type LucideIcon } from "lucide-react";

export interface Pillar {
  icon: LucideIcon;
  line1: string;
  line2: string;
}

const fallbackPillars: Pillar[] = [
  {
    icon: Building2,
    line1: "Institutional",
    line2: "Trust",
  },
  {
    icon: MapPin,
    line1: "Grassroots",
    line2: "Delivery",
  },
  {
    icon: Handshake,
    line1: "Shared",
    line2: "Governance",
  },
  {
    icon: Sprout,
    line1: "Sustainable",
    line2: "Value",
  },
];

export default function CollaborateCTA({ pillars: propPillars }: { pillars?: Pillar[] }) {
  const pillars = propPillars?.length ? propPillars : fallbackPillars;
  return (
    <section
      id="get-involved"
      className="relative overflow-hidden bg-[#FAF4EB] py-10 sm:py-12 md:py-14"
    >
      {/* Top-left mandala corner artwork */}
      <Image
        src="/patterns/mandala-top-right.png"
        alt=""
        aria-hidden
        width={600}
        height={600}
        className="pointer-events-none select-none absolute -left-6 -top-6 h-auto w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-30 -scale-x-100"
      />

      {/* Right side mandala artwork */}
      <Image
        src="/patterns/mandala-right.png"
        alt=""
        aria-hidden
        width={300}
        height={500}
        className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 h-auto w-36 sm:w-48 md:w-56 lg:w-64 max-h-[80%] object-contain object-right opacity-30"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center">
          {/* Top Pill / Badge */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-8 sm:w-10 bg-manikstu-gold/80" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
              Get Involved
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-8 sm:w-10 bg-manikstu-gold/80" />
          </div>

          {/* Ornamental Divider with Framed Diamond */}
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

          {/* Heading */}
          <h2 className="mx-auto mt-3 max-w-3xl font-heading text-2xl font-bold leading-tight text-charcoal sm:text-3xl lg:text-4xl">
            <span className="text-[#376E2A]">Partner With Us</span> to Build the Future
            <br />
            of Rural Livelihoods
          </h2>

          <p className="mx-auto mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-grey">
            Tell us about your organization and the change you want to create.
            We&apos;ll shape a collaboration that delivers lasting impact.
          </p>

          {/* CTA Button */}
          <div className="mt-5 flex justify-center">
            <Link
              href="/get-in-touch"
              className="inline-flex items-center gap-2 rounded-full bg-[#3D7830] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#326327] hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
            >
              Become a Partner <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Feature Pillars Row */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-7 md:gap-3 lg:gap-7">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.line1 + pillar.line2} className="flex items-center">
                {/* Pillar Item */}
                <div className="flex flex-col items-center text-center">
                  {/* Dashed outer ring badge */}
                  <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#F5ECDC] shadow-inner transition-transform duration-300 hover:scale-105">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-[-4px] rounded-full border-2 border-dashed border-manikstu-gold/70"
                    />
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#6B4423]" strokeWidth={1.75} />
                  </div>

                  <p className="mt-2.5 font-heading text-xs sm:text-sm font-bold leading-tight text-charcoal">
                    {pillar.line1}
                    <br />
                    {pillar.line2}
                  </p>
                </div>

                {/* Vertical ornament divider between pillars (desktop) */}
                {index < pillars.length - 1 && (
                  <div
                    aria-hidden
                    className="hidden md:flex flex-col items-center justify-center gap-1 ml-3 lg:ml-7 opacity-60"
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

      {/* Bottom village scene artworks & borders */}
      {/* Bottom left tree, goat */}
      <Image
        src="/patterns/training-bottom-left.png"
        alt=""
        aria-hidden
        width={1536}
        height={1024}
        className="pointer-events-none select-none absolute left-0 bottom-1.5 sm:bottom-2 h-auto w-24 sm:w-32 md:w-44 lg:w-52 opacity-80"
      />

      {/* Bottom right woman, hut, tree */}
      <Image
        src="/patterns/training-bottom-right.png"
        alt=""
        aria-hidden
        width={1802}
        height={900}
        className="pointer-events-none select-none absolute right-0 bottom-1.5 sm:bottom-2 h-auto w-24 sm:w-32 md:w-44 lg:w-52 opacity-80"
      />

      {/* Bottom continuous tribal floral border strip */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-3.5 sm:h-4 bg-repeat-x opacity-60"
        style={{
          backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
          backgroundSize: "auto 100%",
        }}
      />
    </section>
  );
}
