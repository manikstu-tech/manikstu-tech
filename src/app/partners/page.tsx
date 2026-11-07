import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import {
  SubCta,
  SubSection,
} from "@/components/sections/subpage/parts"
import { PartnerTypes } from "@/components/sections/partners/PartnerTypes"
import { ContentsHero } from "@/components/sections/partners/ContentsHero"
import { LogoWall } from "@/components/sections/partners/LogoWall"
import { BackToTop } from "@/components/ui/BackToTop"
import { PARTNER_GROUPS } from "@/constants/partners"
import { SITE_URL } from "@/constants/site"
import { PARTNER_STEPS, PARTNER_TYPES } from "@/constants/subpages"
import { getContent } from "@/lib/cms"

const TITLE = "Partners | Manikstu Agri Solutions"
const DESCRIPTION =
  "Partner with Manikstu Agri Solutions: farmer groups, corporates, NGOs, government and financial institutions scaling livestock livelihoods across India."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/partners" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/partners", images: [`${SITE_URL}/collaborate-hero.webp`] },
}

// The label sits on alternating sides of the logos: left, right, left
const ALIGNS = ["left", "right"] as const

export default async function PartnersPage() {
  const page = await getContent("partners", { types: PARTNER_TYPES, steps: PARTNER_STEPS, groups: PARTNER_GROUPS })
  return (
    <>
      <Header />
      <main id="main">
        <ContentsHero
          eyebrow="Partners"
          title="Partner in rural transformation."
          lede="We build a thriving ecosystem with farmer groups, corporates, development organizations and government to scale sustainable livestock livelihoods across India."
          action="Become a partner"
          href="/join?as=partner"
          items={page.groups.map(({ id, title, logos }) => ({ id, n: logos.length, title, text: logos.map((logo) => logo.name).join(", ") }))}
        />

        <PartnerTypes
          title="Who we partner with"
          intro="From grassroots groups to global institutions, every partner plays a vital role in scaling rural livelihoods."
          items={page.types}
        />

        {page.groups.map((group, i) => (
          <LogoWall key={group.id} group={group} alt={i % 2 === 1} plate align={ALIGNS[i % ALIGNS.length]} />
        ))}

        <SubSection
          title="From first conversation to shared impact"
          intro="A simple, transparent process that keeps communities and partners aligned at every stage."
        >
          <ol className="stepList">
            {page.steps.map(({ title, text }, i) => (
              <li key={title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </SubSection>

        <SubCta
          title="Partner with us to build the future of rural livelihoods."
          text="Tell us about your organization and the change you want to create. We’ll shape a collaboration that delivers lasting impact."
          action="Become a partner"
          href="/join?as=partner"
        />

      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
