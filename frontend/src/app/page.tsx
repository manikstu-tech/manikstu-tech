import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight,
  Play,
  Star,
  Check,
  Smartphone,
  Cpu,
  Handshake,
  Home,
  Lightbulb,
  Users,
  MapPin,
  Sprout,
  Shield,
  Calendar,
  FileText,
  User,
  BarChart3,
  ShoppingBag,
} from "lucide-react";

const missionCards = [
  {
    icon: Cpu,
    title: "Driving Progress with Technology",
    description:
      "Leveraging technology and innovation to empower farmers with actionable data.",
  },
  {
    icon: Handshake,
    title: "Collaborating for Success",
    description:
      "Building strong partnerships with cooperatives, organizations and governments.",
  },
  {
    icon: Home,
    title: "Empowering Rural Livelihoods",
    description:
      "Creating opportunities and strengthening rural communities through goat farming.",
  },
  {
    icon: Lightbulb,
    title: "Innovating for Tomorrow",
    description:
      "Continuously developing new solutions for farm development and inclusive future.",
  },
];

const stats = [
  { value: "70,000+", label: "Farmers Impacted", icon: Users },
  { value: "10,000+", label: "Villages Reached", icon: MapPin },
  { value: "7,00,000+", label: "Goats Insured", icon: Sprout },
  { value: "10+", label: "States Covered", icon: Shield },
];

const partnerCategories = [
  {
    title: "Operational Partners",
    partners: [
      { name: "Krimanshi", image: "/1.png" },
      { name: "Bharat Herbs Co.", image: "/2.png" },
      { name: "Goat Bank Odisha", image: "/3.png" },
      { name: "TrainGuru", image: "/4.png" },
      { name: "AIC", image: "/AIC.png" },
    ],
  },
  {
    title: "Incubation Partners",
    partners: [
      { name: "KIIT TBI", image: "/5.png" },
      { name: "ILS", image: "/6.png" },
      { name: "Miller Center", image: "/7.png" },
      { name: "Startup Odisha", image: "/8.png" },
      { name: "Startup India", image: "/9.png" },
      { name: "MSME", image: "/10.png" },
    ],
  },
  {
    title: "Supporting Partners",
    partners: [
      { name: "Supporting Partner", image: "/11.png" },
      { name: "Supporting Partner 2", image: "/12.png" },
    ],
  },
  {
    title: "CSR Partners",
    partners: [
      { name: "Kalinga Kusum", image: "/15.png" },
      { name: "HDFC Parivartan", image: "/16.png" },
      { name: "Oxfam", image: "/17.png" },
    ],
  },
  {
    title: "Investing Partners",
    partners: [
      { name: "Upaya", image: "/18.png" },
    ],
  },
  {
    title: "Banking Partner",
    partners: [
      { name: "Sambhav", image: "/20.png" },
      { name: "HDFC Bank", image: "/21.png" },
      { name: "Atal Incubation Centre", image: "/AIC.png" },
    ],
  },
];

const newsItems = [
  {
    date: "Feb 25, 2024",
    category: "FEATURED",
    categoryColor: "bg-manikstu-green",
    title: "Manikstu's Goat Bank featured in Mann Ki Baat",
  },
  {
    date: "Jan 14, 2024",
    category: "EVENT",
    categoryColor: "bg-manikstu-red",
    title: "Hon'ble Prime Minister Modi met with Odisha Govt. for Rural Development",
  },
  {
    date: "Dec 15, 2023",
    category: "PRESS",
    categoryColor: "bg-manikstu-gold",
    title: "CEO, Manikstu Agro received Emerging Women Entrepreneur Award",
  },
  {
    date: "Mar 08, 2024",
    category: "MEDIA",
    categoryColor: "bg-saura-red",
    title: "Manikstu Initiative on Goat Farming featured in Dainik Jagran",
  },
];

