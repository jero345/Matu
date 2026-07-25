import { useEffect } from 'react'

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/**
 * A single rAF loop driving everything that reacts to scroll position:
 *
 *  - `[data-parallax]`  → `--py` (and optional `--ps` zoom) on `.parallax`
 *  - `.scroll-progress` → `--progress` 0…1
 *  - `.marquee-skew`    → `--skew`, so the ticker drags a little as you scroll
 *  - `<html>`           → `is-scrolled` for the sticky header
 */
export default function useScrollFx() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = [...document.querySelectorAll('[data-parallax]')].map((el) => ({
      el,
      speed: Number(el.dataset.parallax) || 0,
      zoom: Number(el.dataset.parallaxZoom) || 0,
    }))
    const bar = document.querySelector('.scroll-progress')
    const skews = [...document.querySelectorAll('.marquee-skew')]
    const root = document.documentElement

    let last = window.scrollY
    let velocity = 0
    let frame = 0

    const tick = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      const delta = y - last
      last = y
      velocity += (delta - velocity) * 0.12

      for (const { el, speed, zoom } of items) {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < -vh || rect.top > vh * 2) continue
        // -1 above the viewport … 1 below it
        const progress = clamp((rect.top + rect.height / 2 - vh / 2) / vh, -1.6, 1.6)
        el.style.setProperty('--py', `${(progress * speed).toFixed(2)}px`)
        if (zoom) el.style.setProperty('--ps', (1 + Math.abs(progress) * zoom).toFixed(4))
      }

      if (bar) {
        const max = root.scrollHeight - vh
        bar.style.setProperty('--progress', max > 0 ? clamp(y / max, 0, 1).toFixed(4) : '0')
      }

      const skew = clamp(velocity * 0.16, -7, 7)
      for (const el of skews) el.style.setProperty('--skew', `${skew.toFixed(2)}deg`)

      root.classList.toggle('is-scrolled', y > 90)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])
}
