import {
  Award,
  CalendarCheck,
  CalendarDays,
  Clock,
  Compass,
  MapPin,
  Ticket,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { events, registeredEventIds } from '../data/events'
import { student } from '../data/student'
import { getCategoryMeta } from '../lib/categories'
import { formatDay, formatEventDate, formatMonth } from '../lib/format'

const registeredEvents = registeredEventIds
  .map((id) => events.find((event) => event.id === id))
  .filter(Boolean)
  .sort((a, b) => a.date.localeCompare(b.date))

export default function MyEvents() {
  return (
    <div className="my-events">
      <PageHeader
        eyebrow="Your calendar"
        title="My events"
        description="Everything you're registered for this semester, in one tidy place."
        actions={
          <Button to="/events" variant="secondary" icon={Compass}>
            Find more events
          </Button>
        }
      />

      <section className="summary-grid" aria-label="Registration summary">
        <article className="summary-tile">
          <span className="summary-tile__icon summary-tile__icon--blue" aria-hidden="true">
            <Ticket size={20} />
          </span>
          <div>
            <p className="summary-tile__value">{registeredEvents.length}</p>
            <p className="summary-tile__label">Registered</p>
          </div>
        </article>
        <article className="summary-tile">
          <span className="summary-tile__icon summary-tile__icon--violet" aria-hidden="true">
            <CalendarCheck size={20} />
          </span>
          <div>
            <p className="summary-tile__value">1</p>
            <p className="summary-tile__label">This week</p>
          </div>
        </article>
        <article className="summary-tile">
          <span className="summary-tile__icon summary-tile__icon--amber" aria-hidden="true">
            <Award size={20} />
          </span>
          <div>
            <p className="summary-tile__value">{student.campusPoints}</p>
            <p className="summary-tile__label">Campus points</p>
          </div>
        </article>
      </section>

      <section className="ticket-section" aria-labelledby="registered-heading">
        <div className="section-header">
          <div className="section-header__text">
            <h2 id="registered-heading">Registered events</h2>
            <p>Show your campus ID at the venue to check in.</p>
          </div>
          <span className="ticket-section__count">{registeredEvents.length} confirmed</span>
        </div>

        <div className="ticket-list">
          {registeredEvents.map((event) => {
            const meta = getCategoryMeta(event.category)
            const Icon = meta.icon

            return (
              <article className="ticket" key={event.id}>
                <span
                  className="ticket__strip"
                  style={{ backgroundImage: meta.gradient }}
                  aria-hidden="true"
                />
                <span className="ticket__date" aria-hidden="true">
                  <strong>{formatDay(event.date)}</strong>
                  <span>{formatMonth(event.date)}</span>
                </span>

                <div className="ticket__body">
                  <div className="ticket__top">
                    <span className="ticket__category" style={{ color: meta.text }}>
                      <Icon size={14} aria-hidden="true" />
                      {event.category}
                    </span>
                    <Badge tone="green">Confirmed</Badge>
                  </div>
                  <h3 className="ticket__title">{event.title}</h3>
                  <div className="ticket__meta">
                    <span>
                      <CalendarDays size={14} aria-hidden="true" />
                      {formatEventDate(event.date)}
                    </span>
                    <span>
                      <Clock size={14} aria-hidden="true" />
                      {event.time}
                    </span>
                    <span>
                      <MapPin size={14} aria-hidden="true" />
                      {event.venue}
                    </span>
                  </div>
                </div>

                <div className="ticket__side">
                  <span className="ticket__code">Ticket · {event.id.slice(0, 6).toUpperCase()}</span>
                  <Link to="/events" className="ticket__link">
                    Event details
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="note-card">
        <span className="note-card__icon" aria-hidden="true">
          <Ticket size={20} />
        </span>
        <div>
          <h3>Need to change a registration?</h3>
          <p>
            Contact the event organizer from the event page. Registration and ticket
            management will be available inside CampusSphere soon.
          </p>
        </div>
      </section>
    </div>
  )
}
