import { HeartHandshake, Leaf, Sprout, TrendingUp, type LucideIcon } from "lucide-react";

export interface CareerValue {
  icon: "impact" | "growth" | "culture" | "sustainability";
  title: string;
  description: string;
}

const iconMap: Record<CareerValue["icon"], LucideIcon> = {
  impact: Sprout,
  growth: TrendingUp,
  culture: HeartHandshake,
  sustainability: Leaf,
};

export default function WhyJoinUs({ values }: { values: CareerValue[] }) {
  return (
    <section id="why-join-us" className="section-padding bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-manikstu-green">
            Why Join Us
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Work with Purpose.{" "}
            <span className="text-manikstu-green">
              Empower Lives. Transform Rural Communities.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-grey">
            A career at Manikstu means growing alongside the farmers and
            communities we serve — with work that matters every single day.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = iconMap[value.icon];
            return (
              <div
                key={value.title}
                className="rounded-xl border border-light-grey bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-manikstu-green/10">
                  <Icon className="h-5 w-5 text-manikstu-green" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-charcoal">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-grey">
                  {value.description}
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
