import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  HeartPulse,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  GraduationCap,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export interface AjahPillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function AjahPillars({ pillars: propPillars }: { pillars?: AjahPillar[] }) {
  const t = useTranslations("Ajah");

  const fallbackPillars: AjahPillar[] = [
    {
      icon: Sprout,
      title: t("pillar1Title"),
      description: t("pillar1Desc"),
    },
    {
      icon: Warehouse,
      title: t("pillar2Title"),
      description: t("pillar2Desc"),
    },
    {
      icon: HeartPulse,
      title: t("pillar3Title"),
      description: t("pillar3Desc"),
    },
    {
      icon: GraduationCap,
      title: t("pillar4Title"),
      description: t("pillar4Desc"),
    },
    {
      icon: ShieldCheck,
      title: t("pillar5Title"),
      description: t("pillar5Desc"),
    },
    {
      icon: ShoppingBag,
      title: t("pillar6Title"),
      description: t("pillar6Desc"),
    },
  ];

  const pillars = propPillars?.length ? propPillars : fallbackPillars;

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-20">
      {/* Top tribal floral border */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-5 sm:h-6 bg-repeat-x opacity-60 -scale-y-100"
        style={{
          backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
          backgroundSize: "auto 100%",
        }}
      />

      {/* Top-left & Top-right corner mandala watermarks */}
      <Image
        src="/patterns/mandala-corner-top.png"
        alt=""
        aria-hidden
        width={400}
        height={400}
        className="pointer-events-none select-none absolute left-0 top-0 h-auto w-48 sm:w-64 md:w-80 lg:w-96 opacity-[0.12] sm:opacity-[0.16]"
      />
      <Image
        src="/patterns/mandala-corner-top.png"
        alt=""
        aria-hidden
        width={400}
        height={400}
        className="pointer-events-none select-none absolute right-0 top-0 h-auto w-48 sm:w-64 md:w-80 lg:w-96 opacity-[0.12] sm:opacity-[0.16] -scale-x-100"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="text-center">
          {/* Ornamental Pill Heading */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
              {t("modelPill")}
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          </div>

          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            {t("modelTitle").split("Integrated")[0]}
            <span className="text-manikstu-green">Integrated {t("modelTitle").split("Integrated")[1]}</span>
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

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-grey leading-relaxed">
            {t("modelDesc")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-manikstu-cream/30 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-manikstu-cream/50"
              >
                <div className="relative text-center">
                  {/* Icon with dashed decorative ring */}
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                    <Icon className="h-6 w-6 text-manikstu-green transition-transform duration-300 group-hover:scale-110" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-[-6px] rounded-full border-2 border-dashed border-saura-red/50"
                    />
                  </div>

                  <h3 className="mt-6 font-heading text-lg italic font-bold leading-snug text-manikstu-leaf group-hover:text-manikstu-green transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Line-diamond-line ornament */}
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-grey">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom tribal floral border */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-5 sm:h-6 bg-repeat-x opacity-60"
        style={{
          backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
          backgroundSize: "auto 100%",
        }}
      />
    </section>
  );
}