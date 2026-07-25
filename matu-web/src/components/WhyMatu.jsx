import Rail from './Rail'
import SplitLines from './SplitLines'

const HEAD = ['A SACRED SPIRIT', 'OF SHARING AND', 'BELONGING.']

const P1 = [
  'In ancient times, when earth and sky came together,',
  'MATU emerged: a winged horse born from the very',
  'essence of yerba mate, carrying with it the power to',
  'unite people in a ritual of sharing and belonging.',
]

const P2 = [
  'MATU represents that protective and guiding spirit,',
  'riding freely across the pampas as a symbol of',
  'sacred connection between humanity and the earth.',
  'Each sip invites you to experience the spirit of the',
  'land in its purest, most authentic form.',
]

export default function WhyMatu() {
  return (
    <section
      id="why-matu"
      className="relative w-full overflow-hidden bg-ink lg:h-[67.5rem]"
    >
      {/* right half of the band is cream on desktop */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-cream lg:block" />

      <Rail
        side="left"
        words={['WHY MATU', 'MATU YERBA MATE']}
        offset="2.89rem"
        size="0.8rem"
        color="var(--color-lime)"
      />

      <div className="relative z-10 px-6 py-16 lg:px-0 lg:py-0">
        <p
          data-reveal="up"
          className="text-[1.05rem] text-lime lg:absolute lg:left-[11.5rem] lg:top-[6.8972rem] lg:text-[2.1875rem] lg:leading-[2.625rem]"
        >
          WHY MATU
        </p>

        <SplitLines
          as="h2"
          lines={HEAD}
          delay={120}
          className="mt-3 text-[2.35rem] leading-[1.02] text-cream lg:absolute lg:left-[11.5rem] lg:top-[12.0508rem] lg:mt-0 lg:text-[6.5875rem] lg:leading-[6.7062rem] lg:tracking-[-0.047em]"
        />

        <div className="mt-8 space-y-6 text-[1.05rem] leading-[1.35] text-lime lg:mt-0 lg:space-y-0 lg:text-[2.0375rem] lg:leading-[2.375rem]">
          <SplitLines
            as="p"
            lines={P1}
            step={80}
            className="lg:absolute lg:left-[11.5rem] lg:top-[34.5357rem] lg:w-[45rem]"
          />
          <SplitLines
            as="p"
            lines={P2}
            step={80}
            className="lg:absolute lg:left-[11.5rem] lg:top-[46.417rem] lg:w-[45rem]"
          />
        </div>
      </div>

      {/* ---- pampas photo + circular seal ---- */}
      <div className="relative bg-cream px-6 pb-16 lg:bg-transparent lg:px-0 lg:pb-0">
        <div
          data-reveal="clip"
          style={{ '--curtain': 'var(--color-cream)' }}
          className="relative overflow-hidden rounded-2xl lg:absolute lg:left-[66.75rem] lg:top-[10.4375rem] lg:h-[50.9375rem] lg:w-[49.375rem] lg:rounded-[1.5rem]"
        >
          <img
            src="/img/horse1.webp"
            alt="Gaucho leading two horses through the pampas"
            loading="lazy"
            className="clip-zoom size-full object-cover"
          />
        </div>
        <img
          src="/img/circular-symbol.webp"
          alt="Cleanest sip from soil to straw"
          className="spin-slow absolute left-6 top-[-1.75rem] w-[5rem] lg:left-[65rem] lg:top-[4.0625rem] lg:w-[16.625rem] lg:max-w-none"
        />
      </div>
    </section>
  )
}
