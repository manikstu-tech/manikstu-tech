import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    absolute:
      "Careers at Manikstu Agro | Build Your Career. Grow Rural India.",
  },
  description:
    "Join Manikstu Agro and build a meaningful career while empowering rural communities through sustainable agriculture and livestock solutions.",
};

// No real job openings exist in the repository yet, so we render a
// legitimate empty state rather than fabricating roles.
const jobOpenings: JobOpening[] = [];

const careerValues: CareerValue[] = [
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

const careerBenefits: CareerBenefit[] = [
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
  return (
    <>
      <Header />

      <main id="main-content">
        <CareersHero />
        <WhyJoinUs values={careerValues} />
        <OpenPositions jobs={jobOpenings} />
        <CareerBenefits benefits={careerBenefits} />
        <ResumeCTA />
      </main>

      <Footer />
    </>
  );
}
