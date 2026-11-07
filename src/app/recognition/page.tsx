import type { Metadata } from "next"
import Image from "next/image"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { SubSection } from "@/components/sections/subpage/parts"
import { Arrow } from "@/components/ui/Arrow"
import { BackToTop } from "@/components/ui/BackToTop"

const TITLE = "Recognition | Manikstu Agro Pvt. Ltd."
const DESCRIPTION =
  "Awards and recognitions Manikstu Agro Pvt. Ltd. has received for its work with goat farmers and rural women across India."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/recognition" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/recognition" },
}

// Shown on the same letterpress plates as the Partners page. With no logo file, the organiser's name stands in for it.
// Logos in public/recognition: Sambad and FICCI from Wikimedia Commons, Kanak News from kanaknews.com, IP India from
// ipindia.gov.in, Miller Center from millercenterglobal.org, OCF from ocfodisha.org, IGKV R-ABI from igkvrabi.com, and the Mann Ki Baat wordmark cropped from an official pmindia.gov.in episode banner (Nov 2026).
type Honour = {
  title: string
  by: string
  year?: string
  logo?: string
  // Short name shown in place of a missing logo, when "by" is too long for it
  word?: string
  // A long, short wordmark that may use the plate's side padding (as on the Partners page)
  wide?: boolean
  // More honours from the same organiser, merged onto this plate so each organiser appears once
  also?: [title: string, year: string][]
  link?: [label: string, href: string]
  // Shown in its own band above the timeline instead of inside it
  featured?: boolean
}

// Checked against the web in Nov 2026: the linked items have a source that names Manikstu or its founders. The unlinked
// ones at the end are the company's own list, kept at its request (Nov 2026) though no public source was found for them.
// The Sambad award was listed as "Pride of Odisha 2023"; its real name and date come from the Sambad report linked below.
const AWARDS: Honour[] = [
  {
    title: "Agri-Tech Innovation Award",
    by: "Reported by Kanak News",
    logo: "/recognition/kanak-news.webp",
    year: "2026",
    link: ["Watch the report", "https://www.youtube.com/watch?v=En6-XTZNAa4"],
  },
  {
    title: "Best Startup in Agri Sector",
    by: "Odisha Startup Carnival, AIC Nalanda",
    logo: "/partners/aic.png",
    year: "2024",
    // The 2022 top-5 placing is the company's own claim; the 2024 award is on the organiser's winners page
    also: [["Top 5, Odisha StartUp Carnival", "2022"]],
    link: ["See the winners", "https://osc.aicnitf.in/awards/"],
  },
  {
    title: "Featured in Mann Ki Baat",
    by: "PM Narendra Modi",
    logo: "/recognition/mann-ki-baat.webp",
    year: "2024",
    featured: true,
    link: ["Watch the episode", "https://www.youtube.com/watch?v=eurGt7tXTFw"],
  },
  {
    title: "Jury Special, Emerging category",
    by: "Sambad Corporate Excellence Awards",
    logo: "/recognition/sambad.webp",
    year: "2024",
    link: [
      "Read the report",
      "https://sambadenglish.com/7th-edition-of-brands-of-odisha-pride-of-india-sambad-corporate-excellence-awards-2024-held",
    ],
  },
  // The company's own list; no public source found yet, so these carry no link
  { title: "Agri Startup of the Year", by: "Odisha Corporate Foundation", year: "2023", logo: "/recognition/ocf.webp" },
  { title: "Emerging Women Entrepreneur Award", by: "KIIT TBI", year: "2023", logo: "/partners/kiit-tbi.png" },
  // shortcut: news reports say CII's Indian Women Network ran Odisha's 2022 Shakti Awards; the company lists FICCI
  { title: "Shakti Awards", by: "FICCI", year: "2022", logo: "/recognition/ficci.svg" },
  { title: "40 Under 40", by: "Top 40 startups in India", year: "2021", word: "40 Under 40" },
]

// Linked items were confirmed on the web in Nov 2026. DPIIT and IP India are confirmed by the company but have no public
// record (check the DPIIT certificate on startupindia.gov.in). Upaya's Livelihoods Accelerator is now its Dignified Jobs Accelerator.
const RECOGNITIONS: Honour[] = [
  {
    title: "Accelerator Program",
    by: "Miller Center, Santa Clara University",
    logo: "/recognition/miller-center.webp",
    year: "2024",
    also: [["In-Residence Program", "2025"]],
    link: ["Read more", "https://millercenterglobal.org/?p=70172"],
  },
  {
    title: "Startup grant",
    by: "Startup Odisha, Government of Odisha",
    logo: "/partners/startup-odisha.png",
    year: "2023",
    link: ["Read more", "https://inc42.com/buzz/odisha-approves-grant-worth-inr-1-28-cr-for-10-startups"],
  },
  {
    title: "Incubated startup",
    by: "IGKV R-ABI, Raipur",
    logo: "/recognition/igkv-rabi.webp",
    wide: true,
    link: ["Read more", "https://www.patrika.com/raipur-news/startup-of-igkv-raipur-in-mann-ki-baat-8757518"],
  },
  {
    title: "Livelihoods Accelerator, Cohort 3",
    by: "Upaya Social Ventures",
    logo: "/partners/upaya.png",
    year: "2019",
    link: ["Read more", "https://upayasv.org/blog/2019/9/30/can-goat-farming-provide-jobs-for-thousands"],
  },
  { title: "Recognised startup", by: "DPIIT, Startup India", logo: "/partners/startup-india.png" },
  { title: "Registered intellectual property", by: "Intellectual Property India", logo: "/recognition/ip-india.webp", wide: true },
]

