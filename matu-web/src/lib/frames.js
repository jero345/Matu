/**
 * Turntable frame sequences.
 *
 * Drop an evenly-spaced sequence into `public/360/<name>/` as `001.webp`,
 * `002.webp`… and list the count here. 36 frames (one every 10 degrees) is the
 * usual sweet spot; 24 is enough for a small viewer. Every frame must be the
 * same size with the product locked in the centre, or the spin will wobble.
 *
 * With a count of 0 the viewer falls back to the still image.
 */
const SEQUENCES = {
  can: { count: 0, ext: 'webp' },
}

export function frames(name) {
  const spec = SEQUENCES[name]
  if (!spec?.count) return []
  return Array.from(
    { length: spec.count },
    (_, i) => `/360/${name}/${String(i + 1).padStart(3, '0')}.${spec.ext}`,
  )
}
