import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { AjaMap } from "@/components/sections/projects/AjaMap"
import { VideoGrid } from "@/components/sections/resources/VideoGrid"
import { Arrow } from "@/components/ui/Arrow"
import { BackToTop } from "@/components/ui/BackToTop"
import { ImpactIcon } from "@/components/ui/ImpactIcon"
import { SITE_URL } from "@/constants/site"
import type { ImpactIconType } from "@/types"

// Copy and figures follow "Project Aja — Website Content Brief" (Project_Aja_Website_Content.docx),
// whose numbers come from the official Project Aja PDF for Raipur District (Manikstu Agro Pvt. Ltd.).

const TITLE = "Project AJAH | Manikstu Agro Private Limited"
const SUMMARY =
  "Project AJAH gives a rural woman a complete goat enterprise in her own backyard: a climate-smart shed, twelve goats and end-to-end support, in Raipur, Chhattisgarh."

export const metadata: Metadata = {
  title: TITLE,
  description: SUMMARY,
  alternates: { canonical: "/projects/ajah" },
  openGraph: { title: TITLE, description: SUMMARY, url: "/projects/ajah", images: [`${SITE_URL}/ajah-hero.webp`] },
}

type Tile = { icon: ImpactIconType; value: string; label: string }

type Partner = { name: string; place: string; logo?: string }

const PARTNERS: Partner[] = [
  { name: "District Administration", place: "Raipur", logo: "/partners/district-administration-raipur.png" },
  { name: "Zila Panchayat", place: "Raipur", logo: "/partners/zila-panchayat-raipur.png" },
  { name: "Bihar", place: "(CGSRLM)", logo: "/partners/bihar-cgsrlm.png" },
]

const GLANCE: Tile[] = [
  { icon: "villages", value: "₹3.5 lakh", label: "Complete enterprise per woman" },
  { icon: "goats", value: "12 goats", label: "10 does and 2 bucks" },
  { icon: "coins", value: "₹0", label: "Cash she pays upfront" },
  { icon: "chart", value: "₹1.19 lakh", label: "Projected net income in Year 3" },
  { icon: "sprout", value: "Hers to own", label: "The shed and herd belong to her" },
]

const GAPS: { icon: ImpactIconType; label: string }[] = [
  { icon: "health", label: "High mortality" },
  { icon: "villages", label: "Inadequate shelter" },
  { icon: "rupee", label: "Limited access to finance" },
  { icon: "market", label: "Uncertain market linkages" },
]

const SOLUTION: { icon: ImpactIconType; title: string; text: string }[] = [
  { icon: "herd", title: "Climate-smart shed", text: "Two-level design (goats above, chickens below)" },
  { icon: "goats", title: "Goats", text: "A productive herd of 12 goats (10 does + 2 bucks)" },
  { icon: "shield", title: "Insurance", text: "Risk protection for the herd" },
  { icon: "health", title: "Veterinary care", text: "Regular health camps, vaccination (4 per year) and deworming" },
  { icon: "truck", title: "Buy-back assurance", text: "A ready market for goats and manure" },
  { icon: "phone", title: "GoatBank app + inputs", text: "Farm data, breeding guidance and nutrition support (feed, minerals, etc.)" },
]

const BACKED: Tile[] = [
  { icon: "calendar", value: "Since 2015", label: "In rural India" },
  { icon: "farmers", value: "8,000+", label: "Farmer households" },
  { icon: "goats", value: "1,00,000+", label: "Goats under management" },
  { icon: "health", value: "2,00,000+", label: "Veterinary treatments" },
]

const FILMS = ["aKnwiUhA4Yw", "9ywHq6H3-wU", "9NaH7-qu9OA"]

function Head({ id, title, text }: { id: string; title: string; text?: string }) {
  return (
    <header className="ajHead">
      <h2 id={id}>{title}</h2>
      {text && <p>{text}</p>}
    </header>
  )
}

