"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Users, Target } from "lucide-react";
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
      <section className="relative py-20 md:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-charcoal">About Manikstu Agro</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Transforming goat farming through sustainable practices, community partnerships, and cutting-edge technology in the heart of Kalahandi, Odisha.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collaborate" className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2">
                Join Our Mission <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#timeline" className="border border-green-700 text-green-700 hover:bg-green-50 px-8 py-3 rounded-md font-medium transition-colors">
                Our Journey
              </Link>
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
