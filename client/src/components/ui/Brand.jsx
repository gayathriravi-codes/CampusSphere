import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Brand({ className = '', showTagline = false }) {
  return (
    <Link to="/" className={`brand ${className}`} aria-label="CampusSphere home">
      <span className="brand__mark" aria-hidden="true">
        <GraduationCap size={22} strokeWidth={2.1} />
      </span>
      <span className="brand__text">
        <span className="brand__name">
          Campus<span>Sphere</span>
        </span>
        {showTagline && <span className="brand__tagline">Student portal</span>}
      </span>
    </Link>
  )
}
