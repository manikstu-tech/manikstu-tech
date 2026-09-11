import type { Metadata } from "next";
import PageClient from "./PageClient";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Ajah Initiative",
  description: "The Ajah Initiative by Manikstu Agro, empowering communities through sustainable goat farming partnerships.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageClient />;
}
