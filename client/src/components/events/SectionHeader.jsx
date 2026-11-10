import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SectionHeader({ title, subtitle, actionLabel, actionTo }) {
  return (
    <div className="section-header">
      <div className="section-header__text">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="text-link">
          {actionLabel}
          <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
