import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrainingHero from "@/components/training/TrainingHero";
import TrainingPrograms from "@/components/training/TrainingPrograms";
import AwarenessInitiatives from "@/components/training/AwarenessInitiatives";
import TrainingImpact from "@/components/training/TrainingImpact";
import TrainingCTA from "@/components/training/TrainingCTA";

export const metadata: Metadata = {
  title: {
    absolute:
      "Training & Awareness | Manikstu Agro — Building Capabilities, Transforming Communities",
  },
  description:
    "Explore Manikstu Agro's farmer training, FPO capacity building, veterinary awareness and community outreach programs across rural India.",
};

export default function TrainingAwarenessPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <TrainingHero />
        <TrainingPrograms />
        <AwarenessInitiatives />
        <TrainingImpact />
        <TrainingCTA />
      </main>
      <Footer />
    </>
  );
}
