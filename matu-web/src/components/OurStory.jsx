import { useState } from 'react'
import Rail from './Rail'
import ProtectBadge from './ProtectBadge'
import SplitLines from './SplitLines'

const SLIDES = [
  { src: '/img/horse2.webp', alt: 'Gaucho riding at sunset in the pampas' },
  { src: '/img/horse1.webp', alt: 'Two horses saddled in the tall grass' },
]

const HEAD = ['A HOLY HOLLY TREE']
const BOTANICAL = 'Ilex paraguariensis'

const PARAGRAPHS = [
  {
    pos: 'lg:absolute lg:left-[12.1438rem] lg:top-[51.2rem] lg:w-[48rem]',
    lines: [
      'Thousands of Years ago, the Guarani peoples',
      'of South America discovered Ilex Paraguanesis.',
      'Sipped through gourd and bombilla, drinking',
      'mate offered clarity for the mind, warmth for',
      'the body, and a bridge to something greater',
      'than oneself: community.',
    ],
  },
  {
    pos: 'lg:absolute lg:left-[61.3125rem] lg:top-[56.5rem] lg:w-[49.4375rem] lg:text-right',
    lines: [
      'That spirit carried forward through the centuries',
      'into the hands of the gauchos, the iconic horsemen',
      'of the pampas. Nomadic and free, yerba mate',
      'became a daily ritual. To offer it was an act of',
      'fraternity, a wordless invitation into trust and',
      'kinship. A shared gourd means,',
      'YOU ARE WELCOME HERE.',
    ],
  },
]

export default function OurStory() {
  const [slide, setSlide] = useState(0)

  return (
    <section
      id="our-story"
      className="relative w-full overflow-hidden bg-cream px-6 py-16 text-ink lg:h-[133rem] lg:px-0 lg:py-0"
    >
      <img
        src="/img/flor-colibri.webp"
        alt=""
        data-reveal="fade"
        data-parallax="34"
        className="parallax pointer-events-none absolute left-0 top-0 w-[62%] lg:top-[0.0625rem] lg:w-[44.5rem] lg:max-w-none"
      />

      <Rail side="left" words={['OUR STORY', 'MATU YERBA MATE']} offset="2.725rem" size="1.0625rem" />
      <Rail side="right" words={['OUR STORY', 'MATU YERBA MATE']} offset="2.83rem" size="1.0625rem" />

      {/* ---- headline column ---- */}
      <div className="relative z-10 pt-[38vw] lg:pt-0">
        <p
          data-reveal="up"
          className="text-[1.05rem] lg:absolute lg:left-[11.5rem] lg:top-[26.6784rem] lg:text-[2.1875rem] lg:leading-[2.625rem]"
        >
          OUR STORY
        </p>

        <SplitLines
          as="h2"
          lines={HEAD}
          delay={120}
          className="mt-3 text-[clamp(2.15rem,5.4vw,4.2rem)] leading-[1.13] lg:absolute lg:left-[11.5rem] lg:top-[30.4729rem] lg:mt-0 lg:text-[5.2062rem] lg:leading-[5.9rem] lg:tracking-[-0.031em]"
        />

        <p
          data-reveal="up"
          style={{ '--d': '260ms' }}
          className="mt-2 font-note text-[1.3rem] italic lg:absolute lg:left-[11.5rem] lg:top-[37.2rem] lg:mt-0 lg:text-[3rem] lg:leading-[3.4rem]"
        >
          {BOTANICAL}
        </p>
      </div>

      {/* ---- traditional mate ritual photo ---- */}
      <figure className="relative z-10 mt-10 lg:absolute lg:left-[61.3125rem] lg:top-[8.1875rem] lg:mt-0 lg:w-[49.4375rem]">
        <div
          data-reveal="clip"
          style={{ '--curtain': 'var(--color-cream)' }}
          className="relative overflow-hidden lg:h-[37.0625rem]"
        >
          <img
            src="/img/yerba-mate.webp"
            alt="Yerba mate leaves on the branch"
            className="clip-zoom size-full object-cover"
          />
        </div>
      </figure>

      {/* ---- body copy ---- */}
      <div className="relative z-10 mt-10 max-w-[46rem] space-y-6 text-[clamp(1.05rem,1.9vw,1.35rem)] leading-[1.45] lg:mt-0 lg:max-w-none lg:space-y-0 lg:text-[2.0375rem] lg:leading-[2.375rem]">
        {PARAGRAPHS.map((p) => (
          <SplitLines key={p.pos} as="p" lines={p.lines} step={80} className={p.pos} />
        ))}
      </div>

      {/* ---- gaucho carousel ---- */}
      <div className="relative z-10 mt-10 lg:absolute lg:left-[10.625rem] lg:top-[77.3125rem] lg:mt-0 lg:h-[50.9375rem] lg:w-[49.375rem]">
        <div
          data-reveal="clip"
          style={{ '--curtain': 'var(--color-cream)' }}
          className="relative h-[70vw] overflow-hidden lg:h-full"
        >
          {SLIDES.map((item, i) => (
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              /* horse1/horse2 ship with the rounded corners baked in — a 57px
                 arc over 1581px of transparency — so no CSS radius can undo it.
                 The image is blown up 8% and re-centred instead, which pushes
                 those transparent corners outside the clipping box. */
              className={`clip-zoom absolute left-[-4%] top-[-4%] size-[108%] max-w-none object-cover transition-opacity duration-[900ms] ${
                i === slide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 lg:bottom-[3.4375rem] lg:left-[22.6875rem] lg:translate-x-0 lg:gap-[2.25rem]">
          {SLIDES.map((item, i) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`relative size-3 rounded-full border border-lime transition-all duration-500 before:absolute before:-inset-3 before:content-[''] hover:scale-125 lg:size-[0.875rem] ${
                i === slide ? 'scale-110 bg-lime' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      <ProtectBadge className="float-slow relative z-10 mx-auto mt-12 lg:absolute lg:left-[72.75rem] lg:top-[89.875rem] lg:mx-0 lg:mt-0" />
    </section>
  )
}
