import Star from './Star'
import Pegasus from './Pegasus'
import SplitLines from './SplitLines'
import { NAV } from '../data'

const FOOTER_NAV = [NAV[0], NAV[2], NAV[1], NAV[3]]

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-ink px-6 py-14 lg:h-[20.8125rem] lg:overflow-visible lg:px-0 lg:py-0">
      {/* ---- floating shop panel, it overlaps the newsletter band ---- */}
      {/* The phone mirrors the artboard rather than stacking: copy down the left,
          the pack whole and bleeding off the right edge. `pr` reserves the column
          it sits in, and the panel stays `overflow-visible` so the pack can hang
          past the rounded corner the way it does on desktop. */}
      <div
        data-reveal="up"
        className="group/cta relative z-20 mb-12 rounded-xl bg-lime p-6 pr-[40%] lg:absolute lg:left-[72rem] lg:top-[-6.25rem] lg:mb-0 lg:h-[20.5625rem] lg:w-[44rem] lg:rounded-[1.06rem] lg:p-0"
      >
        <Star
          className="spin-slow size-[1rem] lg:absolute lg:left-[2.25rem] lg:top-[2.875rem] lg:size-[1.875rem]"
          color="var(--color-ink)"
        />

        <SplitLines
          as="h2"
          lines={['YOUR RITUAL', 'IS WAITING']}
          delay={160}
          step={110}
          className="mt-3 text-[1.5rem] leading-[1.02] tracking-[-0.039em] text-ink lg:absolute lg:left-[2.2125rem] lg:top-[5.5275rem] lg:mt-0 lg:text-[3.6625rem] lg:leading-[3.7313rem]"
        />

        <a
          href="#shop"
          className="btn-sweep mt-4 inline-flex h-9 items-center justify-center bg-ink px-5 text-[0.85rem] text-lime transition-colors duration-500 hover:text-ink lg:absolute lg:left-[2.5rem] lg:top-[15.125rem] lg:mt-0 lg:h-[2.875rem] lg:w-[9.8125rem] lg:px-0 lg:text-[1.9125rem]"
          style={{ '--btn-fill': 'var(--color-cream)' }}
        >
          SHOP NOW
        </a>

        <div
          data-reveal="enter-right"
          style={{ '--d': '320ms' }}
          className="pointer-events-none absolute right-[-4%] top-1/2 w-[46%] -translate-y-1/2 lg:right-auto lg:left-[20.4375rem] lg:top-[-3.6rem] lg:w-[24.0625rem] lg:max-w-none lg:translate-y-0"
        >
          <img
            src="/img/tin-can-2.webp?v=2"
            alt="MATU yerba mate tins"
            className="w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:-translate-y-[0.9rem] group-hover/cta:scale-[1.03]"
          />
        </div>
      </div>

      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 lg:absolute lg:left-[14.5313rem] lg:top-[1.3831rem] lg:justify-start lg:gap-[3.75rem]">
        {FOOTER_NAV.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            data-reveal="up"
            style={{ '--d': `${i * 80}ms` }}
            className="tap link-underline text-[1.05rem] text-lime lg:text-[1.9625rem] lg:leading-[2.3563rem]"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div
        data-reveal="up"
        style={{ '--d': '180ms' }}
        className="mt-12 text-center lg:absolute lg:left-[16.25rem] lg:top-[11.125rem] lg:mt-0 lg:text-left"
      >
        <Pegasus
          label="MATU"
          color="var(--color-lime)"
          className="h-[5rem] w-[5.35rem] lg:h-[9.5rem] lg:w-[10.15rem]"
        />
      </div>
    </footer>
  )
}
