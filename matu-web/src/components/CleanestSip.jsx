import SplitLines from './SplitLines'
import Product360 from './Product360'
import { frames } from '../lib/frames'

const HEAD = ['The cleanest', 'sip from soil', 'to straw.']
const BODY = [
  'Nature’s cleanest coffee alternative, regeneratively',
  'grown in Argentina’s Atlantic Rainforest for',
  'longlasting energy without the crash.',
]

export default function CleanestSip() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-ink px-6 py-20 lg:h-[67.5rem] lg:px-0 lg:py-0">
      {/* the ornate frame is drawn into the plate and lines up with the section
          edges, so this one stays put — the motion lives in the type and cans */}
      <img
        src="/img/fondo2.webp"
        alt=""
        className="absolute inset-0 -z-10 size-full scale-[1.9] object-cover lg:scale-100"
      />

      <SplitLines
        as="h2"
        lines={HEAD}
        step={125}
        className="relative z-10 max-w-[9ch] text-[clamp(3.25rem,9vw,7.5rem)] leading-[0.86] text-lime lg:absolute lg:left-[13.7563rem] lg:top-[12.1947rem] lg:max-w-none lg:text-[10.575rem] lg:leading-[8.925rem] lg:tracking-[-0.002em]"
      />

      <SplitLines
        as="p"
        lines={BODY}
        delay={260}
        step={90}
        className="relative z-10 mt-8 max-w-[34ch] text-[clamp(1.05rem,2vw,1.5rem)] leading-[1.35] text-white lg:absolute lg:left-[14.1563rem] lg:top-[42.1632rem] lg:mt-0 lg:max-w-none lg:text-[2.575rem] lg:leading-[2.6875rem]"
      />

      {/* three nested wrappers on purpose: the scroll parallax, the entrance and
          the idle drift each own a transform and would otherwise fight */}
      <div
        data-parallax="-86"
        className="parallax relative z-0 mx-auto mt-10 w-[78%] lg:absolute lg:left-[65.32rem] lg:top-[-3.4625rem] lg:mt-0 lg:w-[67.72rem] lg:max-w-none"
      >
        <div data-reveal="enter-right" style={{ '--d': '240ms' }}>
          <div className="drift-slow">
            <Product360
              frames={frames('can')}
              fallback="/img/tin-can.webp"
              alt="MATU yerba mate tin cans"
              className="w-full"
              imgClassName="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
