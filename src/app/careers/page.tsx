import type { Metadata } from "next"
import Image from "next/image"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { CareerForm } from "@/components/sections/careers/CareerForm"
import { JobApply } from "@/components/sections/careers/JobApply"
import { PartnerTypes } from "@/components/sections/partners/PartnerTypes"
import { InfoGrid, SubCta, SubSection } from "@/components/sections/subpage/parts"
import { BackToTop } from "@/components/ui/BackToTop"
import { CAREER_VALUES, HR_EMAIL, OPENINGS, PERKS, WHY_JOIN, applyLink } from "@/constants/careers"
import { getContent } from "@/lib/cms"
import { PHOTOS } from "@/constants/resources"

const TITLE = "Careers | Manikstu Agri Solutions"
const DESCRIPTION =
  "Build your career with Manikstu Agri Solutions and help empower farmers, create livelihoods and drive sustainable rural transformation across India."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/careers" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/careers" },
}

// Three team photos from the gallery, all in the same wide shape
const LIFE = [PHOTOS[0], PHOTOS[1], PHOTOS[4]]

export default async function CareersPage() {
  const page = await getContent("careers", { values: CAREER_VALUES, whyJoin: WHY_JOIN, perks: PERKS })
  return (
    <>
      <Header />
      <main id="main">
        {/* Same opening as the Contact page: title and ways to apply on the left, a card on the right */}
        <section className="contactHero careersHero">
          <div className="contactIntro">
            <p className="eyebrow">Careers at Manikstu</p>
            <h1>Careers</h1>
            <p className="contactLede">
              At Manikstu, we are building more than a company. We are building an ecosystem that empowers farmers,
              creates livelihoods and drives sustainable rural transformation across India.
            </p>
            <ul className="contactWays">
              <li>
                <span>Send your resume</span>
                <a href={applyLink()}>{HR_EMAIL}</a>
                <small>For open roles and future opportunities</small>
              </li>
            </ul>
            <ul className="careerValues" aria-label="Life at Manikstu">
              {page.values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
          <div className="enquiryCard" id="apply">
            <h2>Build your career. Serve rural communities.</h2>
            <p>
              Don’t see a role that fits? Send us your details and resume, and our HR team will keep you in mind for
              upcoming opportunities.
            </p>
            <CareerForm />
          </div>
        </section>

        <SubSection
          id="life"
          eyebrow="Our team"
          title="Life at Manikstu"
          intro="Join a passionate team making meaningful impact every single day."
        >
          <ul className="lifeGrid">
            {LIFE.map(({ src, width, height, caption }) => (
              <li key={src}>
                <figure>
                  <Image
                    src={src}
                    alt={caption}
                    width={width}
                    height={height}
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                  <figcaption>{caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </SubSection>

        <SubSection
          alt
          eyebrow="Why join us"
          title="Work with purpose in rural India"
          intro="A career at Manikstu means growing alongside the farmers and communities we serve, with work that matters every single day."
        >
          <InfoGrid items={page.whyJoin} columns={4} />
        </SubSection>

        <SubSection
          id="openings"
          eyebrow="Open positions"
          title="Current openings"
          intro="Join our growing team and help bring technology and opportunity to rural India."
        >
          {OPENINGS.length > 0 ? (
            <ul className="careerJobs">
              {OPENINGS.map(({ title, department, location, type, summary }, i) => (
                <li className="careerJob" key={title}>
                  <div className="careerJobText">
                    <h3>{title}</h3>
                    <p className="careerMeta">{[department, location, type].join(" · ")}</p>
                    <p>{summary}</p>
                  </div>
                  <JobApply title={title} slug={`job-${i + 1}`} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="careerEmpty">
              <h3>No open positions right now</h3>
              <p>
                We are always keen to meet driven people who care about rural transformation and agritech. Send us
                your resume and we will keep it in mind for upcoming opportunities.
              </p>
            </div>
          )}
        </SubSection>

        <PartnerTypes
          id="perks"
          title="Perks and benefits"
          intro="We support the people who power our mission with benefits and a workplace that helps them grow."
          items={page.perks}
        />

        <SubCta
          title="Don't see the right role? We are looking for talent."
          text="If you believe in our mission of transforming rural livestock livelihoods across India, send us your resume and we would love to connect."
          action="Send your resume"
          // Back up to the application form at the top, where the resume can be attached
          href="#apply"
        />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
