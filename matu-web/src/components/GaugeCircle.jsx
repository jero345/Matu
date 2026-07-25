const R = 49.4 // radius inside a 100x100 viewBox, leaving room for the thick arc

function point(angle) {
  const rad = ((angle - 90) * Math.PI) / 180
  return [50 + R * Math.cos(rad), 50 + R * Math.sin(rad)]
}

/**
 * Hairline ring with a heavier arc segment, as drawn on the health-benefit
 * circles. The ring draws itself clockwise and the heavy arc follows.
 */
export default function GaugeCircle({ from, sweep, delay = 0, className = '' }) {
  const [x1, y1] = point(from)
  const [x2, y2] = point(from + sweep)
  const large = sweep > 180 ? 1 : 0
  const ringLen = 2 * Math.PI * R
  const arcLen = (sweep / 360) * ringLen

  return (
    <svg viewBox="0 0 100 100" className={`absolute inset-0 size-full ${className}`}>
      <circle
        cx="50"
        cy="50"
        r={R}
        fill="none"
        stroke="#385542"
        strokeWidth="0.32"
        className="gauge-arc"
        style={{ '--len': ringLen, '--d': `${delay}ms` }}
        transform="rotate(-90 50 50)"
      />
      <path
        d={`M${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2}`}
        fill="none"
        stroke="#385542"
        strokeWidth="1.6"
        strokeLinecap="butt"
        className="gauge-arc"
        style={{ '--len': arcLen, '--d': `${delay + 450}ms` }}
      />
    </svg>
  )
}
