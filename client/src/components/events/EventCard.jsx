import { Bookmark, CalendarDays, MapPin, Sparkles, Users } from 'lucide-react'
import { useState } from 'react'
import { getCategoryMeta } from '../../lib/categories'
import { formatEventDate, getInitials } from '../../lib/format'

export default function EventCard({ event }) {
  const [saved, setSaved] = useState(false)
  const meta = getCategoryMeta(event.category)
  const Icon = meta.icon

  return (
    <article className="event-card">
      <div className="event-card__cover" style={{ backgroundImage: meta.gradient }}>
        <span className="cover-pattern" aria-hidden="true" />
        <Icon className="cover-icon" size={124} strokeWidth={0.9} aria-hidden="true" />
        <span
          className="category-chip"
          style={{ backgroundColor: meta.soft, color: meta.text }}
        >
          {event.category}
        </span>
        <button
          type="button"
          className={`save-button ${saved ? 'is-saved' : ''}`}
          onClick={() => setSaved((value) => !value)}
          aria-label={saved ? `Remove ${event.title} from saved events` : `Save ${event.title}`}
          aria-pressed={saved}
        >
          <Bookmark size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="event-card__body">
        {event.match && (
          <span className="match-chip">
            <Sparkles size={13} aria-hidden="true" />
            {event.match}% match
          </span>
        )}

        <p className="event-card__date">
          <CalendarDays size={15} aria-hidden="true" />
          {formatEventDate(event.date)} · {event.time}
        </p>

        <h3 className="event-card__title">{event.title}</h3>

        <p className="event-card__venue">
          <MapPin size={15} aria-hidden="true" />
          <span>
            {event.venue} <span className="dot">·</span> {event.mode}
          </span>
        </p>

        <div className="event-card__footer">
          <span className="organizer">
            <span className="organizer__avatar" aria-hidden="true">
              {getInitials(event.organizer)}
            </span>
            <span className="organizer__name">{event.organizer}</span>
          </span>
          <span className="attendee-count">
            <Users size={14} aria-hidden="true" />
            {event.attendees.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </article>
  )
}
