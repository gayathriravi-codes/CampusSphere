export default function Avatar({ name, initials, size = 'md', className = '' }) {
  const label =
    initials ||
    (name
      ? name
          .split(' ')
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0])
          .join('')
          .toUpperCase()
      : '?')

  return (
    <span
      className={`avatar avatar--${size} ${className}`.trim()}
      title={name}
      aria-hidden="true"
    >
      {label}
    </span>
  )
}
