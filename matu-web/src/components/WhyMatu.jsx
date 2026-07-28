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
          className="mt-3 text-[clamp(2.35rem,5.8vw,4.6rem)] leading-[1.02] text-cream lg:absolute lg:left-[11.5rem] lg:top-[12.0508rem] lg:mt-0 lg:text-[6.5875rem] lg:leading-[6.7062rem] lg:tracking-[-0.047em]"
        />

        <div className="mt-8 max-w-[46rem] space-y-6 text-[clamp(1.05rem,1.9vw,1.35rem)] leading-[1.45] text-lime lg:mt-0 lg:max-w-none lg:space-y-0 lg:text-[2.0375rem] lg:leading-[2.375rem]">
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

      {/* ---- rainforest plate + circular seal ---- */}
      {/* the plate runs edge to edge on the phone — no padding at all, so the
          cream wrapper collapses onto the photo and shows no band around it */}
      <div className="relative bg-cream lg:bg-transparent">
        {/* On small screens the seal has to hug the photo: pinned to the band it
            drifted off the top corner and got clipped. `lg:static` hands the
            desktop coordinates back to the band, where they were measured. */}
        <div className="relative lg:static">
          {/* the plate bleeds off the right half of the band, no inset frame */}
          <div
            data-reveal="clip"
            style={{ '--curtain': 'var(--color-cream)' }}
            className="relative overflow-hidden lg:absolute lg:right-0 lg:top-0 lg:h-[67.5rem] lg:w-[60rem]"
          >
            <img
              src="/img/selva.webp"
              alt="Sunlight breaking through the palms of the Atlantic Rainforest"
              loading="lazy"
              className="clip-zoom size-full object-cover"
            />
          </div>
          {/* Centred on the plate: it spans 60-120rem across and the full 67.5rem
              band, so the seal (square, 22rem) sits at 79 / 22.9rem. It reads white
              over the photo — the artwork is dark, so it is knocked out rather than
              shipped as a second file. */}
          <img
            src="/img/circular-symbol.webp"
            alt="Cleanest sip from soil to straw"
            className="spin-slow absolute left-1/2 top-1/2 w-[9rem] -translate-x-1/2 -translate-y-1/2 brightness-0 invert lg:left-[79rem] lg:top-[22.9rem] lg:w-[22rem] lg:max-w-none lg:translate-x-0 lg:translate-y-0"
          />
        </div>
      </div>
    </section>
  )
}
