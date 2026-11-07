import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { Arrow } from "@/components/ui/Arrow"
import { BackToTop } from "@/components/ui/BackToTop"
import { ImpactIcon } from "@/components/ui/ImpactIcon"

// Copy follows "Manikstu – Supply & Distribution Page" (content spec, 6 Nov 2026), laid out in the FPO page's style (the
// .fpo* section classes) to the site's brand rules. Facts were checked first: no Manikstu store exists on Amazon or
// India Post, so those link to a search and the home page; the spec's livestock, vaccine and partner forms map to
// the contact and join pages. The spec's Manufacturing Partners section was removed at the company's request.

const TITLE = "Supply & Distribution | Manikstu Agri Solutions"
const SUMMARY =
  "A demand-led supply and distribution network connecting farmers with quality livestock, veterinary essentials and farm inputs."

export const metadata: Metadata = {
  title: TITLE,
  description: SUMMARY,
  alternates: { canonical: "/supply-distribution" },
  openGraph: { title: TITLE, description: SUMMARY, url: "/supply-distribution" },
}

const JOIN = "/join"

const DISTRIBUTE = [
  ["Live Goats & Livestock", "Goats sourced from nearby farms based on farmer demand."],
  ["Veterinary Medicines & Healthcare", "Essential animal healthcare products."],
  ["Vaccines & Preventive Care", "Access to vaccination products."],
  ["Feed & Nutritional Supplements", "Nutrition for healthier goats."],
]

// Add a partner here: logo (or "local" for the storefront icon), name, description, link
const CHANNELS: { name: string; text: string; logo?: string; link: [label: string, href: string] }[] = [
  {
    name: "Amazon",
    text: "Marketplace access for eligible products.",
    logo: "/supply/amazon.svg",
    link: ["Visit Amazon", "https://www.amazon.in/s?k=Manikstu"],
  },
  // Flipkart links to the Manikstu goat feed listing the company supplied
  {
    name: "Flipkart",
    text: "Online product discovery.",
    logo: "/supply/flipkart.webp",
    link: ["Visit Flipkart", "https://www.flipkart.com/manikstu-goat-feed-9040030332-spectrophotometer/p/itmad6f073f79fd3?pid=SORH5FTEPADZAEDR"],
  },
  {
    name: "India Post",
    text: "Wider reach across India.",
    logo: "/supply/india-post.webp",
    link: ["Visit India Post", "https://www.indiapost.gov.in/"],
  },
  { name: "Local Distributors", text: "For greater accessibility in your region.", link: ["Partner With Us", JOIN] },
]

const SOURCING = [
  ["Farmer Requirement", "Share your requirement"],
  ["Nearby Sourcing", "From local farms & markets"],
  ["Transport & Delivery", "Safe and timely delivery"],
]

const PSA_ROLES = ["Household Visits", "Product Distribution", "Goat Care Support", "Farmer Coordination"]

const FLOW = [
  ["Farmer Requirement", "Product or livestock need"],
  ["Requirement Assessment", "Location, quantity & needs"],
  ["Sourcing & Distribution", "Digital + Local channels"],
  ["Last-Mile Fulfilment", "Through partners & PSAs"],
  ["Farmer Receives", "Products & Support"],
]

const pad = (i: number) => String(i + 1).padStart(2, "0")

