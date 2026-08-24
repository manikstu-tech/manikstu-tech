import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { GraduationCap, Handshake, Users, ArrowRight } from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Training & Awareness",
    description:
      "Comprehensive training programs for farmers on goat farming best practices, healthcare, and modern techniques.",
    href: "/training",
  },
  {
    icon: Handshake,
    title: "Collaborate With Us",
    description:
      "Partner with Manikstu to create sustainable rural livelihoods through livestock-based interventions.",
    href: "/collaborate",
  },
  {
    icon: Users,
    title: "Project AJAH",
    description:
      "An integrated livestock program empowering women farmers across rural Odisha with goats, training, and market access.",
    href: "/collaborate/ajah",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero background={null}>
          <div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
              What We Do
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
              Our <span className="text-manikstu-green">Services</span>
            </h1>
            <p className="mt-4 max-w-lg text-grey">
              From farmer training to strategic partnerships, we deliver end-to-end solutions for sustainable goat farming.
            </p>
          </div>
          <div className="flex items-center justify-center rounded-2xl bg-manikstu-cream p-8">
            <Handshake className="h-24 w-24 text-manikstu-green/30" />
          </div>
        </PageHero>

        <section className="section-padding bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="group rounded-2xl border-2 border-saura-red/30 bg-white p-6 transition-shadow hover:shadow-lg"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-manikstu-green/10">
                      <Icon className="h-6 w-6 text-manikstu-green" />
                    </div>
                    <h2 className="mt-4 font-heading text-xl font-bold text-charcoal group-hover:text-manikstu-green transition-colors">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm text-grey leading-relaxed">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-manikstu-green">
                      Learn More <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
