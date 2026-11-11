import { ArrowUpRight, CalendarDays, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { events, featuredEvents } from '../../data/events'
import { categories, getCategoryMeta } from '../../lib/categories'
import { formatEventDate } from '../../lib/format'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const featured = featuredEvents.slice(0, 3)
const landingCategories = categories.slice(0, 6)

export default function ExploreOpportunities() {
  return (
    <section id="explore" className="lp-section lp-explore">
      <div className="lp-container">
        <SectionHeading
          kicker="Explore opportunities"
          title="There is more happening than you think."
          lede="A first look at what is on campus this month. Sign in to see eligibility, seats and everything else."
          actionLabel="See all events"
          actionTo="/events"
        />

        <div className="lp-event-grid">
          {featured.map((event, index) => {
            const meta = getCategoryMeta(event.category)
            const Icon = meta.icon
            return (
              <Reveal key={event.id} delay={index * 0.07} className="lp-event-shell">
                <Link to="/events" className="lp-event">
                  <div className="lp-event__cover" style={{ backgroundImage: meta.gradient }}>
                    <span className="lp-event__pattern" aria-hidden="true" />
                    <Icon className="lp-event__icon" size={132} strokeWidth={0.7} aria-hidden="true" />
                    <span className="lp-event__category" style={{ color: meta.text }}>
                      {event.category}
                    </span>
                    <span className="lp-event__match">
                      <Sparkles size={13} aria-hidden="true" />
                      {event.match}% match
                    </span>
                  </div>
                  <div className="lp-event__body">
                    <p className="lp-event__date">
                      <CalendarDays size={14} aria-hidden="true" />
                      {formatEventDate(event.date)} · {event.time}
                    </p>
                    <h3>{event.title}</h3>
                    <p className="lp-event__venue">
                      <MapPin size={14} aria-hidden="true" />
                      {event.venue}
                    </p>
                    <span className="lp-event__link">
                      View opportunity
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="lp-categories">
          {landingCategories.map((category) => {
            const meta = getCategoryMeta(category)
            const Icon = meta.icon
            const count = events.filter((event) => event.category === category).length
            return (
              <Link
                key={category}
                to={`/events?category=${encodeURIComponent(category)}`}
                className="lp-category"
              >
                <span
                  className="lp-category__icon"
                  style={{ backgroundImage: meta.gradient }}
                  aria-hidden="true"
                >
                  <Icon size={18} />
                </span>
                <span className="lp-category__name">{category}</span>
                <span className="lp-category__count">
                  {count ? `${count} ${count === 1 ? 'event' : 'events'}` : 'Explore'}
                </span>
                <ArrowUpRight className="lp-category__arrow" size={15} aria-hidden="true" />
              </Link>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
