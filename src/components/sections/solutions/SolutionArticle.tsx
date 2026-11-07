import Image from "next/image"
import Link from "next/link"
import { Arrow } from "@/components/ui/Arrow"
import { IMPACT_STATS } from "@/constants/content"
import { getContent } from "@/lib/cms"
import { CONTACT_INFO, CONTACT_PAGE } from "@/constants/site"
import type { SolutionPageContent } from "@/types"

// The same figures as the home page (including edits made in the admin), so the two never disagree
const shown = (stats: typeof IMPACT_STATS) => stats.filter(({ icon }) => icon === "farmers" || icon === "villages" || icon === "goats")

// One solution page, two doors: what a farmer gets and how to ask for it, then the case for investors and partners.
// Layout and styles are shared with the FPO Connect page (.fpo* in globals.css).
export async function SolutionArticle({ page }: { page: SolutionPageContent }) {
  const { lead, partners, cta } = page
  const STATS = shown((await getContent("home/impact", { stats: IMPACT_STATS })).stats)
  return (
    <>
      <section className="fpoHero">
        <Image
          src={lead.src}
          alt={lead.alt}
          fill
          priority
          sizes="100vw"
          style={lead.position ? { objectPosition: lead.position } : undefined}
        />
        <div>
          <nav aria-label="Breadcrumb">
            <ol className="fpoCrumb">
              <li>
                <Link href="/#solutions">Solutions</Link>
              </li>
              <li aria-hidden="true">→</li>
              <li aria-current="page">{page.name}</li>
            </ol>
          </nav>
          <h1>{page.title}</h1>
          <p>{page.lede}</p>
          <div className="ajActions">
            <a className="ajBtn gold" href="#farmers">
              For farmers: how it works <Arrow />
            </a>
            <a className="ajBtn ghost" href="#investors">
              For investors and partners
            </a>
          </div>
        </div>
      </section>

      <section className="fpoWhy" id="farmers" aria-labelledby="sol-farmers">
        <h2 id="sol-farmers">{page.pillarsHeading}</h2>
        <p className="fpoIntro">{page.intro.join(" ")}</p>
        <dl>
          {page.pillars.map(({ title, text }) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="fpoCamp" aria-labelledby="sol-how">
        <h2 id="sol-how">{page.stepsHeading}</h2>
        <ol className="fpoSteps">
          {page.steps.map((step, i) => (
            <li key={step}>
              <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
              <h3>{step}</h3>
            </li>
          ))}
        </ol>
        <div className="fpoPair">
          {page.pair.map((photo) => (
            <figure key={photo.src}>
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 45vw" />
              {photo.quote && <figcaption>{photo.quote}</figcaption>}
            </figure>
          ))}
        </div>
        <p className="fpoMotto">
          <span lang="hi">{page.motto.hi}</span>
          <small>{page.motto.en}</small>
        </p>
        <div className="fpoFree">
          <p>
            <strong>{cta.heading}</strong> {cta.line} You can also call us on{" "}
            <a href={CONTACT_INFO.phoneTel}>{CONTACT_INFO.phone}</a>.
          </p>
          <Link className="ajBtn gold" href={CONTACT_PAGE}>
            {cta.primary} <Arrow />
          </Link>
        </div>
      </section>

      <section className="fpoInvest" id="investors" aria-labelledby="sol-invest">
        <div>
          <h2 id="sol-invest">{partners.heading}</h2>
          <p className="fpoLeadIn">{partners.sub}</p>
          <p>{partners.why}</p>
          <div className="ajActions">
            <Link className="ajBtn gold" href="/join?as=investor">
              Talk to us about partnering <Arrow />
            </Link>
            <Link className="ajBtn ghost" href="/investors">
              Our investors
            </Link>
          </div>
        </div>
        <dl className="fpoValues">
          {partners.values.map(({ title, text }) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
        <dl className="fpoReach">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
        <small>Reach across all Manikstu programmes, not this solution alone.</small>
      </section>
    </>
  )
}
