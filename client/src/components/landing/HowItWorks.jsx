import { Compass, ShieldCheck, TicketCheck } from 'lucide-react'
import { howItWorks } from '../../data/campus'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const icons = [Compass, ShieldCheck, TicketCheck]

export default function HowItWorks() {
  return (
    <section id="features" className="lp-section lp-how">
      <div className="lp-container">
        <SectionHeading
          kicker="How it works"
          title="Campus life, minus the guesswork."
          lede="CampusSphere brings scattered posters, group chats and forms into one clear path from curious to confirmed."
        />

        <div className="lp-steps">
          {howItWorks.map((item, index) => {
            const Icon = icons[index]
            return (
              <Reveal key={item.step} className="lp-step" delay={index * 0.08}>
                <div className="lp-step__top">
                  <span className="lp-step__number">{item.step}</span>
                  <span className="lp-step__icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <p className="lp-step__detail">{item.detail}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
