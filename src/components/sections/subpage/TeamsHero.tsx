import { ImpactIcon } from "@/components/ui/ImpactIcon"
import { LOCAL_ASSET_BASE } from "@/constants/site"
import { ADVISORS, LEADERSHIP, MANAGEMENT } from "@/constants/subpages"

const TOTAL = LEADERSHIP.length + MANAGEMENT.length + ADVISORS.length

// A plain leaf, used as the small mark in the heading
function Leaf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <path d="M2 98C6 52 40 14 118 2c-6 50-38 86-116 96Z" />
      <path className="vein" d="M2 98C40 62 70 36 100 14" />
    </svg>
  )
}

export function TeamsHero() {
  return (
    <section className="teamsHero">
      <div className="teamsGrid">
        <div className="teamsText">
          <p className="eyebrow">Our people</p>
          <h1>
            The people <Leaf className="headLeaf" />
            <br />
            behind Manikstu.
          </h1>
          <p className="subLede">
            <strong>
              What began with a handful of farmers in Kalahandi is now a
              movement across states.
            </strong>{" "}
            These are the people who keep smallholder farmers, tribal women and
            rural families at the heart of it.
          </p>
          <ul className="teamsFacts">
            <li>
              <ImpactIcon type="calendar" />
              <strong>Since 2015</strong>
              <small>Our journey</small>
            </li>
            <li>
              <ImpactIcon type="pin" />
              <strong>Kalahandi, Odisha</strong>
              <small>Our roots</small>
            </li>
            <li>
              <ImpactIcon type="farmers" />
              <strong>{TOTAL} people</strong>
              <small>Core team</small>
            </li>
          </ul>
        </div>
        <div className="teamsLogo">
          <div className="logoDisc">
            <img
              src={`${LOCAL_ASSET_BASE}/logo.png`}
              alt="Manikstu Agri Solutions logo"
              width="360"
              height="352"
            />
          </div>
        </div>
      </div>

    </section>
  )
}
