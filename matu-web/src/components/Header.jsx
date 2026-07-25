import { useState } from 'react'
import { NAV } from '../data'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter] duration-500 [html.is-scrolled_&]:pointer-events-auto [html.is-scrolled_&]:bg-ink/85 [html.is-scrolled_&]:backdrop-blur-md">
      <div className="page relative flex items-center justify-between px-6 pt-6 transition-[padding] duration-500 lg:items-start lg:justify-center lg:px-0 lg:pt-[2.875rem] lg:[html.is-scrolled_&]:pt-[1.1rem] lg:[html.is-scrolled_&]:pb-[0.9rem]">
        {/* mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="group pointer-events-auto flex flex-col gap-[5px] p-1 lg:hidden"
        >
          <span
            className={`block h-px w-6 origin-center bg-lime transition-transform duration-300 ${open ? 'translate-y-[6px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-lime transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px w-6 origin-center bg-lime transition-transform duration-300 ${open ? '-translate-y-[6px] -rotate-45' : ''}`}
          />
        </button>

        <nav className="hidden items-center lg:mt-[0.25rem] lg:flex lg:gap-[8.106rem]">
          {NAV.slice(0, 2).map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="link-underline pointer-events-auto text-lime lg:text-[1.8125rem]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#top"
          className="pointer-events-auto lg:mx-[10.1rem] lg:ml-[10.1rem] lg:mr-[11.869rem]"
          aria-label="MATU — inicio"
        >
          <img
            src="/img/logo.webp"
            alt="MATU"
            className="w-[7.5rem] origin-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:w-[12.375rem] lg:[html.is-scrolled_&]:scale-[0.74]"
          />
        </a>

        <nav className="hidden items-center lg:mt-[0.25rem] lg:flex lg:gap-[7.925rem]">
          {NAV.slice(2).map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="link-underline pointer-events-auto text-lime lg:text-[1.8125rem]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* keeps the mobile logo centred */}
        <span className="w-8 lg:hidden" />

        <div
          className={`absolute inset-x-6 top-full mt-4 origin-top overflow-hidden rounded-xl bg-ink/95 text-lime backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
            open ? 'pointer-events-auto max-h-72 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-3 p-5">
            {NAV.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="translate-y-2 opacity-0 transition-all duration-500"
                style={
                  open
                    ? { transform: 'none', opacity: 1, transitionDelay: `${120 + i * 70}ms` }
                    : undefined
                }
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
