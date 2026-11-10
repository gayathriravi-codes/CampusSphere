import { ArrowUpRight, Clock, MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getCategoryMeta } from '../../lib/categories'
import { formatDay, formatMonth, getRelativeDay } from '../../lib/format'

export default function UpcomingRow({ event }) {
  const meta = getCategoryMeta(event.category)

  return (
    <Link to="/events" className="upcoming-row">
      <span className="upcoming-row__date" aria-hidden="true">
        <strong>{formatDay(event.date)}</strong>
        <span>{formatMonth(event.date)}</span>
      </span>

      <span className="upcoming-row__info">
        <span className="upcoming-row__top">
          <span
            className="category-dot"
            style={{ backgroundColor: meta.text }}
            aria-hidden="true"
          />
          <span className="upcoming-row__category">{event.category}</span>
          <span className="upcoming-row__when">{getRelativeDay(event.date)}</span>
        </span>
        <span className="upcoming-row__title">{event.title}</span>
        <span className="upcoming-row__details">
          <span>
            <Clock size={14} aria-hidden="true" />
            {event.time}
          </span>
          <span>
            <MapPin size={14} aria-hidden="true" />
            {event.venue}
          </span>
        </span>
      </span>

      <span className="upcoming-row__attendees">
        <Users size={15} aria-hidden="true" />
        {event.attendees.toLocaleString('en-IN')}
      </span>

      <span className="upcoming-row__arrow" aria-hidden="true">
        <ArrowUpRight size={18} />
      </span>
    </Link>
  )
}
