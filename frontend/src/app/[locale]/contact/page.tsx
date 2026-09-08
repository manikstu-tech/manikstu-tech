import type { Metadata } from "next";
import PageClient from "./PageClient";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Manikstu Agro. Reach us via phone, email, or visit our offices in Kalahandi, Odisha.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageClient />;
}
