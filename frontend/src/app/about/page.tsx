"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Users, Target, Sprout, MapPin } from "lucide-react";
import { SauraBorder, GodnaBorder, CulturalDivider } from "@/components/patterns";
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
  { icon: "Target", title: "Quality", description: "We provide only the highest quality genetics, veterinary care, and farming practices for long-term success." },
  { icon: "Users", title: "Sustainability", description: "Our practices protect the environment and create lasting economic value for rural communities." },
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
          src="/patterns/mandala-top-right-corner.png"
          alt=""
          aria-hidden
          width={504}
          height={560}
          className="pointer-events-none select-none absolute right-0 top-0 h-auto w-64 sm:w-80 md:w-96 lg:w-[28rem] opacity-[0.10] sm:opacity-[0.14] dark:opacity-[0.18]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left — copy */}
            <div>
              <div className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                  About Us
                </p>
                <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              </div>

              <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
                Farming with heart,
                <br />
                <span className="text-manikstu-green">
                  rooted in community.
                </span>
              </h1>

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
                  className="inline-flex items-center gap-2 rounded-full border-2 border-manikstu-green bg-white px-6 py-3 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
                >
                  Our Journey
                </Link>
              </div>

              {/* Micro-statement */}
              <div className="mt-8 flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-manikstu-green/10">
                  <Heart className="h-3.5 w-3.5 text-manikstu-green" />
                </span>
                <p className="text-sm text-grey">
                  Nurturing goats, farmers and futures — together
                </p>
              </div>
            </div>

            {/* Right — visual panel */}
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-manikstu-gold/20 bg-manikstu-cream shadow-sm">
                {/* Growth / roots line-art illustration */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 480 360"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  fill="none"
                  stroke="#4A8C3F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Ground line */}
                  <path d="M40 250 H440" opacity="0.35" />
                  {/* Sun */}
                  <circle cx="380" cy="90" r="26" fill="#C4952A" fillOpacity="0.4" stroke="none" />
                  <circle cx="380" cy="90" r="26" opacity="0.4" />
                  {/* Central growing stem */}
                  <path d="M240 250 V150" />
                  {/* Heart-shaped canopy */}
                  <path d="M240 150 C210 110 160 120 165 165 C168 200 220 215 240 235 C260 215 312 200 315 165 C320 120 270 110 240 150 Z" fill="#4A8C3F" fillOpacity="0.10" />
                  {/* Leaves on stem */}
                  <path d="M240 205 C218 200 202 185 202 165 C224 170 240 185 240 205 Z" />
                  <path d="M240 190 C262 185 278 170 278 150 C256 155 240 170 240 190 Z" fill="#4A8C3F" fillOpacity="0.12" />
                  {/* Roots below ground */}
                  <path d="M240 250 C220 275 200 285 180 305" opacity="0.5" strokeDasharray="4 6" />
                  <path d="M240 250 C260 275 280 285 300 305" opacity="0.5" strokeDasharray="4 6" />
                  <path d="M240 250 V300" opacity="0.5" strokeDasharray="4 6" />
                  {/* Rolling hills */}
                  <path d="M40 250 C110 220 160 235 220 250" opacity="0.3" />
                  <path d="M260 250 C320 232 380 240 440 250" opacity="0.3" />
                  {/* Small accent leaves */}
                  <path d="M95 175 C105 160 125 155 135 165 C125 180 105 185 95 175 Z" fill="#4A8C3F" fillOpacity="0.15" />
                  <path d="M348 200 C358 185 378 180 388 190 C378 205 358 210 348 200 Z" fill="#C4952A" fillOpacity="0.2" />
                </svg>

                {/* Corner accent */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
                  <MapPin className="h-4 w-4 text-manikstu-green" />
                  <span className="text-xs font-semibold text-charcoal">
                    Rooted in Kalahandi, Odisha
                  </span>
                </div>
              </div>

              {/* Small floating badge */}
              <div className="absolute -bottom-4 -right-2 hidden h-14 w-14 items-center justify-center rounded-full bg-manikstu-green shadow-md md:flex">
                <Sprout className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
        <SauraBorder className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal">Our Purpose</h2>
              <CulturalDivider className="mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -translate-y-16 translate-x-16" />
                <Target className="w-12 h-12 text-green-700 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-charcoal">Our Vision</h3>
                {vision.map((p: string, i: number) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
                ))}
                <GodnaBorder className="mt-6" />
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -translate-y-16 translate-x-16" />
                <Heart className="w-12 h-12 text-green-700 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-charcoal">Our Mission</h3>
                {mission.map((p: string, i: number) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
                ))}
                <CulturalDivider className="mt-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-charcoal">Our Journey</h2>
            <CulturalDivider className="mx-auto mb-12" />
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-200" />
              <div className="space-y-12">
                {timeline.map((item: any, i: number) => (
                  <div key={item.year} className="relative flex items-center">
                    {i % 2 === 0 ? (
                      <>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-700 rounded-full border-4 border-white" />
                        <div className="w-1/2 pr-8 text-right">
                          <div className="bg-cream rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-bold text-green-700 mb-2">{item.year}</h3>
                            <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <div className="w-1/2" />
                      </>
                    ) : (
                      <>
                        <div className="w-1/2" />
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-700 rounded-full border-4 border-white" />
                        <div className="w-1/2 pl-8">
                          <div className="bg-cream rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-bold text-green-700 mb-2">{item.year}</h3>
                            <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-charcoal">Our Core Values</h2>
            <CulturalDivider className="mx-auto mb-12" />
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v: any) => {
                const Icon = iconMap[v.icon] || Heart;
                return (
                  <div key={v.title} className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-10 h-10 text-green-700" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{v.title}</h3>
                    <p className="text-gray-600">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-green-700 rounded-2xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-green-800/50" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Farm?</h2>
                <p className="text-green-100 mb-8 text-lg">Join thousands of farmers who are already benefiting from our goat farming ecosystem.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="#contact" className="bg-white text-green-700 hover:bg-green-50 px-8 py-3 rounded-md font-medium transition-colors">Get in Touch</Link>
                  <Link href="/services" className="border border-white text-white hover:bg-green-800 px-8 py-3 rounded-md font-medium transition-colors">Our Services</Link>
                </div>
              </div>
              <SauraBorder className="absolute bottom-0 left-0 right-0" />
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
