"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getPage } from "@/lib/api";
import { parseContent } from "@/lib/pages";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CollaborateHero from "@/components/collaborate/CollaborateHero";
import PartnerTypes from "@/components/collaborate/PartnerTypes";
import HowItWorks from "@/components/collaborate/HowItWorks";
import CollaborateImpact from "@/components/collaborate/CollaborateImpact";
import CollaborateCTA from "@/components/collaborate/CollaborateCTA";
import {
  Users, Building2, HeartHandshake, Landmark, Truck, Banknote,
  Compass, ClipboardList, Rocket, TrendingUp,
  MapPin, Shield, Handshake, Sprout,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Users, Building2, HeartHandshake, Landmark, Truck, Banknote,
  Compass, ClipboardList, Rocket, TrendingUp,
  MapPin, Shield, Handshake, Sprout,
};

function mapIcons<T extends { icon: string }>(items: T[]): (T & { icon: any })[] {
  return items.map((item) => ({ ...item, icon: iconMap[item.icon] || Users }));
}

export default function CollaboratePage() {
  const t = useTranslations("Collaborate");

  const fallbackPartnerTypes = [
    { icon: "Users", title: t("partner1Title"), description: t("partner1Desc") },
    { icon: "Building2", title: t("partner2Title"), description: t("partner2Desc") },
    { icon: "HeartHandshake", title: t("partner3Title"), description: t("partner3Desc") },
    { icon: "Landmark", title: t("partner4Title"), description: t("partner4Desc") },
    { icon: "Truck", title: t("partner5Title"), description: t("partner5Desc") },
    { icon: "Banknote", title: t("partner6Title"), description: t("partner6Desc") },
  ];

  const fallbackSteps = [
    { step: "01", title: t("step1Title"), description: t("step1Desc"), icon: "Compass" },
    { step: "02", title: t("step2Title"), description: t("step2Desc"), icon: "ClipboardList" },
    { step: "03", title: t("step3Title"), description: t("step3Desc"), icon: "Rocket" },
    { step: "04", title: t("step4Title"), description: t("step4Desc"), icon: "TrendingUp" },
  ];

  const fallbackStats = [
    { value: "50+", label: t("stat1Label"), icon: "Building2" },
    { value: "700+", label: t("stat2Label"), icon: "MapPin" },
    { value: "10,000+", label: t("stat3Label"), icon: "Users" },
    { value: "3+", label: t("stat4Label"), icon: "Shield" },
  ];

  const fallbackCTAPillars = [
    { icon: "Building2", line1: t("ctaPillar1Line1"), line2: t("ctaPillar1Line2") },
    { icon: "MapPin", line1: t("ctaPillar2Line1"), line2: t("ctaPillar2Line2") },
    { icon: "Handshake", line1: t("ctaPillar3Line1"), line2: t("ctaPillar3Line2") },
    { icon: "Sprout", line1: t("ctaPillar4Line1"), line2: t("ctaPillar4Line2") },
  ];

  const [partnerTypes, setPartnerTypes] = useState<any[] | null>(null);
  const [steps, setSteps] = useState<any[] | null>(null);
  const [stats, setStats] = useState<any[] | null>(null);
  const [ctaPillars, setCTAPillars] = useState<any[] | null>(null);

  useEffect(() => {
    getPage('collaborate')
      .then((res) => {
        const blocks = res.data.blocks;
        const partnerTypesBlock = blocks.find((b: any) => b.title === 'partner_types');
        if (partnerTypesBlock) {
          const c = parseContent(partnerTypesBlock);
          if (c) setPartnerTypes(c);
        }
        const stepsBlock = blocks.find((b: any) => b.title === 'steps');
        if (stepsBlock) {
          const c = parseContent(stepsBlock);
          if (c) setSteps(c);
        }
        const statsBlock = blocks.find((b: any) => b.title === 'stats');
        if (statsBlock) {
          const c = parseContent(statsBlock);
          if (c) setStats(c);
        }
        const ctaPillarsBlock = blocks.find((b: any) => b.title === 'cta_pillars');
        if (ctaPillarsBlock) {
          const c = parseContent(ctaPillarsBlock);
          if (c) setCTAPillars(c);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Header />
      <main id="main-content">
        <CollaborateHero />
        <PartnerTypes partners={mapIcons(partnerTypes || fallbackPartnerTypes)} />
        <HowItWorks steps={mapIcons(steps || fallbackSteps)} />
        <CollaborateImpact stats={mapIcons(stats || fallbackStats)} />
        <CollaborateCTA pillars={mapIcons(ctaPillars || fallbackCTAPillars)} />
      </main>
      <Footer />
    </>
  );
}
