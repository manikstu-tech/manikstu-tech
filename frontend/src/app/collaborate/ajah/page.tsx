import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AjahHero from "@/components/collaborate/AjahHero";
import AjahPillars from "@/components/collaborate/AjahPillars";
import AjahCTA from "@/components/collaborate/AjahCTA";

export const metadata: Metadata = {
  title: {
    absolute:
      "Project AJAH | Manikstu Agro — Women-Led Integrated Livestock Entrepreneurship",
  },
  description:
    "Project AJAH empowers women farmers through an integrated goat and poultry livelihood model with science, infrastructure, healthcare, training, insurance and market support.",
};

export default function AjahPage() {
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
