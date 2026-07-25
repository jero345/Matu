import { useEffect, useState } from 'react'

/**
 * Intro curtain: the wordmark wipes in over the dark green while a hairline
 * fills, then the whole panel clips upward and hands the page over.
 */
export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement

    if (reduced) {
      setDone(true)
      onDone()
      return
    }

    root.classList.add('is-locked')
    let raf = 0
    const start = performance.now()
    const SPAN = 1150

    const step = (now) => {
      const t = Math.min(1, (now - start) / SPAN)
      setProgress(t)
      if (t < 1) {
        raf = requestAnimationFrame(step)
        return
      }
      setDone(true)
      root.classList.remove('is-locked')
      window.setTimeout(onDone, 260)
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('is-locked')
    }
  }, [onDone])

  return (
    <div
      className="curtain fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      data-done={done}
      aria-hidden="true"
    >
      <div className="overflow-hidden">
        <img
          src="/img/logo.webp"
          alt=""
          className="w-[10rem] transition-transform duration-[900ms] lg:w-[18rem]"
          style={{
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transform: progress > 0.02 ? 'none' : 'translate3d(0, 110%, 0)',
          }}
        />
      </div>

      <span className="mt-5 font-geo text-[0.6rem] uppercase tracking-[0.34em] text-lime/70 lg:mt-[1.6rem] lg:text-[0.8rem]">
        Protect the wild
      </span>

      <div className="mt-8 h-px w-[9rem] bg-lime/25 lg:mt-[3rem] lg:w-[16rem]">
        <div
          className="h-full origin-left bg-lime"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  )
}
