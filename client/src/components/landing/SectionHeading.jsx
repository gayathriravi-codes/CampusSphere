import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export default function SectionHeading({
  kicker,
  title,
  lede,
  actionLabel,
  actionTo,
  align = 'left',
  tone = 'dark',
}) {
  return (
    <Reveal className={`lp-heading lp-heading--${align} lp-heading--${tone}`}>
      <div className="lp-heading__text">
        {kicker && <p className="lp-kicker">{kicker}</p>}
        <h2>{title}</h2>
        {lede && <p className="lp-heading__lede">{lede}</p>}
      </div>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="lp-text-link">
          {actionLabel}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </Reveal>
  )
}
