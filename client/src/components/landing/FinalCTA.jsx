import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CampusImage from '../media/CampusImage'
import { campusImages } from '../../data/campus'
import Reveal from './Reveal'

export default function FinalCTA() {
  return (
    <section className="lp-cta" aria-labelledby="lp-cta-heading">
      <div className="lp-cta__media" aria-hidden="true">
        <CampusImage image={campusImages.aerial} sizes="100vw" />
      </div>
      <div className="lp-cta__overlay" aria-hidden="true" />
      <Reveal className="lp-container lp-cta__inner">
        <p className="lp-kicker lp-kicker--light">Your campus is waiting</p>
        <h2 id="lp-cta-heading">
          The next thing you remember
          <br />
          starts with showing up.
        </h2>
        <p>
          Create your student account to discover events, check eligibility and keep every
          opportunity in one place.
        </p>
        <div className="lp-cta__actions">
          <Link to="/signup" className="lp-btn lp-btn--primary lp-btn--lg">
            Create an Account
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/login" className="lp-btn lp-btn--glass lp-btn--lg">
            I already have an account
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
