import type { Metadata } from "next";
import PageClient from "./PageClient";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";

const BASE_URL = "https://manikstu.com";

export const metadata: Metadata = {
  title: "Our Partners, Manikstu Agro | Collaborators in Rural Transformation",
  description: "Meet the organizations partnering with Manikstu Agro to transform goat farming and rural livelihoods across India.",
  openGraph: {
    title: "Our Partners, Manikstu Agro",
    description: "Organizations partnering with us to transform rural livelihoods across India.",
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
            { "@type": "ListItem", position: 2, name: "Partners", item: `${BASE_URL}/${locale}/partners` },
          ],
        }}
      />
      <PageClient />
    </>
  );
}
