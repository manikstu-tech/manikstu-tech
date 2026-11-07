import { Arrow } from "@/components/ui/Arrow"
import { ImpactIcon } from "@/components/ui/ImpactIcon"
import { SOLUTIONS, SOLUTION_IMAGES } from "@/constants/content"
import { getContent } from "@/lib/cms"

export async function SolutionsSection() {
  const { items, images } = await getContent("home/solutions", { items: SOLUTIONS, images: SOLUTION_IMAGES })
  return (
    <section className="integrated section" id="solutions">
      <div className="integratedHead">
        <div>
          <p className="eyebrow">04 / Integrated solutions</p>
          <h2>
            One ecosystem.
            <br />
            Multiple solutions.
            <br />
            <span>Lasting impact.</span>
          </h2>
        </div>
        <p>
          Connected services designed around the farmer, from resilient
          livestock and practical knowledge to protection and income.
        </p>
      </div>
      <div className="tileGrid">
        {items.map((sol, i) => (
          <a
            className={`tile tile${i + 1}`}
            href={sol.href}
            key={sol.title}
          >
            <img
              src={images[i]}
              alt=""
              width="640"
              height="480"
              loading="lazy"
            />
            <ImpactIcon type={sol.icon} />
            <span className="tileNumber" aria-hidden="true">
              {sol.number}
            </span>
            <div className="tileBody">
              <h3>{sol.title}</h3>
              <p>{sol.description}</p>
              <b>
                Explore solution <Arrow />
              </b>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
