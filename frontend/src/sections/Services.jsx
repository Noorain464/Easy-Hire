import { ArrowRight, Plane, Route } from 'lucide-react'
import { services, siteConfig } from '../data/siteConfig'
import { SectionTitle } from '../components/UI'

export function Services({ onEnquire }) {
  const icon = { plane: <Plane size={23}/>, route: <Route size={23}/> }
  return <section className="section services-section" id="services"><div className="container">
    <SectionTitle eyebrow={siteConfig.copy.servicesEyebrow} title={siteConfig.copy.servicesTitle} text={siteConfig.copy.servicesDescription}/>
    <div className="service-grid">{services.map(service => <article className="service-card" key={service.id}><div className="service-icon">{icon[service.icon]}</div><span className="service-overline">EASY HIRE SERVICE</span><h3>{service.title}</h3><p>{service.description}</p><button className="text-link" onClick={() => onEnquire(service.trip)}>Enquire about the trip <ArrowRight size={16}/></button></article>)}</div>
    <p className="custom-trip">{siteConfig.copy.customTripPrompt} <button onClick={() => onEnquire({ type: 'other' })}>{siteConfig.copy.customTripAction} <ArrowRight size={15}/></button></p>
  </div></section>
}
