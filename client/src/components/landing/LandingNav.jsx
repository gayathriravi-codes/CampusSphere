import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import Brand from '../ui/Brand'

const links = [
  { href: '#explore', label: 'Explore' },
  { href: '#features', label: 'Features' },
]

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > 24)
  })

  useEffect(() => {
    if (!open) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <header className={`lp-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="lp-container lp-nav__inner">
        <Brand className="lp-nav__brand" />

        <nav className="lp-nav__links" aria-label="Landing navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="lp-nav__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="lp-nav__actions">
          <Link to="/login" className="lp-nav__login">
            Log In
          </Link>
          <Link to="/signup" className="lp-btn lp-btn--light lp-btn--sm">
            Sign Up
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className="lp-nav__toggle"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="landing-mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <div
        id="landing-mobile-menu"
        className={`lp-nav__mobile ${open ? 'is-open' : ''}`}
      >
        <nav aria-label="Mobile landing navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="lp-nav__mobile-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link to="/login" className="lp-nav__mobile-link" onClick={() => setOpen(false)}>
            Log In
          </Link>
        </nav>
        <Link
          to="/signup"
          className="lp-btn lp-btn--primary lp-btn--block"
          onClick={() => setOpen(false)}
        >
          Create an Account
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </header>
  )
}
