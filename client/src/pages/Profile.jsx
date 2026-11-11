import { ArrowRight, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthShell from '../components/auth/AuthShell'
import { campusImages } from '../data/campus'

export default function Profile() {
  return (
    <AuthShell
      image={campusImages.courtyard}
      imageClassName="auth-page__media--portrait"
      quote="One account for the opportunities you will remember."
      attribution="Student profile · Global Academy of Technology"
    >
      <div className="auth-status">
        <span className="auth-status__icon" aria-hidden="true">
          <LockKeyhole size={22} />
        </span>
        <p className="auth-kicker">Student profile</p>
        <h1 className="auth-title">Profiles open after sign-in.</h1>
        <p className="auth-lede">
          Authentication is still being connected. Until then, this page is a placeholder
          and no profile data is being shown or saved.
        </p>
        <div className="auth-status__actions">
          <Link to="/login" className="lp-btn lp-btn--primary auth-submit">
            Log in
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link to="/signup" className="lp-btn auth-btn--outline">
            Create an account
          </Link>
        </div>
        <p className="auth-status__note">
          Once authentication is live, this page will hold your details, registrations
          and saved opportunities.
        </p>
      </div>
    </AuthShell>
  )
}
