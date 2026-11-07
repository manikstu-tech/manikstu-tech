import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { KalahandiMap } from "@/components/sections/projects/KalahandiMap"
import { Arrow } from "@/components/ui/Arrow"
import { BackToTop } from "@/components/ui/BackToTop"
import { ImpactIcon } from "@/components/ui/ImpactIcon"
import type { ImpactIconType } from "@/types"

// Copy and figures follow "Project Sujalam-Suphalam: Website Content" (Project_Sujalam_Suphalam_Website_Content.docx), whose
// numbers come from the Project Sujalam-Suphalam sales pitch (Manikstu Agro Pvt. Ltd., April 2026). The brief's "Unit
// economics" block is marked "Do not publish", so it is not used here.

const TITLE = "Project Sujalam-Suphalam | Manikstu Agri Solutions"
const SUMMARY =
  "A fully managed, 35-animal goat enterprise for progressive farmers in Odisha: a climate-smart shed, elite breeding stock, 100% livestock insurance and a guaranteed buy-back, starting at ₹4,000."

export const metadata: Metadata = {
  title: TITLE,
  description: SUMMARY,
  alternates: { canonical: "/projects/sujalam-suphalam" },
  openGraph: { title: TITLE, description: SUMMARY, url: "/projects/sujalam-suphalam" },
}

type Tile = { icon: ImpactIconType; value: string; label: string }

const GLANCE: Tile[] = [
  { icon: "rupee", value: "₹3.54 lakh", label: "Total investment per unit" },
  { icon: "coins", value: "₹4,000", label: "Your initial equity (rest is financed)" },
  { icon: "goats", value: "35 animals", label: "Maximum shed capacity" },
  { icon: "chart", value: "₹3.02 lakh", label: "Projected net income by Year 5" },
  { icon: "shield", value: "100%", label: "Insurance coverage from Month 3" },
]

const PROBLEMS: { icon: ImpactIconType; label: string; text: string }[] = [
  { icon: "health", label: "High mortality", text: "Industry average mortality of 25%+ drains income before it arrives" },
  {
    icon: "training",
    label: "No scientific management",
    text: "Traditional grazing with no nutrition plan, vaccination schedule or health monitoring",
  },
  {
    icon: "market",
    label: "Unpredictable markets",
    text: "Distress sales to village middlemen, routinely 30–40% below fair value",
  },
  {
    icon: "rupee",
    label: "No access to finance",
    text: "A productive goat unit costs ₹3.5 lakh, well beyond what most households can fund",
  },
]

const INCLUDED: { icon: ImpactIconType; title: string; text: string }[] = [
  {
    icon: "villages",
    title: "Climate-smart shed",
    text: "200 sq ft RCC/CGI frame, concrete flooring, superior ventilation with louvers, solar lighting and 24/7 solar surveillance",
  },
  {
    icon: "goats",
    title: "Elite breeding stock",
    text: "10 does (12 months) + 1 breeding buck (20 months), breed-selected and delivered to your door",
  },
  {
    icon: "shield",
    title: "100% livestock insurance",
    text: "Every animal insured from 3 months of age: full mortality coverage, zero financial loss from death",
  },
  {
    icon: "health",
    title: "Veterinary & nutrition support",
    text: "On-call para-vet network, monthly health monitoring, vaccination protocol (PPR, FMD, Pox) and premium fodder supplement guidance",
  },
  {
    icon: "phone",
    title: "Digital health records",
    text: "INAPH digital ear tagging for every goat: real-time tracking, automated vaccination alerts and seamless insurance claims",
  },
  {
    icon: "truck",
    title: "Guaranteed buy-back",
    text: "Floor price guaranteed by Manikstu for all kids: no middlemen, no price uncertainty",
  },
]

const STEPS = [
  ["Apply", "Connect with our team to check eligibility and begin your loan application"],
  ["Build", "We construct your smart shed and deliver elite livestock to your farm"],
  ["Grow", "Scale your herd with end-to-end support and guaranteed market returns"],
]

function Head({ id, title, text }: { id: string; title: string; text?: string }) {
  return (
    <header className="ajHead">
      <h2 id={id}>{title}</h2>
      {text && <p>{text}</p>}
    </header>
  )
}

export default function ProjectSujalamSuphalamPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="ajHero">
          <div className="ajHeroText">
            <p className="ajEyebrow">
              <ImpactIcon type="pin" />
              Project Sujalam-Suphalam · Goat entrepreneurship · Odisha
            </p>
            <h1 className="long">Turn Your Farm into a High-Growth Goat Enterprise</h1>
            <p className="ajSub">
              ₹4,000 is all it takes to start. Manikstu builds the rest, and stands beside you every step of the way.
            </p>
            <p className="ajLede">
              Project Sujalam-Suphalam gives progressive farmers a fully managed, 35-animal goat business, with a
              climate-smart shed, elite breeding stock, guaranteed buy-back and end-to-end support. No guesswork. No
              middlemen. Just a clear path from your first goat to a thriving enterprise.
            </p>
            <div className="ajActions">
              <a className="ajBtn gold" href="/contact">
                Apply Now <Arrow />
              </a>
              <a className="ajBtn ghost" href="#how">
                See how it works <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <KalahandiMap />
        </section>

        <section className="ajRow" aria-labelledby="sj-glance">
          <Head
            id="sj-glance"
            title="The Sujalam-Suphalam Model at a Glance"
            text="A proven, end-to-end goat enterprise built for progressive farmers ready to scale."
          />
          <ul className="ajTiles">
            {GLANCE.map(({ icon, value, label }) => (
              <li key={label}>
                <ImpactIcon type={icon} />
                <strong>{value}</strong>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="ajRow alt" aria-labelledby="sj-why">
          <Head
            id="sj-why"
            title="Why We Built This Programme"
            text="Goat farming is already familiar to lakhs of rural households, but most farmers are stuck with the same low returns year after year. The reasons are well known:"
          />
          <div>
            <div className="ajWhy">
              <ul className="ajGaps wide">
                {PROBLEMS.map(({ icon, label, text }) => (
                  <li key={label}>
                    <ImpactIcon type={icon} />
                    {label}
                    <small>{text}</small>
                  </li>
                ))}
              </ul>
              <aside className="ajContext">
                <h3>The opportunity</h3>
                <p>
                  India has roughly 140 million goats, reared across 20 million households. Yet the sector remains deeply
                  underorganised. The right system, applied at the right scale, changes everything.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="ajRow" id="how" aria-labelledby="sj-get">
          <Head
            id="sj-get"
            title="A Complete Goat Enterprise, Delivered to Your Farm"
            text="Everything a modern, profitable goat business needs: built for you, managed with you, supported by us."
          />
          <div>
            <ul className="ajCards">
              {INCLUDED.map(({ icon, title, text }) => (
                <li key={title}>
                  <ImpactIcon type={icon} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ajCta" aria-labelledby="sj-cta">
          <div>
            <p className="ajTagline">
              A smarter farm today.
              <span>A stronger family tomorrow.</span>
            </p>
            <h2 id="sj-cta">Your farm is ready. Are you?</h2>
            <p className="ajCtaText">
              Project Sujalam-Suphalam is designed for farmers who want to do more with the land they already have. ₹4,000
              opens the door to a full goat enterprise, with Manikstu&apos;s support from day one.
            </p>
          </div>
          <ol className="ajApply" aria-label="Three steps to start">
            {STEPS.map(([name, text]) => (
              <li key={name}>
                <strong>{name}</strong>
                {text}
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
