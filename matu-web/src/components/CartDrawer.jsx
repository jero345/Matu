import { useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import { money } from '../data'
import Star from './Star'

function Stepper({ item }) {
  const { setQty } = useCart()
  return (
    <div className="flex items-center gap-3 rounded-full border border-lime/40 px-3 py-1 lg:gap-[0.9rem] lg:px-[0.9rem] lg:py-[0.25rem]">
      <button
        type="button"
        onClick={() => setQty(item.id, item.qty - 1)}
        aria-label={`Remove one ${item.name}`}
        className="text-lime/70 transition-colors hover:text-lime"
      >
        –
      </button>
      <span className="min-w-4 text-center tabular-nums text-lime">{item.qty}</span>
      <button
        type="button"
        onClick={() => setQty(item.id, item.qty + 1)}
        aria-label={`Add one ${item.name}`}
        className="text-lime/70 transition-colors hover:text-lime"
      >
        +
      </button>
    </div>
  )
}

export default function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    open,
    closeCart,
    remove,
    startCheckout,
    missingForFreeShipping,
    freeShippingFrom,
  } = useCart()
  const panel = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    document.documentElement.classList.add('is-locked')
    panel.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('is-locked')
    }
  }, [open, closeCart])

  const progress = Math.min(1, subtotal / freeShippingFrom)

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/60 backdrop-blur-[2px] transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col bg-ink text-cream shadow-2xl outline-none transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:max-w-[34rem] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ---- head ---- */}
        <header className="flex items-center justify-between border-b border-lime/20 px-6 py-5 lg:px-[2.4rem] lg:py-[2rem]">
          <h2 className="flex items-baseline gap-2 text-[1.35rem] text-lime lg:gap-[0.6rem] lg:text-[2.1rem]">
            Your bag
            <span className="text-[0.75rem] text-cream/60 lg:text-[1.1rem]">({count})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="tap link-underline text-[0.8rem] uppercase tracking-[0.18em] text-cream/80 lg:text-[1rem]"
          >
            Close
          </button>
        </header>

        {/* ---- free shipping meter ---- */}
        {items.length > 0 && (
          <div className="border-b border-lime/15 px-6 py-4 lg:px-[2.4rem] lg:py-[1.5rem]">
            <p className="text-[0.75rem] leading-[1.4] text-cream/80 lg:text-[1.05rem]">
              {missingForFreeShipping > 0 ? (
                <>
                  Add <span className="text-lime">{money(missingForFreeShipping)}</span> more
                  for free shipping.
                </>
              ) : (
                <span className="text-lime">Free shipping unlocked.</span>
              )}
            </p>
            <div className="mt-3 h-px w-full bg-lime/25 lg:mt-[0.9rem]">
              <div
                className="h-full origin-left bg-lime transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
          </div>
        )}

        {/* ---- lines ---- */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-[2.4rem]">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <Star className="size-[2rem] lg:size-[3rem]" color="var(--color-lime)" />
              <p className="text-[1.05rem] text-cream/70 lg:text-[1.5rem]">
                Your bag is still empty.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="tap link-underline text-[0.8rem] uppercase tracking-[0.2em] text-lime lg:text-[1rem]"
              >
                Browse the shop
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-lime/15">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5 lg:gap-[1.5rem] lg:py-[1.8rem]">
                  <div className="flex size-[5rem] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream/5 lg:size-[7rem]">
                    <img
                      src={item.image}
                      alt=""
                      className="max-h-[78%] w-auto object-contain"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[0.6rem] uppercase tracking-[0.14em] text-cream/50 lg:text-[0.85rem]">
                      {item.kind}
                    </span>
                    <h3 className="mt-1 truncate text-[0.95rem] text-cream lg:mt-[0.3rem] lg:text-[1.35rem]">
                      {item.name}
                    </h3>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                      <Stepper item={item} />
                      <span className="shrink-0 text-[0.85rem] text-lime lg:text-[1.2rem]">
                        {money(item.total)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="self-start text-[0.7rem] uppercase tracking-[0.16em] text-cream/45 transition-colors hover:text-lime lg:text-[0.9rem]"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ---- foot ---- */}
        {items.length > 0 && (
          <footer className="border-t border-lime/20 px-6 py-5 lg:px-[2.4rem] lg:py-[2rem]">
            <div className="flex items-baseline justify-between text-[1rem] lg:text-[1.4rem]">
              <span className="text-cream/80">Subtotal</span>
              <span className="text-lime">{money(subtotal)}</span>
            </div>
            <p className="mt-2 text-[0.7rem] text-cream/50 lg:mt-[0.6rem] lg:text-[0.95rem]">
              Shipping and taxes calculated at checkout.
            </p>

            <button
              type="button"
              onClick={startCheckout}
              className="btn-sweep mt-5 h-12 w-full rounded-full bg-lime text-[0.85rem] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:text-lime lg:mt-[1.6rem] lg:h-[3.6rem] lg:text-[1.15rem]"
            >
              Checkout
            </button>
            <button
              type="button"
              onClick={closeCart}
              className="tap mt-3 w-full text-[0.75rem] uppercase tracking-[0.18em] text-cream/60 transition-colors hover:text-lime lg:mt-[1rem] lg:text-[0.95rem]"
            >
              Continue shopping
            </button>
          </footer>
        )}
      </aside>
    </div>
  )
}
