import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import PageHero from "@/components/layout/PageHero";
import {
  ArrowRight,
  Play,
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

const missionCards: {
  icon: typeof Cpu;
  title: string;
  description: string;
  image?: string;
}[] = [
    {
      icon: Cpu,
      title: "Driving Progress with Technology",
      description:
        "Leveraging technology and innovation to empower farmers with actionable data.",
      image: "/patterns/mission-driving-progress.png",
    },
    {
      icon: Handshake,
      title: "Collaborating for Success",
      description:
        "Building strong partnerships with cooperatives, organizations and governments.",
      image: "/patterns/mission-collaborating.png",
    },
    {
      icon: Home,
      title: "Empowering Rural Livelihoods",
      description:
        "Creating opportunities and strengthening rural communities through goat farming.",
      image: "/patterns/mission-rural-livelihoods.png",
    },
    {
      icon: Lightbulb,
      title: "Innovating for Tomorrow",
      description:
        "Continuously developing new solutions for farm development and inclusive future.",
      image: "/patterns/mission-innovating.png",
    },
  ];

const stats = [
  { value: "70,000+", label: "Farmers Impacted", icon: Users, image: "/patterns/impact-panel-1.png" },
  { value: "10,000+", label: "Villages Reached", icon: MapPin, image: "/patterns/impact-panel-2.png" },
  { value: "7,00,000+", label: "Goats Insured", icon: Sprout, image: "/patterns/impact-panel-3.png" },
  { value: "10+", label: "States Covered", icon: Shield, image: "/patterns/impact-panel-4.png" },
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

const allPartnersRow1 = [
  { name: "Krimanshi", image: "/1.png" },
  { name: "Bharat Herbs Co.", image: "/2.png" },
  { name: "Goat Bank Odisha", image: "/3.png" },
  { name: "TrainGuru", image: "/4.png" },
  { name: "AIC", image: "/AIC.png" },
  { name: "KIIT TBI", image: "/5.png" },
  { name: "ILS", image: "/6.png" },
  { name: "Miller Center", image: "/7.png" },
  { name: "Startup Odisha", image: "/8.png" },
  { name: "Startup India", image: "/9.png" },
  { name: "MSME", image: "/10.png" },
];

const allPartnersRow2 = [
  { name: "Supporting Partner", image: "/11.png" },
  { name: "Supporting Partner 2", image: "/12.png" },
  { name: "Kalinga Kusum", image: "/15.png" },
  { name: "HDFC Parivartan", image: "/16.png" },
  { name: "Oxfam", image: "/17.png" },
  { name: "Upaya", image: "/18.png" },
  { name: "Sambhav", image: "/20.png" },
  { name: "HDFC Bank", image: "/21.png" },
  { name: "Atal Incubation Centre", image: "/AIC.png" },
];

const newsItems = [
  {
    date: "Feb 25, 2024",
    category: "FEATURED",
    categoryColor: "bg-manikstu-green",
    title: "Manikstu's Goat Bank featured in Mann Ki Baat",
    image: "/1.png",
  },
  {
    date: "Jan 14, 2024",
    category: "EVENT",
    categoryColor: "bg-manikstu-red",
    title: "Hon'ble Prime Minister Modi met with Odisha Govt. for Rural Development",
    image: "/2.png",
  },
  {
    date: "Dec 15, 2023",
    category: "PRESS",
    categoryColor: "bg-manikstu-gold",
    title: "CEO, Manikstu Agro received Emerging Women Entrepreneur Award",
    image: "/3.png",
  },
  {
    date: "Mar 08, 2024",
    category: "MEDIA",
    categoryColor: "bg-saura-red",
    title: "Manikstu Initiative on Goat Farming featured in Dainik Jagran",
    image: "/4.png",
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
  {
    quote:
      "The veterinary support at my doorstep saved my herd during the last outbreak. I owe my livelihood to their team.",
    name: "Sanjay Nayak",
    role: "Farmer, Kalahandi, Odisha",
    initials: "SN",
    color: "bg-manikstu-gold",
  },
  {
    quote:
      "Being part of the women-led initiative gave me both confidence and a steady income. My family is proud of me.",
    name: "Anita Majhi",
    role: "Farmer, Balangir, Odisha",
    initials: "AM",
    color: "bg-saura-red",
  },
  {
    quote:
      "The Goat Care app makes tracking vaccinations and sales simple. What used to take a whole day now takes minutes.",
    name: "Prakash Behera",
    role: "Farmer, Sundargarh, Odisha",
    initials: "PB",
    color: "bg-manikstu-leaf",
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
        <PageHero
          background={
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
          }
        >
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

              {/* Right content ΓÇö photo area */}
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

                {/* Floating card ΓÇö Mann Ki Baat */}
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
        </PageHero>

        {/* Mission */}
        <section className="relative section-padding bg-white overflow-hidden dark:bg-gray-900">
          <div className="relative z-10 mx-auto max-w-7xl">
            {/* Ornamental pill heading */}
            <div className="flex items-center justify-center gap-2">
              <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
                Our Mission
              </p>
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
            </div>

            <h2 className="mx-auto mt-6 max-w-4xl text-center font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl dark:text-white">
              Worldwide, fostering a{" "}
              <span className="text-manikstu-green">prosperous</span> and{" "}
              <span className="text-manikstu-green">sustainable agricultural future.</span>
            </h2>

            {/* Ornamental Divider with Framed Diamond */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
              <div aria-hidden className="relative flex items-center justify-center">
                <span className="h-3.5 w-3.5 rotate-45 border border-manikstu-gold bg-transparent" />
                <span className="absolute h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              </div>
              <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
              <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-center text-grey leading-relaxed dark:text-gray-300">
              Since 2015, we have been empowering India&apos;s goat farmers with modern
              practices, financial support and innovative solutions.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {missionCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-white/90 dark:bg-gray-800/90 pt-8 pb-28 px-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Inner dashed border */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
                    />

                    {/* Bottom Warli village art */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-no-repeat bg-bottom opacity-85 z-0"
                      style={
                        card.image
                          ? {
                              backgroundImage: `url('${card.image}')`,
                              backgroundSize: "100% auto",
                              backgroundPosition: "bottom center",
                            }
                          : {
                              backgroundImage: "url('/patterns/village-figures.png')",
                              backgroundSize: "400% auto",
                              backgroundPosition: `${(i * 33) % 100}% bottom`,
                            }
                      }
                    />

                    <div className="relative z-10 text-center">
                      {/* Icon with dashed decorative ring */}
                      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                        <Icon className="h-7 w-7 text-manikstu-green" />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-[-6px] rounded-full border-2 border-dashed border-saura-red/50"
                        />
                      </div>

                      <h3 className="mt-6 font-heading text-lg italic font-bold leading-snug text-manikstu-leaf dark:text-white group-hover:text-manikstu-green transition-colors">
                        {card.title}
                      </h3>

                      {/* Line-diamond-line ornament */}
                      <div className="mt-3 flex items-center justify-center gap-1.5">
                        <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                        <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                      </div>

                      <p className="mt-3 text-sm text-grey leading-relaxed dark:text-gray-300">
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats / Impacting Lives */}
        <section className="relative overflow-hidden pt-8 pb-14 sm:pt-9 sm:pb-16 md:pt-10 md:pb-20 px-4 sm:px-6 md:px-8 bg-manikstu-cream dark:bg-gray-900">
          {/* Top tribal floral border */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 h-4 sm:h-6 bg-repeat-x -scale-y-100 opacity-60"
            style={{
              backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
              backgroundSize: "auto 100%",
            }}
          />

          {/* Top-left mandala corner */}
          <Image
            src="/patterns/mandala-corner-top.png"
            alt=""
            aria-hidden
            width={1370}
            height={1155}
            className="pointer-events-none select-none absolute left-0 top-0 h-auto w-36 sm:w-48 md:w-60 lg:w-72 opacity-[0.14] sm:opacity-[0.18]"
          />
          {/* Top-right mandala corner (mirrored) */}
          <Image
            src="/patterns/mandala-corner-top.png"
            alt=""
            aria-hidden
            width={1370}
            height={1155}
            className="pointer-events-none select-none absolute right-0 top-0 h-auto w-36 sm:w-48 md:w-60 lg:w-72 opacity-[0.14] sm:opacity-[0.18] -scale-x-100"
          />
          {/* Bottom village panoramic scene banner */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-4 sm:-bottom-5 md:-bottom-6 lg:-bottom-7 z-0 flex justify-between overflow-hidden select-none opacity-90 dark:opacity-40"
          >
            <Image
              src="/patterns/village-figures.png"
              alt=""
              width={1920}
              height={300}
              className="h-22 sm:h-26 md:h-30 lg:h-36 xl:h-40 w-auto max-w-none -scale-x-100 object-contain object-left"
            />
            <Image
              src="/patterns/village-figures.png"
              alt=""
              width={1920}
              height={300}
              className="h-22 sm:h-26 md:h-30 lg:h-36 xl:h-40 w-auto max-w-none object-contain object-right"
            />
          </div>

          <div className="relative mx-auto max-w-6xl">
            <div className="text-center">
              {/* Ornamental pill heading */}
              <div className="flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-8 sm:w-10 bg-manikstu-gold/60" />
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
                  Our Impact
                </p>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-8 sm:w-10 bg-manikstu-gold/60" />
              </div>

              <h2 className="mx-auto mt-2.5 font-heading text-2xl font-bold leading-tight text-charcoal sm:text-3xl lg:text-4xl dark:text-white">
                Impacting <span className="text-manikstu-green">Lives</span>
              </h2>

              {/* Ornamental Divider with Framed Diamond */}
              <div className="mt-2.5 flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-10 sm:w-14 bg-manikstu-gold/70" />
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <div aria-hidden className="relative flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rotate-45 border border-manikstu-gold bg-transparent" />
                  <span className="absolute h-1 w-1 rotate-45 bg-manikstu-gold" />
                </div>
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <span aria-hidden className="h-px w-10 sm:w-14 bg-manikstu-gold/70" />
              </div>

              <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm text-grey leading-relaxed dark:text-gray-300">
                Measurable progress and sustainable livelihoods delivered directly to rural heartlands.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-white/90 p-4 sm:p-5 text-center transition-shadow hover:shadow-lg dark:bg-gray-800/90"
                  >
                    {/* Inner dashed border */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
                    />

                    <div className="relative text-center">
                      {/* Icon with dashed decorative ring */}
                      <div className="relative mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-manikstu-green" />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-[-5px] rounded-full border-2 border-dashed border-saura-red/50"
                        />
                      </div>

                      <p className="mt-3 font-heading text-2xl sm:text-3xl font-bold leading-none text-charcoal dark:text-white group-hover:text-manikstu-green transition-colors duration-200">
                        {stat.value}
                      </p>

                      {/* Line-diamond-line ornament */}
                      <div className="mt-2 flex items-center justify-center gap-1.5">
                        <span aria-hidden className="h-px w-5 bg-manikstu-gold" />
                        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                        <span aria-hidden className="h-px w-5 bg-manikstu-gold" />
                      </div>

                      <p className="mt-2 text-xs sm:text-sm font-medium leading-snug text-grey dark:text-gray-300">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Flagship Program */}
        <section className="relative section-padding bg-white overflow-hidden">
          {/* Background Manikstu logo watermark ΓÇö behind the text column */}
          <Image
            src="/logo.png"
            alt=""
            aria-hidden
            width={600}
            height={600}
            className="pointer-events-none select-none absolute left-[-60px] top-1/2 -translate-y-1/2 w-[45%] max-w-[500px] h-auto opacity-[0.10] lg:left-[5%]"
          />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                {/* Ornamental pill heading */}
                <div className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
                    Our Flagship Program
                  </p>
                  <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                </div>

                <h2 className="mt-6 font-heading text-4xl font-bold leading-tight text-charcoal sm:text-5xl lg:text-6xl">
                  Project <span className="text-manikstu-green">AJAH</span>
                </h2>

                {/* Ornamental Divider with Framed Diamond */}
                <div className="mt-4 flex items-center gap-2">
                  <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
                  <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                  <div aria-hidden className="relative flex items-center justify-center">
                    <span className="h-3.5 w-3.5 rotate-45 border border-manikstu-gold bg-transparent" />
                    <span className="absolute h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  </div>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                  <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
                </div>

                <p className="mt-6 text-grey leading-relaxed">
                  AJAH ΓÇô Women-Led Integrated Livestock Entrepreneurship Initiative.
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
        <section className="partner-section relative py-8 sm:py-10 md:py-12 bg-manikstu-cream dark:bg-gray-800 overflow-hidden">
          {/* Top tribal border */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 h-6 sm:h-7 bg-repeat-x opacity-70"
            style={{
              backgroundImage: "url('/patterns/tribal-border.png')",
              backgroundSize: "auto 100%",
            }}
          />
          {/* Bottom tribal border (flipped) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-6 sm:h-7 bg-repeat-x -scale-y-100 opacity-70"
            style={{
              backgroundImage: "url('/patterns/tribal-border.png')",
              backgroundSize: "auto 100%",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 text-center">
            {/* Top Pill / Badge */}
            <div className="flex items-center justify-center gap-2">
              <span aria-hidden className="h-px w-8 sm:w-10 bg-manikstu-gold/70 dark:bg-manikstu-gold/80" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-leaf dark:text-manikstu-gold sm:text-sm">
                Our Network
              </p>
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-8 sm:w-10 bg-manikstu-gold/70 dark:bg-manikstu-gold/80" />
            </div>

            <h2 className="mt-2.5 font-heading text-3xl font-bold text-charcoal sm:text-4xl dark:text-white">
              Our <span className="text-manikstu-green">Associations</span>
            </h2>

            {/* Ornamental Divider with Framed Diamond */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
              <div aria-hidden className="relative flex items-center justify-center">
                <span className="h-3.5 w-3.5 rotate-45 border border-manikstu-gold bg-transparent" />
                <span className="absolute h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              </div>
              <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
              <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
            </div>

            <p className="mt-2 text-xs text-grey sm:text-sm dark:text-gray-400">
              Trusted by leading government, institutional, incubation, and CSR organizations across India
            </p>
          </div>

          {/* Horizontal Scrolling Marquee Tracks */}
          <div className="relative mt-6 sm:mt-8 overflow-hidden">
            {/* Left and Right Fade Gradients */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-manikstu-cream dark:from-gray-800 to-transparent z-10"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-manikstu-cream dark:from-gray-800 to-transparent z-10"
            />

            {/* Track 1 */}
            <div className="flex gap-4 animate-marquee py-1.5">
              {[...allPartnersRow1, ...allPartnersRow1, ...allPartnersRow1].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="partner-card flex h-16 w-32 sm:h-18 sm:w-36 items-center justify-center rounded-lg border border-light-grey border-b-[3px] border-b-saura-red/80 bg-white px-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 dark:border-gray-600 dark:border-b-manikstu-gold dark:bg-gray-700 flex-shrink-0"
                >
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={110}
                    height={45}
                    className="max-h-10 w-auto max-w-[100px] object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Track 2 (Reverse) */}
            <div className="mt-3 flex gap-4 animate-marquee-reverse py-1.5">
              {[...allPartnersRow2, ...allPartnersRow2, ...allPartnersRow2].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="partner-card flex h-16 w-32 sm:h-18 sm:w-36 items-center justify-center rounded-lg border border-light-grey border-b-[3px] border-b-saura-red/80 bg-white px-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 dark:border-gray-600 dark:border-b-manikstu-gold dark:bg-gray-700 flex-shrink-0"
                >
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={110}
                    height={45}
                    className="max-h-10 w-auto max-w-[100px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile App */}
        <section className="relative bg-white overflow-hidden">
          {/* Left mandala background */}
          <Image
            src="/patterns/mobile-app-mandala.png"
            alt=""
            aria-hidden
            width={1300}
            height={1300}
            className="pointer-events-none select-none absolute left-[4%] top-[46%] -translate-y-1/2 h-[550px] w-auto max-w-none opacity-[0.20]"
          />

          <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 md:px-8 md:pt-16 md:pb-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Phone mockup ΓÇö branded splash */}
              <div className="flex justify-center">
                <div className="relative w-64 h-[500px] rounded-[2.5rem] border-4 border-charcoal bg-manikstu-cream overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 rounded-b-xl bg-charcoal" />
                  {/* Splash content */}
                  <div className="flex h-full flex-col items-center justify-center px-6 pt-8 text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-manikstu-green/10 ring-2 ring-manikstu-green/30">
                      <Sprout className="h-12 w-12 text-manikstu-leaf" />
                    </div>
                    <p className="mt-4 font-heading text-2xl font-bold tracking-wide text-manikstu-leaf">
                      GOAT CARE
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
                    Goat Care Mobile App
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
                        aria-label="Get it on Google Play"
                        className="inline-flex h-10 items-center gap-2 rounded-md bg-charcoal px-3 text-white transition-colors hover:bg-manikstu-leaf"
                      >
                        {/* Google Play brand triangle */}
                        <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" aria-hidden>
                          <path d="M3.6 1.9C3.2 2.2 3 2.7 3 3.4v17.2c0 .7.2 1.2.6 1.5l.1.1 9.7-9.7v-.1L3.6 1.9z" fill="#5BC9F4" />
                          <path d="M17.1 15.5l-3.2-3.2v-.2l3.2-3.2.1.1 3.8 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2z" fill="#F6B600" />
                          <path d="M17.2 15.4L13.9 12 3.6 22.1c.4.4 1 .4 1.7.1l11.9-6.7" fill="#F44336" />
                          <path d="M17.2 8.6L5.3 1.9c-.7-.4-1.3-.3-1.7 0L13.9 12l3.3-3.4z" fill="#00A64F" />
                        </svg>
                        <span className="flex flex-col leading-tight">
                          <span className="text-[9px] opacity-80">GET IT ON</span>
                          <span className="text-[11px] font-semibold">Google Play</span>
                        </span>
                      </a>
                      <a
                        href="#"
                        aria-label="Download on the App Store"
                        className="inline-flex h-10 items-center gap-2 rounded-md bg-charcoal px-3 text-white transition-colors hover:bg-manikstu-leaf"
                      >
                        {/* Apple brand icon */}
                        <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" fill="currentColor" aria-hidden>
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
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

          {/* Bottom tribal village figures ΓÇö left (mirrored: hut on outer edge) */}
          <Image
            src="/patterns/village-figures.png"
            alt=""
            aria-hidden
            width={2172}
            height={724}
            loading="eager"
            className="pointer-events-none select-none absolute bottom-[12px] left-0 w-[30%] max-w-none h-auto opacity-80 -scale-x-100"
          />
          {/* Bottom tribal village figures ΓÇö right (natural: hut on outer edge) */}
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
          <div className="relative bg-manikstu-leaf py-3 overflow-hidden">
            {/* Left golden tribal art ΓÇö anchored to left edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-no-repeat bg-left bg-contain"
              style={{ backgroundImage: "url('/patterns/golden-tribal-border.png')" }}
            />
            {/* Right golden tribal art ΓÇö anchored to right edge (mirrored) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-no-repeat bg-left bg-contain -scale-x-100"
              style={{ backgroundImage: "url('/patterns/golden-tribal-border.png')" }}
            />
            {/* Centered tagline */}
            <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 sm:px-6 md:px-8">
              <span aria-hidden className="hidden md:block h-px w-16 bg-manikstu-gold/60" />
              <span aria-hidden className="text-manikstu-gold text-lg leading-none">Γùç</span>
              <p className="text-xs font-semibold text-white sm:text-sm md:whitespace-nowrap">
                Building partnerships. Strengthening communities. Transforming livelihoods.
              </p>
              <span aria-hidden className="text-manikstu-gold text-lg leading-none">Γùç</span>
              <span aria-hidden className="hidden md:block h-px w-16 bg-manikstu-gold/60" />
            </div>
          </div>
        </section>

        {/* News */}
        <section className="relative overflow-hidden section-padding bg-manikstu-cream dark:bg-gray-900">
          {/* Top-right mandala corner artwork */}
          <div aria-hidden className="pointer-events-none absolute right-0 top-0 select-none z-0">
            <Image
              src="/patterns/mandala-top-right-corner.png"
              alt=""
              width={504}
              height={560}
              className="h-auto w-24 sm:w-32 md:w-40 lg:w-48 object-contain object-right-top opacity-[0.12] sm:opacity-[0.18] dark:opacity-[0.10]"
            />
          </div>

          {/* Bottom-left mandala artwork */}
          <div aria-hidden className="pointer-events-none absolute left-0 bottom-0 select-none z-0">
            <Image
              src="/patterns/mandala-bottom-left-crop.png"
              alt=""
              width={420}
              height={1024}
              className="h-auto w-20 sm:w-28 md:w-36 lg:w-44 max-h-[85%] object-contain object-left-bottom opacity-[0.12] sm:opacity-[0.18] dark:opacity-[0.10]"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-charcoal font-heading md:text-4xl dark:text-white">
                Latest @ Manikstu
              </h2>
              <Link
                href="/blog"
                className="text-sm font-semibold text-manikstu-green hover:text-manikstu-red transition-colors dark:text-manikstu-gold"
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
                  {/* Image container */}
                  <div className="relative flex h-40 w-full items-center justify-center overflow-hidden bg-manikstu-cream p-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full h-auto w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="h-10 w-10 text-manikstu-green/30" />
                      </div>
                    )}
                    <span
                      className={`absolute top-3 left-3 rounded px-2 py-0.5 text-[10px] font-bold text-white z-10 ${item.categoryColor}`}
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
            <TestimonialsSlider testimonials={testimonials} />
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
