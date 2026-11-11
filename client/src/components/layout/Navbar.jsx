import { Bell, Menu, Search } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { student } from '../../data/student'
import Avatar from '../ui/Avatar'
import Brand from '../ui/Brand'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/events': 'Discover Events',
  '/my-events': 'My Events',
}

export default function Navbar({ onMenuClick }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const title = pageTitles[pathname] || 'CampusSphere'

  function handleSearch(event) {
    event.preventDefault()
    const term = query.trim()
    navigate(term ? `/events?q=${encodeURIComponent(term)}` : '/events')
  }

  return (
    <header className="navbar">
      <div className="navbar__left">
        <button
          type="button"
          className="navbar__menu"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu size={21} />
        </button>
        <div className="navbar__brand">
          <Brand />
        </div>
        <div className="navbar__heading">
          <p>Student portal</p>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="navbar__right">
        <form className="navbar__search" role="search" onSubmit={handleSearch}>
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search events, clubs, venues…"
            aria-label="Search campus events"
          />
          <kbd aria-hidden="true">↵</kbd>
        </form>

        <button
          type="button"
          className="icon-button navbar__bell"
          aria-label="Notifications, 3 unread"
        >
          <Bell size={19} />
          <span className="navbar__bell-dot" aria-hidden="true" />
        </button>

        <div className="navbar__divider" aria-hidden="true" />

        <div className="navbar__user">
          <Avatar initials={student.initials} name={student.name} size="sm" />
          <div className="navbar__user-text">
            <p>{student.name}</p>
            <span>{student.campusId}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
