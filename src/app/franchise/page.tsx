import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { Arrow } from "@/components/ui/Arrow"
import { BackToTop } from "@/components/ui/BackToTop"
import { SITE_URL } from "@/constants/site"

// Copy and figures follow "Manikstu Franchise & Business Partnerships: Website Content"
// (Manikstu_Franchise_Website_Content.docx), whose numbers come from the Project Sujalam-Suphalam sales pitch
// (Manikstu Agro Pvt. Ltd., April 2026). The brief's editorial note for the Manikstu team is not shown on the page.
// Layout and styles are shared with the FPO Connect page (.fpo* in globals.css).
// shortcut: the brief asks the team to confirm the eligibility and territory terms and the loan terms before launch; they
// are published as the brief words them, with its "subject to" wording kept.
// Nov 2026, by client request: the investment breakdown and five-year projection sections were removed, and the model
// figures changed to a 400 sq. ft. shed, 10 + 2 starting herd and ₹4 lakh estimated investment (the brief said 200 sq.
// ft., 10 + 1 and ₹3.54 lakh). The ₹3.50 lakh loan and 35-animal capacity were not restated, so they still need checking.

const TITLE = "Franchise & Business Partnerships | Manikstu Agro Private Limited"
const SUMMARY =
  "Start your own goat farming enterprise with Manikstu's complete support system: climate-smart shed, healthy breeding goats, veterinary care, insurance and market linkages. Estimated investment ₹4 lakh."

export const metadata: Metadata = {
  title: TITLE,
  description: SUMMARY,
  alternates: { canonical: "/franchise" },
  openGraph: { title: TITLE, description: SUMMARY, url: "/franchise", images: [`${SITE_URL}/manikstu/solutions/sell-at-a-fair-price.webp`] },
}

const GLANCE = [
  ["Climate-smart shed size", "400 sq. ft."],
  ["Starting herd (10 female + 2 bucks)", "10 + 2"],
  ["Estimated initial investment", "₹4 lakh"],
  ["Maximum shed capacity", "35 animals"],
]

const CHALLENGES = [
  "Lack of proper sheds and housing facilities",
  "Limited access to veterinary care and medicines",
  "High animal mortality and disease-related losses",
  "Difficulty finding healthy breeding goats",
  "Uncertain selling prices and limited market access",
]

const BUSINESS = [
  [
    "Set up your farm",
    "Build the shed, arrange the infrastructure, and start with your breeding herd of 10 female goats and 2 breeding bucks.",
  ],
  [
    "Manage the breeding cycle",
    "Follow planned breeding schedules, monitor pregnancies and provide the right nutrition to mother goats and young kids.",
  ],
  [
    "Grow your herd and sell",
    "Retain selected female kids (30% retention) to grow the breeding pool. Sell market-ready kids at approximately 9 months through available buyer linkages.",
  ],
  [
    "Provide ongoing management",
    "Track animal health, vaccination schedules and farm performance through digital records and Manikstu's support network.",
  ],
]

const SUPPORT = [
  ["Climate-smart goat shed", "400 sq. ft. RCC/CGI frame, concrete flooring, proper ventilation, solar-powered lighting and surveillance."],
  ["Healthy breeding goats", "10 female goats + 2 breeding bucks, selected for the planned breeding programme."],
  ["Veterinary care and nutrition", "Para-veterinary services, vaccination guidance, medicines, supplements and regular health monitoring."],
  ["Livestock insurance", "Risk cover with INAPH digital ear tagging and health records to support tracking and claims."],
  ["Market and buy-back support", "Access to Manikstu's market network and buy-back arrangements at agreed floor prices, subject to programme terms."],
  ["Digital farm management", "Digital animal records and monitoring systems for livestock health, vaccination schedules and farm performance."],
]

const SUITABLE = [
  "Have access to suitable land for setting up a goat shed",
  "Are interested in livestock farming and rural entrepreneurship",
  "Can arrange the required investment or explore eligible financing",
  "Are willing to actively manage daily farm activities",
  "Want to build a sustainable business with professional support",
]

const JOURNEY = [
  ["Express Your Interest", "Contact our team and share your interest in starting a goat farming business."],
  ["Understand the Model", "Our team will explain the investment, infrastructure, livestock requirements and business process."],
  ["Farm Assessment and Planning", "We assess land availability, location, infrastructure requirements and suitability for the programme."],
  ["Set Up Your Farm", "Complete the shed construction, arrange livestock procurement and prepare the farm for operations."],
  ["Start and Grow", "Begin your breeding and farm management activities with continued support from Manikstu."],
  ["Sell and Expand", "Connect with available market channels, sell market-ready goats and plan the next stage of farm growth."],
]

