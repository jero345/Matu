import SplitLines from './SplitLines'

const HERO_LINES = [
  'Handpicked from the subtropical jungle, our',
  'yerba is grown with patience, dried with care, and',
  'meant to be shared slowly.',
]

export default function Hero({ ready }) {
  // the intro copy plays on load rather than on scroll
  const state = ready ? 'is-inview' : ''

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[38rem] w-full flex-col items-center justify-center overflow-hidden px-6 py-28 text-center lg:block lg:h-[67.5rem] lg:px-0 lg:py-0"
    >
      {/* the artboard frames a wider crop of the jungle plate than FONDO1.webp holds,
          so the hero uses the plate exported from the source file */}
      <div data-parallax="70" className="parallax absolute inset-0 -z-10">
        <img
          src="/img/hero-jungle.webp"
          alt=""
          className="kenburns absolute inset-0 size-full object-cover brightness-[0.52] lg:inset-auto lg:left-[-1.4775rem] lg:top-[-8.969rem] lg:h-[92.216rem] lg:w-[122.955rem] lg:max-w-none"
        />
      </div>

      <p
        data-reveal="up"
        className={`${state} font-geo text-[0.75rem] uppercase leading-[1.2] tracking-[0.235em] text-lime lg:absolute lg:inset-x-0 lg:top-[21.866rem] lg:text-[1.25rem] lg:leading-[1.5rem]`}
        style={{ '--d': '260ms' }}
      >
        <span className="mr-[0.55em]">•••</span>
        Protect the wild
        <span className="ml-[0.55em]">•••</span>
      </p>

      <SplitLines
        as="h1"
        lines={HERO_LINES}
        delay={420}
        step={130}
        className={`${state} mt-7 max-w-[22ch] text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.18] text-lime lg:absolute lg:inset-x-0 lg:top-[26.804rem] lg:mt-0 lg:max-w-none lg:text-[3.8813rem] lg:leading-[4.5687rem]`}
      />

      <div
        data-reveal="up"
        className={`${state} mt-10 flex flex-wrap items-center justify-center gap-3 lg:absolute lg:inset-x-0 lg:top-[50.625rem] lg:mt-0 lg:gap-[0.6rem]`}
        style={{ '--d': '900ms' }}
      >
        <a
          href="#shop"
          className="btn-sweep flex h-12 w-[13rem] items-center justify-center rounded-full bg-lime text-ink transition-colors duration-500 hover:text-lime lg:h-[4.2rem] lg:w-[17.775rem] lg:text-[1.794rem]"
        >
          Shop Now
        </a>
        <a
          href="#our-story"
          className="btn-sweep flex h-12 w-[13rem] items-center justify-center rounded-full border border-cream text-cream transition-colors duration-500 hover:text-ink lg:h-[4.2rem] lg:w-[17.925rem] lg:text-[1.794rem]"
          style={{ '--btn-fill': 'var(--color-cream)' }}
        >
          Discover The Ritual
        </a>
      </div>

      <a
        href="#shop"
        aria-hidden="true"
        tabIndex={-1}
        className={`${state} pointer-events-none absolute bottom-[2.5rem] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-lime/70 lg:flex`}
        data-reveal="fade"
        style={{ '--d': '1400ms' }}
      >
        <span className="font-geo text-[0.72rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative block h-[3.2rem] w-px overflow-hidden bg-lime/25">
          <span className="absolute inset-x-0 top-0 block h-1/2 animate-[matu-scroll-hint_2.4s_ease-in-out_infinite] bg-lime" />
        </span>
      </a>
    </section>
  )
}
