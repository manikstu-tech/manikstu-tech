import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Track Your Order, Manikstu Agro",
  description: "Check the progress of an order placed on manikstu.com.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageClient />;
}