const FAQS = [
  ["How many goats do I need to start?", "The proposed model starts with 10 female goats and 2 breeding bucks."],
  ["How much investment is required?", "Estimated ₹4 lakh, including shed, starting livestock and Year 1 insurance."],
  ["Can I get a loan for the farm?", "The proposed model includes a ₹3.50 lakh agriculture loan. Eligibility depends on the lending institution."],
  ["Will Manikstu help with veterinary care?", "Yes. Vaccination support, nutrition guidance, medicines and para-vet access are included in the programme."],
  ["What happens if a goat dies?", "Livestock insurance is included. Coverage and claims are governed by the applicable insurance policy."],
  ["When can I start earning?", "First major sales are planned around Month 14. Actual income depends on the breeding cycle and market conditions."],
  ["Will Manikstu purchase the goats?", "Manikstu provides buy-back arrangements at agreed floor prices, subject to programme terms."],
  ["How many goats can my shed hold?", "The shed is designed for a maximum of 35 animals."],
]

export default function FranchisePage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="fpoHero">
          <img
            src="/projects/franchise/franchise-team.webp"
            srcSet="/projects/franchise/franchise-team-1100.webp 1100w, /projects/franchise/franchise-team.webp 2200w"
            sizes="100vw"
            alt="The Manikstu team and visitors standing in a row in front of raised goat sheds"
            width="2200"
            height="1000"
            style={{ objectPosition: "center 70%" }}
            fetchPriority="high"
          />
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="fpoCrumb">
                <li>
                  <a href="/partners">Collaborate</a>
                </li>
                <li aria-hidden="true">→</li>
                <li aria-current="page">Franchise &amp; Business Partnerships</li>
              </ol>
            </nav>
            <h1>
              Build <span>your own goat farming business</span> with Manikstu
            </h1>
            <p>
              Start your own goat farming enterprise with Manikstu&apos;s complete support system. From setting up your shed
              and selecting healthy goats to veterinary care, insurance and market connections, we help you manage every
              step of the journey.
            </p>
            <div className="ajActions">
              <a className="ajBtn gold" href="#model">
                Explore the opportunity <Arrow />
              </a>
              <a className="ajBtn ghost" href="/contact">
                Apply now
              </a>
            </div>
          </div>
        </section>

        <section className="fpoWhy fpoStats" id="model" aria-labelledby="fr-glance">
          <h2 id="fr-glance">The franchise model at a glance</h2>
          <p className="fpoIntro">
            Figures are from the project presentation and represent the proposed model, not a guaranteed outcome. Final
            costs and territory terms must be confirmed.
          </p>
          <dl>
            {GLANCE.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="fpoCamp" aria-labelledby="fr-why">
          <h2 id="fr-why">Turn your passion for farming into a growing business.</h2>
          <p className="fpoIntro">
            Goat farming is an important source of income for many rural households. However, managing a profitable farm is
            not always easy.
          </p>
          <div className="fpoCampBody">
            <img
              src="/manikstu/solutions/build-a-better-farm.webp"
              alt="Farmers and Manikstu staff in front of a goat shed"
              width="1402"
              height="1122"
              loading="lazy"
            />
            <div>
              <h3>Farmers often face challenges such as:</h3>
              <ul>
                {CHALLENGES.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p>
                At Manikstu, we believe goat farming can become a more organised and sustainable business when farmers have
                access to the right infrastructure, knowledge and market support.
              </p>
            </div>
          </div>
          <p className="fpoLead">That&apos;s why we developed a model that brings everything together under one roof.</p>
        </section>

        <section className="fpoWhy" id="how" aria-labelledby="fr-how">
          <h2 id="fr-how">How the business works.</h2>
          <ol className="fpoSteps">
            {BUSINESS.map(([name, text], i) => (
              <li key={name}>
                <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
                <h3>{name}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="fpoSupport" aria-labelledby="fr-support">
          <h2 id="fr-support">You bring the farm. We bring the support system.</h2>
          <div>
            <dl>
              {SUPPORT.map(([title, text]) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
            <div>
              <h3>Starting is only the first step</h3>
              <p>
                Starting a goat farm is only the first step. Managing it successfully requires regular guidance, animal care
                and access to buyers. Manikstu brings these together through an integrated support system.
              </p>
              <p>
                The farmer is responsible for the local farm, infrastructure investment and day-to-day operations. Manikstu
                is responsible for the model, operating systems, branding support, and coordination of the wider service and
                trading ecosystem.
              </p>
            </div>
          </div>
        </section>

        <section className="fpoWhy" aria-labelledby="fr-who">
          <h2 id="fr-who">Is this business right for you?</h2>
          <p className="fpoIntro">We welcome individuals who are interested in building a long-term goat farming business.</p>
          <div className="fpoTwo">
            <div>
              <h3>You may be a suitable partner if you:</h3>
              <ul>
                {SUITABLE.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <p className="fpoLead">
              Prior goat farming experience can be useful, but the willingness to learn and manage the farm is equally
              important.
            </p>
          </div>
        </section>

        <section className="fpoCamp" aria-labelledby="fr-journey">
          <h2 id="fr-journey">From your first conversation to your first sale.</h2>
          <ol className="fpoSteps six">
            {JOURNEY.map(([name, text], i) => (
              <li key={name}>
                <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
                <h3>{name}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="fpoFaq" id="faq" aria-labelledby="fr-faq">
          <h2 id="fr-faq">Frequently asked questions.</h2>
          <div>
            {FAQS.map(([question, answer], i) => (
              <details key={question} open={i === 0}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
