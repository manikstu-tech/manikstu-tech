"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrainingHero from "@/components/training/TrainingHero";
import TrainingPrograms from "@/components/training/TrainingPrograms";
import AwarenessInitiatives from "@/components/training/AwarenessInitiatives";
import TrainingImpact from "@/components/training/TrainingImpact";
import TrainingCTA from "@/components/training/TrainingCTA";
import { getPage } from "@/lib/api";
import {
  GraduationCap, Users, Stethoscope, Sprout, Sparkles, Banknote,
  Megaphone, HeartPulse, Wheat, Radio,
  MapPin, Shield, Handshake,
} from "lucide-react";

const iconMap: Record<string, any> = {
  GraduationCap, Users, Stethoscope, Sprout, Sparkles, Banknote,
  Megaphone, HeartPulse, Wheat, Radio, MapPin, Shield, Handshake,
};

function parseContent(block: any): any {
  if (!block?.content) return null;
  try { return JSON.parse(block.content); } catch { return null; }
}

export default function TrainingAwarenessPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [initiatives, setInitiatives] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [pillars, setPillars] = useState<any[]>([]);

  useEffect(() => {
    getPage("training")
      .then((res) => {
        const blocks = res.data.blocks;
        const programsBlock = blocks.find((b: any) => b.type === 'training_programs');
        if (programsBlock) {
          const content = parseContent(programsBlock);
          if (content) setPrograms(content.map((p: any) => ({ ...p, icon: iconMap[p.icon] || GraduationCap })));
        }
        const initiativesBlock = blocks.find((b: any) => b.type === 'awareness_initiatives');
        if (initiativesBlock) {
          const content = parseContent(initiativesBlock);
          if (content) setInitiatives(content.map((i: any) => ({ ...i, icon: iconMap[i.icon] || Megaphone })));
        }
        const statsBlock = blocks.find((b: any) => b.type === 'stats');
        if (statsBlock) {
          const content = parseContent(statsBlock);
          if (content) setStats(content.map((s: any) => ({ ...s, icon: iconMap[s.icon] || GraduationCap })));
        }
        const pillarsBlock = blocks.find((b: any) => b.type === 'cta_pillars');
        if (pillarsBlock) {
          const content = parseContent(pillarsBlock);
          if (content) setPillars(content.map((p: any) => ({ ...p, icon: iconMap[p.icon] || Users })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Header />
      <main id="main-content">
        <TrainingHero />
        <TrainingPrograms programs={programs} />
        <AwarenessInitiatives initiatives={initiatives} />
        <TrainingImpact stats={stats} />
        <TrainingCTA pillars={pillars} />
      </main>
      <Footer />
    </>
  );
}
