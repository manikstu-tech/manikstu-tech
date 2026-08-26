import { useTranslations } from "next-intl";
import { ClipboardList, Compass, Rocket, TrendingUp, type LucideIcon } from "lucide-react";

export interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function HowItWorks({ steps: propSteps }: { steps?: StepItem[] }) {
  const t = useTranslations("Collaborate");

  const fallbackSteps: StepItem[] = [
    {
      step: "01",
      title: t("step1Title"),
      description: t("step1Desc"),
      icon: Compass,
    },
    {
      step: "02",
      title: t("step2Title"),
      description: t("step2Desc"),
      icon: ClipboardList,
    },
    {
      step: "03",
      title: t("step3Title"),
      description: t("step3Desc"),
      icon: Rocket,
    },
    {
      step: "04",
      title: t("step4Title"),
      description: t("step4Desc"),
      icon: TrendingUp,
    },
  ];

  const steps = propSteps?.length ? propSteps : fallbackSteps;
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          {/* Ornamental pill heading */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
              {t("howPill")}
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            {t("howTitle")}
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

          <p className="mx-auto mt-6 max-w-2xl text-grey leading-relaxed">
            {t("howDesc")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-manikstu-cream/30 p-6 transition-shadow hover:shadow-lg"
              >
                {/* Inner dashed border */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
                />

                <div className="relative text-center">
                  {/* Step pill tag */}
                  <div className="mx-auto inline-flex items-center justify-center rounded-full border border-manikstu-gold/60 bg-manikstu-gold/15 px-3 py-0.5 text-xs font-bold text-[#6B4423]">
                    {t("stepPrefix")} {item.step}
                  </div>

                  {/* Icon with dashed decorative ring */}
                  <div className="relative mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                    <Icon className="h-6 w-6 text-manikstu-green" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-[-5px] rounded-full border-2 border-dashed border-saura-red/50"
                    />
                  </div>

                  <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-charcoal">
                    {item.title}
                  </h3>

                  {/* Line-diamond-line ornament */}
                  <div className="mt-2.5 flex items-center justify-center gap-1.5">
                    <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-grey">
                    {item.description}
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