"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Users, Target, Sprout, MapPin, Compass } from "lucide-react";
import { getPage } from "@/lib/api";
import type { PageBlock } from "@/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const iconMap: Record<string, any> = { Heart, Users, Target };

function parseContent(block: PageBlock | undefined): any {
  if (!block?.content) return null;
  try { return JSON.parse(block.content); } catch { return null; }
}

const fallbackVision = [
  "To become India's most trusted goat farming ecosystem — connecting farmers with market access, technology, and sustainable practices that transform rural livelihoods and strengthen communities across Odisha and Chhattisgarh.",
  "By 2030, we aim to empower 50,000+ farmers with modern goat farming techniques, creating sustainable income streams and strengthening rural economies.",
];

const fallbackMission = [
  "To revolutionize goat farming through integrated solutions: providing high-quality genetics, comprehensive veterinary care, market access, and training programs that create lasting positive impact for farmers and their communities.",
  "We believe in farming with heart — nurturing both goats and farmers towards a greener, more prosperous future.",
];

const fallbackTimeline = [
  { year: "2015", title: "Manikstu Agro Founded", description: "Started with a vision to transform goat farming in Kalahandi, beginning with 500 goats and 5 farming families." },
  { year: "2018", title: "First Training Program", description: "Launched comprehensive goat care training, reaching 200 farmers across 3 districts with certified trainers." },
  { year: "2021", title: "Goat Bank Initiative", description: "Started Samarth goat bank project, providing breeding stock to 1,000+ small farmers with community trust." },
  { year: "2024", title: "Website & E-commerce", description: "Launched our digital presence with e-commerce platform for products, revolutionizing how farmers access quality goat products." },
];

const fallbackValues = [
  { icon: "Heart", title: "Community First", description: "We believe in farming with heart, nurturing both goats and farmers towards sustainable futures." },
  { icon: "Target", title: "Quality & Innovation", description: "We provide only the highest quality genetics, veterinary care, and farming practices for long-term success." },
  { icon: "Users", title: "Sustainability & Inclusion", description: "Our practices protect the environment and create lasting economic value for rural communities." },
];

export default function AboutPage() {
  const [vision, setVision] = useState(fallbackVision);
  const [mission, setMission] = useState(fallbackMission);
  const [timeline, setTimeline] = useState(fallbackTimeline);
  const [values, setValues] = useState(fallbackValues);

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
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left — copy */}
              <div>
                <div className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <span aria-hidden className="h-px w-10 bg-manikstu-gold/70" />
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                    About Us
                  </p>
                  <span aria-hidden className="h-px w-10 bg-manikstu-gold/70" />
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                </div>

                <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-charcoal sm:text-5xl lg:text-6xl">
                  Farming with heart,
                  <br />
                  <span className="text-manikstu-green">
                    rooted in community.
                  </span>
                </h1>

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

                <p className="mt-6 max-w-lg text-lg leading-relaxed text-grey">
                  Since 2015, Manikstu Agro has transformed goat farming through
                  sustainable practices, community partnerships and cutting-edge
                  technology — in the heart of Kalahandi, Odisha.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/collaborate"
                    className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
                  >
                    Join Our Mission <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#timeline"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal bg-white px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-white focus:outline-none focus:ring-2 focus:ring-charcoal focus:ring-offset-2"
                  >
                    Our Journey
                  </Link>
                </div>

                {/* Micro-statement */}
                <div className="mt-8 flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-manikstu-green/10">
                    <Heart className="h-3.5 w-3.5 text-manikstu-green" />
                  </span>
                  <p className="text-sm text-grey font-medium">
                    Nurturing goats, farmers and futures — together
                  </p>
                </div>
              </div>

              {/* Right — visual panel */}
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-manikstu-cream shadow-md">
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
                      Rooted in Kalahandi, Odisha
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
                  Our Purpose
                </p>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
              </div>

              <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                Guided by <span className="text-manikstu-green">Vision & Mission</span>
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
                    Our Vision
                  </h3>

                  {/* Line-diamond-line ornament */}
                  <div className="mt-3 mb-5 flex items-center gap-1.5">
                    <span aria-hidden className="h-px w-8 bg-manikstu-gold" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-8 bg-manikstu-gold" />
                  </div>

                  {vision.map((p: string, i: number) => (
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
                    Our Mission
                  </h3>

                  {/* Line-diamond-line ornament */}
                  <div className="mt-3 mb-5 flex items-center gap-1.5">
                    <span aria-hidden className="h-px w-8 bg-manikstu-gold" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-8 bg-manikstu-gold" />
                  </div>

                  {mission.map((p: string, i: number) => (
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
                  Our Milestones
                </p>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
              </div>

              <h2 className="mx-auto mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                A Decade of <span className="text-manikstu-green">Growth & Impact</span>
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
              {timeline.map((item: any) => (
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
                  What Drives Us
                </p>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
              </div>

              <h2 className="mx-auto mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                Our Core <span className="text-manikstu-green">Values</span>
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
              {values.map((v: any) => {
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

        {/* CTA (Collaborate Style) */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="group relative overflow-hidden rounded-3xl border-2 border-saura-red/50 bg-manikstu-cream p-8 sm:p-12 md:p-16 text-center shadow-lg">
              {/* Inner dashed border */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed border-saura-red/40"
              />

              <div className="relative z-10 mx-auto max-w-2xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20 mb-6">
                  <Compass className="h-8 w-8 text-manikstu-green" />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-[-6px] rounded-full border-2 border-dashed border-saura-red/50"
                  />
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal">
                  Ready to Transform Your Farm?
                </h2>

                {/* Line-diamond-line ornament */}
                <div className="mt-4 mb-6 flex items-center justify-center gap-2">
                  <span aria-hidden className="h-px w-12 bg-manikstu-gold" />
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <span aria-hidden className="h-px w-12 bg-manikstu-gold" />
                </div>

                <p className="text-grey text-base sm:text-lg mb-8 leading-relaxed">
                  Join thousands of farmers who are already benefiting from our goat farming ecosystem.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/collaborate"
                    className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf shadow-sm"
                  >
                    Get in Touch <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/training"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal bg-white px-8 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-white shadow-sm"
                  >
                    Our Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
