/**
 * The MATU winged horse (`pegaso.svg`, the line-art version of the mark). Drawn
 * as a mask, like `Star`: the artwork ships with its own lime baked in, and the
 * mask normalises it to the site token so it matches the nav sitting above it.
 */
export default function Pegasus({ className = '', color = 'currentColor', label, style }) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
      className={`inline-block shrink-0 ${className}`}
      style={{
        backgroundColor: color,
        WebkitMaskImage: 'url(/img/pegaso.svg?v=2)',
        maskImage: 'url(/img/pegaso.svg?v=2)',
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
