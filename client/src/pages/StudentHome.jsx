import {
  Bookmark,
  CalendarDays,
  Compass,
  Sparkles,
  Ticket,
  UsersRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import EventGrid from '../components/events/EventGrid'
import {
  FeaturedEventMain,
  FeaturedEventMini,
} from '../components/events/FeaturedEvent'
import SectionHeader from '../components/events/SectionHeader'
import UpcomingRow from '../components/events/UpcomingRow'
import Button from '../components/ui/Button'
import {
  featuredEvents,
  recommendedEvents,
  upcomingEvents,
} from '../data/events'
import { student } from '../data/student'
import {
  formatDay,
  formatMonth,
  getGreeting,
  getRelativeDay,
} from '../lib/format'

const stats = [
  {
    label: 'Events registered',
    value: student.registeredCount,
    hint: 'This semester',
    icon: Ticket,
    tone: 'blue',
  },
  {
    label: 'Saved events',
    value: student.savedCount,
    hint: 'On your watchlist',
    icon: Bookmark,
    tone: 'violet',
  },
  {
    label: 'Campus points',
    value: student.campusPoints,
    hint: 'Top 15% of your batch',
    icon: Sparkles,
    tone: 'amber',
  },
  {
    label: 'Clubs followed',
    value: student.clubs.length,
    hint: student.clubs.join(', '),
    icon: UsersRound,
    tone: 'sky',
  },
]

export default function StudentHome() {
  const highlight = featuredEvents.find((event) => event.highlight) || featuredEvents[0]
  const secondaryFeatured = featuredEvents.filter((event) => event.id !== highlight.id)
  const nextEvent = upcomingEvents[0]

  return (
    <div className="home">
      <section className="hero" aria-labelledby="welcome-heading">
        <span className="hero__orb hero__orb--one" aria-hidden="true" />
        <span className="hero__orb hero__orb--two" aria-hidden="true" />

        <div className="hero__content">
          <span className="hero__eyebrow">
            <span className="hero__pulse" aria-hidden="true" />
            Spring semester 2026 · Week 11
          </span>
          <h1 id="welcome-heading" className="hero__title">
            {getGreeting()}, {student.firstName}{' '}
            <span className="hero__wave" aria-hidden="true">
              👋
            </span>
          </h1>
          <p className="hero__copy">
            You have {student.registeredCount} events on your calendar this week. Your next
            one, <strong>{nextEvent.title}</strong>, starts{' '}
            {getRelativeDay(nextEvent.date).toLowerCase()}.
          </p>
          <div className="hero__actions">
            <Button to="/events" variant="light" icon={Compass}>
              Discover events
            </Button>
            <Button to="/my-events" variant="ghost">
              My schedule
            </Button>
          </div>
        </div>

        <aside className="hero__aside" aria-label="Next event">
          <p className="hero__aside-label">Next up</p>
          <div className="hero__next">
            <span className="hero__next-date" aria-hidden="true">
              <strong>{formatDay(nextEvent.date)}</strong>
              <span>{formatMonth(nextEvent.date)}</span>
            </span>
            <div>
              <p className="hero__next-category">{nextEvent.category}</p>
              <p className="hero__next-title">{nextEvent.title}</p>
              <p className="hero__next-meta">{nextEvent.time}</p>
              <p className="hero__next-meta">{nextEvent.venue}</p>
            </div>
          </div>
          <Link to="/my-events" className="hero__aside-link">
            <CalendarDays size={15} aria-hidden="true" />
            View full schedule
          </Link>
        </aside>
      </section>

      <section className="stats-grid" aria-label="Your campus summary">
        {stats.map(({ label, value, hint, icon: Icon, tone }) => (
          <article className="stat-card" key={label}>
            <span className={`stat-card__icon stat-card__icon--${tone}`} aria-hidden="true">
              <Icon size={20} strokeWidth={2} />
            </span>
            <div className="stat-card__text">
              <p className="stat-card__value">{value}</p>
              <p className="stat-card__label">{label}</p>
              <p className="stat-card__hint">{hint}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="section">
        <SectionHeader
          title="Featured this week"
          subtitle="Handpicked highlights from across campus"
          actionLabel="View all events"
          actionTo="/events"
        />
        <div className="featured-layout">
          <FeaturedEventMain event={highlight} />
          <div className="featured-side">
            {secondaryFeatured.map((event) => (
              <FeaturedEventMini key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeader
          title="Upcoming events"
          subtitle="The next few things worth showing up for"
          actionLabel="See all events"
          actionTo="/events"
        />
        <div className="upcoming-list">
          {upcomingEvents.map((event) => (
            <UpcomingRow key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          title="Recommended for you"
          subtitle="Based on your interests in technology, photography and startups"
          actionLabel="Browse opportunities"
          actionTo="/events"
        />
        <EventGrid events={recommendedEvents} />
      </section>
    </div>
  )
}
