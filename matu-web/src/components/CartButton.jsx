import { useCart } from '../context/CartContext'

/** Bag control in the header. Sits outside the measured nav so the artboard
 *  spacing of the links is untouched. */
export default function CartButton({ className = '' }) {
  const { count, openCart } = useCart()

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={count ? `Bag, ${count} items` : 'Bag, empty'}
      className={`pointer-events-auto relative block text-lime transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.08] ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="block size-[1.45rem] lg:size-[2.15rem]"
      >
        <path
          d="M3.7 7h16.6l-1.25 13.3a1.75 1.75 0 0 1-1.74 1.6H6.69a1.75 1.75 0 0 1-1.74-1.6L3.7 7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8.45 9.5V6.15a3.55 3.55 0 1 1 7.1 0V9.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <span
        aria-hidden="true"
        className={`absolute -right-[0.45rem] -top-[0.35rem] grid min-w-[1.05rem] place-items-center rounded-full bg-lime px-1 font-geo text-[0.6rem] leading-[1.05rem] tabular-nums text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:-right-[0.7rem] lg:-top-[0.5rem] lg:min-w-[1.5rem] lg:px-[0.25rem] lg:text-[0.85rem] lg:leading-[1.5rem] ${
          count ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        {count}
      </span>
    </button>
  )
}
