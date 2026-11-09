import { ArrowUpRight } from 'lucide-react'
import { quickRoutes, siteConfig } from '../data/siteConfig'
import { ContactCard } from '../components/ContactCard'

export function Hero({ onEnquire }) {
  return <section id="home" className="hero">
    <div className="hero-photo" role="img" aria-label="Scenic mountain road in South India" />
    <div className="hero-shade" />
    <div className="container hero-layout">
      <div className="hero-copy">
        <div className="hero-kicker"><span className="kicker-dot"/> {siteConfig.copy.heroKicker}</div>
        <h1>{siteConfig.copy.heroHeadline[0]}<br/><span>{siteConfig.copy.heroHeadline[1]}</span><br/>{siteConfig.copy.heroHeadline[2]}</h1>
        <p>{siteConfig.copy.heroDescription}</p>
        <div className="quick-route-wrap"><span className="quick-route-label">{siteConfig.copy.quickRoutePrompt}</span><div className="quick-routes">{quickRoutes.map(route => <button key={route.label} onClick={() => onEnquire(route.trip)}>{route.label}<ArrowUpRight size={14}/></button>)}</div></div>
      </div>
      <ContactCard onEnquire={onEnquire}/>
    </div>
  </section>
}
