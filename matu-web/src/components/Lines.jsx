import { Fragment } from 'react'

/**
 * Renders copy with the exact line breaks used in the artboard on desktop,
 * while letting it reflow naturally on small screens.
 */
export default function Lines({ lines }) {
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && (
        <>
          {' '}
          <br className="hidden lg:inline" />
        </>
      )}
      {line}
    </Fragment>
  ))
}
