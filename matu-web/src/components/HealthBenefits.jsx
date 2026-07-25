import Rail from './Rail'
import Star from './Star'
import Lines from './Lines'
import SplitLines from './SplitLines'
import GaugeCircle from './GaugeCircle'
import { HEALTH_CIRCLES, ALKALOIDS } from '../data'

const NBSP = ' '

const SUB = [
  'A synergy of vitamins, amino acids and rare alkaloids',
  'feeding real energy to real cells, gently.',
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

      {/* the middle line carries the sunburst, so it is built by hand */}
      <h2
        data-reveal="lines"
        className="has-lines text-center text-[2.1rem] leading-[1.15] lg:absolute lg:inset-x-0 lg:top-[4.0922rem] lg:text-[4.2375rem] lg:leading-[4.8937rem]"
      >
        <span className="rline" style={{ '--d': '0ms' }}>
          <span>FROM THE GUARANI{NBSP}</span>
        </span>{' '}
        <span className="rline" style={{ '--d': '110ms' }}>
          <span>
            <span className="inline-flex items-center justify-center gap-[0.7rem] lg:gap-0">
              <span>TO THE</span>
              <Star
                className="spin-slow size-[1.2rem] lg:ml-[10.03rem] lg:mr-[5.6875rem] lg:size-[4.1875rem]"
                color="var(--color-ink)"
              />
              <span className="lg:mr-[0.594rem]">GAUCHOS</span>
            </span>
          </span>
        </span>{' '}
        <span className="rline" style={{ '--d': '220ms' }}>
          <span>TO YOU.</span>
        </span>
      </h2>

      <SplitLines
        as="p"
        lines={SUB}
        delay={280}
        step={80}
        className="mt-5 text-center text-[1rem] leading-[1.3] lg:absolute lg:inset-x-0 lg:top-[22.567rem] lg:mt-0 lg:text-[2.0375rem] lg:leading-[2.375rem]"
      />

      {/* ---- four gauges ---- */}
      <div className="mt-12 grid grid-cols-2 gap-6 lg:absolute lg:left-[15.9375rem] lg:top-[30.8125rem] lg:mt-0 lg:flex lg:w-[88.125rem] lg:justify-between lg:gap-0">
        {HEALTH_CIRCLES.map((item, i) => (
          <div
            key={item.title}
            data-reveal="up"
            style={{ '--d': `${i * 130}ms` }}
            className="group relative aspect-square lg:size-[17.25rem]"
          >
            <GaugeCircle
              from={item.arc.from}
              sweep={item.arc.sweep}
              delay={i * 130}
              className="origin-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[26deg]"
            />
            <div className="absolute inset-0 flex flex-col items-center px-[14%] pt-[24%] text-center lg:px-0 lg:pt-0">
              <h3 className="text-[0.85rem] lg:absolute lg:inset-x-0 lg:top-[4.3895rem] lg:text-[1.5rem] lg:leading-[1.8rem]">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.55rem] leading-[1.1] lg:absolute lg:left-1/2 lg:top-[7.247rem] lg:mt-0 lg:w-[13rem] lg:-translate-x-1/2 lg:text-[0.875rem] lg:leading-[0.9563rem]">
                <Lines lines={item.lines} />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ---- alkaloid notes ---- */}
      <div className="mt-14 grid gap-10 lg:absolute lg:inset-x-[4.4rem] lg:top-[51.0096rem] lg:mt-0 lg:grid-cols-3 lg:gap-0">
        {ALKALOIDS.map((item, i) => (
          <div
            key={item.title}
            data-reveal="up"
            style={{ '--d': `${i * 140}ms` }}
            className="relative text-center lg:h-[9rem]"
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
