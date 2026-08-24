"use client";

import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrainingHero from "@/components/training/TrainingHero";
import TrainingPrograms from "@/components/training/TrainingPrograms";
import AwarenessInitiatives from "@/components/training/AwarenessInitiatives";
import TrainingImpact from "@/components/training/TrainingImpact";
import TrainingCTA from "@/components/training/TrainingCTA";
import { getPage } from "@/lib/api";

export default function TrainingAwarenessPage() {
  useEffect(() => {
    getPage("training").catch(() => {});
  }, []);

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
