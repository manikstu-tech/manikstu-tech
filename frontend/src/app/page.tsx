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
        <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-manikstu-leaf text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-manikstu-leaf/90 to-charcoal/70" />
          {/* Saura pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F0E8' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zM10 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3Cpath d='M30 30h20v20H30z'/%3E%3Cpath d='M0 30h10v20H0zM70 30h10v20H70zM30 0v10h20V0zM30 70v10h20V70z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-8 lg:grid-cols-2">
            <div>
              <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Revolutionizing Goat Farming
                <br />
                <span className="text-manikstu-gold">Ecosystem Worldwide</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/80">
                Comprehensive veterinary services, goat bank, training programs,
                and ethically sourced products — empowering farmers since 2015.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/collaborate" className="btn-primary">
                  Join Our Network
                </Link>
                <Link href="/products" className="btn-outline border-white text-white hover:bg-white hover:text-manikstu-leaf">
                  Explore Products
                </Link>
              </div>
            </div>
            {/* Line-art goat illustration */}
            <div className="hidden lg:flex justify-center">
              <svg viewBox="0 0 400 400" className="h-80 w-80 text-white/20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Goat body */}
                <ellipse cx="200" cy="240" rx="90" ry="60" />
                {/* Goat head */}
                <circle cx="310" cy="180" r="35" />
                {/* Horns */}
                <path d="M295 150 Q280 120 290 90" />
                <path d="M325 150 Q340 120 330 90" />
                {/* Ears */}
                <path d="M280 170 Q260 160 265 145" />
                <path d="M340 170 Q360 160 355 145" />
                {/* Eye */}
                <circle cx="315" cy="175" r="3" fill="currentColor" />
                {/* Nose */}
                <path d="M335 190 Q345 195 340 205" />
                {/* Neck */}
                <path d="M280 200 Q260 220 240 230" />
                {/* Legs */}
                <path d="M150 290 L145 360" />
                <path d="M180 295 L175 365" />
                <path d="M220 295 L225 365" />
                <path d="M250 290 L255 360" />
                {/* Hooves */}
                <path d="M140 358 L150 362 L155 358" />
                <path d="M170 363 L180 367 L185 363" />
                <path d="M220 363 L230 367 L235 363" />
                <path d="M250 358 L260 362 L265 358" />
                {/* Tail */}
                <path d="M110 230 Q90 220 85 240 Q80 260 95 255" />
                {/* Beard */}
                <path d="M330 200 Q340 215 335 230" />
                {/* Saura decorative elements */}
                <circle cx="200" cy="100" r="15" strokeDasharray="4 4" />
                <path d="M170 80 L185 65 L200 80 L215 65 L230 80" strokeDasharray="4 4" />
              </svg>
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
                    className={`group relative rounded-lg border border-light-grey bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 ${
                      i === 0 ? "lg:col-span-2 lg:p-8" : ""
                    }`}
                  >
                    {/* Saura corner decoration */}
                    <div className="absolute top-2 right-2 h-6 w-6 border-t-2 border-r-2 border-manikstu-green/20 rounded-tr-lg" />
                    <div className="absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-manikstu-green/20 rounded-bl-lg" />
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
                  className="group rounded-lg border border-light-grey bg-white p-6 shadow-sm transition-all hover:shadow-md relative overflow-hidden"
                >
                  {/* Ikat top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-2 opacity-60"
                    style={{
                      background: `repeating-linear-gradient(90deg, #4A8C3F 0px, #4A8C3F 8px, transparent 8px, transparent 12px, #C4952A 12px, #C4952A 20px, transparent 20px, transparent 24px)`,
                    }}
                  />
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
                  className="rounded-lg bg-white p-6 shadow-sm relative overflow-hidden"
                >
                  {/* Saura bottom border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-manikstu-green via-manikstu-gold to-manikstu-green" />
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
        <section className="relative bg-manikstu-green py-20 text-white overflow-hidden">
          {/* Godna pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F5F0E8' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20l4-4 2 2-4 4-2-2zm0-20l2.83 2.83L1.41 4.24 0 2.83V0h1.41L4.24 2.83 2.83 4.24 0 1.41V0zm20 20l4-4 2 2-4 4-2-2zm-20 0l2.83 2.83L1.41 24.24 0 22.83V20h1.41L4.24 22.83 2.83 24.24 0 21.41V20zm20-20l4-4 2 2-4 4-2-2zM10 10l2.83 2.83L8.66 15.66 5.83 12.83 10 10zm20 20l4-4 2 2-4 4-2-2z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-8">
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
