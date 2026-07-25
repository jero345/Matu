import Star from './Star'

/**
 * The lime ticker bands. Two identical halves scroll by -50% so the loop is
 * seamless; the outer wrapper is skewed by scroll velocity (see useScrollFx).
 */
export default function Marquee({
  text,
  repeat = 8,
  gap = '1.9875rem',
  size = '1.5rem',
  duration = '48s',
  className = '',
}) {
  const half = Array.from({ length: repeat }, (_, i) => i)

  const group = (key) => (
    <div key={key} className="flex shrink-0 items-center" style={{ gap }}>
      {half.map((i) => (
        <div key={i} className="group/item flex shrink-0 items-center" style={{ gap }}>
          <Star className="size-[2.125rem] spin-slow" color="var(--color-ink)" />
          <span className="whitespace-pre" style={{ fontSize: size }}>
            {text}
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
