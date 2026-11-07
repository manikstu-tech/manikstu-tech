import { FileVideo } from "@/components/ui/BackgroundVideo"
import { LOCAL_ASSET_BASE } from "@/constants/site"

// The four supports the story film walks through
const PILLARS = [
  "Vet care",

  "Training",

  "Goat Bank",

  "Market linkage",
]

export function AjahSection() {
  return (
    <section className="ajah" id="project-ajah">
      <div className="ajahCopy">
        <p className="eyebrow">05 / Our success story</p>
        <h2>More than goats.</h2>
        <p className="ajahTagline">
          A rural enterprise system that can grow, village after village.
        </p>
        <p>
          From Kalahandi to villages across India, women have always reared
          goats. What they lacked was a strong system around them. Since 2015,
          Manikstu has been building it, with herd healthcare, training, simple
          records and a Goat Bank that gives families goats and steady support.
        </p>
        <ul className="ajahTags">
          {PILLARS.map((pillar) => (
            <li key={pillar}>{pillar}</li>
          ))}
        </ul>
      </div>
      <FileVideo
        src={`${LOCAL_ASSET_BASE}/videos/manikstu-story.mp4`}
        poster={`${LOCAL_ASSET_BASE}/videos/manikstu-story-poster.jpg`}
        title="Manikstu Agro: more than goats"
        className="ajahVideo"
      />
    </section>
  )
}
