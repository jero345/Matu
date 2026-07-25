import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Turntable viewer: drag to spin, flick for momentum, and it turns slowly on its
 * own while idle and on screen.
 *
 * Feed it a frame sequence shot evenly around the product (`frames`). With no
 * sequence it renders `fallback` as a plain image, so the page degrades to what
 * it looked like before.
 */
export default function Product360({
  frames = [],
  fallback,
  alt,
  className = '',
  imgClassName = '',
  spinSeconds = 26,
  hint = 'Drag to spin',
  ...rest
}) {
  const count = frames.length
  const box = useRef(null)
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [touched, setTouched] = useState(false)

  // mutable spin state, kept out of React so the rAF loop stays cheap
  const spin = useRef({ pos: 0, velocity: 0, lastX: 0, active: false, visible: false })

  /* ---- preload every frame before spinning ---- */
  useEffect(() => {
    if (!count) return
    let alive = true
    let done = 0
    frames.forEach((src) => {
      const img = new Image()
      img.onload = img.onerror = () => {
        if (!alive) return
        done += 1
        setLoaded(done)
      }
      img.src = src
    })
    return () => {
      alive = false
    }
  }, [frames, count])

  /* ---- only auto-spin while on screen ---- */
  useEffect(() => {
    const el = box.current
    if (!el || !count) return
    const io = new IntersectionObserver(
      ([e]) => {
        spin.current.visible = e.isIntersecting
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [count])

  /* ---- the loop ---- */
  useEffect(() => {
    if (!count) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const idleStep = reduced ? 0 : count / (spinSeconds * 60)
    let raf = 0

    const tick = () => {
      const s = spin.current
      if (!s.active) {
        if (Math.abs(s.velocity) > 0.002) {
          s.pos += s.velocity
          s.velocity *= 0.94 // friction
        } else if (s.visible && !touched) {
          s.pos += idleStep
        }
      }
      const next = ((Math.round(s.pos) % count) + count) % count
      setIndex((prev) => (prev === next ? prev : next))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [count, spinSeconds, touched])

  /* ---- pointer drag ---- */
  const onDown = useCallback(
    (e) => {
      if (!count) return
      const s = spin.current
      s.active = true
      s.lastX = e.clientX
      s.velocity = 0
      setDragging(true)
      setTouched(true)
      e.currentTarget.setPointerCapture?.(e.pointerId)
    },
    [count],
  )

  const onMove = useCallback(
    (e) => {
      const s = spin.current
      if (!s.active || !box.current) return
      const width = box.current.offsetWidth || 1
      // a full drag across the element is one full revolution
      const delta = ((e.clientX - s.lastX) / width) * count
      s.lastX = e.clientX
      s.pos -= delta
      s.velocity = -delta
    },
    [count],
  )

  const onUp = useCallback((e) => {
    spin.current.active = false
    setDragging(false)
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }, [])

  const nudge = useCallback(
    (dir) => {
      spin.current.pos += dir
      spin.current.velocity = 0
      setTouched(true)
    },
    [],
  )

  // no sequence configured yet — render the still, same wrapper so scroll
  // effects and reveals keep targeting the same node
  if (!count) {
    return (
      <div className={className} {...rest}>
        <img src={fallback} alt={alt} className={imgClassName} />
      </div>
    )
  }

  const ready = loaded >= count

  return (
    <div
      ref={box}
      role="img"
      aria-label={`${alt}. ${hint}.`}
      tabIndex={0}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') nudge(1)
        if (e.key === 'ArrowLeft') nudge(-1)
      }}
      className={`relative touch-pan-y select-none outline-none ${
        dragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
      {...rest}
    >
      {frames.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          draggable={false}
          aria-hidden="true"
          className={`${imgClassName} ${i === 0 ? '' : 'absolute inset-0'} ${
            i === index && ready ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* first frame stays visible until the sequence is cached */}
      {!ready && (
        <img
          src={fallback ?? frames[0]}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 ${imgClassName}`}
        />
      )}

      <span
        className={`pointer-events-none absolute inset-x-0 bottom-0 text-center font-geo text-[0.6rem] uppercase tracking-[0.28em] transition-opacity duration-700 lg:text-[0.85rem] ${
          touched ? 'opacity-0' : 'opacity-60'
        }`}
      >
        {hint}
      </span>
    </div>
  )
}
