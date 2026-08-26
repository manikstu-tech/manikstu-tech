"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Users, Target, Sprout, MapPin } from "lucide-react";
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
            className="pointer-events-none select-none absolute right-0 top-0 h-auto w-64 sm:w-80 md:w-96 lg:w-[28rem] opacity-[0.14] sm:opacity-[0.18] -scale-x-100"
          />
          <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 md:px-8 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20">
            <div className="grid items-start gap-12 lg:grid-cols-2">
              {/* Left — copy */}
              <div>
                <div className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <span aria-hidden className="h-px w-10 bg-manikstu-gold/70" />
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                    {t("pill")}
                  </p>
                  <span aria-hidden className="h-px w-10 bg-manikstu-gold/70" />
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                </div>

                <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-charcoal sm:text-5xl lg:text-6xl">
                  {t("heroTitle")}
                  <br />
                  <span className="text-manikstu-green">
                    {t("cornerAccent")}
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
                    href="#timeline"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal bg-white px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-white focus:outline-none focus:ring-2 focus:ring-charcoal focus:ring-offset-2"
                  >
                    {t("ourJourney")}
                  </Link>
                </div>

                {/* Micro-statement */}
                <div className="mt-8 flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-manikstu-green/10">
                    <Heart className="h-3.5 w-3.5 text-manikstu-green" />
                  </span>
                  <p className="text-sm text-grey font-medium">
                    {t("microStatement")}
                  </p>
                </div>
              </div>

              {/* Right — visual panel */}
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-manikstu-cream">
                  {/* Inner dashed border */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-3 rounded-xl border border-dashed border-saura-red/40 z-10"
                  />

                  {/* Growth / roots line-art illustration */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 480 360"
                    className="pointer-events-none absolute inset-0 h-full w-full z-0"
                    fill="none"
                    stroke="#4A8C3F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M40 250 H440" opacity="0.35" />
                    <circle cx="380" cy="90" r="26" fill="#C4952A" fillOpacity="0.4" stroke="none" />
                    <circle cx="380" cy="90" r="26" opacity="0.4" />
                    <path d="M240 250 V150" />
                    <path d="M240 150 C210 110 160 120 165 165 C168 200 220 215 240 235 C260 215 312 200 315 165 C320 120 270 110 240 150 Z" fill="#4A8C3F" fillOpacity="0.10" />
                    <path d="M240 205 C218 200 202 185 202 165 C224 170 240 185 240 205 Z" />
                    <path d="M240 190 C262 185 278 170 278 150 C256 155 240 170 240 190 Z" fill="#4A8C3F" fillOpacity="0.12" />
                    <path d="M240 250 C220 275 200 285 180 305" opacity="0.5" strokeDasharray="4 6" />
                    <path d="M240 250 C260 275 280 285 300 305" opacity="0.5" strokeDasharray="4 6" />
                    <path d="M240 250 V300" opacity="0.5" strokeDasharray="4 6" />
                    <path d="M40 250 C110 220 160 235 220 250" opacity="0.3" />
                    <path d="M260 250 C320 232 380 240 440 250" opacity="0.3" />
                  </svg>

                  {/* Corner accent */}
                  <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-sm border border-manikstu-cream">
                    <MapPin className="h-4 w-4 text-manikstu-green" />
                    <span className="text-xs font-bold text-charcoal">
                      {t("cornerAccent")}
                    </span>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-2 hidden h-16 w-16 items-center justify-center rounded-full bg-manikstu-green shadow-lg ring-4 ring-white md:flex z-30">
                  <Sprout className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission (Collaborate Style) */}
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
          {/* Top-left mandala corner */}
          <Image
            src="/patterns/mandala-corner-top.png"
            alt=""
            aria-hidden
            width={1370}
            height={1155}
            className="pointer-events-none select-none absolute left-0 top-0 h-auto w-48 sm:w-64 md:w-80 lg:w-96 opacity-[0.14] sm:opacity-[0.18]"
          />
          {/* Top-right mandala corner (mirrored) */}
          <Image
            src="/patterns/mandala-corner-top.png"
            alt=""
            aria-hidden
            width={1370}
            height={1155}
            className="pointer-events-none select-none absolute right-0 top-0 h-auto w-48 sm:w-64 md:w-80 lg:w-96 opacity-[0.14] sm:opacity-[0.18] -scale-x-100"
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="text-center mb-12">
              {/* Ornamental pill heading */}
              <div className="flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
                  {t("purposePill")}
                </p>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
              </div>

              <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                {t("purposeTitle")}
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

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision Card */}
              <div className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-white/95 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Inner dashed border */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
                />

                <div className="relative z-10">
                  {/* Dashed-ring icon badge */}
                  <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                    <Target className="h-7 w-7 text-manikstu-green" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-[-6px] rounded-full border-2 border-dashed border-saura-red/50"
                    />
                  </div>

                  <h3 className="font-heading text-2xl italic font-bold text-manikstu-leaf">
                    {t("visionTitle")}
                  </h3>

                  {/* Line-diamond-line ornament */}
                  <div className="mt-3 mb-5 flex items-center justify-center gap-1.5">
                    <span aria-hidden className="h-px w-8 bg-manikstu-gold" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-8 bg-manikstu-gold" />
                  </div>

                  {displayVision.map((p: string, i: number) => (
                    <p key={i} className="text-grey leading-relaxed mb-4 text-sm sm:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Mission Card */}
              <div className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-white/95 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Inner dashed border */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
                />

                <div className="relative z-10">
                  {/* Dashed-ring icon badge */}
                  <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                    <Heart className="h-7 w-7 text-manikstu-green" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-[-6px] rounded-full border-2 border-dashed border-saura-red/50"
                    />
                  </div>

                  <h3 className="font-heading text-2xl italic font-bold text-manikstu-leaf">
                    {t("missionTitle")}
                  </h3>

                  {/* Line-diamond-line ornament */}
                  <div className="mt-3 mb-5 flex items-center justify-center gap-1.5">
                    <span aria-hidden className="h-px w-8 bg-manikstu-gold" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-8 bg-manikstu-gold" />
                  </div>

                  {displayMission.map((p: string, i: number) => (
                    <p key={i} className="text-grey leading-relaxed mb-4 text-sm sm:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline (Journey) */}
        <section id="timeline" className="relative section-padding bg-white overflow-hidden">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
                  {t("milestonesPill")}
                </p>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
              </div>

              <h2 className="mx-auto mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                {t("milestonesTitle")}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {displayTimeline.map((item: any) => (
                <div
                  key={item.year}
                  className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-manikstu-cream/40 p-6 transition-all hover:shadow-lg hover:border-saura-red flex flex-col justify-between"
                >
                  {/* Inner dashed border */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
                  />

                  <div className="relative z-10 text-center">
                    <span className="inline-block rounded-full bg-manikstu-green/10 px-4 py-1 font-heading text-lg font-bold text-manikstu-green ring-1 ring-manikstu-green/30 mb-4">
                      {item.year}
                    </span>

                    <h3 className="font-heading text-base italic font-bold text-charcoal group-hover:text-manikstu-green transition-colors">
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
              ))}
            </div>
          </div>
        </section>

        {/* Values (Collaborate Style) */}
        <section className="relative section-padding bg-manikstu-cream overflow-hidden">
          {/* Bottom-left tree + goat silhouette */}
          <Image
            src="/patterns/training-bottom-left.png"
            alt=""
            aria-hidden
            width={1536}
            height={1024}
            className="pointer-events-none select-none absolute left-0 bottom-0 h-auto w-28 sm:w-36 md:w-48 lg:w-64 opacity-80 sm:opacity-90 z-0"
          />
          {/* Bottom-right woman + hut + tree silhouette */}
          <Image
            src="/patterns/training-bottom-right.png"
            alt=""
            aria-hidden
            width={1802}
            height={900}
            className="pointer-events-none select-none absolute right-0 bottom-0 h-auto w-28 sm:w-36 md:w-48 lg:w-64 opacity-80 sm:opacity-90 z-0"
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
                  {t("valuesPill")}
                </p>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
              </div>

              <h2 className="mx-auto mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                {t("valuesTitle")}
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

            <div className="grid md:grid-cols-3 gap-8">
              {displayValues.map((v: any) => {
                const Icon = iconMap[v.icon] || Heart;
                return (
                  <div
                    key={v.title}
                    className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-white/95 p-6 sm:p-8 text-center transition-all hover:shadow-xl"
                  >
                    {/* Inner dashed border */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
                    />

                    <div className="relative z-10">
                      {/* Dashed-ring icon badge */}
                      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20 mb-6">
                        <Icon className="h-7 w-7 text-manikstu-green" />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-[-6px] rounded-full border-2 border-dashed border-saura-red/50"
                        />
                      </div>

                      <h3 className="font-heading text-xl italic font-bold text-manikstu-leaf">
                        {v.title}
                      </h3>

                      {/* Line-diamond-line ornament */}
                      <div className="mt-3 mb-4 flex items-center justify-center gap-1.5">
                        <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                        <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                      </div>

                      <p className="text-sm text-grey leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </div>
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
