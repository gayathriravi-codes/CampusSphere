import CampusLife from '../components/landing/CampusLife'
import ExploreOpportunities from '../components/landing/ExploreOpportunities'
import FinalCTA from '../components/landing/FinalCTA'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import LandingFooter from '../components/landing/LandingFooter'
import LandingNav from '../components/landing/LandingNav'
import RecommendationShowcase from '../components/landing/RecommendationShowcase'

export default function Landing() {
  return (
    <div className="landing">
      <a className="lp-skip" href="#lp-main">
        Skip to content
      </a>
      <LandingNav />
      <main id="lp-main" tabIndex={-1}>
        <Hero />
        <HowItWorks />
        <ExploreOpportunities />
        <RecommendationShowcase />
        <CampusLife />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  )
}