export default function ProjectAjaPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="ajHero">

          <div className="ajHeroText">
            <p className="ajEyebrow">
              <ImpactIcon type="pin" />
              Flagship programme · Raipur, Chhattisgarh
            </p>
            <h1>
              Project <span>AJAH</span>
            </h1>
            <p className="ajSub">A climate-smart goat farm in her own backyard</p>
            <p className="ajLede">
              A complete, women-owned goat enterprise — with a smart shed, twelve goats and end-to-end support, built
              with government partnership.
            </p>
            <div className="ajActions">
              <a className="ajBtn gold" href="/contact">
                Join with Us <Arrow />
              </a>
              <a className="ajBtn ghost" href="#how">
                See how it works <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <AjaMap />
        </section>

        <section className="ajPartners" aria-label="A joint initiative with">
          <p>A joint initiative with</p>
          <ul>
            {PARTNERS.map(({ name, place, logo }) => (
              <li key={name}>
                {logo ? (
                  <img src={logo} alt={name} />
                ) : (
                  <>
                    <strong>{name}</strong>
                    <span>{place}</span>
                  </>
                )}
              </li>
            ))}
            <li>
              <img src="/manikstu/manikstu-logo-green.png" alt="Manikstu" width="1200" height="400" />
            </li>
          </ul>
        </section>

        <section className="ajRow" aria-labelledby="aja-glance">
          <Head
            id="aja-glance"
            title="The AJAH Model at a Glance"
            text="A proven, end-to-end goat enterprise that builds assets, income and resilience for rural families."
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

        <section className="ajRow alt" aria-labelledby="aja-why">
          <Head
            id="aja-why"
            title="Why Project AJAH?"
            text="Goat rearing already supports millions of rural families, but without the right support, its potential remains untapped."
          />
          <div className="ajWhy">
            <ul className="ajGaps">
              {GAPS.map(({ icon, label }) => (
                <li key={label}>
                  <ImpactIcon type={icon} />
                  {label}
                </li>
              ))}
            </ul>
            <aside className="ajContext">
              <h3>A bigger opportunity for rural India</h3>
              <p>~140 million goats, reared by ~20 million households across the country.</p>
              <small>Source: 20th Livestock Census, GoI</small>
            </aside>
          </div>
        </section>

        <section className="ajRow" aria-labelledby="aja-solution">
          <Head
            id="aja-solution"
            title="The Solution: A Complete Goat Enterprise"
            text="A fully integrated model that combines infrastructure, livestock, care and assured market support."
          />
          <ul className="ajCards">
            {SOLUTION.map(({ icon, title, text }) => (
              <li key={title}>
                <ImpactIcon type={icon} />
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="ajRow alt" id="how" aria-labelledby="aja-how">
          <Head
            id="aja-how"
            title="How It Works"
            text="A simple, supported model that helps her herd grow and income rise over time."
          />
          <div className="ajFlow">
            <div className="ajStep">
              <ImpactIcon type="coins" />
              <h3>Funding</h3>
              <div className="ajFund">
                <p>
                  <strong>₹2,25,000</strong> Government support
                </p>
                <span aria-hidden="true">+</span>
                <p>
                  <strong>₹1,25,000</strong> Community contribution
                </p>
              </div>
            </div>
            <span className="ajOp" aria-hidden="true">
              +
            </span>
            <div className="ajStep">
              <ImpactIcon type="goats" />
              <h3>Herd growth</h3>
              <p className="ajBig">12 → 17 → 23 → 25</p>
              <p>(over 3 years)</p>
            </div>
            <span className="ajOp arrow" aria-hidden="true">
              →
            </span>
            <div className="ajStep">
              <ImpactIcon type="chart" />
              <h3>Rising income</h3>
              <p>From goat sales and manure</p>
            </div>
          </div>
        </section>

        <section className="ajRow" aria-labelledby="aja-films">
          <Head id="aja-films" title="Project AJAH on film" text="Short films on the project, including the Government of Chhattisgarh's own." />
          <VideoGrid only={FILMS} />
        </section>

        <section className="ajBacked" aria-labelledby="aja-backed">
          <h2 id="aja-backed">Backed by Manikstu</h2>
          <ul>
            {BACKED.map(({ icon, value, label }) => (
              <li key={label}>
                <ImpactIcon type={icon} />
                <span>
                  <strong>{value}</strong>
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
