"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AjahHero from "@/components/collaborate/AjahHero";
import AjahPillars from "@/components/collaborate/AjahPillars";
import AjahCTA from "@/components/collaborate/AjahCTA";
import { getPage } from "@/lib/api";
import { parseContent } from "@/lib/pages";
import {
  Sprout, Warehouse, HeartPulse, GraduationCap, ShieldCheck, ShoppingBag,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Sprout, Warehouse, HeartPulse, GraduationCap, ShieldCheck, ShoppingBag,
};

export default function AjahPage() {
  const [pillars, setPillars] = useState<any[]>([]);

  useEffect(() => {
    getPage("ajah")
      .then((res) => {
        const blocks = res.data.blocks;
        const pillarsBlock = blocks.find((b: any) => b.title === 'AJAH Pillars');
        if (pillarsBlock) {
          const content = parseContent(pillarsBlock);
          if (content) setPillars(content.map((p: any) => ({ ...p, icon: iconMap[p.icon] || Sprout })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Header />
      <main id="main-content">
        <AjahHero />
        <AjahPillars pillars={pillars} />
        <AjahCTA />
      </main>
      <Footer />
    </>
  );
}
