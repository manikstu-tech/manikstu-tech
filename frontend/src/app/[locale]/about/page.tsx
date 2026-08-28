"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Users, Target, Sprout, MapPin, Linkedin, User, Leaf, Lightbulb, Award, Trophy, Medal, Crown, Star } from "lucide-react";
import { getPage } from "@/lib/api";
import { parseContent } from "@/lib/pages";
import type { PageBlock } from "@/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const iconMap: Record<string, any> = { Heart, Users, Target };

export default function AboutPage() {
  const t = useTranslations("About");
  const [vision, setVision] = useState<string[] | null>(null);
  const [mission, setMission] = useState<string[] | null>(null);
  const [timeline, setTimeline] = useState<any[] | null>(null);
  const [values, setValues] = useState<any[] | null>(null);

  useEffect(() => {
    getPage('about')
      .then((res) => {
        const blocks = res.data.blocks;
        const visionBlock = blocks.find((b: any) => b.title === 'Vision');
        if (visionBlock) {
          const c = parseContent(visionBlock);
          if (c?.paragraphs) setVision(c.paragraphs);
        }
        const missionBlock = blocks.find((b: any) => b.title === 'Mission');
        if (missionBlock) {
          const c = parseContent(missionBlock);
          if (c?.paragraphs) setMission(c.paragraphs);
        }
        const timelineBlock = blocks.find((b: any) => b.title === 'Timeline');
        if (timelineBlock) {
          const c = parseContent(timelineBlock);
          if (c) setTimeline(c);
        }
        const valuesBlock = blocks.find((b: any) => b.title === 'Values');
        if (valuesBlock) {
          const c = parseContent(valuesBlock);
          if (c) setValues(c);
        }
      })
      .catch(() => {});
  }, []);

  const fallbackVision = [t("fallbackVision1"), t("fallbackVision2")];
  const fallbackMission = [t("fallbackMission1"), t("fallbackMission2")];
  const fallbackTimeline = [
    { year: "2015", title: t("timeline1Title"), description: t("timeline1Desc") },
    { year: "2018", title: t("timeline2Title"), description: t("timeline2Desc") },
    { year: "2021", title: t("timeline3Title"), description: t("timeline3Desc") },
    { year: "2024", title: t("timeline4Title"), description: t("timeline4Desc") },
  ];
  const fallbackValues = [
    { icon: "Heart", title: t("value1Title"), description: t("value1Desc") },
    { icon: "Target", title: t("value2Title"), description: t("value2Desc") },
    { icon: "Users", title: t("value3Title"), description: t("value3Desc") },
  ];

  const displayVision = vision || fallbackVision;
  const displayMission = mission || fallbackMission;
  const displayTimeline = timeline || fallbackTimeline;
  const displayValues = values || fallbackValues;

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white">
          {/* Top-right mandala corner artwork */}
          <Image
            src="/patterns/mandala-corner-top.png"
            alt=""
            aria-hidden
            width={1370}
            height={1155}
            className="pointer-events-none select-none absolute right-0 top-0 h-auto w-36 sm:w-64 md:w-80 lg:w-[28rem] opacity-[0.14] sm:opacity-[0.18] -scale-x-100"
          />
          <div className="relative mx-auto max-w-7xl px-4 pt-6 pb-8 sm:pt-10 sm:pb-12 md:px-8 md:pt-16 md:pb-14 lg:pt-20 lg:pb-18">
            <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-2">
              {/* Left — copy */}
              <div>
                <div className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <span aria-hidden className="h-px w-8 sm:w-10 bg-manikstu-gold/70" />
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                    {t("pill")}
                  </p>
                  <span aria-hidden className="h-px w-8 sm:w-10 bg-manikstu-gold/70" />
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                </div>

                <h1 className="mt-2 sm:mt-3 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl md:text-5xl lg:text-6xl">
                  {t("heroTitle")}
                  <br />
                  <span className="text-manikstu-green">
                    {t("cornerAccent")}
                  </span>
                </h1>

                <p className="mt-4 sm:mt-6 max-w-lg text-sm sm:text-base md:text-lg leading-relaxed text-grey">
                  {t("heroDesc")}
                </p>

                <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                  <Link
                    href="/collaborate"
                    className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2 shadow-xs"
                  >
                    {t("joinMission")} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#awards"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-white focus:outline-none focus:ring-2 focus:ring-charcoal focus:ring-offset-2"
                  >
                    {t("ourJourney")}
                  </Link>
                </div>

                {/* Micro-statement */}
                <div className="mt-6 sm:mt-8 flex items-center gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10">
                    <Heart className="h-3.5 w-3.5 text-manikstu-green" />
                  </span>
                  <p className="text-xs sm:text-sm text-grey font-medium">
                    {t("microStatement")}
                  </p>
                </div>
              </div>

              {/* Right — visual panel */}
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-saura-red/30 bg-manikstu-cream shadow-sm">
                  {/* Inner dashed border */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-3 rounded-xl border border-dashed border-saura-red/40 z-10"
                  />

                  {/* Motif Background Art */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <Image
                      src="/hero-motif.png"
                      alt="Manikstu Agro Ecosystem"
                      width={800}
                      height={800}
                      priority
                      className="h-full w-full object-contain opacity-85 transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Top-right Est Badge */}
                  <div className="absolute top-5 right-5 z-20 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-manikstu-green shadow-xs border border-manikstu-gold/30">
                    Est. 2015
                  </div>

                  {/* Bottom-left Corner accent */}
                  <div className="absolute bottom-5 left-5 z-20 flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 shadow-sm border border-manikstu-cream">
                    <MapPin className="h-3.5 w-3.5 text-manikstu-green" />
                    <span className="text-xs font-bold text-charcoal">
                      {t("cornerAccent")}
                    </span>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-3 -right-2 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-manikstu-green shadow-lg ring-4 ring-white z-30">
                  <Sprout className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Purpose & Story Section */}
        <section className="relative section-padding bg-manikstu-cream overflow-hidden">
          {/* Top tribal floral border */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 h-6 sm:h-8 bg-repeat-x -scale-y-100 opacity-60"
            style={{
              backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
              backgroundSize: "auto 100%",
            }}
          />

          <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid items-stretch gap-10 lg:gap-12 lg:grid-cols-12">
              {/* Left Column: Story & Vision */}
              <div className="flex flex-col justify-center lg:col-span-5">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                    OUR STORY
                  </p>
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                </div>

                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                  From a Vision to a<br />
                  <span className="text-manikstu-green">Movement</span>
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

                <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-grey">
                  <p>
                    Founded in 2015 in the tribal heartland of Keonjhar, Odisha, Manikstu Agro began as a small initiative to support marginal farmers through goat farming. What started with a handful of farmers has now grown into a movement that is transforming lives across states.
                  </p>
                  <p>
                    We believe in the power of collective growth and sustainable livelihoods. Our journey is rooted in trust, local knowledge, and a deep understanding of rural India.
                  </p>
                </div>
              </div>

              {/* Right Column: Values 2x2 Grid Panel (Tribal / Collaborate Card Design) */}
              <div className="flex flex-col lg:col-span-7">
                <div className="group relative flex h-full flex-col justify-center overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-white/95 p-6 sm:p-7 md:p-8 shadow-sm transition-all duration-300 hover:shadow-xl">
                  {/* Inner dashed border */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
                  />

                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2">
                    {/* People First (Top-Left) */}
                    <div className="flex items-start gap-4 pb-7 sm:pb-7 sm:pr-7 border-b sm:border-r border-manikstu-gold/30">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                        <Users className="h-6 w-6 text-manikstu-green" />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-[-4px] rounded-full border-2 border-dashed border-saura-red/50"
                        />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg sm:text-xl italic font-bold text-manikstu-leaf">
                          People First
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm text-grey leading-relaxed">
                          We place smallholder farmers, tribal women, and rural families at the heart of our mission, ensuring equitable income, fair livestock trade, and holistic community dignity.
                        </p>
                      </div>
                    </div>

                    {/* Integrity (Top-Right) */}
                    <div className="flex items-start gap-4 pb-7 pt-7 sm:pt-0 sm:pb-7 sm:pl-7 border-b border-manikstu-gold/30">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                        <Heart className="h-6 w-6 text-manikstu-green" />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-[-4px] rounded-full border-2 border-dashed border-saura-red/50"
                        />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg sm:text-xl italic font-bold text-manikstu-leaf">
                          Integrity & Trust
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm text-grey leading-relaxed">
                          We uphold uncompromising honesty, ethical breed care, fair market price guarantees, and deep accountability to every farmer partner, SHG group, and institution.
                        </p>
                      </div>
                    </div>

                    {/* Sustainability (Bottom-Left) */}
                    <div className="flex items-start gap-4 pb-7 pt-7 sm:pb-0 sm:pt-7 sm:pr-7 border-b sm:border-b-0 sm:border-r border-manikstu-gold/30">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                        <Leaf className="h-6 w-6 text-manikstu-green" />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-[-4px] rounded-full border-2 border-dashed border-saura-red/50"
                        />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg sm:text-xl italic font-bold text-manikstu-leaf">
                          Sustainability
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm text-grey leading-relaxed">
                          We promote eco-friendly goat rearing, indigenous forage cultivation, and climate-resilient farming models that preserve natural biodiversity for decades to come.
                        </p>
                      </div>
                    </div>

                    {/* Innovation (Bottom-Right) */}
                    <div className="flex items-start gap-4 pt-7 sm:pt-7 sm:pl-7">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                        <Lightbulb className="h-6 w-6 text-manikstu-green" />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-[-4px] rounded-full border-2 border-dashed border-saura-red/50"
                        />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg sm:text-xl italic font-bold text-manikstu-leaf">
                          Smart Innovation
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm text-grey leading-relaxed">
                          We harness mobile vet tele-diagnostics, genetic selective breeding, and digital farm management to build scalable, modern solutions for rural India's challenges.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom tribal floral border */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-6 sm:h-8 bg-repeat-x opacity-60"
            style={{
              backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
              backgroundSize: "auto 100%",
            }}
          />
        </section>

        {/* Awards & Recognition */}
        {(() => {
          const awards = [
            {
              year: "2024",
              icon: Crown,
              title: "Mann Ki Baat Feature",
              description: 'Featured in Prime Minister Narendra Modi\'s "Mann ki Baat", 2024',
            },
            {
              year: "2023",
              icon: Trophy,
              title: "Pride of Odisha",
              description: "Pride of Odisha 2023 by Sambad",
            },
            {
              year: "2023",
              icon: Sprout,
              title: "Agri Startup of the Year",
              description: "Agri Startup of the Year 2023 by OCF",
            },
            {
              year: "2022",
              icon: Medal,
              title: "Odisha StartUp Carnival",
              description: "Top 5 in Odisha StartUp Carnival in 2022 organized by AIC – Nalanda",
            },
            {
              year: "2022",
              icon: Award,
              title: "Shakti Awards",
              description: "Shakti Awards 2022 by FICCI",
            },
            {
              year: "2021",
              icon: Star,
              title: "40 Under 40",
              description: 'One of the top 40 Startups in India in "40 under 40"',
            },
          ];

          return (
            <section id="awards" className="relative pt-14 pb-4 sm:pt-18 md:pt-20 bg-white overflow-hidden">
              <div className="relative z-10 mx-auto max-w-6xl">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-2">
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
                      Our Awards
                    </p>
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                  </div>

                  <h2 className="mx-auto mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                    Awards & <span className="text-manikstu-green">Recognition</span>
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {awards.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-white/95 p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-xl"
                      >
                        {/* Inner dashed border */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
                        />

                        <div className="relative z-10 flex flex-col items-center text-center">
                          {/* Dashed-ring icon badge */}
                          <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                            <Icon className="h-7 w-7 text-manikstu-green transition-transform duration-300 group-hover:scale-110" />
                            <span
                              aria-hidden
                              className="pointer-events-none absolute inset-[-5px] rounded-full border-2 border-dashed border-saura-red/50"
                            />
                          </div>

                          <span className="inline-block rounded-full bg-manikstu-green/10 px-3.5 py-0.5 font-heading text-xs font-bold text-manikstu-green ring-1 ring-manikstu-green/30 mb-3">
                            {item.year}
                          </span>

                          <h3 className="font-heading text-lg italic font-bold text-manikstu-leaf group-hover:text-manikstu-green transition-colors">
                            {item.title}
                          </h3>

                          {/* Line-diamond-line ornament */}
                          <div className="mt-2.5 mb-3 flex items-center justify-center gap-1.5">
                            <span aria-hidden className="h-px w-5 bg-manikstu-gold" />
                            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                            <span aria-hidden className="h-px w-5 bg-manikstu-gold" />
                          </div>

                          <p className="text-xs sm:text-sm text-grey leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })()}

        {/* Leadership + Team */}
        {(() => {
          const leaders = [
            {
              name: "Jayanti Mahapatra",
              role: "Chief Executive Officer",
              tag: "CEO",
              photo: "",
              bio: "Pioneering sustainable rural development and livestock empowerment across Odisha.",
            },
            {
              name: "Biren Sahoo",
              role: "Chief Operating Officer",
              tag: "COO",
              photo: "",
              bio: "Leading field operations, supply chain integrity, and farmer community engagement.",
            },
            {
              name: "Bhawanindhu Padhi",
              role: "Chief Business Officer",
              tag: "CBO",
              photo: "",
              bio: "Driving strategic partnerships, commercial market reach, and enterprise growth.",
            },
            {
              name: "Om Singh",
              role: "Chief Financial Officer",
              tag: "CFO",
              photo: "",
              bio: "Ensuring financial governance, sustainable capital strategy, and investor relations.",
            },
          ];
          const executionEngine = [
            {
              name: "Manoj Sahoo",
              role: "Marketing Manager- Goat Bank",
              tag: "Marketing",
              photo: "",
              bio: "With over 15 years of experience in rural sales, Manoj is a vital member of the team driving farmer outreach and market connectivity.",
            },
            {
              name: "Sanatan Sahu",
              role: "Operation Manager- Feed & Fodder Division",
              tag: "Operations",
              photo: "",
              bio: "Sanatan Sahu, a founding member of the company, has been with the organization since inception driving feed and fodder operations.",
            },
            {
              name: "Sandhya Singh",
              role: "Human Resource Manager",
              tag: "HR",
              photo: "",
              bio: "Sandhya Singh is a passionate HR professional who effectively manages the diverse rural talent and organizational culture.",
            },
            {
              name: "Sailesh Nayak",
              role: "Sales Manager- Franchise Business",
              tag: "Sales",
              photo: "",
              bio: "Sailesh Nayak is a highly energetic professional managing the Manikstu Goat Bank franchise business expansion.",
            },
          ];
          const team = [
            { name: "Naresh Sahu",            role: "Marketing Executive - Goat Bank",                     photo: "" },
            { name: "Chulamani Sahu",         role: "Sr. Vet",                                             photo: "" },
            { name: "Jeetendra Kumar Behera", role: "Jr. PSA",                                             photo: "" },
            { name: "Sabita Bag",             role: "Accounts Executive",                                  photo: "" },
            { name: "Geeta Sahu",             role: "Jr. PSA",                                             photo: "" },
            { name: "Priyadarshini Rout",     role: "Accountant",                                          photo: "" },
            { name: "Monalisa Sahu",          role: "Executive Trainee Officer – Goat Bank Division",      photo: "" },
            { name: "Sagar Juad",             role: "Jr. PSA",                                             photo: "" },
            { name: "Bharatee Nag",           role: "Jr. PSA",                                             photo: "" },
            { name: "Kamana Nag",             role: "Jr. PSA",                                             photo: "" },
            { name: "Rohini Rana",            role: "Jr. PSA",                                             photo: "" },
            { name: "Champa Bag",             role: "Jr. PSA",                                             photo: "" },
            { name: "Jashoda Bag",            role: "Jr. PSA",                                             photo: "" },
            { name: "Menaka Bag",             role: "Jr. PSA",                                             photo: "" },
            { name: "Kunti Danguri",          role: "Jr. PSA",                                             photo: "" },
            { name: "Nanda Behera",           role: "Field Supervisor",                                    photo: "" },
            { name: "Sephali Bag",            role: "Field Staff",                                         photo: "" },
            { name: "Anita Bag",              role: "Field Staff",                                         photo: "" },
            { name: "Kulabati Juad",          role: "Field Staff",                                         photo: "" },
            { name: "Kalpa Bachha",           role: "Farm Executive",                                      photo: "" },
            { name: "Salkhan Tudu",           role: "Field Executive",                                     photo: "" },
            { name: "Subhashri Samal",        role: "Sales Coordinator",                                   photo: "" },
            { name: "Sasmita Parida",         role: "Sales Coordinator",                                   photo: "" },
            { name: "Anil Kumar Pati",        role: "Sales Executive Position – Kendujhar District",       photo: "" },
          ];
          const advisors = [
            {
              name: "Dr. Deepak Ahiwale",
              role: "Technical & Medical Advisor",
              tag: "Technical",
              photo: "",
              bio: "A Veteran Doctor with specialization into Animal Science having 25 years of experience with NARI.",
            },
            {
              name: "Mr. Sujeet Kumar",
              role: "Statutory & Legal Advisor",
              tag: "Legal",
              photo: "",
              bio: "MBA from Oxford, second master's from Harvard, 20 years in development sector (UNDP, WEF). Now a Supreme Court legal practitioner and Rajya Sabha member.",
            },
            {
              name: "Dr. C Vijaya",
              role: "Project & Compliance Advisor",
              tag: "Compliance",
              photo: "",
              bio: "A Veteran of the development sector with PhD in Statistics, Retd. Deputy Director of MICM & Director of Corporate Society.",
            },
          ];
          const tagColor = (t: string) =>
            ({
              CEO: "bg-manikstu-green",
              CBO: "bg-manikstu-gold",
              COO: "bg-saura-red",
              CFO: "bg-manikstu-leaf",
              Marketing: "bg-manikstu-green",
              Operations: "bg-manikstu-leaf",
              HR: "bg-manikstu-gold",
              Sales: "bg-saura-red",
              Technical: "bg-manikstu-green",
              Legal: "bg-saura-red",
              Compliance: "bg-manikstu-gold",
            } as Record<string, string>)[t] ?? "bg-manikstu-green";
          return (
            <>
              <section className="pt-8 sm:pt-12 pb-16 sm:pb-20 md:pb-24 bg-white">
              <div className="mx-auto max-w-6xl">
                {/* Leadership header */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                      Our Leadership
                    </p>
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                  </div>
                  <h2 className="mx-auto mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                    Leading with{" "}
                    <span className="text-manikstu-green">Purpose</span>
                  </h2>
                </div>

                {/* Leader cards */}
                <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {leaders.map((l) => (
                    <article
                      key={l.name}
                      className="group flex flex-col rounded-2xl border border-manikstu-gold/20 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all"
                    >
                      {/* Image banner container like Latest @ Manikstu style */}
                      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden bg-manikstu-cream/70">
                        {l.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={l.photo}
                            alt={l.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-manikstu-cream/40 to-manikstu-cream">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/80 shadow-inner">
                              <User className="h-12 w-12 text-manikstu-green/40 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                          </div>
                        )}
                        <span
                          className={`absolute left-3 top-3 rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm z-10 ${tagColor(l.tag)}`}
                        >
                          {l.tag}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col items-center justify-between p-5 text-center">
                        <div className="flex flex-col items-center">
                          <h3 className="font-heading text-lg font-bold text-charcoal transition-colors group-hover:text-manikstu-green">
                            {l.name}
                          </h3>
                          <p className="mt-1 text-xs font-semibold text-manikstu-green">
                            {l.role}
                          </p>
                          <p className="mt-3 text-xs leading-relaxed text-grey">
                            {l.bio}
                          </p>
                        </div>

                        <a
                          href="#"
                          aria-label={`${l.name} on LinkedIn`}
                          className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>

                {/* The Execution Engine (Key Management) header */}
                <div className="mt-16 text-center sm:mt-20">
                  <div className="flex items-center justify-center gap-2">
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                      Key Management
                    </p>
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                  </div>
                  <h2 className="mx-auto mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                    The Execution <span className="text-manikstu-green">Engine</span>
                  </h2>
                </div>

                {/* Execution Engine cards */}
                <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {executionEngine.map((l) => (
                    <article
                      key={l.name}
                      className="group flex flex-col rounded-2xl border border-manikstu-gold/20 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all"
                    >
                      {/* Image banner container like Latest @ Manikstu style */}
                      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden bg-manikstu-cream/70">
                        {l.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={l.photo}
                            alt={l.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-manikstu-cream/40 to-manikstu-cream">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/80 shadow-inner">
                              <User className="h-12 w-12 text-manikstu-green/40 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                          </div>
                        )}
                        <span
                          className={`absolute left-3 top-3 rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm z-10 ${tagColor(l.tag)}`}
                        >
                          {l.tag}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col items-center justify-between p-5 text-center">
                        <div className="flex flex-col items-center">
                          <h3 className="font-heading text-lg font-bold text-charcoal transition-colors group-hover:text-manikstu-green">
                            {l.name}
                          </h3>
                          <p className="mt-1 text-xs font-semibold text-manikstu-green">
                            {l.role}
                          </p>
                          <p className="mt-3 text-xs leading-relaxed text-grey">
                            {l.bio}
                          </p>
                        </div>

                        <a
                          href="#"
                          aria-label={`${l.name} on LinkedIn`}
                          className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Team header */}
                <div className="mt-16 text-center sm:mt-20">
                  <div className="flex items-center justify-center gap-2">
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                      Our Team
                    </p>
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                  </div>
                  <h2 className="mx-auto mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                    Our Amazing <span className="text-manikstu-green">Team</span>
                  </h2>
                </div>

                {/* Team cards — 6 members per row with round photo design */}
                <div className="mt-10 grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
                  {team.map((m) => (
                    <div key={m.name} className="group text-center flex flex-col items-center">
                      <div className="relative mx-auto aspect-square w-24 sm:w-28 overflow-hidden rounded-full bg-manikstu-cream ring-2 ring-manikstu-cream/80 transition-transform duration-300 group-hover:scale-105 group-hover:ring-manikstu-green/40 shadow-xs">
                        {m.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={m.photo}
                            alt={m.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-manikstu-cream/60 to-manikstu-cream">
                            <User className="h-10 w-10 text-manikstu-green/35 transition-transform duration-300 group-hover:scale-110" />
                          </div>
                        )}
                      </div>

                      <h4 className="mt-3 font-heading text-xs sm:text-sm font-bold text-charcoal leading-snug group-hover:text-manikstu-green transition-colors">
                        {m.name}
                      </h4>
                      <p className="mt-0.5 text-[11px] text-grey leading-tight">
                        {m.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* The Advisors (Cream background with tribal floral borders) */}
            <section className="relative section-padding bg-manikstu-cream overflow-hidden">
              {/* Top-left (left upper corner) mandala */}
              <Image
                src="/patterns/mandala-corner-top.png"
                alt=""
                aria-hidden
                width={1370}
                height={1155}
                className="pointer-events-none select-none absolute left-0 top-0 h-auto w-36 sm:w-48 md:w-60 lg:w-72 opacity-[0.16] sm:opacity-[0.20]"
              />

              {/* Bottom-right (right bottom corner) mandala */}
              <Image
                src="/patterns/mandala-corner-top.png"
                alt=""
                aria-hidden
                width={1370}
                height={1155}
                className="pointer-events-none select-none absolute right-0 bottom-0 h-auto w-36 sm:w-48 md:w-60 lg:w-72 opacity-[0.16] sm:opacity-[0.20] -scale-x-100 -scale-y-100"
              />

              {/* Top tribal floral border */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 top-0 h-6 sm:h-8 bg-repeat-x -scale-y-100 opacity-60"
                style={{
                  backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
                  backgroundSize: "auto 100%",
                }}
              />

              <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
                {/* The Advisors header */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                      Strategic Guidance
                    </p>
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                  </div>
                  <h2 className="mx-auto mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                    The <span className="text-manikstu-green">Advisors</span>
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
                </div>

                {/* Advisors cards — 3 columns grid */}
                <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                  {advisors.map((l) => (
                    <article
                      key={l.name}
                      className="group flex flex-col rounded-2xl border border-manikstu-gold/20 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all"
                    >
                      {/* Image banner container like Latest @ Manikstu style */}
                      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden bg-manikstu-cream/70">
                        {l.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={l.photo}
                            alt={l.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-manikstu-cream/40 to-manikstu-cream">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/80 shadow-inner">
                              <User className="h-12 w-12 text-manikstu-green/40 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                          </div>
                        )}
                        <span
                          className={`absolute left-3 top-3 rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm z-10 ${tagColor(l.tag)}`}
                        >
                          {l.tag}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col items-center justify-between p-5 text-center">
                        <div className="flex flex-col items-center">
                          <h3 className="font-heading text-lg font-bold text-charcoal transition-colors group-hover:text-manikstu-green">
                            {l.name}
                          </h3>
                          <p className="mt-1 text-xs font-semibold text-manikstu-green">
                            {l.role}
                          </p>
                          <p className="mt-3 text-xs leading-relaxed text-grey">
                            {l.bio}
                          </p>
                        </div>

                        <a
                          href="#"
                          aria-label={`${l.name} on LinkedIn`}
                          className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Bottom tribal floral border */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 bottom-0 h-6 sm:h-8 bg-repeat-x opacity-60"
                style={{
                  backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
                  backgroundSize: "auto 100%",
                }}
              />
            </section>
          </>
        );
        })()}

      </main>
      <Footer />
    </>
  );
}
