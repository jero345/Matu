import { useState } from 'react'
import SplitLines from './SplitLines'
import { SPECIES } from '../data'

const NBSP = ' '
const HEAD = [`BENEATH THE${NBSP}`, "CANOPY, WE'RE", 'NOT ALONE.']
// the artboard says "Hover", but the fact is unreachable that way on a touch
// screen, so the prompt names both gestures and tapping opens the card too
const SUB = [
  'Tap or hover a species to see a quick fact the same',
  'creatures who share the shade with every yerba',
  'mate leaf we harvest.',
]

export default function Species() {
  const [open, setOpen] = useState(-1)

  return (
    <section className="relative w-full overflow-hidden bg-ink px-6 py-16 lg:h-[67.5rem] lg:px-0 lg:py-0">
      <img
        src="/img/sello-logo.webp"
        alt="MATU — Misiones, Argentina · Yerba Mate"
        data-reveal="zoom"
        className="mx-auto w-[9rem] lg:absolute lg:left-[25rem] lg:top-[3.375rem] lg:mx-0 lg:w-[13rem]"
      />

      <SplitLines
        as="h2"
        lines={HEAD}
        step={125}
        className="mt-8 text-center text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.029em] text-lime lg:absolute lg:left-0 lg:top-[22.2929rem] lg:mt-0 lg:w-[61.3125rem] lg:text-[8.6062rem] lg:leading-[8.7625rem]"
      />

      <SplitLines
        as="p"
        lines={SUB}
        delay={260}
        step={80}
        className="mx-auto mt-5 max-w-[46ch] text-center text-[clamp(0.95rem,1.9vw,1.35rem)] leading-[1.35] text-cream lg:absolute lg:left-0 lg:top-[54.544rem] lg:mt-0 lg:w-[61.3125rem] lg:max-w-none lg:text-[1.7437rem] lg:leading-[1.9187rem] lg:tracking-[-0.026em]"
      />

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:absolute lg:left-[62.125rem] lg:top-[3.375rem] lg:mt-0 lg:gap-x-[1.25rem] lg:gap-y-[1rem]">
        {SPECIES.map((animal, i) => (
          <figure
            key={animal.image}
            data-reveal="clip"
            style={{ '--d': `${(i % 3) * 90 + Math.floor(i / 3) * 130}ms` }}
            className="group relative aspect-[269/314] overflow-hidden rounded-xl lg:h-[19.6rem] lg:w-[16.79rem] lg:rounded-[1.11rem]"
          >
            <img
              src={animal.image}
              alt={animal.name}
              loading="lazy"
              className={`size-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12] ${
                open === i ? 'scale-[1.12]' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
              className="absolute inset-0 cursor-pointer"
            >
              <span className="sr-only">{animal.name}</span>
            </button>
            <figcaption
              className={`pointer-events-none absolute inset-0 flex flex-col justify-end gap-1 bg-gradient-to-t from-ink via-ink/85 to-ink/10 p-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 lg:gap-[0.6rem] lg:p-[1.4rem] ${
                open === i ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              <span className="text-[0.8rem] text-lime lg:text-[1.4rem]">{animal.name}</span>
              <span className="text-[0.7rem] leading-[1.25] text-cream lg:text-[1.1rem] lg:leading-[1.25rem]">
                {animal.fact}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
