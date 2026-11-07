import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { Arrow } from "@/components/ui/Arrow"
import { BackToTop } from "@/components/ui/BackToTop"
import { SITE_URL } from "@/constants/site"

// Copy follows "Manikstu FPO Connect: Website Content" (Manikstu_FPOConnect_Website_Content.docx), from the Manikstu FPO
// Connect concept note. The brief's editorial notes for the Manikstu team are not shown on the page.
// shortcut: the brief gives no content for its Sections 7 and 8, its "Our Vision" link or the hero's four-stat bar, so they
// are not built. The commission and margin percentages, the two Prani Mitras per FPO and the app status are published as the
// brief words them; the team should confirm them before launch.

const TITLE = "FPO Connect | Manikstu Agri Solutions"
const SUMMARY =
  "A partnership programme for FPOs: free goat vaccination camps for your members, product and manure business lines, and Manikstu's veterinary and digital support."

export const metadata: Metadata = {
  title: TITLE,
  description: SUMMARY,
  alternates: { canonical: "/fpo" },
  openGraph: { title: TITLE, description: SUMMARY, url: "/fpo", images: [`${SITE_URL}/manikstu/solutions/care-for-your-goats.webp`] },
}

const GAPS = [
  ["Limited business lines", "Few FPOs offer livestock-specific products and services to their members."],
  ["Weak market links", "Farmers may depend on middlemen and goat manure often goes unsold."],
  ["Limited animal-health reach", "Vaccination and deworming may not reach remote villages on time."],
  ["Limited livestock data", "Without member-level livestock records, it is harder to plan services and attract buyers."],
]

const STEPS = [
  ["Partner", "Meet with the FPO CEO and board, agree on roles and sign a simple MoU."],
  ["Mobilise", "Your FPO lists goat-rearing members village-wise and shares the camp date."],
  ["Vaccinate & record", "Health checks, vaccination as advised by the veterinarian, farmer registration and vaccination cards."],
  ["Follow up", "Phone follow-up, re-weighing after 30 to 45 days and booster reminders through SMS or WhatsApp."],
]

const RECEIVE = [
  "Registration in the Manikstu app (with farmer consent)",
  "Goat health check by veterinarian",
  "Vaccination as advised",
  "Digital vaccination card for each goat",
  "Information on animal care and follow-up reminders",
]

const GAINS = [
  "A valuable, tangible service for goat-rearing members",
  "Better engagement with an underserved farmer segment",
  "A starting point for building a livestock business",
  "2 trained Prani Mitras from the community",
  "A stronger relationship with Manikstu",
]

const MODELS = [
  {
    name: "Commission Partner",
    line: "Start without stock investment",
    best: "New FPOs and FPOs looking to start without investing in stock.",
    text: "Your FPO promotes Manikstu products and books orders. Manikstu supplies products on consignment and pays a commission on sales. Your FPO does not need to purchase stock to get started.",
    does: [
      "Promote products and collect orders from members",
      "Manikstu manages stock supply and dispatch",
      "Earn commission on every confirmed sale",
      "Low investment to begin: no stock holding required",
    ],
    earn: [
      ["Commission on sales", "8 to 12%"],
      ["FPO stock investment required", "Nil"],
    ],
  },
  {
    name: "Distribution Partner",
    line: "Build your product business",
    best: "Active FPOs with working capital, storage capacity and experience in product sales.",
    text: "Your FPO purchases products from Manikstu at distributor prices, stores them and resells to members. This model gives the FPO a larger role in product sales and stock management.",
    does: [
      "Purchase products at distributor prices from Manikstu",
      "Store and sell products directly to members",
      "Manage your own stock and reorder cycles",
      "Earn a margin on every product sold",
    ],
    earn: [
      ["Resale margin", "12 to 18%"],
      ["Indicative launch time", "1 to 3 months"],
    ],
  },
  {
    name: "Goat Care Centre",
    line: "Build a dedicated livestock centre",
    best: "Established FPOs with a capable team, infrastructure and a dense goat-rearing farmer network.",
    text: "Your FPO runs a Manikstu-branded Goat Care Centre using Manikstu's brand, systems and services. It becomes a dedicated local point for livestock products and services.",
    does: [
      "Set up and run a branded Goat Care Centre",
      "Offer livestock products and para-vet services",
      "Support goat manure collection from members",
      "Earn through product margins and service fees",
    ],
    earn: [
      ["Indicative launch time", "6 to 12 months"],
      ["Setup investment", "Higher (discuss with Manikstu)"],
    ],
  },
]

const SUPPORT = [
  ["Product range", "Feed, mineral supplements, veterinary syrups, fodder seeds and breeding goats."],
  ["Veterinary network", "Support for vaccination, deworming, animal health advice and livestock services."],
  ["Digital technology", "Farmer and goat profiles, vaccination records, health reminders and FPO dashboards through the Manikstu app."],
  ["Business support", "Product supply, manure procurement and livestock business opportunities."],
  ["Training", "Selection and training of local Prani Mitras as community animal-health workers."],
  ["Marketing support", "Camp-based promotions, product demonstrations, awareness materials and digital communication."],
]

const LINES = [
  ["Livestock product sales", "Goat & sheep pellet feed, mineral lick blocks, vet syrups & fodder seeds, breeding bucks and Goat Care Kits."],
  ["Goat manure buy-back", "Collect at village points, dry it, supply it to Manikstu and earn an aggregation margin on manure that often goes unused."],
  ["Livestock services", "Vaccination & deworming, vet advisory & health cards, breeding support and goat sale linkages."],
]

