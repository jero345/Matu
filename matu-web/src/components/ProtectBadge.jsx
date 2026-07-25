const OUTER_W = 534
const OUTER_H = 535
const NOTCH_X = 94.8
const NOTCH_Y = 131.6

/** Rectilinear inset of the plus-shaped label outline. */
function cross(d) {
  const x0 = d
  const x1 = NOTCH_X + d
  const x2 = OUTER_W - NOTCH_X - d
  const x3 = OUTER_W - d
  const y0 = d
  const y1 = NOTCH_Y + d
  const y2 = OUTER_H - NOTCH_Y - d
  const y3 = OUTER_H - d
  return (
    `M${x1},${y0} H${x2} V${y1} H${x3} V${y2} H${x2} V${y3} ` +
    `H${x1} V${y2} H${x0} V${y1} H${x1} Z`
  )
}

export default function ProtectBadge({ className = '' }) {
  return (
    <div className={`relative w-[16rem] lg:w-[33.4375rem] ${className}`}>
      <svg viewBox={`0 0 ${OUTER_W} ${OUTER_H}`} className="block w-full">
        <path d={cross(0)} fill="#385542" />
        <path d={cross(4)} fill="#f3efe1" />
        <path d={cross(11)} fill="#385542" />
      </svg>

      <img
        src="/img/est-pegasus.png"
        alt="Est. 2025"
        className="absolute left-[28.5%] top-[8.3%] w-[43.1%]"
      />

      <p className="absolute inset-x-0 top-[38%] text-center font-geo font-medium leading-[1.24] tracking-[0.17em] text-lime text-[1.377rem] lg:text-[2.875rem]">
        PROTECT
        <br />
        THE WILD
      </p>

      <p className="absolute inset-x-0 top-[77.5%] text-center font-geo font-medium leading-[1.28] tracking-[0.17em] text-lime text-[0.988rem] lg:text-[2.0625rem]">
        DRINK
        <br />
        MATUA
      </p>
    </div>
  )
}
