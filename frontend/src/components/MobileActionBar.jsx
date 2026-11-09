import { MessageCircle, Navigation, Phone } from 'lucide-react'
import { siteConfig, whatsappUrl } from '../data/siteConfig'

export function MobileActionBar({ onEnquire }) {
  return <div className="mobile-action-bar"><a href={siteConfig.phoneLink || `tel:${siteConfig.phone}`}><Phone size={17}/><span>Call</span></a><a href={whatsappUrl('Hi Easy Hire! I would like to ask about a trip.')} target="_blank" rel="noreferrer"><MessageCircle size={17}/><span>WhatsApp</span></a><button onClick={() => onEnquire()}><Navigation size={17}/><span>Enquire about the trip</span></button></div>
}
