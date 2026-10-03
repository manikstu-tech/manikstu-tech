import type { Metadata } from "next";
import PageClient from "./PageClient";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order of Manikstu Agri Solutions products.",
  alternates: { canonical: "https://manikstu.com/products/checkout" },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageClient />;
}

