import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Explore Manikstu Agro's range of ethically sourced goat products — supplements, feed, organic manure, and more.",
};

export default function Page() {
  return <PageClient />;
}
