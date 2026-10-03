import type { Metadata } from "next";
import PageClient from "./PageClient";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Manikstu Agri Solutions, explore career opportunities in goat farming, veterinary services, and agricultural innovation.",
  alternates: { canonical: "https://manikstu.com/careers" },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageClient />;
}

