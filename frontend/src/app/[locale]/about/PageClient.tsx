"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Users, Target, Sprout, MapPin, Linkedin, Mail, User, Leaf, Lightbulb, Award, Trophy, Medal, Crown, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getPage } from "@/lib/api";
import { parseContent } from "@/lib/pages";
import type { PageBlock } from "@/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

const iconMap: Record<string, any> = { Heart, Users, Target };

type AwardItem = {
  year: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

/**
 * Awards row that auto-scrolls slowly (readable pace) and loops seamlessly.
 * Pauses on hover / touch so the reader can stop on any card, and still
 * supports manual horizontal scrolling. Respects reduced-motion.
 */
function AwardsCarousel({ awards }: { awards: AwardItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  // Render the list twice so the scroll can wrap around seamlessly.
  const loop = [...awards, ...awards];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const SPEED = 28; // px per second — slow enough to read comfortably
    const TICK = 16; // ms between steps (~60fps)
    let last = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += SPEED * dt;
        // First copy ends at half the scroll width; wrap back seamlessly.
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
    }, TICK);
    return () => window.clearInterval(id);
  }, []);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  return (
    <div
      ref={scrollRef}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      className="flex gap-6 overflow-x-auto pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {loop.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={`${item.title}-${i}`}
            aria-hidden={i >= awards.length}
            className="group relative flex w-[270px] sm:w-[320px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-white/95 pt-5 pb-5 px-5 sm:pt-6 sm:pb-6 sm:px-6 shadow-sm transition-all duration-300 hover:shadow-xl"
          >
            {/* Inner dashed border */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
            />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Dashed-ring icon badge */}
              <div className="relative mb-2.5 sm:mb-4 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-manikstu-green transition-transform duration-300 group-hover:scale-110" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-[-3.5px] sm:inset-[-5px] rounded-full border-2 border-dashed border-saura-red/50"
                />
              </div>

              <span className="inline-block rounded-full bg-manikstu-green/10 px-2.5 py-0.5 sm:px-3.5 sm:py-0.5 font-heading text-[10px] sm:text-xs font-bold text-manikstu-green ring-1 ring-manikstu-green/30 mb-2 sm:mb-3">
                {item.year}
              </span>

              <h3 className="font-heading text-base sm:text-lg italic font-bold text-manikstu-leaf group-hover:text-manikstu-green transition-colors leading-snug">
                {item.title}
              </h3>

              {/* Line-diamond-line ornament */}
              <div className="mt-1.5 mb-2 sm:mt-2.5 sm:mb-3 flex items-center justify-center gap-1.5">
                <span aria-hidden className="h-px w-4 sm:w-5 bg-manikstu-gold" />
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-4 sm:w-5 bg-manikstu-gold" />
              </div>

              <p className="text-[11px] sm:text-sm text-grey leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

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

  const fallbackVision = [t("visionP1"), t("visionP2"), t("visionP3")];
  const fallbackMission = [t("missionP1"), t("missionP2"), t("missionP3")];
  const fallbackTimeline = [
    { year: "2015", title: t("timeline2015Title"), description: t("timeline2015Desc") },
    { year: "2018", title: t("timeline2018Title"), description: t("timeline2018Desc") },
    { year: "2020", title: t("timeline2020Title"), description: t("timeline2020Desc") },
    { year: "2022", title: t("timeline2022Title"), description: t("timeline2022Desc") },
    { year: "2024", title: t("timeline2024Title"), description: t("timeline2024Desc") },
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
        <PageHero>
          {/* Left, copy */}
          <div>
            <div className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                {t("pill")}
              </p>
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            </div>

            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
              {t("heroTitle").split(",")[0]},
              <br />
              <span className="text-manikstu-green">
                {t("heroTitle").split(",")[1]?.trim() || t("cornerAccent")}.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-grey">
              {t("heroDesc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/collaborate"
                className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                {t("joinMission")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#awards"
                className="inline-flex items-center gap-2 rounded-full border-2 border-manikstu-green bg-white px-6 py-3 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                {t("ourJourney")}
              </Link>
            </div>

            {/* Micro-statement */}
            <div className="mt-8 flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                <Heart className="h-4 w-4 shrink-0 text-manikstu-green" />
              </span>
              <p className="text-sm text-grey">
                {t("microStatement")}
              </p>
            </div>
          </div>

          {/* Right, visual panel */}
          <div className="relative lg:self-start lg:mt-2 -mt-3 sm:-mt-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-manikstu-cream shadow-lg ring-1 ring-black/5">
              {/* Community gathering photo */}
              <Image
                src="/about-hero.webp"
                alt={t("heroTitle")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Corner accent */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 shadow-sm">
                <MapPin className="h-4 w-4 text-manikstu-green" />
                <span className="text-xs font-semibold text-charcoal">
                  {t("cornerAccent")}
                </span>
              </div>
            </div>

            {/* Small floating badge */}
            <div className="absolute -bottom-4 -right-2 hidden h-14 w-14 items-center justify-center rounded-full bg-manikstu-green shadow-md md:flex">
              <Sprout className="h-6 w-6 text-white" />
            </div>
          </div>
        </PageHero>

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
                    {t("ourStoryPill")}
                  </p>
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                </div>

                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                  {t("storyHeadline1")}<br />
                  <span className="text-manikstu-green">{t("storyHeadline2")}</span>
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
                    {t("storyP1")}
                  </p>
                  <p>
                    {t("storyP2")}
                  </p>
                </div>
              </div>

              {/* Right Column: Values 2x2 Grid Panel (Tribal / Collaborate Card Design) */}
              <div className="flex flex-col lg:col-span-7">
                <div className="group relative flex h-full flex-col justify-center overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-white/95 p-6 sm:p-7 md:p-8 shadow-sm transition-all duration-300 hover:shadow-xl">
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2">
                    {/* People First (Top-Left) */}
                    <div className="flex items-start gap-4 pb-7 sm:pb-7 sm:pr-7 border-b sm:border-r border-manikstu-gold/30">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                        <Users className="h-6 w-6 text-manikstu-green" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg sm:text-xl italic font-bold text-manikstu-leaf">
                          {t("valuePeopleFirst")}
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm text-grey leading-relaxed">
                          {t("valuePeopleFirstDesc")}
                        </p>
                      </div>
                    </div>

                    {/* Integrity (Top-Right) */}
                    <div className="flex items-start gap-4 pb-7 pt-7 sm:pt-0 sm:pb-7 sm:pl-7 border-b border-manikstu-gold/30">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                        <Heart className="h-6 w-6 text-manikstu-green" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg sm:text-xl italic font-bold text-manikstu-leaf">
                          {t("valueIntegrity")}
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm text-grey leading-relaxed">
                          {t("valueIntegrityDesc")}
                        </p>
                      </div>
                    </div>

                    {/* Sustainability (Bottom-Left) */}
                    <div className="flex items-start gap-4 pb-7 pt-7 sm:pb-0 sm:pt-7 sm:pr-7 border-b sm:border-b-0 sm:border-r border-manikstu-gold/30">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                        <Leaf className="h-6 w-6 text-manikstu-green" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg sm:text-xl italic font-bold text-manikstu-leaf">
                          {t("valueSustainability")}
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm text-grey leading-relaxed">
                          {t("valueSustainabilityDesc")}
                        </p>
                      </div>
                    </div>

                    {/* Innovation (Bottom-Right) */}
                    <div className="flex items-start gap-4 pt-7 sm:pt-7 sm:pl-7">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                        <Lightbulb className="h-6 w-6 text-manikstu-green" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg sm:text-xl italic font-bold text-manikstu-leaf">
                          {t("valueInnovation")}
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm text-grey leading-relaxed">
                          {t("valueInnovationDesc")}
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
              title: t("award2024Title"),
              description: t("award2024Desc"),
            },
            {
              year: "2023",
              icon: Trophy,
              title: t("award2023PrideTitle"),
              description: t("award2023PrideDesc"),
            },
            {
              year: "2023",
              icon: Sprout,
              title: t("award2023AgriTitle"),
              description: t("award2023AgriDesc"),
            },
            {
              year: "2022",
              icon: Medal,
              title: t("award2022CarnivalTitle"),
              description: t("award2022CarnivalDesc"),
            },
            {
              year: "2022",
              icon: Award,
              title: t("award2022ShaktiTitle"),
              description: t("award2022ShaktiDesc"),
            },
            {
              year: "2021",
              icon: Star,
              title: t("award2021Title"),
              description: t("award2021Desc"),
            },
          ];

          return (
            <section id="awards" className="relative pt-8 pb-3 sm:pt-16 md:pt-20 bg-white overflow-hidden">
              <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
                <div className="text-center mb-6 sm:mb-12">
                  <div className="flex items-center justify-center gap-2">
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
                      {t("awardsPill")}
                    </p>
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                  </div>

                  <h2 className="mx-auto mt-2.5 sm:mt-4 font-heading text-2xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                    Awards & <span className="text-manikstu-green">Recognition</span>
                  </h2>

                  {/* Ornamental Divider with Framed Diamond */}
                  <div className="mt-2.5 sm:mt-4 flex items-center justify-center gap-2">
                    <span aria-hidden className="h-px w-10 sm:w-20 bg-manikstu-gold/70" />
                    <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                    <div aria-hidden className="relative flex items-center justify-center">
                      <span className="h-3 sm:h-3.5 w-3 sm:w-3.5 rotate-45 border border-manikstu-gold bg-transparent" />
                      <span className="absolute h-1 sm:h-1.5 w-1 sm:w-1.5 rotate-45 bg-manikstu-gold" />
                    </div>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                    <span aria-hidden className="h-px w-10 sm:w-20 bg-manikstu-gold/70" />
                  </div>
                </div>

                <AwardsCarousel awards={awards} />
              </div>
            </section>
          );
        })()}

        {/* Leadership + Team */}
        {(() => {
          const leaders = [
            {
              name: "Biren Sahoo",
              role: "Founder and Managing Director",
              tag: "FMD",
              photo: "",
              bio: "Pioneering sustainable rural development and livestock empowerment across Odisha.",
            },
            {
              name: "Jayanti Mahapatra",
              role: "Chief Executive Officer",
              tag: "CEO",
              photo: "",
              bio: "Driving strategic vision, business growth, and organizational excellence.",
            },
            {
              name: "Biswabandhu Padhi",
              role: "Director- Growth",
              tag: "Growth",
              photo: "/team/biswabandhu-padhi.png",
              objectPosition: "center 18%",
              bio: "Driving strategic partnerships, commercial market reach, and enterprise growth.",
            },
            {
              name: "Om Singh",
              role: "SVP Accounts",
              tag: "Accounts",
              photo: "/team/om-singh.jpg",
              bio: "Ensuring financial governance, sustainable capital strategy, and investor relations.",
            },
            {
              name: "Sidhant Mohanty",
              role: "Vice President — Finance & Strategy",
              tag: "VP Finance",
              photo: "/team/sidhant-mohanty.jpg",
              bio: "Building robust financial systems, expanding investor reach, and strengthening farmer finance support.",
            },
          ];
          const executionEngine = [
            {
              name: "Aftab Khan",
              role: "AVP Tech & Operations",
              tag: "Tech & Ops",
              photo: "/team/aftab-khan.jpeg",
              bio: "Technology leader driving digital transformation, product innovation, and scalable technology strategy.",
            },
            {
              name: "Suman Sourav",
              role: "Assistant Vice President — Infrastructure & Quality",
              tag: "Infrastructure",
              photo: "/team/suman-sourav.jpg",
              bio: "B.Tech Civil Engineering from IGIT Sarang. 6+ years in structural design and quality maintenance across reputed engineering organizations.",
            },
            {
              name: "Manoj Sahoo",
              role: "Manager Sales",
              tag: "Sales",
              photo: "/team/manoj-sahoo.jpg",
              objectPosition: "center 30%",
              bio: "With over 15 years of experience in rural sales, Manoj is a vital member of the team driving farmer outreach and market connectivity.",
            },
            {
              name: "Rashmi Dash",
              role: "Manager HR",
              tag: "HR",
              photo: "/team/rashmi-dash.jpg",
              bio: "Rashmi Dash is a passionate HR professional who effectively manages the diverse rural talent and organizational culture.",
            },
            {
              name: "Nabin Meher",
              role: "Sr. Manager-Sales",
              tag: "Sales",
              photo: "",
              bio: "Nabin Meher is a highly energetic professional managing the Manikstu Goat Bank franchise business expansion.",
            },
          ];
          const advisors = [
            {
              name: "Dr. Deepak Ahiwale",
              role: "Technical & Medical Advisor",
              tag: "Technical",
              photo: "/team/deepak-ahiwale.png",
              objectPosition: "center 30%",
              bio: "A Veteran Doctor with specialization into Animal Science having 25 years of experience with NARI.",
            },
            {
              name: "Mr. Sujeet Kumar",
              role: "Statutory & Legal Advisor",
              tag: "Legal",
              photo: "/team/sujeet-kumar.jpg",
              bio: "MBA from Oxford, second master's from Harvard, 20 years in development sector (UNDP, WEF). Now a Supreme Court legal practitioner and Rajya Sabha member.",
            },
            {
              name: "Dr. C Vijaya",
              role: "Project & Compliance Advisor",
              tag: "Compliance",
              photo: "/team/c-vijaya.png",
              objectPosition: "center 30%",
              bio: "A Veteran of the development sector with PhD in Statistics, Retd. Deputy Director of MICM & Director of Corporate Society.",
            },
            {
              name: "Swati Sinha",
              role: "Board Advisor",
              tag: "Board",
              photo: "/team/swati-sinha.jpg",
              bio: "Board advisor supporting strategic governance and organizational growth.",
            },
          ];
          const tagColor = (t: string) =>
            ({
              FMD: "bg-manikstu-green",
              CEO: "bg-manikstu-green",
              Growth: "bg-manikstu-gold",
              Accounts: "bg-manikstu-leaf",
              Marketing: "bg-manikstu-green",
              "Tech & Ops": "bg-manikstu-gold",
              Operations: "bg-manikstu-leaf",
              Infrastructure: "bg-manikstu-gold",
              HR: "bg-manikstu-gold",
              Sales: "bg-saura-red",
              Technical: "bg-manikstu-green",
              Legal: "bg-saura-red",
              Compliance: "bg-manikstu-gold",
              Board: "bg-manikstu-green",
            } as Record<string, string>)[t] ?? "bg-manikstu-green";
          return (
            <>
              <section className="pt-6 sm:pt-12 pb-12 sm:pb-20 md:pb-24 bg-white px-4 md:px-8">
              <div className="mx-auto max-w-7xl">
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
                  <h2 className="mx-auto mt-2.5 sm:mt-4 font-heading text-2xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                    Leading with{" "}
                    <span className="text-manikstu-green">Purpose</span>
                  </h2>
                </div>

                {/* Leader cards */}
                <div className="mt-6 sm:mt-10 grid gap-3.5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                  {leaders.map((l) => (
                    <article
                      key={l.name}
                      className="group flex flex-col rounded-xl sm:rounded-2xl border border-manikstu-gold/20 bg-white shadow-xs sm:shadow-sm overflow-hidden hover:shadow-md transition-all"
                    >
                      {/* Image banner container */}
                      <div className="relative flex h-36 sm:h-44 md:h-52 w-full items-center justify-center overflow-hidden bg-manikstu-cream/70">
                        {l.photo ? (
                          <Image
                            src={l.photo}
                            alt={l.name}
                            fill
                            loading="eager"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            style={{ objectPosition: (l as { objectPosition?: string }).objectPosition }}
                            className={`${(l as { fit?: string }).fit === "contain" ? "object-contain" : "object-cover object-top"} transition-transform duration-300 group-hover:scale-105`}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-manikstu-cream/40 to-manikstu-cream">
                            <div className="flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-white/80 shadow-inner">
                              <User className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-manikstu-green/40 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                          </div>
                        )}
                        <span
                          className={`absolute left-2.5 bottom-2.5 sm:left-3 sm:bottom-3 rounded px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white shadow-sm z-10 ${tagColor(l.tag)}`}
                        >
                          {l.tag}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col items-center justify-between p-3.5 sm:p-5 text-center">
                        <div className="flex flex-col items-center">
                          <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal transition-colors group-hover:text-manikstu-green">
                            {l.name}
                          </h3>
                          <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs font-semibold text-manikstu-green">
                            {l.role}
                          </p>
                          <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs leading-relaxed text-grey">
                            {l.bio}
                          </p>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-center gap-2">
                          <a
                            href="#"
                            aria-label={`${l.name} on LinkedIn`}
                            className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green"
                          >
                            <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </a>
                          <a
                            href="#"
                            aria-label={`Email ${l.name}`}
                            className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green"
                          >
                            <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* The Execution Engine (Key Management) header */}
                <div className="mt-10 sm:mt-16 text-center sm:mt-20">
                  <div className="flex items-center justify-center gap-2">
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                      Key Management
                    </p>
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                  </div>
                  <h2 className="mx-auto mt-2.5 sm:mt-4 font-heading text-2xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                    The Execution <span className="text-manikstu-green">Engine</span>
                  </h2>
                </div>

                {/* Execution Engine cards */}
                <div className="mt-6 sm:mt-10 grid gap-3.5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                  {executionEngine.map((l) => (
                    <article
                      key={l.name}
                      className="group flex flex-col rounded-xl sm:rounded-2xl border border-manikstu-gold/20 bg-white shadow-xs sm:shadow-sm overflow-hidden hover:shadow-md transition-all"
                    >
                      {/* Image banner container */}
                      <div className="relative flex h-36 sm:h-44 md:h-52 w-full items-center justify-center overflow-hidden bg-manikstu-cream/70">
                        {l.photo ? (
                          <Image
                            src={l.photo}
                            alt={l.name}
                            fill
                            loading="eager"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            style={{ objectPosition: (l as { objectPosition?: string }).objectPosition }}
                            className={`${(l as { fit?: string }).fit === "contain" ? "object-contain" : "object-cover object-top"} transition-transform duration-300 group-hover:scale-105`}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-manikstu-cream/40 to-manikstu-cream">
                            <div className="flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-white/80 shadow-inner">
                              <User className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-manikstu-green/40 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                          </div>
                        )}
                        <span
                          className={`absolute left-2.5 bottom-2.5 sm:left-3 sm:bottom-3 rounded px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white shadow-sm z-10 ${tagColor(l.tag)}`}
                        >
                          {l.tag}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col items-center justify-between p-3.5 sm:p-5 text-center">
                        <div className="flex flex-col items-center">
                          <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal transition-colors group-hover:text-manikstu-green">
                            {l.name}
                          </h3>
                          <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs font-semibold text-manikstu-green">
                            {l.role}
                          </p>
                          <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs leading-relaxed text-grey">
                            {l.bio}
                          </p>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-center gap-2">
                          <a
                            href="#"
                            aria-label={`${l.name} on LinkedIn`}
                            className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green"
                          >
                            <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </a>
                          <a
                            href="#"
                            aria-label={`Email ${l.name}`}
                            className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green"
                          >
                            <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </a>
                        </div>
                      </div>
                    </article>
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
                  <h2 className="mx-auto mt-2.5 sm:mt-4 font-heading text-2xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                    The <span className="text-manikstu-green">Advisors</span>
                  </h2>

                  {/* Ornamental Divider with Framed Diamond */}
                  <div className="mt-2.5 sm:mt-4 flex items-center justify-center gap-2">
                    <span aria-hidden className="h-px w-10 sm:w-20 bg-manikstu-gold/70" />
                    <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                    <div aria-hidden className="relative flex items-center justify-center">
                      <span className="h-3 sm:h-3.5 w-3 sm:w-3.5 rotate-45 border border-manikstu-gold bg-transparent" />
                      <span className="absolute h-1 sm:h-1.5 w-1 sm:w-1.5 rotate-45 bg-manikstu-gold" />
                    </div>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                    <span aria-hidden className="h-px w-10 sm:w-20 bg-manikstu-gold/70" />
                  </div>
                </div>

                {/* Advisors cards, 4 columns grid */}
                <div className="mt-6 sm:mt-10 grid gap-3.5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                  {advisors.map((l) => (
                    <article
                      key={l.name}
                      className="group flex flex-col rounded-xl sm:rounded-2xl border border-manikstu-gold/20 bg-white shadow-xs sm:shadow-sm overflow-hidden hover:shadow-md transition-all"
                    >
                      {/* Image banner container */}
                      <div className="relative flex h-36 sm:h-44 md:h-52 w-full items-center justify-center overflow-hidden bg-manikstu-cream/70">
                        {l.photo ? (
                          <Image
                            src={l.photo}
                            alt={l.name}
                            fill
                            loading="eager"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            style={{ objectPosition: (l as { objectPosition?: string }).objectPosition }}
                            className={`${(l as { fit?: string }).fit === "contain" ? "object-contain" : "object-cover object-top"} transition-transform duration-300 group-hover:scale-105`}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-manikstu-cream/40 to-manikstu-cream">
                            <div className="flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-white/80 shadow-inner">
                              <User className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-manikstu-green/40 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                          </div>
                        )}
                        <span
                          className={`absolute left-2.5 bottom-2.5 sm:left-3 sm:bottom-3 rounded px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white shadow-sm z-10 ${tagColor(l.tag)}`}
                        >
                          {l.tag}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col items-center justify-between p-3.5 sm:p-5 text-center">
                        <div className="flex flex-col items-center">
                          <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal transition-colors group-hover:text-manikstu-green">
                            {l.name}
                          </h3>
                          <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs font-semibold text-manikstu-green">
                            {l.role}
                          </p>
                          <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs leading-relaxed text-grey">
                            {l.bio}
                          </p>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-center gap-2">
                          <a
                            href="#"
                            aria-label={`${l.name} on LinkedIn`}
                            className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green"
                          >
                            <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </a>
                          <a
                            href="#"
                            aria-label={`Email ${l.name}`}
                            className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green"
                          >
                            <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </a>
                        </div>
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
