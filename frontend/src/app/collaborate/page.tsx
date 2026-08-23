import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CollaborateHero from "@/components/collaborate/CollaborateHero";
import PartnerTypes from "@/components/collaborate/PartnerTypes";
import HowItWorks from "@/components/collaborate/HowItWorks";
import CollaborateImpact from "@/components/collaborate/CollaborateImpact";
import CollaborateCTA from "@/components/collaborate/CollaborateCTA";

export const metadata: Metadata = {
  title: {
    absolute:
      "Collaborate | Manikstu Agro — Partner in Rural Transformation",
  },
  description:
    "Partner with Manikstu Agro across FPOs, CSR, NGOs, government, supply chain and finance to scale sustainable livestock livelihoods in rural India.",
};

export default function CollaboratePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <CollaborateHero />
        <PartnerTypes />
        <HowItWorks />
        <CollaborateImpact />
        <CollaborateCTA />
      </main>
      <Footer />
    </>
  );
}
