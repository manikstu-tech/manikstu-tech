import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, HeartHandshake, ShieldCheck, Sprout, Users } from "lucide-react";

export default function AjahCTA() {
  const t = useTranslations("Ajah");

  const pillars = [
    {
      icon: Users,
      line1: "Women",
      line2: "Empowerment",
    },
    {
      icon: HeartHandshake,
      line1: "Equitable",
      line2: "Income",
    },
    {
      icon: Sprout,
      line1: "Sustainable",
      line2: "Livelihoods",
    },
    {
      icon: ShieldCheck,
      line1: "Community",
      line2: "Dignity",
    },
  ];

  return (
    <section
      id="get-involved"
      className="relative overflow-hidden bg-[#FAF4EB] py-10 sm:py-12 md:py-14"
    >
      {/* Top-left floral corner artwork */}
      <Image
        src="/patterns/mandala-top-right.png"
        alt=""
        aria-hidden
        width={600}
        height={600}
        className="pointer-events-none select-none absolute -left-6 -top-6 h-auto w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-30 -scale-x-100"
      />

      {/* Top-right floral corner artwork */}
      <Image
        src="/patterns/mandala-top-right.png"
        alt=""
        aria-hidden
        width={600}
        height={600}
        className="pointer-events-none select-none absolute -right-6 -top-6 h-auto w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-30"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center">
          {/* Top Pill / Badge */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-8 sm:w-10 bg-manikstu-gold/80" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
              {t("ctaPill")}
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
            <span className="text-[#376E2A]">Back Women-Led Livestock</span> with Project{" "}
            <span className="text-[#9F5233]">AJAH</span>
          </h2>

          <p className="mx-auto mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-grey">
            {t("ctaDesc")}
          </p>

          {/* CTA Button */}
          <div className="mt-5 flex justify-center">
            <Link
              href="/get-in-touch"
              className="inline-flex items-center gap-2 rounded-full bg-[#3D7830] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#326327] hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
            >
              {t("partnerAjah")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Pillars in a row with dashed ring badges */}
        <div className="mt-8 mb-6 sm:mb-8 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.line1} className="flex items-center">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative flex h-11 w-11 sm:h-13 sm:w-13 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#FAF4EB] ring-1 ring-manikstu-green/20 shadow-xs">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-manikstu-green" />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-[-4px] rounded-full border-2 border-dashed border-manikstu-gold/70"
                      />
                    </div>
                    <span className="mt-2 text-[11px] sm:text-xs md:text-sm font-bold text-charcoal font-heading leading-tight">
                      {pillar.line1}
                    </span>
                    <span className="text-[10px] sm:text-xs text-grey font-medium leading-tight">
                      {pillar.line2}
                    </span>
                  </div>

                  {idx < pillars.length - 1 && (
                    <div
                      aria-hidden
                      className="hidden md:flex flex-col items-center justify-center gap-1 ml-4 lg:ml-8 opacity-60"
                    >
                      <span className="h-3 w-px bg-manikstu-gold" />
                      <span className="h-1 w-1 rotate-45 bg-manikstu-gold" />
                      <span className="h-3 w-px bg-manikstu-gold" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom village scene illustration — left */}
      <Image
        src="/patterns/training-bottom-left.png"
        alt=""
        aria-hidden
        width={300}
        height={200}
        className="pointer-events-none select-none absolute left-0 bottom-0 h-auto w-24 sm:w-32 md:w-44 lg:w-52 opacity-20 sm:opacity-25"
      />

      {/* Bottom village scene illustration — right */}
      <Image
        src="/patterns/training-bottom-right.png"
        alt=""
        aria-hidden
        width={300}
        height={200}
        className="pointer-events-none select-none absolute right-0 bottom-0 h-auto w-24 sm:w-32 md:w-44 lg:w-52 opacity-20 sm:opacity-25"
      />
    </section>
  );
}