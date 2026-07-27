import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import {
  FREE_SHIPPING_FROM,
  PAYMENT_METHODS,
  SHIPPING_METHODS,
  money,
} from '../data'
import { isPaymentConfigured, startPayment } from '../lib/payment'
import Field from './checkout/Field'
import OrderSummary from './checkout/OrderSummary'
import Star from './Star'
import Wordmark from './Wordmark'

const STEPS = ['Details', 'Delivery', 'Payment']

const EMPTY = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  postcode: '',
  country: 'Argentina',
  phone: '',
}

const REQUIRED = {
  email: 'Enter your email',
  firstName: 'Enter your first name',
  lastName: 'Enter your last name',
  address: 'Enter your address',
  city: 'Enter your city',
  postcode: 'Enter your postal code',
  country: 'Enter your country',
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

export default function Checkout() {
  const { items, subtotal, checkingOut, endCheckout, clear, shippingFor } = useCart()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [method, setMethod] = useState(SHIPPING_METHODS[0].id)
  const [payment, setPayment] = useState(PAYMENT_METHODS[0].id)
  const [busy, setBusy] = useState(false)
  const [failure, setFailure] = useState('')
  const [placed, setPlaced] = useState(null)

  const shipping = useMemo(() => shippingFor(method), [shippingFor, method])

  useEffect(() => {
    if (!checkingOut) return
    const onKey = (e) => e.key === 'Escape' && !busy && endCheckout()
    document.addEventListener('keydown', onKey)
    document.documentElement.classList.add('is-locked')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('is-locked')
    }
  }, [checkingOut, endCheckout, busy])

  useEffect(() => {
    if (checkingOut) {
      setStep(0)
      setErrors({})
      setFailure('')
      setPlaced(null)
    }
  }, [checkingOut])

  if (!checkingOut) return null

  const update = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e))
  }

  const validateDetails = () => {
    const next = {}
    for (const [name, message] of Object.entries(REQUIRED)) {
      if (!form[name].trim()) next[name] = message
    }
    if (form.email.trim() && !isEmail(form.email)) next.email = 'That email doesn’t look right'
    setErrors(next)
    if (Object.keys(next).length) {
      document.querySelector('[aria-invalid="true"]')?.focus()
      return false
    }
    return true
  }

  const place = async () => {
    setBusy(true)
    setFailure('')
    try {
      const result = await startPayment({
        items: items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
        email: form.email,
        shipping: { ...form, method },
        totals: { subtotal, shipping, total: subtotal + shipping },
      })
      if (result.redirected) return // the provider takes over from here
      setPlaced({ reference: result.reference, email: form.email })
      clear()
    } catch (err) {
      setFailure(err.message || 'We could not start the payment. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  /* ---------------------------------------------------------------- */

  if (placed) {
    return (
      <Shell onClose={endCheckout} closeLabel="Back to the shop">
        <div className="mx-auto flex max-w-[34rem] flex-col items-center py-16 text-center lg:max-w-[48rem] lg:py-[7rem]">
          <Star className="size-[2.4rem] lg:size-[4rem]" color="var(--color-ink)" />
          <h1 className="mt-8 text-[2rem] leading-[1.05] lg:mt-[3rem] lg:text-[4.4rem]">
            Thank you.
            <br />
            Your ritual is on its way.
          </h1>
          <p className="mt-5 text-[0.95rem] leading-[1.45] text-ink/75 lg:mt-[2rem] lg:text-[1.45rem]">
            We sent the confirmation to <span className="text-ink">{placed.email}</span>.
            Your order reference is{' '}
            <span className="whitespace-nowrap text-ink">{placed.reference}</span>.
          </p>
          {!isPaymentConfigured && (
            <p className="mt-6 max-w-[30rem] rounded-xl border border-ink/25 px-5 py-4 text-[0.75rem] leading-[1.5] text-ink/70 lg:mt-[2.4rem] lg:max-w-[40rem] lg:px-[1.8rem] lg:py-[1.4rem] lg:text-[1rem]">
              Demo mode: no payment provider is connected yet, so nothing was
              charged. Wire one up in <code>src/lib/payment.js</code>.
            </p>
          )}
          <button
            type="button"
            onClick={endCheckout}
            className="btn-sweep mt-9 h-12 rounded-full bg-ink px-9 text-[0.8rem] uppercase tracking-[0.2em] text-lime transition-colors duration-500 hover:text-ink lg:mt-[3.4rem] lg:h-[3.6rem] lg:px-[3rem] lg:text-[1.05rem]"
            style={{ '--btn-fill': 'var(--color-lime)' }}
          >
            Keep exploring
          </button>
        </div>
      </Shell>
    )
  }

  if (!items.length) {
    return (
      <Shell onClose={endCheckout} closeLabel="Back to the shop">
        <div className="mx-auto flex max-w-[30rem] flex-col items-center py-20 text-center lg:py-[8rem]">
          <h1 className="text-[1.8rem] lg:text-[3.4rem]">Your bag is empty.</h1>
          <button
            type="button"
            onClick={endCheckout}
            className="tap link-underline mt-6 text-[0.8rem] uppercase tracking-[0.2em] lg:mt-[2rem] lg:text-[1.05rem]"
          >
            Back to the shop
          </button>
        </div>
      </Shell>
    )
  }

  return (
    <Shell onClose={endCheckout} closeLabel="Close checkout">
      <div className="grid gap-10 py-8 lg:grid-cols-[1fr_28rem] lg:gap-[5rem] lg:py-[3.5rem]">
        <div>
          {/* ---- step rail ---- */}
          <ol className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.16em] lg:gap-[1.1rem] lg:text-[0.95rem]">
            {STEPS.map((label, i) => (
              <li key={label} className="flex items-center gap-3 lg:gap-[1.1rem]">
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  className={`transition-colors ${
                    i === step ? 'text-ink' : i < step ? 'text-ink/55 hover:text-ink' : 'text-ink/30'
                  }`}
                >
                  {i + 1}. {label}
                </button>
                {i < STEPS.length - 1 && <span className="h-px w-6 bg-ink/25 lg:w-[2.4rem]" />}
              </li>
            ))}
          </ol>

          {/* ---- 1. details ---- */}
          {step === 0 && (
            <section className="mt-8 lg:mt-[3rem]">
              <h1 className="text-[1.8rem] leading-[1.05] lg:text-[3.4rem]">Where do we send it?</h1>

              <div className="mt-8 grid gap-6 lg:mt-[3rem] lg:grid-cols-2 lg:gap-[2.2rem]">
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update}
                  error={errors.email}
                  className="lg:col-span-2"
                />
                <Field
                  label="First name"
                  name="firstName"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={update}
                  error={errors.firstName}
                />
                <Field
                  label="Last name"
                  name="lastName"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={update}
                  error={errors.lastName}
                />
                <Field
                  label="Address"
                  name="address"
                  autoComplete="address-line1"
                  value={form.address}
                  onChange={update}
                  error={errors.address}
                  className="lg:col-span-2"
                />
                <Field
                  label="Apartment, floor (optional)"
                  name="apartment"
                  autoComplete="address-line2"
                  value={form.apartment}
                  onChange={update}
                  className="lg:col-span-2"
                />
                <Field
                  label="City"
                  name="city"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={update}
                  error={errors.city}
                />
                <Field
                  label="Postal code"
                  name="postcode"
                  autoComplete="postal-code"
                  value={form.postcode}
                  onChange={update}
                  error={errors.postcode}
                />
                <Field
                  label="Country"
                  name="country"
                  autoComplete="country-name"
                  value={form.country}
                  onChange={update}
                  error={errors.country}
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update}
                />
              </div>

              <Actions
                next="Continue to delivery"
                onNext={() => validateDetails() && setStep(1)}
                back="Back to the bag"
                onBack={endCheckout}
              />
            </section>
          )}

          {/* ---- 2. delivery ---- */}
          {step === 1 && (
            <section className="mt-8 lg:mt-[3rem]">
              <h1 className="text-[1.8rem] leading-[1.05] lg:text-[3.4rem]">How fast?</h1>

              <p className="mt-4 text-[0.9rem] text-ink/70 lg:mt-[1.4rem] lg:text-[1.3rem]">
                Shipping to {form.address}, {form.city} {form.postcode}, {form.country}.
              </p>

              <div className="mt-8 space-y-4 lg:mt-[3rem] lg:space-y-[1.2rem]">
                {SHIPPING_METHODS.map((option) => {
                  const free = subtotal >= FREE_SHIPPING_FROM
                  const active = method === option.id
                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border px-5 py-4 transition-colors duration-300 lg:rounded-[1.2rem] lg:px-[2rem] lg:py-[1.6rem] ${
                        active ? 'border-ink bg-ink/5' : 'border-ink/25 hover:border-ink/50'
                      }`}
                    >
                      <span className="flex items-center gap-4 lg:gap-[1.4rem]">
                        <input
                          type="radio"
                          name="shipping"
                          checked={active}
                          onChange={() => setMethod(option.id)}
                          className="sr-only"
                        />
                        <span
                          className={`grid size-4 shrink-0 place-items-center rounded-full border transition-colors lg:size-[1.3rem] ${
                            active ? 'border-ink' : 'border-ink/40'
                          }`}
                        >
                          <span
                            className={`size-2 rounded-full bg-ink transition-transform duration-300 lg:size-[0.7rem] ${
                              active ? 'scale-100' : 'scale-0'
                            }`}
                          />
                        </span>
                        <span>
                          <span className="block text-[0.95rem] lg:text-[1.35rem]">
                            {option.label}
                          </span>
                          <span className="block text-[0.72rem] text-ink/60 lg:text-[1rem]">
                            {option.detail}
                          </span>
                        </span>
                      </span>
                      <span className="shrink-0 text-[0.9rem] lg:text-[1.25rem]">
                        {free ? 'Free' : money(option.price)}
                      </span>
                    </label>
                  )
                })}
              </div>

              <Actions
                next="Continue to payment"
                onNext={() => setStep(2)}
                back="Back to details"
                onBack={() => setStep(0)}
              />
            </section>
          )}

          {/* ---- 3. payment ---- */}
          {step === 2 && (
            <section className="mt-8 lg:mt-[3rem]">
              <h1 className="text-[1.8rem] leading-[1.05] lg:text-[3.4rem]">How would you like to pay?</h1>

              <div className="mt-8 space-y-4 lg:mt-[3rem] lg:space-y-[1.2rem]">
                {PAYMENT_METHODS.map((option) => {
                  const active = payment === option.id
                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-start gap-4 rounded-2xl border px-5 py-4 transition-colors duration-300 lg:gap-[1.4rem] lg:rounded-[1.2rem] lg:px-[2rem] lg:py-[1.6rem] ${
                        active ? 'border-ink bg-ink/5' : 'border-ink/25 hover:border-ink/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={active}
                        onChange={() => setPayment(option.id)}
                        className="sr-only"
                      />
                      <span
                        className={`mt-1 grid size-4 shrink-0 place-items-center rounded-full border transition-colors lg:size-[1.3rem] ${
                          active ? 'border-ink' : 'border-ink/40'
                        }`}
                      >
                        <span
                          className={`size-2 rounded-full bg-ink transition-transform duration-300 lg:size-[0.7rem] ${
                            active ? 'scale-100' : 'scale-0'
                          }`}
                        />
                      </span>
                      <span>
                        <span className="block text-[0.95rem] lg:text-[1.35rem]">
                          {option.label}
                        </span>
                        <span className="block text-[0.72rem] leading-[1.4] text-ink/60 lg:text-[1rem]">
                          {option.detail}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>

              <p className="mt-6 flex items-start gap-3 text-[0.72rem] leading-[1.5] text-ink/60 lg:mt-[2.2rem] lg:gap-[0.9rem] lg:text-[1rem]">
                <svg viewBox="0 0 24 24" className="mt-[0.15em] size-4 shrink-0 lg:size-[1.2rem]" fill="none">
                  <path
                    d="M12 3 5 6v5.5c0 4.2 2.9 8.1 7 9.5 4.1-1.4 7-5.3 7-9.5V6l-7-3Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                Card details are never typed on this site — you finish the payment on the
                provider’s secure page and come straight back.
              </p>

              {failure && (
                <p className="mt-5 rounded-xl border border-red-800/40 bg-red-900/5 px-4 py-3 text-[0.8rem] text-red-900 lg:mt-[1.6rem] lg:text-[1.05rem]">
                  {failure}
                </p>
              )}

              <Actions
                next={busy ? 'Working…' : `Place order · ${money(subtotal + shipping)}`}
                onNext={place}
                disabled={busy}
                back="Back to delivery"
                onBack={() => setStep(1)}
              />
            </section>
          )}
        </div>

        <div className="lg:sticky lg:top-[3.5rem] lg:self-start">
          <OrderSummary shipping={step === 0 ? null : shipping} />
        </div>
      </div>
    </Shell>
  )
}

/* ------------------------------------------------------------------ */

function Shell({ children, onClose, closeLabel }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
      className="fixed inset-0 z-[80] overflow-y-auto bg-cream text-ink"
    >
      <div className="mx-auto w-full max-w-[80rem] px-6 lg:max-w-[100rem] lg:px-[6rem]">
        <header className="flex items-center justify-between border-b border-ink/15 py-6 lg:py-[2.4rem]">
          <Wordmark className="w-[6.5rem] lg:w-[10rem]" />
          <button
            type="button"
            onClick={onClose}
            className="tap link-underline text-[0.72rem] uppercase tracking-[0.18em] lg:text-[1rem]"
          >
            {closeLabel}
          </button>
        </header>
        {children}
      </div>
    </div>
  )
}

function Actions({ next, onNext, back, onBack, disabled }) {
  return (
    <div className="mt-10 flex flex-col-reverse items-center gap-5 sm:flex-row sm:justify-between lg:mt-[3.5rem] lg:gap-[2rem]">
      <button
        type="button"
        onClick={onBack}
        className="tap link-underline text-[0.75rem] uppercase tracking-[0.18em] text-ink/70 lg:text-[1rem]"
      >
        {back}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className="btn-sweep h-12 w-full rounded-full bg-ink text-[0.8rem] uppercase tracking-[0.16em] text-lime transition-colors duration-500 hover:text-ink disabled:opacity-60 sm:w-auto sm:px-10 lg:h-[3.6rem] lg:px-[3.2rem] lg:text-[1.05rem]"
        style={{ '--btn-fill': 'var(--color-lime)' }}
      >
        {next}
      </button>
    </div>
  )
}
