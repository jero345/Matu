import { useState } from 'react'
import Star from './Star'
import SplitLines from './SplitLines'

const HEAD = ['BE THE FIRST', 'TO TASTE THE', 'HARVEST.']
const SIGNUP = [
  'Sign up for early access to new drops,',
  'farm updates from Misiones, and stories',
  'from the trail.',
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
  }

  return (
    <section className="relative isolate w-full overflow-hidden bg-cream px-6 py-16 text-ink lg:h-[34rem] lg:px-0 lg:py-0">
      <img
        src="/img/fondo5.webp"
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover"
      />

      <p
        data-reveal="up"
        className="text-[0.9rem] lg:absolute lg:left-[11.5rem] lg:top-[4.7458rem] lg:text-[1.5rem] lg:leading-[1.8rem]"
      >
        JOIN THE RITUAL
      </p>

      <SplitLines
        as="h2"
        lines={HEAD}
        delay={110}
        step={120}
        className="mt-3 text-[2.3rem] leading-[1.08] tracking-[-0.023em] lg:absolute lg:left-[11.3rem] lg:top-[6.6621rem] lg:mt-0 lg:text-[7.2062rem] lg:leading-[7.8063rem]"
      />

      <Star
        className="spin-slow mt-10 block size-[1.2rem] lg:absolute lg:left-[62.75rem] lg:top-[8.8125rem] lg:mt-0 lg:size-[2.125rem]"
        color="var(--color-ink)"
      />

      <SplitLines
        as="p"
        lines={SIGNUP}
        delay={200}
        step={80}
        className="mt-2 text-[0.9rem] leading-[1.25] lg:absolute lg:left-[66.675rem] lg:top-[8.6498rem] lg:mt-0 lg:text-[1.3625rem] lg:leading-[1.2437rem] lg:tracking-[0.016em]"
      />

      <form
        onSubmit={submit}
        data-reveal="up"
        style={{ '--d': '340ms' }}
        className="group/form mt-8 lg:absolute lg:left-[63.2438rem] lg:right-[6.8563rem] lg:top-[16.6555rem] lg:mt-0"
      >
        <div className="relative flex items-end justify-between gap-4 pb-2 lg:pb-[1.35rem]">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="YOUR EMAIL ADDRESS"
            aria-label="Your email address"
            className="peer w-full bg-transparent text-[0.8rem] outline-none placeholder:text-ink lg:text-[0.9938rem] lg:leading-[1.1938rem]"
          />
          <button
            type="submit"
            className="link-underline shrink-0 text-[0.8rem] lg:text-[0.9938rem] lg:leading-[1.1938rem]"
          >
            SIGN UP
          </button>
          <span className="absolute inset-x-0 bottom-0 h-px bg-ink/70" />
          <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100 group-hover/form:scale-x-100" />
        </div>
        <p className="mt-3 text-[0.8rem] transition-opacity duration-500 lg:absolute lg:left-0 lg:top-[2.8557rem] lg:mt-0 lg:text-[1.075rem] lg:leading-[1.2875rem]">
          {sent ? 'Thank you — welcome to the ritual.' : 'No spam — just what protects the wild.'}
        </p>
      </form>
    </section>
  )
}
