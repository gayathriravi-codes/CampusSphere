import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { ArrowRight, CalendarDays, Cpu, MapPin, Music4, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import CampusImage from '../media/CampusImage'
import { campusImages, landingStats } from '../../data/campus'
import useMediaQuery from '../../lib/useMediaQuery'

const floatCards = [
  {
    className: 'lp-float--a',
    icon: Cpu,
    kind: 'Technology · 14 Nov',
    title: 'TechNova Hackathon',
    meta: '96% match',
    depth: 1,
  },
  {
    className: 'lp-float--b',
    icon: Music4,
    kind: 'Cultural · 21 Nov',
    title: 'Rhythm 2026',
    meta: '1,180 going',
    depth: 0.7,
  },
  {
    className: 'lp-float--c',
    icon: MapPin,
    kind: 'Workshop · 12 Nov',
    title: 'AI & Machine Learning',
    meta: '248 seats left',
    depth: 1.3,
  },
]

function FloatingCard({ card, mouseX, mouseY, reduce }) {
  const x = useTransform(mouseX, [-0.5, 0.5], [20 * card.depth, -20 * card.depth])
  const y = useTransform(mouseY, [-0.5, 0.5], [16 * card.depth, -16 * card.depth])
  const Icon = card.icon

  return (
    <motion.div
      className={`lp-float ${card.className}`}
      style={reduce ? undefined : { x, y }}
    >
      <div className="lp-float__inner">
        <span className="lp-float__icon" aria-hidden="true">
          <Icon size={17} />
        </span>
        <div>
          <p className="lp-float__kind">{card.kind}</p>
          <p className="lp-float__title">{card.title}</p>
          <p className="lp-float__meta">
            <CalendarDays size={12} aria-hidden="true" />
            {card.meta}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const reduce = useReducedMotion()
  const finePointer = useMediaQuery('(pointer: fine)')
  const parallax = finePointer && !reduce

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 55, damping: 18, mass: 0.6 })
  const springY = useSpring(mouseY, { stiffness: 55, damping: 18, mass: 0.6 })

  const imageX = useTransform(springX, [-0.5, 0.5], [-12, 12])
  const imageY = useTransform(springY, [-0.5, 0.5], [-8, 8])
  const stageX = useTransform(springX, [-0.5, 0.5], [-16, 16])
  const stageY = useTransform(springY, [-0.5, 0.5], [12, -12])
  const rotateX = useTransform(springY, [-0.5, 0.5], [2, -2])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-2.5, 2.5])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const mediaY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '9%'])
  const mediaScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08])
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 70])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72], reduce ? [1, 1] : [1, 0])

  function handlePointerMove(event) {
    if (!parallax) return
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function handlePointerLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      className="lp-hero"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-labelledby="hero-heading"
    >
      <div className="lp-hero__media" aria-hidden="true">
        <motion.div
          className="lp-hero__zoom"
          initial={reduce ? false : { scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="lp-hero__depth" style={{ x: imageX, y: imageY }}>
            <motion.div className="lp-hero__scroll-depth" style={{ y: mediaY, scale: mediaScale }}>
              <CampusImage
                image={campusImages.aerial}
                className="lp-hero__picture"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="lp-hero__shade" />
        <div className="lp-hero__glow" />
        <div className="lp-hero__grain" />
      </div>

      <div className="lp-container lp-hero__inner">
        <motion.div className="lp-hero__copy" style={{ y: copyY, opacity: copyOpacity }}>
          <p className="lp-eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            Global Academy of Technology · Bengaluru
          </p>
          <h1 id="hero-heading">
            Your Campus.
            <span>Your Opportunities.</span>
          </h1>
          <p className="lp-hero__lede">
            Discover events, connect with communities, and unlock opportunities beyond the
            classroom.
          </p>

          <div className="lp-hero__actions">
            <a href="#explore" className="lp-btn lp-btn--primary lp-btn--lg">
              Explore CampusSphere
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <Link to="/signup" className="lp-btn lp-btn--glass lp-btn--lg">
              Create an Account
            </Link>
          </div>

          <div className="lp-hero__meta">
            {landingStats.map((stat) => (
              <span key={stat.label} className="lp-hero__stat">
                <strong>{stat.value}</strong> {stat.label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="lp-hero__stage"
          style={parallax ? { x: stageX, y: stageY, rotateX, rotateY } : undefined}
          aria-hidden="true"
        >
          {floatCards.map((card) => (
            <FloatingCard key={card.title} card={card} mouseX={springX} mouseY={springY} reduce={reduce} />
          ))}
        </motion.div>
      </div>

    </section>
  )
}
