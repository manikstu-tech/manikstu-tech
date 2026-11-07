import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { EnquiryForm } from "@/components/sections/partners/EnquiryForm"
import { PartnerTypes } from "@/components/sections/partners/PartnerTypes"
import { BackToTop } from "@/components/ui/BackToTop"
import { REPLY_TIME } from "@/constants/contact"
import { WHY_TRUST } from "@/constants/subpages"
import { getContent } from "@/lib/cms"

const TITLE = "Join Us | Manikstu Agri Solutions"
const DESCRIPTION =
  "Invest in or partner with Manikstu Agri Solutions. Tell us who you are and how you would like to join, and our team will get back to you."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/join" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/join" },
}

export default async function JoinPage({ searchParams }: { searchParams: Promise<{ as?: string }> }) {
  // There is no investor-or-partner choice on the form: /join?as=investor goes to the investor inbox, anything else is a partnership
  const { as } = await searchParams
  const kind = as === "investor" ? "investor" : "partnership"

  return (
    <>
      <Header />
      <main id="main">
        <section className="contactHero joinHero">
          <div className="contactIntro">
            <p className="eyebrow">Partner with us</p>
            <h1>Become a Manikstu partner</h1>
            <p className="contactLede">
              Join the organisations working with us to build dignified livelihoods for rural families, especially
              women. Our field-tested ecosystem brings veterinary care, insurance, training, technology and market
              access in one place. Together, we can take it to more villages. Tell us about your organisation and where you
              see a fit.
            </p>
          </div>
          <div className="enquiryCard">
            <h2>Explore partnership, franchise and collaboration opportunities</h2>
            <p>
              Share a brief overview of your organisation and the collaboration you envisage. {REPLY_TIME}.
            </p>
            <EnquiryForm kind={kind} />
          </div>
        </section>

        <PartnerTypes
          id="benefits"
          title="Why join Manikstu"
          intro="What investors and partners can count on when they work with us."
          items={(await getContent("investors", { why: WHY_TRUST })).why}
        />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
