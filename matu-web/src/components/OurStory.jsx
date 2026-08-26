import { useEffect, useRef, useState } from 'react'
import Rail from './Rail'
import ProtectBadge from './ProtectBadge'
import SplitLines from './SplitLines'

/* A slide is either a still (`src`) or a clip (`video` + its `poster`). */
const SLIDES = [
  {
    video: '/video/ride.mp4',
    poster: '/img/ride-poster.webp',
    alt: 'Riding out across the pampas at golden hour',
    hold: 15400,
  },
  { src: '/img/horse2.webp', alt: 'Gaucho riding at sunset in the pampas' },
  { src: '/img/horse1.webp', alt: 'Two horses saddled in the tall grass' },
  {
    src: '/img/gaucho-mate.webp',
    alt: 'A gaucho drinking mate in the saddle, thermos tucked under his arm',
  },
  {
    src: '/img/mate-trail.webp',
    alt: 'A filled gourd held up on the track out to the herd',
  },
  { src: '/img/yerba-bowl.webp', alt: 'Loose yerba mate leaf in a wooden bowl' },
]

const HEAD = ['A HOLY HOLLY TREE']
const BOTANICAL = 'Ilex paraguariensis'

/* Both columns share the same `top` on purpose — the two paragraphs are meant
   to start on the same baseline, so move them together or not at all. */
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
    pos: 'lg:absolute lg:left-[61.3125rem] lg:top-[51.2rem] lg:w-[49.4375rem] lg:text-right',
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

/* horse1/horse2 ship with the rounded corners baked in — a 57px arc over
   1581px of transparency — so no CSS radius can undo it. Every slide is blown
   up 8% and re-centred instead, which pushes those corners outside the clipping
   box and keeps all six cropping to the identical frame. The drift below scales
   on top of that, so the corners stay covered at either end of it. */
const MEDIA = 'carousel-media absolute left-[-4%] top-[-4%] size-[108%] max-w-none object-cover'

/* The drift: a slide eases from one scale to the other across its whole turn,
   alternating direction so consecutive slides do not all push the same way. */
const DRIFT = 1.09

/* How long a still holds before the carousel moves on. The clip overrides it
   with its own `hold`, so it is not cut off a third of the way through. */
const HOLD = 2400

export default function OurStory() {
  const [slide, setSlide] = useState(0)
  const [onScreen, setOnScreen] = useState(false)
  const [held, setHeld] = useState(false)
  const clips = useRef([])
  const frame = useRef(null)

  /* A carousel nobody is looking at should not be cycling — and the clip should
     not be decoding. Everything below is gated on the frame being in view. */
  useEffect(() => {
    const el = frame.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.25,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Advances on its own. Changing `slide` restarts this, so a tap on a dot also
     resets the countdown rather than cutting the next turn short. `held` is the
     pointer resting on the carousel: stop moving under someone who is looking. */
  useEffect(() => {
    if (!onScreen || held) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(
      () => setSlide((s) => (s + 1) % SLIDES.length),
      SLIDES[slide].hold ?? HOLD,
    )
    return () => clearTimeout(id)
  }, [slide, onScreen, held])

  /* Only the visible slide plays: the rest are rewound so a clip always opens
     from its first frame, which is what the poster shows. */
  useEffect(() => {
    clips.current.forEach((el, i) => {
      if (!el) return
      if (i !== slide || !onScreen) {
        el.pause()
        el.currentTime = 0
      } else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.play().catch(() => {})
      }
    })
  }, [slide, onScreen])

  return (
    <section
      id="our-story"
      className="relative w-full overflow-hidden bg-cream px-6 py-16 text-ink lg:h-[133rem] lg:px-0 lg:py-0"
    >
      <Rail side="left" words={['OUR STORY', 'MATU YERBA MATE']} offset="2.725rem" size="1.0625rem" />
      <Rail side="right" words={['OUR STORY', 'MATU YERBA MATE']} offset="2.83rem" size="1.0625rem" />

      {/* ---- headline column ---- */}
      <div className="relative z-10">
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
      <div
        ref={frame}
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        /* `:focus-visible` and not plain focus: a mouse click on a dot focuses it
           too, and treating that as a hold would freeze the carousel for good
           once someone picked a slide. Only keyboard focus stops the run. */
        onFocusCapture={(e) => setHeld(e.target.matches(':focus-visible'))}
        onBlurCapture={() => setHeld(false)}
        className="relative z-10 mt-10 lg:absolute lg:left-[10.625rem] lg:top-[77.3125rem] lg:mt-0 lg:h-[50.9375rem] lg:w-[49.375rem]"
      >
        <div
          data-reveal="clip"
          style={{ '--curtain': 'var(--color-cream)' }}
          className="relative h-[70vw] overflow-hidden lg:h-full"
        >
          <div className="clip-zoom relative size-full">
            {SLIDES.map((item, i) => {
              const live = i === slide
              // odd slides drift the other way, so the eye is not always pulled in
              const out = i % 2 === 1
              const style = {
                transition: `opacity 1100ms cubic-bezier(0.16,1,0.3,1), transform ${
                  (item.hold ?? HOLD) + 1400
                }ms linear`,
                opacity: live ? 1 : 0,
                // the drift only runs on screen, so slide one still starts at rest
                // and eases off the moment the band is scrolled to
                transform: `scale(${(live && onScreen) !== out ? DRIFT : 1})`,
              }
              return item.video ? (
                <video
                  key={item.video}
                  ref={(el) => {
                    clips.current[i] = el
                  }}
                  className={MEDIA}
                  style={style}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  /* the clip is ~2MB behind a dot, so nothing is fetched until the
                     viewer actually opens that slide; the poster covers the wait */
                  preload="none"
                  aria-label={item.alt}
                >
                  <source src={item.video} type="video/mp4" />
                </video>
              ) : (
                <img
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className={MEDIA}
                  style={style}
                />
              )
            })}
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 lg:bottom-[3.4375rem] lg:gap-[1.6rem]">
          {SLIDES.map((item, i) => (
            <button
              key={item.src ?? item.video}
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