// Photos found on the web in Nov 2026 and kept only where the source page ties the photo to Manikstu. They belong to
// their publishers, so each card credits and links its source. Nobody in the Carnival or Sambad photos is named there.
const MOMENTS = [
  {
    src: "/recognition/odisha-nirman-msme-summit-2026.webp",
    year: "2026",
    width: 1280,
    height: 720,
    position: "62% center",
    event: "Odisha Nirman MSME Summit · 2026",
    caption: "Jayanti Mahapatra with her award at the Kanak News Odisha Nirman MSME Summit",
    credit: "Kanak News",
    href: "https://www.youtube.com/watch?v=dwlOLeEwNJA",
  },
  {
    src: "/recognition/odisha-startup-carnival-2024.webp",
    year: "2024",
    width: 1000,
    height: 1000,
    position: "center 30%",
    event: "Odisha Startup Carnival Awards · 2024",
    caption: "The Manikstu team receives the Best Startup in Agri Sector award",
    credit: "AIC-NITF",
    href: "https://osc.aicnitf.in/awards/",
  },
  {
    src: "/recognition/sambad-corporate-excellence-2024.webp",
    year: "2024",
    width: 1600,
    height: 627,
    position: "center",
    event: "Sambad Corporate Excellence Awards · 2024",
    caption: "Winners of the 7th Sambad Corporate Excellence Awards, including Manikstu Agro",
    credit: "Sambad English",
    href: "https://sambadenglish.com/7th-edition-of-brands-of-odisha-pride-of-india-sambad-corporate-excellence-awards-2024-held",
  },
]

const FEATURED = AWARDS.find((h) => h.featured)!

type Entry = { year?: string; title: string; by: string; logo?: string; word?: string; link?: [label: string, href: string] }

// An extra placing from the same organiser gets its own entry in its own year. Newest first; entries with no year go last.
const expand = (list: Honour[]): Entry[] =>
  list
    .flatMap(({ title, by, year, logo, word, link, also }) => [
      { year, title, by, logo, word, link },
      ...(also ?? []).map(([t, y]) => ({ year: y, title: t, by, logo, word })),
    ])
    .sort((a, b) => (b.year ?? "0").localeCompare(a.year ?? "0"))

const AWARD_ENTRIES = expand(AWARDS)
const PROGRAMME_ENTRIES = expand(RECOGNITIONS)
const TOTAL = AWARD_ENTRIES.length + PROGRAMME_ENTRIES.length
const FIRST_YEAR = [...AWARD_ENTRIES, ...PROGRAMME_ENTRIES].map((e) => e.year).filter(Boolean).sort()[0]

// A short name that only repeats the title or the organiser is not shown as a mark
const markWord = (e: Entry) => {
  const word = e.word ?? e.by
  return word === e.title || e.by.includes(word) ? null : word
}

// Laurel leaves on a circle of radius 72 around the seal's centre: one branch each side, rising from the bottom, each leaf turned along the curve
const LAUREL = [1, -1].flatMap((dir) =>
  Array.from({ length: 8 }, (_, i) => {
    const deg = 135 + i * 15
    const rad = (deg * Math.PI) / 180
    return { x: +(160 + dir * 72 * Math.cos(rad)).toFixed(1), y: +(160 + 72 * Math.sin(rad)).toFixed(1), r: dir * deg }
  }),
)

