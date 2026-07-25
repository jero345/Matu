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
      className={`link-underline pointer-events-auto flex items-center gap-2 text-lime transition-opacity hover:opacity-80 lg:gap-[0.55rem] lg:text-[1.8125rem] ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="size-[1.15rem] lg:size-[1.6rem]"
      >
        <path
          d="M4.5 7.5h15l-1.2 12a1.5 1.5 0 0 1-1.5 1.35H7.2a1.5 1.5 0 0 1-1.5-1.35L4.5 7.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8.75 9.5V6.75a3.25 3.25 0 1 1 6.5 0V9.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="tabular-nums">{count}</span>
    </button>
  )
}
