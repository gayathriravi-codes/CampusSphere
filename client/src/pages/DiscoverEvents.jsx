import { Search, SearchX, SlidersHorizontal } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import EventGrid from '../components/events/EventGrid'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { categories } from '../lib/categories'
import { events } from '../data/events'

export default function DiscoverEvents() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const activeCategory = searchParams.get('category') || 'All'

  const filteredEvents = useMemo(() => {
    const term = query.trim().toLowerCase()

    return events
      .filter((event) => activeCategory === 'All' || event.category === activeCategory)
      .filter((event) => {
        if (!term) return true
        return [
          event.title,
          event.category,
          event.venue,
          event.organizer,
          ...event.tags,
        ]
          .join(' ')
          .toLowerCase()
          .includes(term)
      })
  }, [query, activeCategory])

  function handleQueryChange(value) {
    const next = new URLSearchParams(searchParams)
    if (value.trim()) next.set('q', value)
    else next.delete('q')
    setSearchParams(next, { replace: true })
  }

  function handleCategoryChange(category) {
    const next = new URLSearchParams(searchParams)
    if (category === 'All') next.delete('category')
    else next.set('category', category)
    setSearchParams(next, { replace: true })
  }

  function clearFilters() {
    setSearchParams({}, { replace: true })
  }

  return (
    <div className="discover">
      <PageHeader
        eyebrow="Campus events"
        title="Discover what's happening"
        description="Hackathons, cultural nights, workshops and everything in between — all in one place."
        actions={
          <div className="discover-count">
            <strong>{filteredEvents.length}</strong>
            <span>{filteredEvents.length === 1 ? 'event' : 'events'}</span>
          </div>
        }
      />

      <div className="discover-toolbar">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder="Search by event, club or venue"
            aria-label="Search events"
          />
        </label>

        <div className="filter-row">
          <span className="filter-row__label">
            <SlidersHorizontal size={15} aria-hidden="true" />
            Filter
          </span>
          <div className="filter-chips" role="group" aria-label="Filter by category">
            {['All', ...categories].map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-chip ${activeCategory === category ? 'is-active' : ''}`}
                onClick={() => handleCategoryChange(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <EventGrid events={filteredEvents} />
      ) : (
        <div className="empty-state">
          <span className="empty-state__icon" aria-hidden="true">
            <SearchX size={30} />
          </span>
          <h2>No events match your search</h2>
          <p>Try a different keyword or clear the filters to see everything on campus.</p>
          <Button variant="secondary" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
