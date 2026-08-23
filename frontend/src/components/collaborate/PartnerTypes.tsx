import {
  Banknote,
  Building2,
  HeartHandshake,
  Landmark,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface PartnerType {
  icon: LucideIcon;
  title: string;
  description: string;
}

const partners: PartnerType[] = [
  {
    icon: Users,
    title: "FPOs & SHGs",
    description:
      "Strengthen farmer producer organizations and self-help groups with training, aggregation and collective market access.",
  },
  {
    icon: Building2,
    title: "Corporates & CSR",
    description:
      "Co-create CSR and sustainability programs that deliver measurable rural livelihoods and ESG outcomes.",
  },
  {
    icon: HeartHandshake,
    title: "NGOs & Development Orgs",
    description:
      "Combine on-ground reach with our technical expertise to scale livestock interventions that last.",
  },
  {
    icon: Landmark,
    title: "Government & Research",
    description:
      "Partner on schemes, pilots and studies that inform policy and strengthen the livestock value chain.",
  },
  {
    icon: Truck,
    title: "Supply Chain & Retail",
    description:
      "Source ethically produced, traceable livestock products and build resilient last-mile linkages.",
  },
  {
    icon: Banknote,
    title: "Financial Institutions",
    description:
      "Enable credit, insurance and Goat Bank models that de-risk rural livelihoods and expand inclusion.",
  },
];

export default function PartnerTypes() {
  return (
    <section className="section-padding bg-manikstu-cream">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-manikstu-green">
            Who We Partner With
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold text-charcoal md:text-4xl">
            A Coalition for{" "}
            <span className="text-manikstu-green">Lasting Impact</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-grey">
            From grassroots groups to global institutions, we collaborate across
            the ecosystem to multiply impact.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.title}
                className="rounded-xl border border-light-grey bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-manikstu-green/10">
                  <Icon className="h-5 w-5 text-manikstu-green" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-charcoal">
                  {partner.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-grey">
                  {partner.description}
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
