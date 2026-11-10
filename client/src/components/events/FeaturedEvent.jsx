import { ArrowRight, CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getCategoryMeta } from '../../lib/categories'
import { formatEventDate, formatMonth, formatDay, getInitials } from '../../lib/format'
import Button from '../ui/Button'

export function FeaturedEventMain({ event }) {
  const meta = getCategoryMeta(event.category)
  const Icon = meta.icon
  const filled = Math.min(100, Math.round((event.attendees / event.capacity) * 100))

  return (
    <article className="featured-main">
      <div className="featured-main__cover" style={{ backgroundImage: meta.gradient }}>
        <span className="cover-pattern" aria-hidden="true" />
        <Icon className="cover-icon" size={210} strokeWidth={0.7} aria-hidden="true" />

        <span className="category-chip category-chip--light">{event.category}</span>
        <span className="featured-main__flag">Flagship event</span>

        <div className="featured-main__date">
          <CalendarDays size={17} aria-hidden="true" />
          <span>
            {formatEventDate(event.date)}
            {event.endDate ? ` – ${formatEventDate(event.endDate)}` : ''}
          </span>
        </div>
      </div>

      <div className="featured-main__body">
        <h3>{event.title}</h3>
        <p className="featured-main__description">{event.description}</p>

        <ul className="event-meta">
          <li>
            <Clock size={15} aria-hidden="true" />
            {event.time}
          </li>
          <li>
            <MapPin size={15} aria-hidden="true" />
            {event.venue}
          </li>
          <li>
            <Users size={15} aria-hidden="true" />
            {event.attendees.toLocaleString('en-IN')} attending
          </li>
        </ul>

        <div className="capacity">
          <div className="capacity__labels">
            <span>{filled}% of seats filled</span>
            <span>
              {event.capacity - event.attendees} spots left
            </span>
          </div>
          <div
            className="capacity__track"
            role="progressbar"
            aria-valuenow={filled}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Seats filled"
          >
            <span className="capacity__fill" style={{ width: `${filled}%` }} />
          </div>
        </div>

        <div className="featured-main__footer">
          <span className="organizer">
            <span className="organizer__avatar" aria-hidden="true">
              {getInitials(event.organizer)}
            </span>
            <span>
              <span className="organizer__by">Organised by</span>
              <span className="organizer__name">{event.organizer}</span>
            </span>
          </span>
          <Button to="/events" variant="primary" size="sm" icon={ArrowRight}>
            Explore events
          </Button>
        </div>
      </div>
    </article>
  )
}

export function FeaturedEventMini({ event }) {
  const meta = getCategoryMeta(event.category)
  const Icon = meta.icon

  return (
    <Link to="/events" className="featured-mini">
      <div className="featured-mini__cover" style={{ backgroundImage: meta.gradient }}>
        <span className="cover-pattern" aria-hidden="true" />
        <Icon size={86} strokeWidth={0.9} aria-hidden="true" />
        <span className="featured-mini__date">
          <strong>{formatDay(event.date)}</strong>
          {formatMonth(event.date)}
        </span>
      </div>
      <div className="featured-mini__body">
        <span className="featured-mini__category" style={{ color: meta.text }}>
          {event.category}
        </span>
        <h3>{event.title}</h3>
        <p className="featured-mini__meta">
          <Clock size={14} aria-hidden="true" />
          {event.time}
        </p>
        <p className="featured-mini__meta">
          <MapPin size={14} aria-hidden="true" />
          {event.venue}
        </p>
      </div>
      <ArrowRight className="featured-mini__arrow" size={18} aria-hidden="true" />
    </Link>
  )
}
