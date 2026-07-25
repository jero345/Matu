import { useEffect } from 'react'

/**
 * One IntersectionObserver for the whole page: every `[data-reveal]` node gets
 * `is-inview` the first time it enters the viewport, and the CSS in index.css
 * does the rest. Mirrors the `data-observe` / `is-inview` pattern the reference
 * site uses.
 *
 * @param {boolean} enabled  hold off until the intro curtain is gone
 */
export default function useReveal(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const nodes = document.querySelectorAll('[data-reveal]:not(.is-inview)')
    if (!nodes.length) return

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-inview'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-inview')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [enabled])
}
