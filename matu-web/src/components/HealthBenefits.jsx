import Rail from './Rail'
import Star from './Star'
import Lines from './Lines'
import SplitLines from './SplitLines'
import GaugeCircle from './GaugeCircle'
import { HEALTH_CIRCLES, ALKALOIDS, UNSMOKED } from '../data'

const NBSP = ' '

const SUB = [
  'A synergy of naturally occurring vitamins,',
  'amino acids and alkaloids.',
]

export default function HealthBenefits() {
  return (
    <section
      id="benefits"
      className="relative w-full overflow-hidden bg-lime px-6 py-16 text-ink lg:h-[67.5rem] lg:px-0 lg:py-0"
    >
      <Rail side="left" words={['HEALTH  BENEFITS', 'MATU YERBA MATE']} offset="3.09rem" />
      <Rail side="right" words={['HEALTH  BENEFITS', 'MATU YERBA MATE']} offset="2.83rem" />

      <div
        data-reveal="fade"
        className="hidden lg:absolute lg:left-[7.4rem] lg:top-[2.9712rem] lg:flex lg:gap-[3.05rem] lg:text-[1.4375rem] lg:leading-[1.725rem]"
      >
        <span>HEALTH</span>
        <span>BENEFITS</span>
      </div>
      <div
        data-reveal="fade"
        className="hidden lg:absolute lg:right-[10.69rem] lg:top-[2.9712rem] lg:flex lg:gap-[3.05rem] lg:text-[1.4375rem] lg:leading-[1.725rem]"
      >
        <span>HEALTH</span>
        <span>BENEFITS</span>
      </div>

      {/* the second line carries the sunburst, so it is built by hand */}
      <h2
        data-reveal="lines"
        className="has-lines text-center text-[clamp(2.1rem,5.2vw,4rem)] leading-[1.15] lg:absolute lg:inset-x-0 lg:top-[4.0922rem] lg:text-[4.2375rem] lg:leading-[4.8937rem]"
      >
        <span className="rline" style={{ '--d': '0ms' }}>
          <span>LONG LASTING ENERGY{NBSP}</span>
        </span>{' '}
        <span className="rline" style={{ '--d': '110ms' }}>
          <span>
            <span className="inline-flex items-center justify-center gap-[0.7rem] lg:gap-[2.6rem]">
              <Star
                className="spin-slow size-[0.62em] lg:size-[4.1875rem]"
                color="var(--color-ink)"
              />
              <span>WITHOUT THE CRASH</span>
              {/* the pair turns opposite ways, as it does on the founder band */}
              <Star
                className="spin-slow-reverse size-[0.62em] lg:size-[4.1875rem]"
                color="var(--color-ink)"
              />
            </span>
          </span>
        </span>
      </h2>

      <SplitLines
        as="p"
        lines={SUB}
        delay={280}
        step={80}
        className="mx-auto mt-5 max-w-[42rem] text-center text-[clamp(1rem,1.9vw,1.4rem)] leading-[1.35] lg:mx-0 lg:mt-0 lg:max-w-none lg:absolute lg:inset-x-0 lg:top-[16.5rem] lg:text-[2.0375rem] lg:leading-[2.375rem]"
      />

      {/* Same rank as the sub-headline and set right under it: it reads as the
          second half of that statement, not as a footnote. Matching type means
          matching measure, so the copy is broken to the sub's line length. */}
      <div
        data-reveal="up"
        style={{ '--d': '360ms' }}
        className="mx-auto mt-4 max-w-[42rem] text-center text-[clamp(1rem,1.9vw,1.4rem)] leading-[1.35] lg:absolute lg:inset-x-0 lg:top-[22.4rem] lg:mt-0 lg:max-w-none lg:text-[2.0375rem] lg:leading-[2.375rem]"
      >
        <Lines lines={UNSMOKED.lines} />
      </div>

      {/* ---- three gauges ---- */}
      <div className="mt-12 grid justify-items-center gap-x-6 gap-y-10 md:grid-cols-3 lg:absolute lg:left-[15.9375rem] lg:top-[32rem] lg:mt-0 lg:flex lg:w-[88.125rem] lg:justify-between lg:gap-0">
        {HEALTH_CIRCLES.map((item, i) => (
          <div
            key={item.title}
            data-reveal="up"
            style={{ '--d': `${i * 130}ms` }}
            className="group relative aspect-square @container w-full max-w-[15rem] lg:size-[17.25rem] lg:max-w-none"
          >
            <GaugeCircle
              from={item.arc.from}
              sweep={item.arc.sweep}
              delay={i * 130}
              className="origin-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[26deg]"
            />
            {/* The label sits inside the ring, so it is measured against the ring
                rather than the root em: 24/276 of the diameter for the title, and
                16/276 for the body, which was lifted from the artboard's 14 to
                make it readable. The body box was widened to match: `Lines` keeps
                the artboard's hand-set breaks on desktop, and at 16px they no
                longer fit the old 75.362%. Ratios, not rem, so the composition
                holds at whatever diameter the grid gives it. */}
            <h3 className="absolute inset-x-0 top-[25.446%] text-center text-[8.696cqw] leading-[10.435cqw]">
              {item.title}
            </h3>
            <p className="absolute left-1/2 top-[42.011%] w-[88%] -translate-x-1/2 text-center text-[5.797cqw] leading-[6.341cqw]">
              <Lines lines={item.lines} />
            </p>
          </div>
        ))}
      </div>

      {/* ---- alkaloid notes ---- */}
      <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-6 lg:absolute lg:inset-x-[4.4rem] lg:top-[52rem] lg:mt-0 lg:flex lg:justify-between lg:gap-0">
        {ALKALOIDS.map((item, i) => (
          <div
            key={item.title}
            data-reveal="up"
            style={{ '--d': `${i * 140}ms` }}
            className="relative text-center lg:h-[9rem] lg:w-[31rem]"
          >
            <span className="block text-[0.9rem] lg:text-[1.3125rem] lg:leading-[1.575rem]">
              {item.number}
            </span>
            <h3 className="mt-4 text-[1.15rem] lg:absolute lg:inset-x-0 lg:top-[2.8023rem] lg:mt-0 lg:text-[1.875rem] lg:leading-[2.25rem]">
              {item.title}
            </h3>
            <p className="mx-auto mt-3 max-w-[34ch] text-[0.8rem] leading-[1.2] lg:absolute lg:left-1/2 lg:top-[6.425rem] lg:mt-0 lg:w-[31rem] lg:max-w-none lg:-translate-x-1/2 lg:text-[1.3125rem] lg:leading-[1.5125rem]">
              <Lines lines={item.lines} />
            </p>
          </div>
        ))}
      </div>

   </section>
  )
}
