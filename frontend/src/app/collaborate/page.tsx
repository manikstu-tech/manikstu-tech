"use client";

import { useState, useEffect } from "react";
import { getPage } from "@/lib/api";
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

function parseContent(block: any): any {
  if (!block?.content) return null;
  try { return JSON.parse(block.content); } catch { return null; }
}

const fallbackPartnerTypes = [
  { icon: "Users", title: "FPOs & SHGs", description: "Strengthen farmer producer organizations and self-help groups with training, aggregation and collective market access." },
  { icon: "Building2", title: "Corporates & CSR", description: "Co-create CSR and sustainability programs that deliver measurable rural livelihoods and ESG outcomes." },
  { icon: "HeartHandshake", title: "NGOs & Development Orgs", description: "Combine on-ground reach with our technical expertise to scale livestock interventions that last." },
  { icon: "Landmark", title: "Government & Research", description: "Partner on schemes, pilots and studies that inform policy and strengthen the livestock value chain." },
  { icon: "Truck", title: "Supply Chain & Retail", description: "Source ethically produced, traceable livestock products and build resilient last-mile linkages." },
  { icon: "Banknote", title: "Financial Institutions", description: "Enable credit, insurance and Goat Bank models that de-risk rural livelihoods and expand inclusion." },
];

const fallbackSteps = [
  { step: "01", title: "Discover", description: "We listen to communities and partners to understand local needs, assets and gaps.", icon: "Compass" },
  { step: "02", title: "Design", description: "We co-create programs that blend our livestock expertise with partner strengths.", icon: "ClipboardList" },
  { step: "03", title: "Deploy", description: "We implement on the ground with training, infrastructure and continuous handholding.", icon: "Rocket" },
  { step: "04", title: "Measure", description: "We track outcomes and refine together to ensure durable, scalable impact.", icon: "TrendingUp" },
];

const fallbackStats = [
  { value: "50+", label: "Partner Organizations", icon: "Building2" },
  { value: "700+", label: "Villages Reached", icon: "MapPin" },
  { value: "10,000+", label: "Farmers Engaged", icon: "Users" },
  { value: "3+", label: "States Covered", icon: "Shield" },
];

const fallbackCTAPillars = [
  { icon: "Building2", line1: "Institutional", line2: "Trust" },
  { icon: "MapPin", line1: "Grassroots", line2: "Delivery" },
  { icon: "Handshake", line1: "Shared", line2: "Governance" },
  { icon: "Sprout", line1: "Sustainable", line2: "Value" },
];

function mapIcons<T extends { icon: string }>(items: T[]): (T & { icon: any })[] {
  return items.map((item) => ({ ...item, icon: iconMap[item.icon] || Users }));
}

export default function CollaboratePage() {
  const [partnerTypes, setPartnerTypes] = useState(fallbackPartnerTypes);
  const [steps, setSteps] = useState(fallbackSteps);
  const [stats, setStats] = useState(fallbackStats);
  const [ctaPillars, setCTAPillars] = useState(fallbackCTAPillars);

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
        <PartnerTypes partners={mapIcons(partnerTypes)} />
        <HowItWorks steps={mapIcons(steps)} />
        <CollaborateImpact stats={mapIcons(stats)} />
        <CollaborateCTA pillars={mapIcons(ctaPillars)} />
      </main>
      <Footer />
    </>
  );
}
