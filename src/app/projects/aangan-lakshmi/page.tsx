import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { DhamtariMap } from "@/components/sections/projects/DhamtariMap"
import { Arrow } from "@/components/ui/Arrow"
import { BackToTop } from "@/components/ui/BackToTop"
import { ImpactIcon } from "@/components/ui/ImpactIcon"
import { LOCAL_ASSET_BASE } from "@/constants/site"
import type { ImpactIconType } from "@/types"

// Same layout as the Project AJAH page. Copy and figures follow "Project Aangan Lakshmi: Website Content"
// (Manikstu_AanganLakshmi_Website_Content.docx), whose numbers come from the Project Aangan Lakshmi handout (A5),
// Dhamtari Jila Panchayat / Manikstu Agro Pvt. Ltd. The brief's editorial notes for the Manikstu team are not shown.
// shortcut: the buy-back rate and the VB-G RAM G scheme name are for the team to confirm before launch.
// Nov 2026, by client request: the herd-growth chart/table and the income projections were removed from every project page.

const TITLE = "Aangan Lakshmi | Manikstu Agri Solutions"
const SUMMARY =
  "Aangan Lakshmi helps rural women in Dhamtari, Chhattisgarh set up their own goat enterprise at home: a raised-floor shed, a starting herd of 17, training and a guaranteed buy-back."

export const metadata: Metadata = {
  title: TITLE,
  description: SUMMARY,
  alternates: { canonical: "/projects/aangan-lakshmi" },
  openGraph: { title: TITLE, description: SUMMARY, url: "/projects/aangan-lakshmi" },
}

type Tile = { icon: ImpactIconType; value: string; label: string }

const GLANCE: Tile[] = [
  { icon: "pin", value: "Dhamtari", label: "Active project location, Chhattisgarh" },
  { icon: "goats", value: "17 goats", label: "Starting herd per beneficiary (15 female + 2 male)" },
  { icon: "rupee", value: "₹5 lakh", label: "Total unit value per enterprise" },
  { icon: "coins", value: "3 sources", label: "Income channels: goats, poultry, manure" },
]

const PROVIDED: { icon: ImpactIconType; title: string; text: string }[] = [
  {
    icon: "villages",
    title: "Goat shed",
    text: "14 ft × 24 ft raised-floor shed + about 64 sq ft entry ramp, roughly 400 sq ft with 2 separate enclosures. The raised floor keeps goats dry, cool and disease-free, and the lower section can hold backyard poultry with no extra land.",
  },
  { icon: "goats", title: "Starting herd", text: "15 healthy female goats + 2 breeding bucks, delivered directly to the beneficiary's shed." },
  {
    icon: "truck",
    title: "Buy-back guarantee",
    text: "Manikstu guarantees buy-back of all goats at a live-weight-based rate. Beneficiaries may also sell in the open market.",
  },
  { icon: "shield", title: "Year 1 insurance", text: "Free livestock insurance for all 17 goats in the first year, fully covered by Manikstu." },
  { icon: "health", title: "Year 1 vaccination", text: "4 essential vaccines free for all 17 goats in Year 1, covered by Manikstu." },
  { icon: "sprout", title: "Solar support", text: "2 solar lights + 1 solar surveillance camera (indoor and outdoor security)." },
  {
    icon: "training",
    title: "Practical training",
    text: "Hands-on training in feed management, breeding, kid care, backyard poultry and basic bookkeeping.",
  },
]

const BRINGS: { icon: ImpactIconType; label: string; text: string }[] = [
  { icon: "pin", label: "Space for the shed", text: "Courtyard or within 100 metres of home" },
  { icon: "villages", label: "Concrete base", text: "At own cost" },
  { icon: "health", label: "Daily care", text: "Feeding and water" },
  { icon: "sprout", label: "Feed for 8 to 9 months", text: "Until first sales begin" },
  { icon: "calendar", label: "From Year 2", text: "Vaccination (₹100 per goat) and insurance renewal" },
]

const ELIGIBLE = [
  "Rural woman, member of a Self-Help Group (SHG)",
  "Space available for a shed: in the courtyard or within 100 metres of home",
  "Willing to participate in training and take on daily farm management",
  "Access to water and ability to arrange feed and care",
  "Selected through the Gram Sabha approval process",
]

const HANDOUT = `${LOCAL_ASSET_BASE}/docs/aangan-lakshmi-handout.pdf`

function Head({ id, title, text }: { id: string; title: string; text?: string }) {
  return (
    <header className="ajHead">
      <h2 id={id}>{title}</h2>
      {text && <p>{text}</p>}
    </header>
  )
}

