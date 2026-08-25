/**
 * The PROTECT THE WILD cross label, straight from `recursos/CRUZ MATU nueva.svg`.
 * The artwork is pure vector — the cream gap between the outer rule and the
 * body is transparent, so it picks up whatever the section behind it is.
 */
export default function ProtectBadge({ className = '' }) {
  return (
    <img
      src="/img/cruz-matu.svg?v=2"
      alt="Est. 2025 — Protect the wild, drink MATU"
      className={`w-[16rem] lg:w-[33.4375rem] lg:max-w-none ${className}`}
    />
  )
}
