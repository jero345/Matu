import { Fragment } from 'react'

/**
 * Headline split into masked lines. On desktop each line is its own clipped
 * block whose text slides up into place with a stagger; below `lg` the lines
 * stay inline so the copy reflows naturally.
 *
 * The mask uses padding + a cancelling negative margin, so the headline keeps
 * the exact position measured off the artboard.
 */
export default function SplitLines({
  lines,
  as: Tag = 'span',
  className = '',
  delay = 0,
  step = 110,
  reveal = 'lines',
  ...rest
}) {
  return (
    <Tag className={`has-lines ${className}`} data-reveal={reveal} {...rest}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          <span className="rline" style={{ '--d': `${delay + i * step}ms` }}>
            <span>{line}</span>
          </span>
          {i < lines.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
