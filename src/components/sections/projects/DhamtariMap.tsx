import { DHAMTARI_MAP } from "@/constants/dhamtariMap"

// Dhamtari District in the same style as the Raipur map on the AJAH page: its areas named by their main town, and Dhamtari town
// marked for orientation. The project works across the district, so nothing is picked out or clickable.
export function DhamtariMap() {
  return (
    <div className="ajMap">
      <svg
        className="ajMapSvg dht"
        viewBox={DHAMTARI_MAP.viewBox}
        role="img"
        aria-label="Map of Dhamtari District, Chhattisgarh, showing its areas by their main town, with Dhamtari town marked"
      >
        {DHAMTARI_MAP.areas.map(({ id, d }) => (
          <path key={id} className="area" d={d} />
        ))}
        {DHAMTARI_MAP.areas.map(({ id, name, label }) => (
          <text key={id} x={label[0]} y={label[1]}>
            {name}
          </text>
        ))}
        <circle className="city" cx={DHAMTARI_MAP.city[0]} cy={DHAMTARI_MAP.city[1]} r="9" />
      </svg>
      <div className="ajMapPanel">
        <p className="ajMapInfo">
          <strong>Dhamtari District, Chhattisgarh</strong>Where Aangan Lakshmi is active.
        </p>
        <p className="ajMapKey">
          <span>
            <i /> Areas of the district
          </span>
          <span>
            <i className="city" /> Dhamtari town
          </span>
        </p>
        <small className="ajMapCredit">District boundary: GADM. Internal areas are indicative.</small>
      </div>
    </div>
  )
}
