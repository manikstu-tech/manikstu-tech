import type { Metadata, Viewport } from "next"
import { FreeEdits } from "@/components/admin/FreeEdits"
import { PathAttr } from "@/components/admin/PathAttr"
import { PwaRegister } from "@/components/ui/PwaRegister"
import { Toaster } from "@/components/ui/Toaster"
import { SITE_URL } from "@/constants/site"
import { getFreeEdits, getStylesCss } from "@/lib/cms"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/apple-touch-icon.png", apple: "/apple-touch-icon.png" },
  title: "Manikstu Agri Solutions — Revolutionizing Goat Farming",
  description:
    "Manikstu Agri Solutions is building an integrated goat-farming ecosystem through technology, healthcare, training and farmer empowerment.",
  openGraph: {
    title: "Manikstu Agri Solutions — Revolutionizing Goat Farming",
    description:
      "Building sustainable livestock livelihoods across rural India.",
    images: ["https://manikstu.com/og-image.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#174B32" // the --forest token,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Colour, size and hide edits made in /admin. Every rule is scoped to html[data-path], which the script below sets before the first
  // paint, so each page gets only its own edits with no flash of the original look.
  const [edits, words] = await Promise.all([getStylesCss(), getFreeEdits()])
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.dataset.path=location.pathname;document.documentElement.classList.add("cms-js")' }} />
        {edits && <style id="cms-edits" dangerouslySetInnerHTML={{ __html: edits }} />}
      </head>
      <body>
        <a className="skipLink" href="#main">
          Skip to content
        </a>
        {children}
        <Toaster />
        <PwaRegister />
        <PathAttr />
        <FreeEdits edits={words} />
      </body>
    </html>
  )
}