export default function SupplyDistributionPage() {
  return (
    <>
      <Header />
      <main id="main" className="sdPage">
        <section className="fpoHero sdHero" aria-labelledby="sd-title">
          {/* Free stock photo (Pexels licence, no credit required), warmed to match the other heroes: https://www.pexels.com/photo/man-delivering-packages-to-a-person-4175032/ */}
          <img
            src="/supply/hero-delivery.webp"
            srcSet="/supply/hero-delivery-1100.webp 1100w, /supply/hero-delivery.webp 2200w"
            sizes="100vw"
            alt="A delivery person handing two parcels to a customer"
            width="2200"
            height="1467"
            style={{ objectPosition: "center 45%" }}
            fetchPriority="high"
          />
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="fpoCrumb">
                <li>Our Network</li>
                <li aria-hidden="true">→</li>
                <li aria-current="page">Supply &amp; Distribution</li>
              </ol>
            </nav>
            <h1 id="sd-title">
              Beyond Distribution. <span>Building Connections That Reach Every Farmer.</span>
            </h1>
            <p>
              A demand-led supply and distribution network connecting farmers with quality livestock, veterinary
              essentials and farm inputs through digital platforms, distribution partners and local on-ground support.
            </p>
            <div className="ajActions">
              <a className="ajBtn gold" href="#partners">
                Explore Our Network <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section className="fpoWhy" aria-labelledby="sd-distribute">
          <h2 id="sd-distribute">What We Distribute</h2>
          <p>Essential resources for every stage of goat farming.</p>
          <dl>
            {DISTRIBUTE.map(([title, text]) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="fpoWhy sdBand" id="partners" aria-labelledby="sd-channels">
          <header className="sdTitle">
            <p className="eyebrow">Our Distribution Partners</p>
            <h2 id="sd-channels">Multiple Channels. Wider Reach.</h2>
          </header>
          <p>Through trusted partners and platforms, we ensure essential products reach every farmer.</p>
          <ul className="sdChannelCols">
            {CHANNELS.map(({ name, text, logo, link: [label, href] }) => {
              const external = href.startsWith("http")
              return (
                <li key={name}>
                  <span className="sdMark">
                    {logo ? <img src={logo} alt={name} width="160" height="60" loading="lazy" /> : <ImpactIcon type="market" />}
                  </span>
                  <h3>{name}</h3>
                  <p>{text}</p>
                  <a href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
                    {label} <Arrow />
                  </a>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="fpoWhy" aria-labelledby="sd-sourcing">
          <h2 id="sd-sourcing">Demand-Led Livestock Sourcing</h2>
          <p>The right livestock. Sourced closer to the farmer.</p>
          <div className="fpoCampBody">
            <img
              src="/manikstu/hero-slide-2-photo.webp"
              alt="The Manikstu team with local women and goats in front of a raised goat shed"
              width="896"
              height="640"
              loading="lazy"
            />
            <div>
              <p className="fpoLead">
                When a farmer expresses a requirement, we source goats from nearby farms and coordinate delivery through
                local transport support.
              </p>
              <ol className="sdNumbered">
                {SOURCING.map(([title, text], i) => (
                  <li key={title}>
                    <b aria-hidden="true">{pad(i)}</b>
                    <span>
                      <strong>{title}</strong>
                      {text}
                    </span>
                  </li>
                ))}
              </ol>
              <a className="ajBtn gold" href="/solutions/sell-at-a-fair-price">
                Learn More <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section className="fpoWhy sdBand" aria-labelledby="sd-psa">
          <h2 id="sd-psa">Our Pashu Seva Adhikaris (PSAs)</h2>
          <p>Support that reaches the farmer&apos;s doorstep.</p>
          <div className="fpoCampBody sdFlip">
            <img
              src="/supply/psa-visit.webp"
              alt="Manikstu staff visiting women farmers at a goat shed"
              width="1280"
              height="880"
              loading="lazy"
            />
            <div>
              <p className="fpoLead">
                Our local PSA network conducts household visits, provides product support and offers goat care guidance.
              </p>
              <h3>What our PSAs facilitate</h3>
              <ul>
                {PSA_ROLES.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
              <a className="ajBtn gold" href="/solutions/village-level-entrepreneurs">
                Know More <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section className="fpoWhy" aria-labelledby="sd-how">
          <h2 id="sd-how">How Our Supply Network Works</h2>
          <p>From farmer demand to delivery. A seamless process.</p>
          <ol className="fpoSteps sdFive">
            {FLOW.map(([title, text], i) => (
              <li key={title}>
                <b aria-hidden="true">{pad(i)}</b>
                <h3>{title}</h3>
                <p>{text}</p>
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
