import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import ThemeProvider from "@/components/layout/ThemeProvider";
import "./globals.css";

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

export const metadata: Metadata = {
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-manikstu-green focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
