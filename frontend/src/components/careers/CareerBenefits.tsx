import { useTranslations } from "next-intl";
import {
  HeartPulse,
  Lightbulb,
  Clock,
  Leaf,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export interface CareerBenefit {
  icon: "health" | "learning" | "flexible" | "impact" | "growth";
  title: string;
  description: string;
}

const iconMap: Record<CareerBenefit["icon"], LucideIcon> = {
  health: HeartPulse,
  learning: Lightbulb,
  flexible: Clock,
  impact: Leaf,
  growth: TrendingUp,
};

export default function CareerBenefits({
  benefits,
}: {
  benefits: CareerBenefit[];
}) {
  const t = useTranslations("Careers");

  const fallbackBenefits: CareerBenefit[] = [
    { icon: "health", title: t("benefit1Title"), description: t("benefit1Desc") },
    { icon: "learning", title: t("benefit2Title"), description: t("benefit2Desc") },
    { icon: "flexible", title: t("benefit3Title"), description: t("benefit3Desc") },
    { icon: "impact", title: t("benefit4Title"), description: t("benefit4Desc") },
    { icon: "growth", title: t("benefit5Title"), description: t("benefit5Desc") },
  ];

  const displayBenefits = benefits.length ? benefits : fallbackBenefits;

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="text-center">
          {/* Ornamental pill heading */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
              {t("benefitsPill")}
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            {t("benefitsTitle")}
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
            {t("benefitsDesc")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 sm:gap-6">
          {displayBenefits.map((benefit) => {
            const Icon = iconMap[benefit.icon];
            return (
              <div
                key={benefit.title}
                className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/40 bg-manikstu-cream/40 p-5 text-center transition-shadow hover:shadow-md dark:bg-gray-800/80"
              >
                {/* Inner dashed border */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/30"
                />

                <div className="relative text-center">
                  <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                    <Icon className="h-6 w-6 text-manikstu-green" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-[-5px] rounded-full border-2 border-dashed border-saura-red/40"
                    />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold text-charcoal dark:text-white group-hover:text-manikstu-green transition-colors">
                    {benefit.title}
                  </h3>

                  {/* Line-diamond-line ornament */}
                  <div className="mt-2 flex items-center justify-center gap-1.5">
                    <span aria-hidden className="h-px w-4 bg-manikstu-gold" />
                    <span aria-hidden className="h-1 w-1 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-4 bg-manikstu-gold" />
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-grey dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}