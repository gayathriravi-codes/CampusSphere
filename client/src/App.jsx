import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import DiscoverEvents from './pages/DiscoverEvents'
import MyEvents from './pages/MyEvents'
import StudentHome from './pages/StudentHome'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <AppLayout>
        <Routes>
          <Route path="/" element={<StudentHome />} />
          <Route path="/events" element={<DiscoverEvents />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </>
  )
}