const testimonials = [
  {
    quote:
      "Manikstu's support has transformed our lives. The loans and insurance helped me grow my goat farm and income.",
    name: "Ramesh Pradhan",
    role: "Farmer, Mayurbhanj, Odisha",
    initials: "RP",
    color: "bg-manikstu-green",
  },
  {
    quote:
      "With training and proper guidance, our goats are healthier and our earnings have increased significantly.",
    name: "Lakshmi Devi",
    role: "Farmer, Keonjhar, Odisha",
    initials: "LD",
    color: "bg-manikstu-red",
  },
];

const features = [
  { icon: Shield, text: "Spot treatment & vaccination of farmers' goats" },
  { icon: User, text: "Support for field representatives in their daily tasks" },
  { icon: BarChart3, text: "Activity management & farm governance" },
  { icon: ShoppingBag, text: "Sales of company products for farmers" },
];

export default function HomePage() {
  return (
    <>
      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white">
          {/* Tribal motif background — full picture fits inside hero, right-anchored */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <Image
              src="/hero-motif.png"
              alt=""
              aria-hidden
              width={1300}
              height={1300}
              priority
              className="select-none absolute right-2 top-1/2 -translate-y-1/2 h-[70%] sm:h-[85%] lg:h-[95%] w-auto max-w-none opacity-[0.10] sm:opacity-[0.14] dark:opacity-[0.18]"
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 md:py-16 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left content */}
              <div>
                <h1 className="font-heading text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
                  Revolutionizing
                  <br />
                  Goat Farming.
                  <br />
                  <span className="text-manikstu-green">Empowering Lives.</span>
                </h1>
                <p className="mt-6 max-w-lg text-grey">
                  Manikstu Agro is building a sustainable ecosystem that
                  empowers farmers with technology, knowledge and innovative
                  solutions.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/collaborate"
                    className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white hover:bg-manikstu-leaf transition-colors"
                  >
                    Explore Our Work <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal px-6 py-3 text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-white transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
                {/* Trust badges */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-grey">
                    <Shield className="h-4 w-4 text-manikstu-green" />
                    Trusted by 70,000+ Farmers
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-white bg-manikstu-cream"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right content — photo area */}
              <div className="relative">
                {/* Main photo placeholder */}
                <div className="relative rounded-2xl overflow-hidden bg-manikstu-cream aspect-[4/3]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users className="h-24 w-24 text-manikstu-green/30" />
                  </div>
                  {/* Watch Our Story overlay */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-3 rounded-xl bg-white/90 backdrop-blur-sm px-4 py-3 shadow-lg">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-manikstu-green text-white">
                      <Play className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-charcoal">Watch</p>
                      <p className="text-xs text-grey">Our Story</p>
                    </div>
                  </div>
                </div>

                {/* Floating card — Mann Ki Baat */}
                <div className="absolute -bottom-6 -left-4 rounded-xl bg-white p-3 shadow-lg md:-left-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-manikstu-cream">
                      <FileText className="h-5 w-5 text-manikstu-green" />
                    </div>
                    <p className="text-xs text-charcoal max-w-[180px]">
                      Manikstu was featured in Mann Ki Baat on February 25, 2024
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl">
            <p className="text-center text-sm font-semibold uppercase tracking-wider text-manikstu-green">
              Our Mission
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-center text-3xl font-bold text-charcoal font-heading md:text-4xl">
              Worldwide, fostering a{" "}
              <span className="text-manikstu-green">prosperous</span> and{" "}
              <span className="text-manikstu-green">sustainable agricultural future.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-grey">
              Since 2015, we have been empowering India&apos;s goat farmers with modern
              practices, financial support and innovative solutions.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {missionCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="rounded-xl border border-light-grey p-6 hover:shadow-md transition-shadow"
                  >
                    <Icon className="h-10 w-10 text-manikstu-green" />
                    <h3 className="mt-4 text-lg font-semibold text-charcoal">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-grey">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding bg-manikstu-cream">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-3xl font-bold text-charcoal font-heading md:text-4xl">
              Impacting Lives
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-white p-6 text-center shadow-sm"
                  >
                    <Icon className="mx-auto h-10 w-10 text-manikstu-green" />
                    <p className="mt-3 text-3xl font-bold text-charcoal font-heading">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-grey">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Flagship Program */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-manikstu-green">
                  Our Flagship Program
                </p>
                <h2 className="mt-4 text-3xl font-bold text-charcoal font-heading md:text-4xl">
                  Project AJAH
                </h2>
                <p className="mt-4 text-grey">
                  AJAH — Women-Led Integrated Livestock Entrepreneurship Initiative.
                  Empowering women farmers through an integrated goat and poultry
                  livelihood model, combining scientific livestock management,
                  improved infrastructure, animal healthcare, training, insurance
                  and market support.
                </p>
                <Link
                  href="/collaborate/ajah"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white hover:bg-manikstu-leaf transition-colors"
                >
                  Explore Project AJAH <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-manikstu-cream aspect-[4/3]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sprout className="h-24 w-24 text-manikstu-green/30" />
                </div>
                {/* Badge */}
                <div className="absolute bottom-4 right-4 rounded-full bg-manikstu-green px-4 py-2 text-xs font-semibold text-white">
                  10 Female Goats + 2 Male Goats | Women-Led Livestock Entrepreneurship
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Associations */}
        <section className="partner-section relative section-padding bg-manikstu-cream dark:bg-gray-800 overflow-hidden">
          {/* Top tribal border — tiled horizontally at natural pattern height */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 h-8 bg-repeat-x"
            style={{
              backgroundImage: "url('/patterns/tribal-border.png')",
              backgroundSize: "auto 100%",
            }}
          />
          {/* Bottom tribal border (flipped) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-8 bg-repeat-x -scale-y-100"
            style={{
              backgroundImage: "url('/patterns/tribal-border.png')",
              backgroundSize: "auto 100%",
            }}
          />
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl lg:text-5xl dark:text-white">
                Our Associations
              </h2>
              <p className="mt-2 text-xs text-grey sm:text-sm dark:text-gray-400">
                Trusted by leading organizations across India
              </p>
            </div>
          </div>
          <div className="mt-12">
            {/* Mobile: stacked categories */}
            <div className="space-y-8 sm:hidden">
              {partnerCategories.map((category) => (
                <div key={category.title} className="text-center">
                  <div className="mb-4 flex items-center justify-center gap-2">
                    <span aria-hidden className="h-px w-8 bg-manikstu-gold/50 dark:bg-manikstu-gold/60" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-manikstu-leaf dark:text-white">
                      {category.title}
                    </h3>
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-8 bg-manikstu-gold/50 dark:bg-manikstu-gold/60" />
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {category.partners.map((partner) => (
                      <div
                        key={partner.name}
                        className="partner-card flex h-16 w-28 items-center justify-center rounded-lg border border-light-grey border-t-[3px] border-t-saura-red/80 bg-white px-2 dark:border-gray-600 dark:border-t-manikstu-gold dark:bg-gray-700"
                      >
                        <Image
                          src={partner.image}
                          alt={partner.name}
                          width={140}
                          height={70}
                          className="max-h-12 w-auto max-w-[120px] object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Tablet + Desktop: 3-column grid */}
            <div className="mt-10 hidden gap-4 sm:grid sm:grid-cols-3 md:gap-6">
              {partnerCategories.map((category) => (
                <div key={category.title} className="text-center">
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <span aria-hidden className="h-px w-8 bg-manikstu-gold/50 dark:bg-manikstu-gold/60" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-manikstu-leaf dark:text-white">
                      {category.title}
                    </h3>
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-8 bg-manikstu-gold/50 dark:bg-manikstu-gold/60" />
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {category.partners.map((partner) => (
                      <div
                        key={partner.name}
                        className="partner-card flex h-16 w-28 items-center justify-center rounded-lg border border-light-grey border-t-[3px] border-t-saura-red/80 bg-white px-2 dark:border-gray-600 dark:border-t-manikstu-gold dark:bg-gray-700"
                      >
                        <Image
                          src={partner.image}
                          alt={partner.name}
                          width={100}
                          height={40}
                          className="max-h-10 w-auto max-w-[90px] object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile App */}
        <section className="relative bg-white overflow-hidden">
          {/* Left mandala background */}
          <Image
            src="/hero-motif.png"
            alt=""
            aria-hidden
            width={1300}
            height={1300}
            className="pointer-events-none select-none absolute left-[-120px] top-1/2 -translate-y-1/2 h-[90%] w-auto max-w-none opacity-[0.08]"
          />

          <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 md:px-8 md:pt-16 md:pb-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Phone mockup — branded splash */}
              <div className="flex justify-center">
                <div className="relative w-64 h-[500px] rounded-[2.5rem] border-4 border-charcoal bg-manikstu-cream overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 rounded-b-xl bg-charcoal" />
                  {/* Splash content */}
                  <div className="flex h-full flex-col items-center justify-center px-6 pt-8 text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-manikstu-green/10 ring-2 ring-manikstu-green/30">
                      <Sprout className="h-12 w-12 text-manikstu-leaf" />
                    </div>
                    <p className="mt-4 font-heading text-2xl font-bold tracking-wide text-manikstu-leaf">
                      GOAT BANK
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-manikstu-gold">
                      Mobile App
                    </p>
                  </div>
                  {/* Warli figures at bottom of phone */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-no-repeat bg-bottom"
                    style={{
                      backgroundImage: "url('/patterns/village-figures.png')",
                      backgroundSize: "180% auto",
                      backgroundPosition: "center bottom",
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                {/* Ornamental pill heading */}
                <div className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-8 bg-manikstu-gold/50" />
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-manikstu-leaf">
                    Goat Bank Mobile App
                  </p>
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <span aria-hidden className="h-px w-8 bg-manikstu-gold/50" />
                </div>

                <h2 className="mt-4 font-heading text-3xl font-bold text-charcoal sm:text-4xl lg:text-5xl">
                  Empowering Farmers
                  <br />
                  with Technology
                </h2>

                {/* Gold ornamental divider */}
                <div className="mt-4 flex items-center gap-2">
                  <span aria-hidden className="h-px w-16 bg-manikstu-gold/50" />
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <span aria-hidden className="h-px w-24 bg-manikstu-gold/50" />
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <span aria-hidden className="h-px w-16 bg-manikstu-gold/50" />
                </div>

                <p className="mt-6 text-grey">
                  Our mobile app streamlines and enhances the entire onboarding
                  process, village visits, and delivery of essential agricultural
                  services.
                </p>

                {/* Features with gold icon circles + dotted trails */}
                <ul className="mt-8 space-y-4">
                  {features.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-manikstu-gold/15 ring-1 ring-manikstu-gold/40">
                        <Icon className="h-4 w-4 text-manikstu-leaf" />
                      </span>
                      <span className="text-sm text-charcoal">{text}</span>
                      <span
                        aria-hidden
                        className="flex-1 border-b border-dashed border-manikstu-gold/40"
                      />
                    </li>
                  ))}
                </ul>

                {/* QR + Store buttons */}
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-manikstu-gold/30 bg-white p-2 shadow-sm">
                    <div className="grid h-full w-full grid-cols-6 grid-rows-6 gap-px">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div
                          key={i}
                          className={
                            [0, 1, 2, 5, 6, 7, 8, 11, 12, 14, 15, 17, 18, 20, 21, 23, 24, 25, 26, 29, 30, 31, 32, 33, 35].includes(i)
                              ? "bg-charcoal"
                              : "bg-transparent"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span aria-hidden className="h-px w-6 bg-manikstu-gold/50" />
                      <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-manikstu-leaf">
                        Scan to Download
                      </p>
                      <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                      <span aria-hidden className="h-px w-6 bg-manikstu-gold/50" />
                    </div>
                    <div className="mt-3 flex gap-2">
                      <a
                        href="#"
                        className="inline-flex h-10 items-center gap-2 rounded-md bg-charcoal px-3 text-white transition-colors hover:bg-manikstu-leaf"
                      >
                        <Play className="h-4 w-4" />
                        <span className="flex flex-col leading-tight">
                          <span className="text-[9px] opacity-80">GET IT ON</span>
                          <span className="text-[11px] font-semibold">Google Play</span>
                        </span>
                      </a>
                      <a
                        href="#"
                        className="inline-flex h-10 items-center gap-2 rounded-md bg-charcoal px-3 text-white transition-colors hover:bg-manikstu-leaf"
                      >
                        <Smartphone className="h-4 w-4" />
                        <span className="flex flex-col leading-tight">
                          <span className="text-[9px] opacity-80">Download on the</span>
                          <span className="text-[11px] font-semibold">App Store</span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom tribal village figures — left (mirrored: hut on outer edge) */}
          <Image
            src="/patterns/village-figures.png"
            alt=""
            aria-hidden
            width={2172}
            height={724}
            loading="eager"
            className="pointer-events-none select-none absolute bottom-[12px] left-0 w-[30%] max-w-none h-auto opacity-80 -scale-x-100"
          />
          {/* Bottom tribal village figures — right (natural: hut on outer edge) */}
          <Image
            src="/patterns/village-figures.png"
            alt=""
            aria-hidden
            width={2172}
            height={724}
            loading="eager"
            className="pointer-events-none select-none absolute bottom-[12px] right-0 w-[30%] max-w-none h-auto opacity-80"
          />

          {/* Dark green tagline ribbon */}
          <div className="relative bg-manikstu-leaf py-2 overflow-hidden">
            {/* Full-width golden tribal art background */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-repeat-x bg-center opacity-90"
              style={{
                backgroundImage: "url('/patterns/golden-tribal-border.png')",
                backgroundSize: "auto 100%",
              }}
            />
            {/* Centered tagline overlaid on the art */}
            <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 sm:px-6 md:px-8">
              <span aria-hidden className="text-manikstu-gold text-lg leading-none">◇</span>
              <p className="rounded bg-manikstu-leaf/85 px-3 py-1 text-xs font-semibold text-manikstu-gold sm:text-sm">
                Building partnerships. Strengthening communities. Transforming livelihoods.
              </p>
              <span aria-hidden className="text-manikstu-gold text-lg leading-none">◇</span>
            </div>
          </div>
        </section>

        {/* News */}
        <section className="section-padding bg-manikstu-cream">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-charcoal font-heading md:text-4xl">
                Latest @ Manikstu
              </h2>
              <Link
                href="/blog"
                className="text-sm font-semibold text-manikstu-green hover:text-manikstu-red transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {newsItems.map((item) => (
                <Link
                  key={item.title}
                  href="/blog"
                  className="group rounded-xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Image placeholder */}
                  <div className="relative h-40 bg-manikstu-cream">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="h-10 w-10 text-manikstu-green/30" />
                    </div>
                    <span
                      className={`absolute top-3 left-3 rounded px-2 py-0.5 text-[10px] font-bold text-white ${item.categoryColor}`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="flex items-center gap-1 text-xs text-grey">
                      <Calendar className="h-3 w-3" /> {item.date}
                    </p>
                    <h3 className="mt-2 text-sm font-semibold text-charcoal line-clamp-2 group-hover:text-manikstu-green transition-colors">
                      {item.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-manikstu-green">
                      Read More <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-charcoal font-heading md:text-4xl">
                What Farmers Say
              </h2>
              <Link
                href="/testimonials"
                className="text-sm font-semibold text-manikstu-green hover:text-manikstu-red transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-xl bg-manikstu-cream p-6"
                >
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-manikstu-gold text-manikstu-gold"
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-grey italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${t.color} text-white text-sm font-semibold`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal">
                        — {t.name}
                      </p>
                      <p className="text-xs text-grey">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
