import { ArrowUpRight, ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import brandLogo from '../assets/easy-hire-logo-transparent.png'
import { siteConfig, whatsappUrl } from '../data/siteConfig'
import { TalkMenu } from './TalkMenu'

export function Footer({ onEnquire }) {
  const year = new Date().getFullYear()
  const mapQuery = `${siteConfig.address}, ${siteConfig.city}, ${siteConfig.state}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`
  const socials = Object.entries(siteConfig.links).filter(([, url]) => url)
  return <footer className="footer" id="contact">
    <div className="footer-cta"><div className="container footer-cta-inner"><div><span className="eyebrow">{siteConfig.copy.ctaEyebrow}</span><h2>{siteConfig.copy.ctaTitle}<br/><span>{siteConfig.copy.ctaHighlight}</span></h2><p>{siteConfig.copy.ctaDescription}</p></div><div className="footer-cta-actions"><TalkMenu/><button className="button button-primary" onClick={() => onEnquire()}>Enquire about the trip <ArrowRight size={16}/></button></div></div></div>
    <div className="container footer-content"><div className="footer-grid">
      <div className="footer-brand"><a href="#home"><img className="brand-logo footer-logo" src={brandLogo} alt="Easy Hire" /></a><p>{siteConfig.tagline}</p>{socials.length > 0 && <div className="social-links">{socials.map(([name, url]) => <a key={name} aria-label={name} href={url} target="_blank" rel="noreferrer">{name}</a>)}</div>}</div>
      <div className="footer-col"><h3>Explore</h3>{siteConfig.nav.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}<button onClick={() => onEnquire()}>Enquire about the trip</button></div>
      <div className="footer-col footer-contact"><h3>Talk to Easy Hire</h3><a href={siteConfig.phoneLink || `tel:${siteConfig.phone}`}><Phone size={15}/>{siteConfig.phone}</a><a href={whatsappUrl('Hi Easy Hire! I would like to ask about a trip.')}><MessageCircle size={15}/>WhatsApp</a><a href={`mailto:${siteConfig.email}`}><Mail size={15}/>{siteConfig.email}</a><span><MapPin size={15}/>{siteConfig.address}</span></div>
      <div className="footer-map"><div className="footer-map-heading"><h3>Find us in {siteConfig.city}</h3><a href={directionsUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={15}/></a></div><iframe title={`Map showing Easy Hire in ${siteConfig.city}`} src={embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><p>{siteConfig.copy.mapDisclaimer}</p></div>
    </div><div className="footer-bottom"><span>© {year} Easy Hire. All rights reserved.</span><a href="#home">Back to top ↑</a></div></div>
  </footer>
}
