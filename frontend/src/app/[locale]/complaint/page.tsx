import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Raise a Complaint, Manikstu Agro",
  description:
    "Tell us about a problem with an order, a product or a delivery, and our team will call you back.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageClient />;
}
