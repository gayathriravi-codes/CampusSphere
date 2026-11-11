import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import DiscoverEvents from './pages/DiscoverEvents'
import Landing from './pages/Landing'
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
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <StudentHome />
            </AppLayout>
          }
        />
        <Route
          path="/events"
          element={
            <AppLayout>
              <DiscoverEvents />
            </AppLayout>
          }
        />
        <Route
          path="/my-events"
          element={
            <AppLayout>
              <MyEvents />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
