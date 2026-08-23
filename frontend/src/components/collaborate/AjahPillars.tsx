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

const pillars: AjahPillar[] = [
  {
    icon: Sprout,
    title: "Scientific Livestock Management",
    description:
      "Improved breeding, feeding and husbandry practices for healthier, more productive animals.",
  },
  {
    icon: Warehouse,
    title: "Improved Infrastructure",
    description:
      "Better housing, fodder storage and farm setups that raise productivity and comfort.",
  },
  {
    icon: HeartPulse,
    title: "Animal Healthcare",
    description:
      "Routine vaccination, disease prevention and timely veterinary care for resilient herds.",
  },
  {
    icon: GraduationCap,
    title: "Training",
    description:
      "Hands-on skill building for women farmers to manage and grow their livestock enterprises.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance",
    description:
      "Risk cover that protects families and assets against illness, loss and climate shocks.",
  },
  {
    icon: ShoppingBag,
    title: "Market Support",
    description:
      "Linkages to fair, reliable markets so women entrepreneurs earn what their work is worth.",
  },
];

export default function AjahPillars() {
  return (
    <section className="section-padding bg-manikstu-cream">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-manikstu-green">
            The Model
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Six Pillars of{" "}
            <span className="text-manikstu-green">Integrated Livelihood</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-grey">
            Project AJAH weaves together the full livelihood stack so women
            farmers can build stable, dignified enterprises.
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
