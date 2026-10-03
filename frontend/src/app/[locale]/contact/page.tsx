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

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
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
      <PageClient />
    </>
  );
}

