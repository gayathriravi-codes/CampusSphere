import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import CampusImage from '../media/CampusImage'
import Brand from '../ui/Brand'

export default function AuthShell({
  image,
  imageClassName = '',
  quote,
  attribution,
  children,
}) {
  return (
    <div className="auth-page">
      <a className="auth-skip" href="#auth-main">
        Skip to content
      </a>

      <main id="auth-main" className="auth-page__panel" tabIndex={-1}>
        <div className="auth-page__top">
          <Brand />
          <Link to="/" className="auth-page__back">
            <ArrowLeft size={15} aria-hidden="true" />
            Back to campus
          </Link>
        </div>

        <div className="auth-page__body">{children}</div>

        <p className="auth-page__fineprint">
          CampusSphere · Global Academy of Technology
        </p>
      </main>

      <aside
        className={`auth-page__media ${imageClassName}`.trim()}
        aria-hidden="true"
      >
        <CampusImage image={image} sizes="(min-width: 860px) 50vw, 100vw" priority />
        <div className="auth-page__veil" />
        <div className="auth-page__media-copy">
          <p className="auth-page__place">GAT · Bengaluru</p>
          {quote && <blockquote>{quote}</blockquote>}
          {attribution && <p className="auth-page__attribution">{attribution}</p>}
        </div>
      </aside>
    </div>
  )
}