export default function AanganLakshmiPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="ajHero">
          <div className="ajHeroText">
            <p className="ajEyebrow">
              <ImpactIcon type="pin" />
              Dhamtari · Chhattisgarh
            </p>
            <h1 className="mid">
              Aangan <span>Lakshmi</span>
            </h1>
            <p className="ajSub" lang="hi">
              हर आँगन में उद्यम, हर घर में समृद्धि!
            </p>
            <p className="ajLede">
              Building women-led enterprises in rural Chhattisgarh, one courtyard at a time. Aangan Lakshmi is Manikstu&apos;s
              initiative to help rural women in Dhamtari district establish their own goat-rearing units at home, with a full
              shed, a starting herd, hands-on training, and a guaranteed buy-back for every animal they raise.
            </p>
            <div className="ajActions">
              <a className="ajBtn gold" href="#what">
                Explore the project <Arrow />
              </a>
              <a className="ajBtn ghost" href="/contact">
                Enquire now
              </a>
            </div>
          </div>
          <DhamtariMap />
        </section>

        <section className="ajRow" aria-labelledby="al-glance">
          <Head id="al-glance" title="The Project at a Glance" />
          <ul className="ajTiles four">
            {GLANCE.map(({ icon, value, label }) => (
              <li key={label}>
                <ImpactIcon type={icon} />
                <strong>{value}</strong>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="ajRow alt" id="what" aria-labelledby="al-what">
          <Head id="al-what" title="An enterprise built around women, in their own space." />
          <div className="ajWhy">
            <div className="ajText">
              <p>
                In rural Chhattisgarh, women have always been central to household farming, but rarely own the enterprise.
                This is Manikstu&apos;s programme to help Self-Help Group members in Dhamtari district build a productive,
                income-generating goat farm right in their courtyard or at the edge of their home.
              </p>
              <p>
                We provide the infrastructure, the inputs and the market linkage. The beneficiary provides the space, the
                daily care and the commitment to build something that is entirely theirs.
              </p>
            </div>
            <aside className="ajContext">
              <h3>How the model works</h3>
              <p>
                The unit is built around a raised-floor goat shed in the beneficiary&apos;s own courtyard. Goats are
                delivered at the start. Kids are born in staggered cycles across the year, so sales happen almost every
                month, not in one burst. The same shed supports backyard poultry and produces goat manure, creating three
                income streams from a single space.
              </p>
            </aside>
          </div>
        </section>

        <section className="ajRow" id="how" aria-labelledby="al-provide">
          <Head
            id="al-provide"
            title="Everything needed to start and sustain the enterprise."
            text="Every Aangan Lakshmi unit is set up end-to-end by Manikstu. Here is exactly what each beneficiary receives."
          />
          <div>
            <ul className="ajCards span">
              {PROVIDED.map(({ icon, title, text }) => (
                <li key={title}>
                  <ImpactIcon type={icon} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ajRow alt" aria-labelledby="al-brings">
          <Head
            id="al-brings"
            title="What the beneficiary provides"
            text="Each beneficiary brings the space, the daily care and some early running costs, for an enterprise that is entirely theirs."
          />
          <ul className="ajGaps five">
            {BRINGS.map(({ icon, label, text }) => (
              <li key={label}>
                <ImpactIcon type={icon} />
                {label}
                <small>{text}</small>
              </li>
            ))}
          </ul>
        </section>

        <section className="ajRow" aria-labelledby="al-finance">
          <Head
            id="al-finance"
            title="A ₹5 lakh enterprise, structured to be accessible."
            text="Manikstu has designed the financial structure of Aangan Lakshmi to make the dream possible for SHG members in Dhamtari."
          />
          <div>
            <div className="ajFlow">
              <div className="ajStep">
                <ImpactIcon type="coins" />
                <h3>Government scheme</h3>
                <p className="ajBig">₹3,50,000</p>
                <p>Convergence (VB-G RAM G)</p>
              </div>
              <span className="ajOp" aria-hidden="true">
                +
              </span>
              <div className="ajStep">
                <ImpactIcon type="rupee" />
                <h3>Beneficiary contribution</h3>
                <p className="ajBig">₹1,50,000</p>
                <p>Via cluster loan</p>
              </div>
              <span className="ajOp arrow" aria-hidden="true">
                →
              </span>
              <div className="ajStep">
                <ImpactIcon type="villages" />
                <h3>Total unit value</h3>
                <p className="ajBig">₹5,00,000</p>
              </div>
            </div>
            <p className="ajNote">
              The loan is repaid in 5 instalments of ₹30,000, at months 12, 15, 18, 21 and 24, with an 18-month interest-free
              period. Total interest is about ₹2,700.
            </p>
          </div>
        </section>

        <section className="ajRow alt" aria-labelledby="al-join">
          <Head
            id="al-join"
            title="Is Aangan Lakshmi right for you?"
            text="This programme is designed for rural women who are ready to take ownership of a productive enterprise. If you are a member of a Self-Help Group in Dhamtari district and have space near your home, Manikstu takes care of the rest."
          />
          <div className="ajWhy">
            <div>
              <h3 className="ajSubhead">Who can join</h3>
              <ul className="ajList">
                {ELIGIBLE.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <aside className="ajContext">
              <h3>What joining looks like</h3>
              <p>
                Meet your local PRP / Anchor. They will walk you through the eligibility criteria, the documents needed and
                the next steps. Selection is through Gram Sabha approval: your community decides together.
              </p>
            </aside>
          </div>
        </section>

        <section className="ajBacked" aria-labelledby="al-cta">
          <div>
            <h2 id="al-cta">Ready to explore the opportunity?</h2>
            <p>Learn more about the project, eligibility and how to get started.</p>
          </div>
          <div className="ajActions">
            <a className="ajBtn gold" href="/contact">
              Enquire about Aangan Lakshmi <Arrow />
            </a>
            <a className="ajBtn ghost" href={HANDOUT} download="Aangan-Lakshmi-Project-Handout.pdf">
              Download the handout (PDF, Hindi)
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
