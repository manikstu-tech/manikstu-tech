import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Stethoscope,
  LayoutDashboard,
  Tractor,
  ShieldCheck,
  ArrowRight,
  Users,
  MapPin,
  Award,
  Sprout,
} from "lucide-react";

const stats = [
  { value: "10,000+", label: "Farmers Served", icon: Users },
  { value: "50,000+", label: "Goats Supported", icon: Sprout },
  { value: "6", label: "States Covered", icon: MapPin },
  { value: "8+", label: "Years of Impact", icon: Award },
];

const services = [
  {
    icon: Stethoscope,
    title: "Goat Care",
    description:
      "Veterinary services, vaccination, AI breeding, and complete goat healthcare.",
    href: "/services/goat-care",
  },
  {
    icon: LayoutDashboard,
    title: "Farm ERP",
    description:
      "Digital tools for farm management, breeding records, and inventory tracking.",
    href: "/services/erp",
  },
  {
    icon: Tractor,
    title: "Farming Solutions",
    description:
      "Shed construction, feed management, procurement support, and farm setup.",
    href: "/services/farming-solution",
  },
  {
    icon: ShieldCheck,
    title: "Insurance",
    description:
      "Livestock insurance partnerships to protect your investment and future.",
    href: "/services/insurance",
  },
];

const projects = [
  {
    title: "Project Samarth",
    description:
      "Goat bank model empowering farmers with livestock access and market linkage.",
    color: "bg-manikstu-green",
    href: "/collaborate/samarth",
  },
  {
    title: "Sujalam Sufalam",
    description:
      "Women empowerment through goat farming micro-entrepreneurship programs.",
    color: "bg-manikstu-red",
    href: "/collaborate/sujalam-sufalam",
  },
  {
    title: "Project Samriddhi",
    description:
      "Entrepreneurship development for rural youth in the goat farming ecosystem.",
    color: "bg-manikstu-gold",
    href: "/collaborate/samriddhi",
  },
  {
    title: "Dhanvantaram",
    description:
      "Replicating successful goat bank models across new regions and communities.",
    color: "bg-saura-red",
    href: "/collaborate/dhanvantaram",
  },
];

const products = [
  {
    category: "For Goats",
    items: ["Mineral Mix", "Worm Out", "Liver Tonic", "Growth Supplements"],
    href: "/products?category=for-goats",
  },
  {
    category: "Goats",
    items: [
      "Kalahandi Red",
      "Jamunapari",
      "Sojat",
      "Sirohi",
      "Crossbreeds",
    ],
    href: "/products?category=goats",
  },
  {
    category: "From Goats",
    items: ["Organic Manure", "Goat Milk Soap", "Leather Products"],
    href: "/products?category=from-goats",
  },
];

const testimonials = [
  {
    quote:
      "Manikstu helped me start my goat farm with just 5 goats. Today I have 30+ and a steady income.",
    name: "Lakshmi Devi",
    role: "Farmer, Kalahandi",
    initials: "LD",
    color: "bg-manikstu-green",
  },
  {
    quote:
      "The veterinary services are excellent. My goat mortality dropped from 20% to under 5%.",
    name: "Rajesh Kumar",
    role: "Farmer, Koraput",
    initials: "RK",
    color: "bg-manikstu-red",
  },
  {
    quote:
      "The training program gave me the confidence to run my own goat farming business.",
    name: "Sunita Munda",
    role: "Entrepreneur, Rayagada",
    initials: "SM",
    color: "bg-manikstu-gold",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="relative flex min-h-[80vh] items-center justify-center bg-manikstu-leaf text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-manikstu-leaf/90 to-charcoal/70" />
          {/* Saura pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F0E8' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zM10 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3Cpath d='M30 30h20v20H30z'/%3E%3Cpath d='M0 30h10v20H0zM70 30h10v20H70zM30 0v10h20V0zM30 70v10h20V70z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl">
              Revolutionizing Goat Farming
              <br />
              <span className="text-manikstu-gold">Ecosystem Worldwide</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              Comprehensive veterinary services, goat bank, training programs,
              and ethically sourced products — empowering farmers since 2015.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/collaborate" className="btn-primary">
                Join Our Network
              </Link>
              <Link href="/products" className="btn-outline border-white text-white hover:bg-white hover:text-manikstu-leaf">
                Explore Products
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-manikstu-cream py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 md:grid-cols-4 md:px-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="mx-auto h-8 w-8 text-manikstu-green" />
                  <p className="mt-3 text-3xl font-bold text-charcoal font-heading">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-grey">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Services */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold text-charcoal font-heading md:text-4xl">
              Our Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-grey">
              End-to-end solutions for every stage of goat farming — from health
              to harvest.
            </p>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    className={`group rounded-lg border border-light-grey bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 ${
                      i === 0 ? "lg:col-span-2 lg:p-8" : ""
                    }`}
                  >
                    <Icon className={`text-manikstu-green ${i === 0 ? "h-12 w-12" : "h-10 w-10"}`} />
                    <h3 className={`mt-4 font-semibold text-charcoal ${i === 0 ? "text-xl" : "text-lg"}`}>
                      {service.title}
                    </h3>
                    <p className={`mt-2 text-grey ${i === 0 ? "text-base" : "text-sm"}`}>
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-manikstu-green group-hover:text-manikstu-red transition-colors">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="section-padding bg-manikstu-cream">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold text-charcoal font-heading md:text-4xl">
              Our Projects
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-grey">
              Community-driven initiatives transforming rural livelihoods through
              goat farming.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <Link
                  key={project.title}
                  href={project.href}
                  className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className={`mb-4 h-2 w-16 rounded ${project.color}`} />
                  <h3 className="text-xl font-semibold text-charcoal">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-grey">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-manikstu-green group-hover:text-manikstu-red transition-colors">
                    View project <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold text-charcoal font-heading md:text-4xl">
              Our Products
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-grey">
              Quality supplements, healthy goats, and organic products — sourced
              ethically from our network.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.category}
                  href={product.href}
                  className="group rounded-lg border border-light-grey bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-charcoal">
                    {product.category}
                  </h3>
                  <ul className="mt-3 space-y-1">
                    {product.items.map((item) => (
                      <li key={item} className="text-sm text-grey">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-manikstu-green group-hover:text-manikstu-red transition-colors">
                    Browse <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-manikstu-cream">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold text-charcoal font-heading md:text-4xl">
              What Our Farmers Say
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-lg bg-white p-6 shadow-sm"
                >
                  <p className="text-sm text-grey italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 border-t border-light-grey pt-4 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${t.color} text-white text-sm font-semibold`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-charcoal">
                        {t.name}
                      </p>
                      <p className="mt-0.5 text-sm text-grey">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-manikstu-green py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
            <h2 className="text-3xl font-bold font-heading md:text-4xl">
              Ready to Start Your Goat Farming Journey?
            </h2>
            <p className="mt-4 text-white/80">
              Join thousands of farmers who are transforming their lives through
              our ecosystem.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-secondary">
                Get in Touch
              </Link>
              <Link
                href="/training"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 font-semibold transition-colors hover:bg-white hover:text-manikstu-green"
              >
                Training Programs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
