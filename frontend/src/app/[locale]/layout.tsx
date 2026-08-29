import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ThemeProvider from "@/components/layout/ThemeProvider";
import JsonLd from "@/components/seo/JsonLd";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://manikstu.com";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Metadata {
  const alternatesLanguages: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternatesLanguages[loc] = `${BASE_URL}/${loc}`;
  }

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: "Manikstu Agro — Revolutionizing Goat Farming Ecosystem",
      template: "%s | Manikstu Agro",
    },
    description:
      "Manikstu Agro Private Limited — comprehensive goat farming ecosystem with veterinary services, goat bank, training, and ethically sourced products. Founded 2015, Kalahandi, Odisha.",
    keywords: [
      "goat farming",
      "goat bank",
      "veterinary services",
      "livestock",
      "Manikstu",
      "Odisha",
      "Kalahandi",
      "goat supplements",
      "organic manure",
    ],
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "Manikstu Agro",
      title: "Manikstu Agro — Revolutionizing Goat Farming Ecosystem",
      description:
        "Comprehensive goat farming ecosystem with veterinary services, goat bank, training, and ethically sourced products.",
      url: BASE_URL,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Manikstu Agro" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Manikstu Agro — Revolutionizing Goat Farming Ecosystem",
      description:
        "Comprehensive goat farming ecosystem with veterinary services, goat bank, training, and ethically sourced products.",
      images: ["/og-image.png"],
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${BASE_URL}/en`,
      languages: alternatesLanguages,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.manikstu.com" />
        <link rel="dns-prefetch" href="https://api.manikstu.com" />
      </head>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Manikstu Agro Private Limited",
            url: BASE_URL,
            logo: `${BASE_URL}/logo.png`,
            description:
              "Comprehensive goat farming ecosystem with veterinary services, goat bank, training, and ethically sourced products.",
            foundingDate: "2015",
            address: [
              {
                "@type": "PostalAddress",
                addressLocality: "Kalahandi",
                addressRegion: "Odisha",
                addressCountry: "IN",
              },
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-8270331856",
              contactType: "customer service",
              email: "contact@manikstu.com",
            },
            sameAs: [],
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-manikstu-green focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