export default function RecognitionPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="recHero">
          <img
            className="recHeroBg"
            src="/recognition/hero-kiit-award.webp"
            alt="An award being presented on stage at a KIIT ceremony, with Startup Odisha and Startup India on the screen behind"
            width="960"
            height="638"
            fetchPriority="high"
          />
          <div>
            <p className="eyebrow">Recognition</p>
            <h1>Every honour, on the record</h1>
            <p className="recIntro">
              Awards, programmes and credentials Manikstu has earned for its work with goat farmers and rural women, each one dated, sourced and linked so it can be checked.
            </p>
          </div>
          {/* The signature: an award seal with a slowly turning ring of lettering and a laurel wreath. It repeats the count, so it is hidden from screen readers. */}
          <div className="recSeal" aria-hidden="true">
            <svg viewBox="0 0 320 320">
              <defs>
                <path id="recRing" d="M160 160m-124 0a124 124 0 1 1 248 0a124 124 0 1 1-248 0" />
              </defs>
              <circle className="ringA" cx="160" cy="160" r="152" />
              <circle className="ringB" cx="160" cy="160" r="144" />
              <g className="spin">
                <text className="lettering">
                  <textPath href="#recRing" textLength="768" lengthAdjust="spacing">Awards · Recognition · Manikstu Agro Pvt. Ltd. ·</textPath>
                </text>
              </g>
              <circle className="ringB" cx="160" cy="160" r="104" />
              <circle className="disc" cx="160" cy="160" r="98" />
              <circle className="discRing" cx="160" cy="160" r="90" />
              {LAUREL.map((l, i) => (
                <ellipse key={i} className="leaf" cx={l.x} cy={l.y} rx="4.6" ry="10" transform={`rotate(${l.r} ${l.x} ${l.y})`} />
              ))}
              <text className="count" x="160" y="186">
                {TOTAL}
              </text>
              <text className="label" x="160" y="214">
                Honours
              </text>
            </svg>
          </div>
          <dl className="recStats">
            <div>
              <dt>Awards</dt>
              <dd>{AWARD_ENTRIES.length}</dd>
            </div>
            <div>
              <dt>Programmes and credentials</dt>
              <dd>{PROGRAMME_ENTRIES.length}</dd>
            </div>
            <div>
              <dt>First entry</dt>
              <dd>{FIRST_YEAR}</dd>
            </div>
          </dl>
        </section>

        <section className="recBroadcast" aria-labelledby="rec-feature">
          <div>
            <p className="eyebrow">Heard across the country</p>
            <h2 id="rec-feature">{FEATURED.title}</h2>
            <p>
              {FEATURED.by} · {FEATURED.year}
            </p>
            {FEATURED.link && (
              <a className="recLink big" href={FEATURED.link[1]} target="_blank" rel="noopener noreferrer">
                {FEATURED.link[0]} <Arrow />
              </a>
            )}
          </div>
          <div>
            <span className="recPlate">
              <img src={FEATURED.logo} alt="" width="440" height="330" decoding="async" />
            </span>
          </div>
        </section>

        <section className="recAwards" id="awards" aria-labelledby="rec-awards">
          <div className="recAwardsHead">
            <p className="eyebrow">Honours won</p>
            <h2 id="rec-awards">Awards</h2>
            <p>Every award Manikstu has won, newest first. Each carries its own number.</p>
          </div>
          <ol className="recHonours">
            {AWARD_ENTRIES.map((e, i) => {
              const word = markWord(e)
              return (
                <li className="recHonour" key={`${e.title} ${e.by}`}>
                  <span className="recTag">
                    <small>No.</small>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="recYear">{e.year}</span>
                  <div className="recWhat">
                    <strong>{e.title}</strong>
                    <small>{e.by}</small>
                    {e.link && (
                      <a className="recLink" href={e.link[1]} target="_blank" rel="noopener noreferrer">
                        {e.link[0]} <Arrow />
                      </a>
                    )}
                  </div>
                  {(e.logo || word) && (
                    <span className="recMark">
                      {e.logo ? (
                        <img src={e.logo} alt="" width="140" height="60" loading="lazy" decoding="async" />
                      ) : (
                        <span className="recWord" aria-hidden="true">
                          {word}
                        </span>
                      )}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </section>

        <section className="recBacked" id="programmes" aria-labelledby="rec-programmes">
          <div className="recBackedHead">
            <p className="eyebrow">Backed by</p>
            <h2 id="rec-programmes">Programmes and credentials</h2>
            <p>Accelerators, incubators and government programmes that have backed Manikstu.</p>
          </div>
          <ul className="recPlates">
            {PROGRAMME_ENTRIES.map((e) => {
              const word = markWord(e)
              return (
                <li key={`${e.title} ${e.by}`}>
                  <span className="recPlateMark">
                    {e.logo ? (
                      <img src={e.logo} alt="" width="220" height="90" loading="lazy" decoding="async" />
                    ) : (
                      <span className="recWord" aria-hidden="true">
                        {word ?? e.word ?? e.by}
                      </span>
                    )}
                  </span>
                  <i className="recDiamond" aria-hidden="true" />
                  <strong>{e.title}</strong>
                  <small>{e.by}</small>
                  {e.year && <span className="recSince">{e.year}</span>}
                  {e.link && (
                    <a className="recLink" href={e.link[1]} target="_blank" rel="noopener noreferrer">
                      {e.link[0]} <Arrow />
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <SubSection
          id="moments"
          eyebrow="On stage"
          title="Award moments"
          intro="Photos from the ceremonies, as published by the organisers and the press."
        >
          <ul className="resPress recMoments">
            {MOMENTS.map(({ src, width, height, position, year, event, caption, credit, href }) => (
              <li key={src}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {/* A wide banner photo keeps its own shape, so it is not letterboxed inside a 4:3 box */}
                  <span className="resPressImg" style={width / height > 2 ? { aspectRatio: `${width} / ${height}` } : undefined}>
                    <i className="recPin">{year}</i>
                    <Image
                      src={src}
                      alt={caption}
                      fill
                      sizes="(max-width: 860px) 100vw, 60vw"
                      style={{ objectFit: "cover", objectPosition: position }}
                    />
                  </span>
                  <span className="resPressBody">
                    <small>{event}</small>
                    <strong>{caption}</strong>
                    <span className="resPressMore">
                      Photo: {credit} <Arrow />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </SubSection>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
