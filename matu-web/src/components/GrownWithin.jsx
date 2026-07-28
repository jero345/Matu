import Star from './Star'
import Lines from './Lines'
import SplitLines from './SplitLines'
import { FOREST_PILLARS } from '../data'

const NBSP = ' '
const HEAD = [`GROWN WITHIN${NBSP}`, 'THE FOREST, NOT', 'INSTEAD OF IT.']

export default function GrownWithin() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-cream px-6 py-16 text-ink lg:h-[67.5rem] lg:px-0 lg:py-0">
      <img
        src="/img/fondo4.webp"
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover"
      />

      <SplitLines
        as="h2"
        lines={HEAD}
        step={130}
        className="text-center text-[clamp(2.6rem,7.2vw,6rem)] leading-[1.02] tracking-[0.023em] lg:absolute lg:inset-x-0 lg:top-[7.2rem] lg:text-[6.7rem] lg:leading-[6.67rem]"
      />

      <Star
        className="spin-slow mx-auto mt-8 block size-[2rem] lg:absolute lg:left-[57.3125rem] lg:top-[44.19rem] lg:mx-0 lg:mt-0 lg:size-[4.25rem]"
        color="var(--color-ink)"
      />

      {/* column rules grow down from the star */}
      <span
        data-reveal="grow"
        className="absolute left-[42.125rem] top-[51.9375rem] hidden h-[9.6rem] w-px origin-top bg-ink/45 lg:block"
      />
      <span
        data-reveal="grow"
        style={{ '--d': '120ms' }}
        className="absolute left-[78.25rem] top-[51.9375rem] hidden h-[9.6rem] w-px origin-top bg-ink/45 lg:block"
      />

      <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6 lg:absolute lg:left-[6.9375rem] lg:top-[52.7815rem] lg:mt-0 lg:w-[106.125rem] lg:gap-0">
        {FOREST_PILLARS.map((pillar, i) => (
          <div
            key={pillar.title}
            data-reveal="up"
            style={{ '--d': `${i * 130}ms` }}
            className="relative text-center lg:h-[8rem]"
          >
            <h3 className="text-[clamp(1.1rem,1.9vw,1.45rem)] lg:text-[1.75rem] lg:leading-[2.1rem]">
              {pillar.title}
            </h3>
            <p className="mx-auto mt-3 max-w-[38ch] text-[clamp(0.85rem,1.5vw,1.1rem)] leading-[1.3] lg:absolute lg:left-1/2 lg:top-[3.4929rem] lg:mt-0 lg:w-[30rem] lg:max-w-none lg:-translate-x-1/2 lg:text-[1.4187rem] lg:leading-[1.5625rem]">
              <Lines lines={pillar.lines} />
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
