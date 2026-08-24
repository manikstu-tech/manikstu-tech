"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CareersHero from "@/components/careers/CareersHero";
import WhyJoinUs from "@/components/careers/WhyJoinUs";
import OpenPositions from "@/components/careers/OpenPositions";
import CareerBenefits from "@/components/careers/CareerBenefits";
import ResumeCTA from "@/components/careers/ResumeCTA";
import type { JobOpening } from "@/components/careers/OpenPositions";
import type { CareerValue } from "@/components/careers/WhyJoinUs";
import type { CareerBenefit } from "@/components/careers/CareerBenefits";
import { getPage, getJobOpenings } from "@/lib/api";
import { parseContent } from "@/lib/pages";

const fallbackValues: CareerValue[] = [
  {
    icon: "impact",
    title: "Impact That Matters",
    description:
      "Your work directly contributes to improving rural livelihoods and farmer communities.",
  },
  {
    icon: "growth",
    title: "Learning & Growth",
    description:
      "Opportunities to learn continuously and develop professionally in a growing organization.",
  },
  {
    icon: "culture",
    title: "Collaborative Culture",
    description:
      "Work with passionate people who support, challenge and inspire you.",
  },
  {
    icon: "sustainability",
    title: "Sustainability at Heart",
    description:
      "Contribute to ethical and sustainable agricultural development that transforms communities.",
  },
];

const fallbackBenefits: CareerBenefit[] = [
  {
    icon: "health",
    title: "Health & Wellness",
    description: "Comprehensive health support for you and your family.",
  },
  {
    icon: "learning",
    title: "Learning Support",
    description: "Access to training and professional development.",
  },
  {
    icon: "flexible",
    title: "Flexible Work",
    description: "Balanced work arrangements to support your lifestyle.",
  },
  {
    icon: "impact",
    title: "Impact Leave",
    description: "Time to contribute to community development initiatives.",
  },
  {
    icon: "growth",
    title: "Growth Path",
    description: "Clear career progression and leadership opportunities.",
  },
];

export default function CareersPage() {
  const [values, setValues] = useState<CareerValue[]>(fallbackValues);
  const [benefits, setBenefits] = useState<CareerBenefit[]>(fallbackBenefits);
  const [jobs, setJobs] = useState<JobOpening[]>([]);

  useEffect(() => {
    getPage('careers')
      .then((res) => {
        const blocks = res.data.blocks;
        const valuesBlock = blocks.find((b: any) => b.type === 'career_values');
        if (valuesBlock) {
          const c = parseContent(valuesBlock);
          if (Array.isArray(c)) setValues(c);
        }
        const benefitsBlock = blocks.find((b: any) => b.type === 'career_benefits');
        if (benefitsBlock) {
          const c = parseContent(benefitsBlock);
          if (Array.isArray(c)) setBenefits(c);
        }
      })
      .catch(() => {});

    getJobOpenings()
      .then((res) => {
        if (Array.isArray(res.data)) setJobs(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Header />

      <main id="main-content">
        <CareersHero />
        <WhyJoinUs values={values} />
        <OpenPositions jobs={jobs} />
        <CareerBenefits benefits={benefits} />
        <ResumeCTA />
      </main>

      <Footer />
    </>
  );
}
