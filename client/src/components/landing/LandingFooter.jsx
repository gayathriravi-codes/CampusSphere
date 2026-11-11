import { Link } from 'react-router-dom'
import Brand from '../ui/Brand'
import { college } from '../../data/campus'

export default function LandingFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-footer__top">
          <div className="lp-footer__brand">
            <Brand className="lp-footer__logo" />
            <p>
              {college.name}
              <br />
              {college.city}, India
            </p>
          </div>

          <div className="lp-footer__col">
            <p className="lp-footer__label">Platform</p>
            <a href="#explore">Explore opportunities</a>
            <a href="#features">How it works</a>
            <a href="#recommendations">Recommendations</a>
            <a href="#campus">Campus life</a>
          </div>

          <div className="lp-footer__col">
            <p className="lp-footer__label">Students</p>
            <Link to="/signup">Create an account</Link>
            <Link to="/login">Log in</Link>
            <Link to="/events">Event catalogue</Link>
            <Link to="/profile">Student profile</Link>
          </div>

          <div className="lp-footer__col">
            <p className="lp-footer__label">Campus</p>
            <span>Student affairs</span>
            <span>Clubs &amp; societies</span>
            <span>Academic calendar</span>
            <span>{college.emailDomain}</span>
          </div>
        </div>

        <div className="lp-footer__bottom">
          <span>© 2026 CampusSphere · Student portal</span>
          <span>Built for campus life at {college.name}</span>
        </div>
      </div>
    </footer>
  )
}
