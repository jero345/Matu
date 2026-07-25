/**
 * The MATU wordmark painted through a mask, so it can be ink on cream as well as
 * the lime version the artboard uses on dark backgrounds.
 */
export default function Wordmark({ className = '', color = 'var(--color-ink)', label = 'MATU' }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`block ${className}`}
      style={{
        aspectRatio: '2561 / 589',
        backgroundColor: color,
        WebkitMaskImage: 'url(/img/logo.webp)',
        maskImage: 'url(/img/logo.webp)',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  )
}
