import type { Metadata } from "next";
import PageClient from "./PageClient";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Training Programs",
  description: "Professional goat farming training programs by Manikstu Agri Solutions, learn modern techniques, livestock management, and business skills.",
  alternates: { canonical: "https://manikstu.com/training" },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageClient />;
}

