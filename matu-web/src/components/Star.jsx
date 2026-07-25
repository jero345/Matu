/**
 * The MATU sunburst (recursos/SOL.webp) drawn as a mask so it can take any
 * colour: dark on the lime bands, lime inside the dark green frames.
 */
export default function Star({ className = '', color = 'currentColor', style }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      style={{
        backgroundColor: color,
        WebkitMaskImage: 'url(/img/sol.webp)',
        maskImage: 'url(/img/sol.webp)',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        ...style,
      }}
    />
  )
}
