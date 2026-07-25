import Star from './Star'
import SplitLines from './SplitLines'
import { NAV } from '../data'

const FOOTER_NAV = [NAV[0], NAV[2], NAV[1], NAV[3]]

export default function Footer() {
  return (
    <footer className="relative w-full bg-ink px-6 py-14 lg:h-[20.8125rem] lg:px-0 lg:py-0">
      {/* ---- floating shop panel, it overlaps the newsletter band ---- */}
      <div
        data-reveal="up"
        className="group/cta relative z-20 mb-12 overflow-hidden rounded-xl bg-lime p-6 lg:absolute lg:left-[72rem] lg:top-[-6.25rem] lg:mb-0 lg:h-[20.5625rem] lg:w-[44rem] lg:overflow-visible lg:rounded-[1.06rem] lg:p-0"
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
          className="mt-3 text-[1.7rem] leading-[1.02] tracking-[-0.039em] text-ink lg:absolute lg:left-[2.2125rem] lg:top-[5.5275rem] lg:mt-0 lg:text-[3.6625rem] lg:leading-[3.7313rem]"
        />

        <a
          href="#shop"
          className="btn-sweep mt-5 inline-flex h-9 items-center justify-center bg-ink px-5 text-[0.9rem] text-lime transition-colors duration-500 hover:text-ink lg:absolute lg:left-[2.5rem] lg:top-[15.125rem] lg:mt-0 lg:h-[2.875rem] lg:w-[9.8125rem] lg:px-0 lg:text-[1.9125rem]"
          style={{ '--btn-fill': 'var(--color-cream)' }}
        >
          SHOP NOW
        </a>

        <div
          data-reveal="enter-right"
          style={{ '--d': '320ms' }}
          className="pointer-events-none mt-6 w-[70%] lg:absolute lg:left-[20.4375rem] lg:top-[-3.6rem] lg:mt-0 lg:w-[24.0625rem] lg:max-w-none"
        >
          <img
            src="/img/tin-can-2.webp"
            alt="MATU yerba mate tins"
            className="w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:-translate-y-[0.9rem] group-hover/cta:scale-[1.03]"
          />
        </div>
      </div>

      <nav className="flex flex-wrap gap-x-8 gap-y-3 lg:absolute lg:left-[14.5313rem] lg:top-[1.3831rem] lg:gap-[3.75rem]">
        {FOOTER_NAV.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            data-reveal="up"
            style={{ '--d': `${i * 80}ms` }}
            className="link-underline text-[1.05rem] text-lime lg:text-[1.9625rem] lg:leading-[2.3563rem]"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div
        data-reveal="up"
        style={{ '--d': '180ms' }}
        className="mt-12 lg:absolute lg:left-[16.25rem] lg:top-[11.125rem] lg:mt-0"
      >
        <img
          src="/img/logo.webp"
          alt="MATU"
          className="w-[9rem] lg:w-[16.6875rem] lg:max-w-none"
        />
        <p className="mt-3 text-center font-geo text-[0.55rem] uppercase leading-none tracking-[0.32em] text-lime lg:mt-[1.15rem] lg:text-[0.82rem]">
          <span className="mr-[0.7em]">•••</span>
          Protect the wild
          <span className="ml-[0.7em]">•••</span>
        </p>
      </div>
    </footer>
  )
}
