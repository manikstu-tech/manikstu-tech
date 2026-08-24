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
          {/* Ornamental pill heading */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
              Awareness Initiatives
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            Reaching Every{" "}
            <span className="text-manikstu-green">Village &amp; Household</span>
          </h2>

          {/* Ornamental divider */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-16 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-16 bg-manikstu-gold/60" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-grey leading-relaxed">
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
