import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { PeopleSlider } from "@/components/sections/subpage/PeopleSlider"
import { QuoteBadge } from "@/components/sections/subpage/QuoteBadge"
import { SubCta, SubSection } from "@/components/sections/subpage/parts"
import { TeamsHero } from "@/components/sections/subpage/TeamsHero"
import { BackToTop } from "@/components/ui/BackToTop"
import { ADVISORS, LEADERSHIP, MANAGEMENT, type Person } from "@/constants/subpages"
import { getContent } from "@/lib/cms"
import { SITE_URL } from "@/constants/site"

const TITLE = "Our team | Manikstu Agri Solutions"
const DESCRIPTION =
  "Meet the leadership, key management and advisors behind Manikstu Agri Solutions, a goat farming company working with rural families in Odisha and beyond."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/teams" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/teams" },
}

function Photo({ person, size }: { person: Person; size: number }) {
  return (
    <img
      src={`${SITE_URL}/team/${person.photo}`}
      alt={person.name}
      width={size}
      height={size}
      loading="lazy"
    />
  )
}

// Leadership: the first two are featured side by side, the rest follow as horizontal cards
function Lead({ people }: { people: Person[] }) {
  const featured = people.slice(0, 2)
  const others = people.slice(2)
  return (
    <div className="leadGrid">
      <div className="leadFeatured">
        {featured.map((person) => (
          <article className="leadBig" key={person.name}>
            <QuoteBadge />
            <Photo person={person} size={480} />
            <div>
              <h3>{person.name}</h3>
              <p className="personRole">{person.role}</p>
              <p>“{person.bio}”</p>
            </div>
          </article>
        ))}
      </div>
      <div className="leadSide">
        {others.map((person) => (
          <article className="leadRow" key={person.name}>
            <QuoteBadge />
            <Photo person={person} size={240} />
            <div>
              <h3>{person.name}</h3>
              <p className="personRole">{person.role}</p>
              <p>“{person.bio}”</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default async function TeamsPage() {
  const team = await getContent("teams", { leadership: LEADERSHIP, management: MANAGEMENT, advisors: ADVISORS })
  return (
    <>
      <Header />
      <main id="main">
        <TeamsHero />
        <SubSection
          id="leadership"
          title="Leading with purpose"
          intro="Our leadership team sets the vision for Manikstu and carries it into every village we work in."
        >
          <Lead people={team.leadership} />
        </SubSection>
        <SubSection
          id="management"
          alt
          title="Our execution engine"
          intro="Key management: the people who turn the plan into daily work in the field, in the office and in our systems."
        >
          <PeopleSlider people={team.management} />
        </SubSection>
        <SubSection
          id="advisors"
          title="Our advisors"
          intro="Strategic guidance from specialists in law, compliance, governance and animal science."
        >
          <PeopleSlider people={team.advisors} quotes />
        </SubSection>
        <SubCta
          title="Nurturing goats, farmers and futures, together."
          text="Want to work with us or join the mission? Tell us a little about yourself."
        />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
