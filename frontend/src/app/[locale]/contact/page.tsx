import type { Metadata } from "next";
import PageClient from "./PageClient";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";

const BASE_URL = "https://manikstu.com";

export const metadata: Metadata = {
  title: "Contact Manikstu Agri Solutions, Phone, Email, Office Addresses",
  description: "Get in touch with Manikstu Agri Solutions. Reach us via phone, email, or visit our offices in Kalahandi, Odisha.",
  alternates: { canonical: "https://manikstu.com/contact" },
  openGraph: {
    title: "Contact Manikstu Agri Solutions, Phone, Email, Office",
    description: "Contact Manikstu Agri Solutions for goat farming services. Phone: +91 90781 93191",
  },
};

const ENQUIRY_TYPES = ["general", "partnership", "training", "careers", "support", "bulk"];

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string; role?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const initialType = ENQUIRY_TYPES.includes(sp.type ?? "") ? sp.type! : "";
  const initialRole = typeof sp.role === "string" ? sp.role.slice(0, 120) : "";
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}` },
            { "@type": "ListItem", position: 2, name: "Contact", item: `${BASE_URL}/contact` },
          ],
        }}
      />
      <PageClient initialType={initialType} initialRole={initialRole} />
    </>
  );
}

