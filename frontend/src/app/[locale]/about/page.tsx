import type { Metadata } from "next";
import PageClient from "./PageClient";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Manikstu Agro Private Limited — our mission to revolutionize goat farming in India, our team, and our journey from Kalahandi, Odisha.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageClient />;
}
