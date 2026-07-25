/** Underlined input in the MATU register: label sits above, the rule fills on focus. */
export default function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
  className = '',
  children,
}) {
  const id = `co-${name}`
  return (
    <label htmlFor={id} className={`group/field block ${className}`}>
      <span className="block text-[0.62rem] uppercase tracking-[0.16em] text-ink/60 lg:text-[0.9rem]">
        {label}
      </span>

      <span className="relative mt-2 block lg:mt-[0.7rem]">
        {children ?? (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            autoComplete={autoComplete}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-err` : undefined}
            className="peer w-full bg-transparent pb-2 text-[0.95rem] outline-none lg:pb-[0.7rem] lg:text-[1.3rem]"
          />
        )}
        <span
          className={`absolute inset-x-0 bottom-0 h-px ${error ? 'bg-red-700/70' : 'bg-ink/30'}`}
        />
        <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100" />
      </span>

      {error && (
        <span
          id={`${id}-err`}
          className="mt-2 block text-[0.68rem] text-red-800 lg:mt-[0.5rem] lg:text-[0.95rem]"
        >
          {error}
        </span>
      )}
    </label>
  )
}
