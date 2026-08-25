import Star from './Star'
import Pegasus from './Pegasus'

/**
 * The lime ticker bands. Two identical halves scroll by -50% so the loop is
 * seamless; the outer wrapper is skewed by scroll velocity (see useScrollFx).
 *
 * `text` takes a single phrase or a list of them, cycled in order. `mark` picks
 * what separates them — the sunburst, or MATU the pegasus.
 */
export default function Marquee({
  text,
  repeat = 8,
  gap = '1.9875rem',
  size = '1.5rem',
  duration = '48s',
  mark = 'star',
  className = '',
}) {
  const phrases = Array.isArray(text) ? text : [text]
  // the two halves must hold the same run for the loop to be seamless, and the
  // run has to be a whole number of cycles or the list would jump on repeat
  const count = Math.max(repeat, phrases.length)
  const run = Array.from({ length: count }, (_, i) => phrases[i % phrases.length])
  const Mark = mark === 'pegasus' ? Pegasus : Star
  const markClass =
    mark === 'pegasus' ? 'h-[1.9rem] w-[2.03rem] spin-none' : 'size-[2.125rem] spin-slow'

  const group = (key) => (
    <div key={key} className="flex shrink-0 items-center" style={{ gap }}>
      {run.map((phrase, i) => (
        <div key={i} className="group/item flex shrink-0 items-center" style={{ gap }}>
          <Mark className={markClass} color="var(--color-ink)" />
          <span className="whitespace-pre" style={{ fontSize: size }}>
            {phrase}
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <div
      className={`relative flex h-[3.5rem] w-full items-center overflow-hidden bg-lime text-ink lg:h-[6rem] ${className}`}
    >
      <div className="marquee-skew w-full">
        <div
          className="marquee-track flex w-max items-center"
          style={{ gap, '--marquee-duration': duration }}
        >
          {group('a')}
          {group('b')}
        </div>
      </div>
    </div>
  )
}
