import {
  CalendarDays,
  ChevronRight,
  Compass,
  LayoutDashboard,
  Sparkles,
  Ticket,
  X,
} from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'
import { student } from '../../data/student'
import Avatar from '../ui/Avatar'
import Brand from '../ui/Brand'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/events', label: 'Discover Events', icon: Compass },
  { to: '/my-events', label: 'My Events', icon: Ticket, count: student.registeredCount },
]

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`sidebar ${open ? 'is-open' : ''}`} aria-label="Sidebar">
      <div className="sidebar__top">
        <Brand showTagline />
        <button
          type="button"
          className="sidebar__close"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        <p className="sidebar__label">Menu</p>
        {navItems.map(({ to, label, icon: Icon, end, count }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}
            onClick={onClose}
          >
            <span className="nav-item__icon">
              <Icon size={19} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="nav-item__label">{label}</span>
            {count ? <span className="nav-item__count">{count}</span> : null}
          </NavLink>
        ))}

        <p className="sidebar__label sidebar__label--spaced">Campus</p>
        <div className="nav-item nav-item--muted" aria-disabled="true">
          <span className="nav-item__icon">
            <CalendarDays size={19} strokeWidth={2} aria-hidden="true" />
          </span>
          <span className="nav-item__label">Academic Calendar</span>
          <span className="nav-item__soon">Soon</span>
        </div>
      </nav>

      <div className="sidebar__bottom">
        <div className="sidebar__promo">
          <span className="sidebar__promo-icon" aria-hidden="true">
            <Sparkles size={18} />
          </span>
          <p className="sidebar__promo-title">Rhythm 2026 is live</p>
          <p className="sidebar__promo-copy">
            Cultural fest lineup just dropped. Grab your spot before it fills up.
          </p>
          <Link to="/events" className="sidebar__promo-link" onClick={onClose}>
            Explore lineup
            <ChevronRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="sidebar__profile">
          <Avatar initials={student.initials} name={student.name} />
          <div className="sidebar__profile-text">
            <p className="sidebar__profile-name">{student.name}</p>
            <p className="sidebar__profile-meta">{student.year} · CSE</p>
          </div>
          <Link
            to="/my-events"
            className="sidebar__profile-link"
            aria-label="View my events"
            onClick={onClose}
          >
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </aside>
  )
}
