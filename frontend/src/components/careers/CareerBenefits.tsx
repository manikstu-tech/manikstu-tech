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
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-manikstu-green">
            Perks &amp; Benefits
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-charcoal md:text-4xl">
            What You Can Expect
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-grey">
            We are committed to supporting the people who power our mission —
            with benefits that grow as we grow.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {benefits.map((benefit) => {
            const Icon = iconMap[benefit.icon];
            return (
              <div
                key={benefit.title}
                className="rounded-xl border border-light-grey bg-white p-5 text-center transition-shadow hover:shadow-md"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-manikstu-green/10">
                  <Icon className="h-6 w-6 text-manikstu-green" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-charcoal">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-grey">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
