import { useState } from 'react'
import { Check, GraduationCap, Sparkles, UsersRound } from 'lucide-react'
import { events } from '../../data/events'
import { formatEventDate } from '../../lib/format'
import Reveal from './Reveal'

const demos = [
  {
    eventId: 'ai-ml-workshop',
    score: 98,
    signal: 'AI/ML · Python · CSE',
    reasons: [
      'Matches your Computer Science department',
      'You follow the Coding Club',
      'Fits your interest in AI and machine learning',
      'Beginner-friendly, so no prior project needed',
    ],
  },
  {
    eventId: 'campus-photography-walk',
    score: 89,
    signal: 'Photography · Arts · Mornings',
    reasons: [
      'Aligns with your Photography Society membership',
      'Open to all departments and academic years',
      'Matches your interest in visual storytelling',
      'Fits your free Wednesday morning',
    ],
  },
]

const recommendations = demos.map((demo) => ({
  ...demo,
  event: events.find((event) => event.id === demo.eventId),
}))

export default function RecommendationShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = recommendations[activeIndex]

  return (
    <section id="recommendations" className="lp-section lp-reco">
      <div className="lp-container lp-reco__grid">
        <Reveal className="lp-reco__copy">
          <p className="lp-kicker lp-kicker--light">Personalized, not mysterious</p>
          <h2>Recommendations that show their work.</h2>
          <p className="lp-reco__lede">
            Every suggestion comes with the reason it was made — your department, your year,
            the clubs you follow and the things you actually care about.
          </p>

          <div className="lp-reco__signals">
            <span>
              <GraduationCap size={16} aria-hidden="true" />
              Department &amp; year
            </span>
            <span>
              <Sparkles size={16} aria-hidden="true" />
              Interests
            </span>
            <span>
              <UsersRound size={16} aria-hidden="true" />
              Clubs you follow
            </span>
          </div>

          <p className="lp-reco__note">
            No black box. If a match does not make sense, you can see exactly which signals
            shaped it.
          </p>
        </Reveal>

        <Reveal className="lp-reco__panel" delay={0.08}>
          <div className="lp-reco__profile">
            <div>
              <p className="lp-reco__profile-name">Aarav Rao</p>
              <p className="lp-reco__profile-meta">3rd year · Computer Science · GAT</p>
            </div>
            <span className="lp-reco__live">
              <span aria-hidden="true" />
              Live demo
            </span>
          </div>

          <div
            className="lp-reco__tabs"
            role="group"
            aria-label="Choose a recommendation to inspect"
          >
            {recommendations.map((item, index) => (
              <button
                key={item.event.id}
                type="button"
                className={`lp-reco__tab ${index === activeIndex ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
              >
                {item.event.category}
              </button>
            ))}
          </div>

          <div className="lp-reco__card">
            <div className="lp-reco__card-top">
              <div>
                <p className="lp-reco__event-meta">
                  {active.event.category} · {formatEventDate(active.event.date)}
                </p>
                <h3>{active.event.title}</h3>
                <p className="lp-reco__event-venue">{active.event.venue}</p>
              </div>
              <div
                className="lp-reco__score"
                style={{ '--score': active.score }}
                role="img"
                aria-label={`${active.score} percent match`}
              >
                <span>{active.score}%</span>
                <small>match</small>
              </div>
            </div>

            <p className="lp-reco__why">Why you are seeing this</p>
            <ul className="lp-reco__reasons">
              {active.reasons.map((reason) => (
                <li key={reason}>
                  <span aria-hidden="true">
                    <Check size={13} />
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
            <p className="lp-reco__signal">Based on {active.signal}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