const FAQS = [
  [
    "Does the FPO need to invest to begin?",
    "The recommended starting model is Commission Partner, which requires no stock investment from the FPO. Distribution and Goat Care Centre models require higher investment and are suited to FPOs with greater capacity.",
  ],
  [
    "Who conducts the vaccination?",
    "Vaccination and treatment are carried out by a registered veterinarian or trained para-vets under the veterinarian's supervision. The schedule is decided by the vet based on local disease conditions and season.",
  ],
  [
    "How does the FPO earn?",
    "Depending on the model: commission on product sales (8 to 12%), resale margins as a Distribution Partner (12 to 18%), or product margins and service fees through a Goat Care Centre. Manure-collection FPOs earn an aggregation margin.",
  ],
  [
    "What happens to farmer data?",
    "Farmer and goat information is recorded with informed consent. Free vaccination does not depend on marketing consent. Personal data will not be sold or shared with third parties.",
  ],
  [
    "How can our FPO get started?",
    "Share your FPO details through the enquiry form. Next steps: initial discussion with CEO and board, agreement on roles, MoU, then the first vaccination camp is planned.",
  ],
]

export default function FpoPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="fpoHero">
          <img
            src="/manikstu/hero-conference.webp"
            alt="A presenter speaking into a microphone on a conference stage"
            width="1858"
            height="846"
            style={{ objectPosition: "74% center" }}
            fetchPriority="high"
          />
          <div>
            <h1>
              Your FPO&apos;s gateway to a <span>stronger livestock business.</span>
            </h1>
            <p>
              Bring better goat-health support to your members. Build new business opportunities for your FPO. Grow with
              Manikstu through products, services, manure procurement and market connections.
            </p>
            <div className="ajActions">
              <a className="ajBtn gold" href="/contact">
                Partner with Manikstu <Arrow />
              </a>
              <a className="ajBtn ghost" href="#camp">
                Explore the programme
              </a>
            </div>
          </div>
        </section>

        <section className="fpoWhy" id="opportunity" aria-labelledby="fpo-why">
          <h2 id="fpo-why">Your members are your strength. Let&apos;s build more around it.</h2>
          <p>
            Many FPOs have built strong relationships with farmers, but livestock services and business opportunities are
            still limited. Goat farming is already an important livelihood for many small, marginal, landless, tribal and
            women farmers.
          </p>
          <dl>
            {GAPS.map(([title, text]) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
          <p className="fpoLead">
            Manikstu FPO Connect helps FPOs bring organised goat-health support to members and build a new business line
            around livestock.
          </p>
        </section>

        <section className="fpoCamp" id="camp" aria-labelledby="fpo-camp">
          <h2 id="fpo-camp">Start with free goat vaccination.</h2>
          <p className="fpoIntro">
            Bring an immediate benefit to your members and open the door to a long-term business partnership.
          </p>
          <ol className="fpoSteps">
            {STEPS.map(([name, text], i) => (
              <li key={name}>
                <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
                <h3>{name}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className="fpoCampBody">
            <img
              src="/manikstu/solutions/village-level-entrepreneurs.webp"
              alt="Women farmers and Manikstu staff in a training session"
              width="1280"
              height="720"
              loading="lazy"
            />
            <div>
              <h3>What farmers and goats receive at the camp</h3>
              <ul>
                {RECEIVE.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <h3>What the FPO gains</h3>
              <ul>
                {GAINS.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p>
                Two local youths from each participating FPO are selected and trained as Prani Mitras: community
                animal-health workers who can provide first-level livestock care in their village.
              </p>
            </div>
          </div>
          <div className="fpoFree">
            <p>
              <strong>A free service for your goat-rearing members.</strong> Each FPO camp is planned over 2 to 3 days, with
              veterinary support and farmer awareness.
            </p>
            <a className="ajBtn gold" href="/contact">
              Bring a camp to your FPO <Arrow />
            </a>
          </div>
        </section>

        <section className="fpoModels" id="models" aria-labelledby="fpo-models">
          <h2 id="fpo-models">Start with what you have. Grow as your business grows.</h2>
          <p className="fpoIntro">
            Different FPOs have different levels of experience, working capital and infrastructure. Choose the model that
            suits your current capacity.
          </p>
          <div>
            {MODELS.map(({ name, line, best, text, does, earn }) => (
              <article key={name}>
                <h3>{name}</h3>
                <p className="fpoTag">{line}</p>
                <p>
                  <strong>Best for:</strong> {best}
                </p>
                <p>{text}</p>
                <ul>
                  {does.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <dl>
                  {earn.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
          <p className="fpoLead">
            Start as a Commission Partner, grow into a Distribution Partner and build towards a Goat Care Centre. You can
            begin with a low-investment model and move to a larger partnership as your business develops.
          </p>
        </section>

        <section className="fpoSupport" id="support" aria-labelledby="fpo-support">
          <h2 id="fpo-support">Your FPO brings the farmer network. We bring the support.</h2>
          <p className="fpoIntro">
            Manikstu works across the goat-farming value chain and brings products, systems and service connections to the
            partnership.
          </p>
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
              <h3>Beyond the camp, new business lines</h3>
              <p>
                The vaccination camp is the starting point. Together, Manikstu and your FPO can develop products, services
                and market connections for goat farmers.
              </p>
              <dl>
                {LINES.map(([title, text]) => (
                  <div key={title}>
                    <dt>{title}</dt>
                    <dd>{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="fpoFaq" id="faq" aria-labelledby="fpo-faq">
          <h2 id="fpo-faq">A clear start. A flexible partnership.</h2>
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
