import Star from './Star'
import SplitLines from './SplitLines'

const P1 = [
  'Our founder didn’t source yerba mate from a catalog or a supplier’s spreadsheet. She traveled to',
  'Argentina, walked the land, and conducted a personal audit of the Agroforestry farm where our',
  'yerba mate is grown. It wasn’t due diligence — it was purpose.',
]

const P2 = [
  'On a mission to create the Cleanest Sip from Soil to Straw, MATU is hand harvested, unsmoked,',
  'and regeneratively grown by a 27 year legacy of 118 united farmers in the Atlantic Rainforest',
  'region of Argentina.',
]

export default function FounderFrame() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-ink px-8 py-20 text-center lg:h-[67.5rem] lg:px-0 lg:py-0">
      <img
        src="/img/fondo3.webp?v=2"
        alt=""
        className="absolute inset-0 -z-10 size-full scale-[1.9] object-cover lg:scale-100"
      />

      <div className="flex items-center justify-center gap-6 lg:block lg:gap-0">
        <Star
          className="spin-slow size-[1rem] lg:absolute lg:left-[32.55rem] lg:top-[16.15rem] lg:size-[2.4rem]"
          color="var(--color-lime)"
        />
        <img
          src="/img/logo.webp"
          alt="MATU"
          data-reveal="zoom"
          className="w-[9rem] lg:absolute lg:left-[45.5625rem] lg:top-[14.3125rem] lg:w-[28.875rem] lg:max-w-none"
        />
        <Star
          className="spin-slow-reverse size-[1rem] lg:absolute lg:left-[84.75rem] lg:top-[16.15rem] lg:size-[2.4rem]"
          color="var(--color-lime)"
        />
      </div>

      <SplitLines
        as="p"
        lines={P1}
        delay={240}
        step={90}
        className="mx-auto mt-8 max-w-[46rem] text-[clamp(0.95rem,1.8vw,1.3rem)] leading-[1.45] text-lime lg:mx-0 lg:max-w-none lg:absolute lg:inset-x-0 lg:top-[26.6083rem] lg:mt-0 lg:text-[1.9438rem] lg:leading-[2.2625rem]"
      />

      <SplitLines
        as="p"
        lines={P2}
        delay={420}
        step={90}
        className="mx-auto mt-6 max-w-[46rem] text-[clamp(0.95rem,1.8vw,1.3rem)] leading-[1.45] text-lime lg:mx-0 lg:max-w-none lg:absolute lg:inset-x-0 lg:top-[35.6583rem] lg:mt-0 lg:text-[1.9438rem] lg:leading-[2.2625rem]"
      />
    </section>
  )
}
