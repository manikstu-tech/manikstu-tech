import { ImpactIcon } from "@/components/ui/ImpactIcon"
import { IMPACT_STATS } from "@/constants/content"
import { getContent } from "@/lib/cms"

export async function ImpactSection() {
  const { stats } = await getContent("home/impact", { stats: IMPACT_STATS })
  return (
    <section className="impact" id="impact">
      <div className="impactHeading">
        <p className="eyebrow">02 / Our impact</p>
        <h2>Creating measurable change in rural communities.</h2>
      </div>
      <div className="stats">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <ImpactIcon type={stat.icon} />
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
