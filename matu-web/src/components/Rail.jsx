/**
 * The thin rotated captions that run up both outer edges of most sections.
 * Words repeat, separated by a bullet, with a hairline after every third one.
 */
export default function Rail({
  side = 'left',
  words,
  offset = '2.72rem',
  size = '0.8rem',
  color = 'currentColor',
  count = 12,
}) {
  const items = Array.from({ length: count }, (_, i) => words[i % words.length])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 z-10 hidden select-none flex-col items-center justify-center gap-[1.4rem] overflow-hidden lg:flex"
      style={{ [side]: offset, color, fontSize: size }}
    >
      {items.map((word, i) => (
        <div key={i} className="flex flex-col items-center gap-[1.4rem]">
          <span
            className="whitespace-nowrap tracking-[0.06em]"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {word}
          </span>
          {i % 3 === 2 ? (
            <span className="h-[9rem] w-px bg-current opacity-70" />
          ) : (
            <span className="text-[0.7em] leading-none">•</span>
          )}
        </div>
      ))}
    </div>
  )
}
