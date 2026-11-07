import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { ContentsHero } from "@/components/sections/partners/ContentsHero"
import { LogoWall } from "@/components/sections/partners/LogoWall"
import { PartnerTypes } from "@/components/sections/partners/PartnerTypes"
import { BackToTop } from "@/components/ui/BackToTop"
import { INVESTOR_GROUP } from "@/constants/partners"
import { SITE_URL } from "@/constants/site"
import { WAYS_TO_FUND, WHY_TRUST } from "@/constants/subpages"
import { getContent } from "@/lib/cms"

const TITLE = "Investors & funders | Manikstu Agri Solutions"
const DESCRIPTION =
  "Invest in rural prosperity with Manikstu Agri Solutions: impact equity, grants, CSR partnerships and working capital behind a proven, scalable goat-farming model."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/investors" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/investors", images: [`${SITE_URL}/og-image.png`] },
}

export default async function InvestorsPage() {
  const page = await getContent("investors", { ways: WAYS_TO_FUND, why: WHY_TRUST, group: INVESTOR_GROUP })
  return (
    <>
      <Header />
      <main id="main">
        <ContentsHero
          wide
          eyebrow="Investors & funders"
          title="Invest in rural prosperity. Scale measurable impact."
          lede="Manikstu Agro turns goat farming into a dignified livelihood for rural families, especially women. Partner with us to fund a proven, scalable model that delivers both social returns and sustainable growth."
        />

        <PartnerTypes
          id="ways"
          title="How you can partner"
          intro="We work with a range of capital partners. Choose the path that fits your mandate, or combine them."
          items={page.ways}
        />

        <LogoWall group={page.group} plate />

        <PartnerTypes
          id="trust"
          title="Why partners trust us"
          intro="A field-tested model, an experienced team and institutional backing that de-risks your investment."
          items={page.why}
        />

      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
