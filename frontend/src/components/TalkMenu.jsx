import { ChevronDown, Mail, MessageCircle, Phone } from 'lucide-react'
import { siteConfig, whatsappUrl } from '../data/siteConfig'

export function TalkMenu({ compact = false }) {
  return <details className={`talk-menu ${compact ? 'talk-menu-compact' : ''}`}>
    <summary className="button button-quiet">Talk to us <ChevronDown size={15}/></summary>
    <div className="talk-menu-popover">
      <a href={siteConfig.phoneLink || `tel:${siteConfig.phone}`}><Phone size={16}/> Call Easy Hire</a>
      <a href={whatsappUrl('Hi Easy Hire, I would like to talk about a trip from Mysore.')} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>
      <a href={`mailto:${siteConfig.email}`}><Mail size={16}/> Email</a>
    </div>
  </details>
}
