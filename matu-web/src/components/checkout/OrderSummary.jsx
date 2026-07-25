import { useCart } from '../../context/CartContext'
import { money } from '../../data'

export default function OrderSummary({ shipping }) {
  const { items, subtotal } = useCart()
  const total = subtotal + (shipping ?? 0)

  return (
    <aside className="rounded-2xl bg-ink p-6 text-cream lg:rounded-[1.5rem] lg:p-[2.4rem]">
      <h2 className="text-[1.1rem] text-lime lg:text-[1.7rem]">Order summary</h2>

      <ul className="mt-5 divide-y divide-lime/15 lg:mt-[1.8rem]">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 py-4 lg:gap-[1.2rem] lg:py-[1.4rem]">
            <div className="relative flex size-[3.6rem] shrink-0 items-center justify-center rounded-lg bg-cream/5 lg:size-[5rem]">
              <img src={item.image} alt="" className="max-h-[74%] w-auto object-contain" />
              <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-lime text-[0.6rem] tabular-nums text-ink lg:size-[1.6rem] lg:text-[0.85rem]">
                {item.qty}
              </span>
            </div>
            <span className="min-w-0 flex-1 truncate text-[0.85rem] lg:text-[1.2rem]">
              {item.name}
            </span>
            <span className="shrink-0 text-[0.85rem] text-lime lg:text-[1.15rem]">
              {money(item.total)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="mt-5 space-y-3 border-t border-lime/20 pt-5 text-[0.85rem] lg:mt-[1.8rem] lg:space-y-[0.9rem] lg:pt-[1.8rem] lg:text-[1.15rem]">
        <div className="flex justify-between">
          <dt className="text-cream/70">Subtotal</dt>
          <dd>{money(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-cream/70">Shipping</dt>
          <dd>{shipping === null ? '—' : shipping === 0 ? 'Free' : money(shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-lime/20 pt-3 text-[1.05rem] text-lime lg:pt-[1.1rem] lg:text-[1.5rem]">
          <dt>Total</dt>
          <dd>{money(total)}</dd>
        </div>
      </dl>
    </aside>
  )
}
