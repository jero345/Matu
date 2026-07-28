/**
 * The MATU winged horse, lifted out of `CRUZ MATU.svg` into `pegaso.svg` so the
 * mark can stand on its own. Drawn as a mask, like `Star`, so it takes any
 * colour instead of shipping one file per background.
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
        WebkitMaskImage: 'url(/img/pegaso.svg)',
        maskImage: 'url(/img/pegaso.svg)',
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
