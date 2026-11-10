export default function Badge({ children, tone = 'blue', className = '', style }) {
  return (
    <span className={`badge badge--${tone} ${className}`.trim()} style={style}>
      {children}
    </span>
  )
}
