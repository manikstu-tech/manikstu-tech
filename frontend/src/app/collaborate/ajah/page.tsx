"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AjahHero from "@/components/collaborate/AjahHero";
import AjahPillars from "@/components/collaborate/AjahPillars";
import AjahCTA from "@/components/collaborate/AjahCTA";
import { getPage } from "@/lib/api";

export default function AjahPage() {
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    getPage("ajah")
      .then((res) => setBlocks(res.data.blocks))
      .catch(() => {});
  }, []);

  return (
    <>
      <Header />
      <main id="main-content">
        <AjahHero />
        <AjahPillars />
        <AjahCTA />
      </main>
      <Footer />
    </>
  );
}
