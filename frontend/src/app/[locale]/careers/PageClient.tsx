"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
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

export default function CareersPage() {
  const t = useTranslations("Careers");
  const [values, setValues] = useState<CareerValue[]>([
    { icon: "impact", title: t("value1Title"), description: t("value1Desc") },
    { icon: "growth", title: t("value2Title"), description: t("value2Desc") },
    { icon: "culture", title: t("value3Title"), description: t("value3Desc") },
    { icon: "sustainability", title: t("value4Title"), description: t("value4Desc") },
  ]);
  const [benefits, setBenefits] = useState<CareerBenefit[]>([
    { icon: "health", title: t("benefit1Title"), description: t("benefit1Desc") },
    { icon: "learning", title: t("benefit2Title"), description: t("benefit2Desc") },
    { icon: "flexible", title: t("benefit3Title"), description: t("benefit3Desc") },
    { icon: "impact", title: t("benefit4Title"), description: t("benefit4Desc") },
    { icon: "growth", title: t("benefit5Title"), description: t("benefit5Desc") },
  ]);
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
