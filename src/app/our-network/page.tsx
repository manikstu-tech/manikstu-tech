import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { BackToTop } from "@/components/ui/BackToTop"

export const metadata: Metadata = {
  title: "Our Network | Manikstu Agro Private Limited",
  description: "Our network of partners and associations is coming soon.",
  // Nothing to index until the page has real content
  robots: { index: false },
}

export default function OurNetworkPage() {
  return (
    <>
      <Header />
      <main id="main" className="comingSoon">
        <p className="eyebrow">Our network</p>
        <h1>Coming soon.</h1>
        <p>
          We are putting together the partners, associations and institutions
          we work with. Please check back soon.
        </p>
        <Link className="button" href="/">
          Back to home
        </Link>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
