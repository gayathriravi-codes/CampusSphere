import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CampusImage from '../media/CampusImage'
import { campusImages, campusLife } from '../../data/campus'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function CampusLife() {
  return (
    <section id="campus" className="lp-section lp-campus">
      <div className="lp-container">
        <SectionHeading
          kicker="Built for campus life"
          title="This is where it happens."
          lede="The white colonnades, the tower, the lawns between lectures — Global Academy of Technology is more than a backdrop. It is the place your next opportunity starts."
        />

        <div className="lp-campus__grid">
          <Reveal className="lp-campus__main">
            <figure>
              <div className="lp-campus__frame">
                <CampusImage
                  image={campusImages.aerial}
                  sizes="(min-width: 960px) 58vw, 100vw"
                />
              </div>
              <figcaption>
                <span>01</span>
                {campusLife[0].title}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="lp-campus__tall" delay={0.08}>
            <figure>
              <div className="lp-campus__frame">
                <CampusImage
                  image={campusImages.courtyard}
                  sizes="(min-width: 960px) 24vw, 50vw"
                />
              </div>
              <figcaption>
                <span>02</span>
                {campusLife[1].title}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="lp-campus__small" delay={0.16}>
            <figure>
              <div className="lp-campus__frame">
                <CampusImage
                  image={campusImages.frontLawn}
                  sizes="(min-width: 960px) 20vw, 50vw"
                />
              </div>
              <figcaption>
                <span>03</span>
                {campusLife[2].title}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal className="lp-campus__quote">
          <p>
            “The best parts of college are rarely on the timetable. They are the workshops you
            almost skipped and the people you met there.”
          </p>
          <Link to="/signup" className="lp-text-link">
            Join CampusSphere
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
