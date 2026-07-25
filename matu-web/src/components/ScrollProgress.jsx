/** Hairline reading-progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent"
    >
      <div className="scroll-progress h-full w-full bg-lime" />
    </div>
  )
}
