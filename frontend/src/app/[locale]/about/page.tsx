import type { Metadata } from "next";
import PageClient from "./PageClient";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";

const BASE_URL = "https://manikstu.com";

export const metadata: Metadata = {
  title: "About Manikstu Agro, Goat Farming Company Since 2015 | Odisha, India",
  description: "Learn about Manikstu Agro Private Limited, our mission to revolutionize goat farming in India, our team, and our journey from Kalahandi, Odisha.",
  openGraph: {
    title: "About Manikstu Agro, Goat Farming Since 2015",
    description: "Our mission to revolutionize goat farming in India. Founded in Kalahandi, Odisha.",
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
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
            { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/${locale}/about` },
          ],
        }}
      />
      <PageClient />
    </>
  );
}
