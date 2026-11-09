import { ArrowRight, BadgeCheck, CarFront, Check, Snowflake, Users } from 'lucide-react'
import { cars, siteConfig } from '../data/siteConfig'
import { SectionTitle } from '../components/UI'

export function Fleet({ onEnquire }) {
  return <section className="section fleet-section" id="cars"><div className="container"><SectionTitle eyebrow={siteConfig.copy.fleetEyebrow} title={siteConfig.copy.fleetTitle} text={siteConfig.copy.fleetDescription}/>
    <div className="fleet-grid">{cars.map((car, index) => <article className="fleet-card" key={car.name}>
      <div className="fleet-placeholder"><div className="fleet-placeholder-icon"><CarFront size={31}/></div><span>Vehicle photo coming soon</span><small>Photo {car.name} here</small></div>
      <div className="fleet-content"><div className="fleet-title-row"><div><span className="fleet-number">CAR 0{index + 1}</span><h3>{car.name}</h3></div><BadgeCheck size={20} aria-label="Driver included"/></div>
        <div className="fleet-specs"><span><Users size={15}/>{car.passengers} passengers</span><span>{car.luggage}</span><span><Snowflake size={15}/>AC: {car.ac === '[CONFIRM WITH OWNER]' ? 'confirm availability' : car.ac}</span><span><Check size={15}/>Driver included</span></div>
        <p className="best-for"><strong>Best for</strong>{car.bestFor}</p>
        <button className="button button-outline" onClick={() => onEnquire({ type: 'other', car: car.name })}>Enquire about this car <ArrowRight size={16}/></button>
      </div>
    </article>)}</div>
    <p className="fleet-note">{siteConfig.copy.fleetDisclaimer}</p>
  </div></section>
}
