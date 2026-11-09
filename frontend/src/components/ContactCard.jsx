import { ArrowUpRight, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { siteConfig, whatsappUrl } from '../data/siteConfig'
import { IconCircle } from './UI'

export function ContactCard({ onEnquire }) {
  return <aside className="contact-card" aria-label="Easy Hire contact details">
    <div className="contact-card-title"><div><span className="eyebrow">{siteConfig.copy.contactCardEyebrow}</span><h2>{siteConfig.copy.contactCardTitle}</h2></div><IconCircle><MessageCircle size={20}/></IconCircle></div>
    <div className="contact-details">
      <a href={siteConfig.phoneLink || `tel:${siteConfig.phone}`}><Phone size={17}/><span><small>Call</small><strong>{siteConfig.phone}</strong></span><ArrowUpRight size={15}/></a>
      <a href={whatsappUrl('Hi Easy Hire! I would like to enquire about a trip.')} target="_blank" rel="noreferrer"><MessageCircle size={17}/><span><small>WhatsApp</small><strong>{siteConfig.whatsappDisplay}</strong></span><ArrowUpRight size={15}/></a>
      <a href={`mailto:${siteConfig.email}`}><Mail size={17}/><span><small>Email</small><strong>{siteConfig.email}</strong></span><ArrowUpRight size={15}/></a>
      <div><MapPin size={17}/><span><small>Based in</small><strong>{siteConfig.address}</strong></span></div>
    </div>
    <button className="button button-primary contact-card-cta" onClick={() => onEnquire()}><Navigation size={16}/> Enquire about the trip</button>
  </aside>
}
