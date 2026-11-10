import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const [lastPathname, setLastPathname] = useState(pathname)

  // Close the mobile drawer whenever navigation changes the route.
  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    setSidebarOpen(false)
  }

  useEffect(() => {
    if (!sidebarOpen) return undefined

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') setSidebarOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [sidebarOpen])

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <button
        type="button"
        className={`sidebar-overlay ${sidebarOpen ? 'is-open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-label="Close navigation menu"
        tabIndex={sidebarOpen ? 0 : -1}
      />

      <div className="main-area">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="page" id="main-content">
          {children}
          <footer className="page-footer">
            <span>© 2026 CampusSphere · Student portal</span>
            <span>Built for campus life at Meridian University</span>
          </footer>
        </main>
      </div>
    </div>
  )
}
