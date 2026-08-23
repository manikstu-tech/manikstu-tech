import { HeartPulse, Megaphone, Radio, Wheat, type LucideIcon } from "lucide-react";

export interface AwarenessInitiative {
  icon: LucideIcon;
  title: string;
  description: string;
}

const initiatives: AwarenessInitiative[] = [
  {
    icon: Megaphone,
    title: "Community Awareness Drives",
    description:
      "Village-level campaigns on nutrition, hygiene and the value of improved livestock practices.",
  },
  {
    icon: HeartPulse,
    title: "Veterinary Health Camps",
    description:
      "Periodic camps for vaccination, deworming and early diagnosis in partnership with local vets.",
  },
  {
    icon: Wheat,
    title: "Demo Plots & Field Days",
    description:
      "Live demonstrations of fodder, feeding and housing models farmers can adapt on their own land.",
  },
  {
    icon: Radio,
    title: "Rural Radio & IVRS Advisories",
    description:
      "Timely, localized advisories on weather, disease outbreaks and best practices in native dialects.",
  },
];

export default function AwarenessInitiatives() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-manikstu-green">
            Awareness Initiatives
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Reaching Every{" "}
            <span className="text-manikstu-green">Village &amp; Household</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-grey">
            Awareness is the foundation of adoption. We meet communities through
            the channels they already trust.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {initiatives.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-xl border border-light-grey bg-manikstu-cream p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-manikstu-green/10">
                  <Icon className="h-5 w-5 text-manikstu-green" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-grey">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
