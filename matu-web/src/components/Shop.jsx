import SplitLines from './SplitLines'
import { PRODUCTS } from '../data'

const SUB = [
  'Agro-ecological, 100% Argentine yerba mate',
  'and the tools designed to brew it your way.',
]

export default function Shop() {
  return (
    <section
      id="shop"
      className="relative w-full bg-lime px-6 py-16 text-ink lg:h-[67.5rem] lg:px-0 lg:py-0"
    >
      <SplitLines
        as="h2"
        lines={['BUILD YOUR RITUAL']}
        className="text-center text-[2.5rem] leading-none tracking-[0.009em] lg:absolute lg:inset-x-0 lg:top-[3.7183rem] lg:text-[9.8875rem]"
      />

      <SplitLines
        as="p"
        lines={SUB}
        delay={220}
        step={80}
        className="mt-4 text-center text-[1rem] leading-[1.3] lg:absolute lg:inset-x-0 lg:top-[16.4915rem] lg:mt-0 lg:text-[2.1063rem] lg:leading-[2.1938rem]"
      />

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:absolute lg:left-[11.625rem] lg:top-[23.9375rem] lg:mt-0 lg:flex lg:gap-[3.229rem]">
        {PRODUCTS.map((product, i) => (
          <article
            key={product.name}
            data-reveal="up"
            style={{ '--d': `${i * 110}ms` }}
            className="group relative flex flex-col lg:block lg:h-[36.125rem] lg:w-[22.375rem]"
          >
            <div className="relative aspect-[358/411] overflow-hidden rounded-2xl bg-ink transition-[border-radius] duration-700 group-hover:rounded-[2.5rem] lg:h-[25.6875rem] lg:w-full lg:rounded-[1.5rem] lg:group-hover:rounded-[2.6rem]">
              <img
                src={product.image}
                alt={product.alt}
                loading="lazy"
                className="absolute left-1/2 top-1/2 max-h-[78%] w-auto -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07] lg:left-[var(--l)] lg:top-[var(--t)] lg:max-h-none lg:w-[var(--w)] lg:max-w-none lg:translate-x-0 lg:translate-y-0 lg:group-hover:-translate-y-[1.1rem] lg:group-hover:scale-[1.05]"
                style={{
                  '--l': product.img.left,
                  '--t': product.img.top,
                  '--w': product.img.width,
                }}
              />
            </div>

            <div className="mt-3 flex items-baseline justify-between text-[0.6rem] tracking-[0.02em] lg:absolute lg:inset-x-0 lg:top-[27.6796rem] lg:mt-0 lg:text-[0.95rem] lg:leading-[1.14rem]">
              <span>{product.category}</span>
              <span>{product.kind}</span>
            </div>

            <div className="mt-1 flex items-baseline justify-between gap-2 lg:absolute lg:inset-x-0 lg:top-[30.3741rem] lg:mt-0">
              <h3 className="text-[0.8rem] lg:text-[1.2937rem] lg:leading-[1.5525rem]">
                {product.name}
              </h3>
              <span className="shrink-0 text-[0.7rem] lg:text-[1.0938rem] lg:leading-[1.3125rem]">
                {product.price}
              </span>
            </div>

            <button
              type="button"
              className="btn-sweep mt-auto h-9 w-full shrink-0 rounded-full border border-ink text-[0.7rem] transition-colors duration-500 hover:text-lime lg:absolute lg:inset-x-0 lg:top-[33.2625rem] lg:mt-0 lg:h-[2.85rem] lg:text-[1.35rem]"
            >
              ADD TO BAG
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
