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
    <section className="section-padding bg-manikstu-cream">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-manikstu-green">
            {t("modelPill")}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold text-charcoal md:text-4xl">
            {t("modelTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-grey">
            {t("modelDesc")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-xl border border-light-grey bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-manikstu-green/10">
                  <Icon className="h-5 w-5 text-manikstu-green" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-charcoal">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-grey">
                  {pillar.description}
                </p>
                <div className="mt-4 h-0.5 w-8 rounded bg-manikstu-green/60" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}