import type { Metadata } from "next";
import PageClient from "./PageClient";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Explore Manikstu Agro's range of ethically sourced goat products — supplements, feed, organic manure, and more.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageClient />;
}
