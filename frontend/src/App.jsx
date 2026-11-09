import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, CarFront, Check, ChevronDown, Clock3, Mail, MapPin, MessageCircle, Navigation, Phone, Plane, Route, Snowflake, Users, X } from 'lucide-react'
import { cars, destinations, howItWorks, quickRoutes, services, siteConfig, tripTypes, whatsappUrl } from './data/siteConfig'
import brandLogo from './assets/easy-hire-logo-transparent.png'
import './App.css'

const tripInitial = (trip = {}) => ({
  type: trip.type || 'other',
  pickup: trip.pickup || (trip.type === 'airport-pickup' ? 'Bengaluru International Airport' : trip.type === 'airport-drop' || trip.type === 'outstation' ? 'Mysore' : ''),
  drop: trip.drop || (trip.type === 'airport-drop' ? 'Bengaluru International Airport' : trip.type === 'airport-pickup' ? 'Mysore' : ''),
  roundTrip: Boolean(trip.roundTrip),
})

function IconCircle({ children }) { return <span className="icon-circle">{children}</span> }

function TalkMenu({ compact = false }) {
  return <details className={`talk-menu ${compact ? 'talk-menu-compact' : ''}`}>
    <summary className="button button-quiet">Talk to us <ChevronDown size={15}/></summary>
    <div className="talk-menu-popover">
      <a href={siteConfig.phoneLink || `tel:${siteConfig.phone}`}><Phone size={16}/> Call Easy Hire</a>
      <a href={whatsappUrl('Hi Easy Hire, I would like to talk about a trip from Mysore.')} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>
      <a href={`mailto:${siteConfig.email}`}><Mail size={16}/> Email</a>
    </div>
  </details>
}

function Header({ onEnquire }) {
  return <header className="site-header">
    <div className="container nav-wrap">
      <a href="#home" aria-label="Easy Hire home"><img className="brand-logo" src={brandLogo} alt="Easy Hire" /></a>
      <a className="nav-cars-link" href="#cars">Cars</a>
      <div className="nav-actions">
        <TalkMenu/>
        <button className="button button-primary nav-enquire" onClick={onEnquire}>Enquire about the trip <ArrowRight size={16}/></button>
      </div>
    </div>
  </header>
}

function ContactCard({ onEnquire }) {
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

function Hero({ onEnquire }) {
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

function SectionTitle({ eyebrow, title, text, align = 'center' }) {
  return <div className={`section-title ${align === 'center' ? 'text-center' : ''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
}

function Services({ onEnquire }) {
  const icon = { plane: <Plane size={23}/>, route: <Route size={23}/> }
  return <section className="section services-section" id="services"><div className="container">
    <SectionTitle eyebrow={siteConfig.copy.servicesEyebrow} title={siteConfig.copy.servicesTitle} text={siteConfig.copy.servicesDescription}/>
    <div className="service-grid">{services.map(service => <article className="service-card" key={service.id}><div className="service-icon">{icon[service.icon]}</div><span className="service-overline">EASY HIRE SERVICE</span><h3>{service.title}</h3><p>{service.description}</p><button className="text-link" onClick={() => onEnquire(service.trip)}>Enquire about the trip <ArrowRight size={16}/></button></article>)}</div>
    <p className="custom-trip">{siteConfig.copy.customTripPrompt} <button onClick={() => onEnquire({ type: 'other' })}>{siteConfig.copy.customTripAction} <ArrowRight size={15}/></button></p>
  </div></section>
}

function Fleet({ onEnquire }) {
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

function HowItWorks() {
  return <section className="section steps-section"><div className="container"><SectionTitle eyebrow={siteConfig.copy.howEyebrow} title={siteConfig.copy.howTitle}/><div className="steps-grid">{howItWorks.map((step, index) => <article className="step-card" key={step.title}><div className="step-top"><span className="step-icon">{index === 0 ? <MessageCircle/> : index === 1 ? <Check/> : <Navigation/>}</span><span className="step-number">0{index + 1}</span></div><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>
}

function Reviews() {
  if (!siteConfig.showReviews || !siteConfig.reviews.length) return null
  return <section className="section reviews-section" id="reviews"><div className="container"><SectionTitle eyebrow="REVIEWS" title="Experiences shared by our passengers."/><div className="reviews-grid">{siteConfig.reviews.map(review => <article className="review-card" key={review.name}><p>“{review.text}”</p><strong>{review.name}</strong></article>)}</div></div></section>
}

function Footer({ onEnquire }) {
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

function MobileActionBar({ onEnquire }) {
  return <div className="mobile-action-bar"><a href={siteConfig.phoneLink || `tel:${siteConfig.phone}`}><Phone size={17}/><span>Call</span></a><a href={whatsappUrl('Hi Easy Hire! I would like to ask about a trip.')} target="_blank" rel="noreferrer"><MessageCircle size={17}/><span>WhatsApp</span></a><button onClick={() => onEnquire()}><Navigation size={17}/><span>Enquire about the trip</span></button></div>
}

function EnquiryModal({ initialTrip, onClose }) {
  const dialogRef = useRef(null)
  const [trip, setTrip] = useState(() => tripInitial(initialTrip))
  const [roundTrip, setRoundTrip] = useState(Boolean(initialTrip?.roundTrip))
  const [otherDestination, setOtherDestination] = useState('')
  const [error, setError] = useState('')
  const [whatsappLink, setWhatsappLink] = useState('')
  const [customerName, setCustomerName] = useState('')
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)

  useEffect(() => {
    const previousFocus = document.activeElement
    const dialog = dialogRef.current
    const focusable = () => dialog?.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]') || []
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') { onClose(); return }
      if (event.key !== 'Tab') return
      const items = Array.from(focusable())
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.body.style.overflow = 'hidden'
    dialog?.querySelector('input, button')?.focus()
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previousFocus?.focus?.()
    }
  }, [onClose])

  function chooseTripType(type) {
    setTrip((current) => ({
      ...current,
      type,
      pickup: type === 'airport-pickup' ? 'Bengaluru International Airport' : type === 'airport-drop' || type === 'outstation' ? 'Mysore' : '',
      drop: type === 'airport-drop' ? 'Bengaluru International Airport' : type === 'airport-pickup' ? 'Mysore' : '',
    }))
    setOtherDestination('')
    setError('')
  }

  function updateTrip(field, value) { setTrip(current => ({ ...current, [field]: value })) }

  function submitEnquiry(event) {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    if (!name) { setError('Add your name so the Easy Hire team knows who is enquiring.'); return }
    const rawPhone = String(form.get('phone') || '')
    const phone = rawPhone.replace(/\D/g, '')
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Enter a valid 10-digit Indian mobile number.')
      return
    }
    const pickupDate = String(form.get('travelDate') || '')
    const pickupTime = String(form.get('travelTime') || '')
    if (!pickupDate || !pickupTime) { setError('Choose your travel date and time.'); return }
    const start = new Date(`${pickupDate}T${pickupTime}`)
    if (!Number.isFinite(start.getTime()) || start < new Date(`${today}T00:00`)) {
      setError('Choose a travel date that is today or later.')
      return
    }
    const endDate = String(form.get('returnDate') || '')
    const endTime = String(form.get('returnTime') || '')
    if (trip.type === 'outstation' && roundTrip) {
      const end = new Date(`${endDate}T${endTime}`)
      if (!endDate || !endTime || end <= start) {
        setError('Return date and time must be after your departure.')
        return
      }
    }
    const drop = trip.type === 'outstation' ? (trip.drop === 'Other' ? otherDestination : trip.drop) : trip.drop
    if (!trip.pickup.trim() || !drop.trim()) {
      setError('Add both a pickup and destination to continue.')
      return
    }
    const email = String(form.get('email') || '').trim()
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Check the email address or leave it blank.'); return }
    const passengers = String(form.get('passengers') || '')
    const luggage = String(form.get('luggage') || '')
    if (passengers && (!Number.isInteger(Number(passengers)) || Number(passengers) < 1)) { setError('Enter at least one passenger, or leave the field blank.'); return }
    if (luggage && (!Number.isInteger(Number(luggage)) || Number(luggage) < 0)) { setError('Enter a valid number of bags, or leave the field blank.'); return }
    const dateTime = (date, time) => new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(`${date}T${time}`))
    const typeLabel = tripTypes.find(item => item.id === trip.type)?.label || 'Trip'
    const lines = [
      '*EASY HIRE — TRIP ENQUIRY*',
      '',
      `Trip type: ${typeLabel}${trip.type === 'outstation' ? (roundTrip ? ' (Round trip)' : ' (One-way)') : ''}`,
      `Route: ${trip.pickup} → ${drop}`,
      `Travel: ${dateTime(pickupDate, pickupTime)}`,
      trip.type === 'outstation' && roundTrip ? `Return: ${dateTime(endDate, endTime)}` : null,
      trip.type === 'airport-pickup' && form.get('flightNumber') ? `Flight number: ${form.get('flightNumber')}` : null,
      form.get('passengers') ? `Passengers: ${form.get('passengers')}` : null,
      form.get('luggage') ? `Luggage: ${form.get('luggage')} bag(s)` : null,
      form.get('car') ? `Preferred car: ${form.get('car')}` : 'Preferred car: Open to suggestions',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      form.get('notes') ? `Notes: ${form.get('notes')}` : null,
    ].filter(Boolean)
    const link = whatsappUrl(lines.join('\n'))
    setCustomerName(name)
    setWhatsappLink(link)
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  const isOutstation = trip.type === 'outstation'
  return <div className="enquiry-overlay" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <section ref={dialogRef} className="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
      <header className="enquiry-modal-header"><div><span className="eyebrow">EASY HIRE · MYSORE</span><h2 id="enquiry-title">{whatsappLink ? 'Your enquiry is ready' : 'Enquire about the trip'}</h2></div><button className="enquiry-close" type="button" onClick={onClose} aria-label="Close enquiry form"><X size={20}/></button></header>
      {!whatsappLink ? <>
        <div className="enquiry-modal-scroll"><form id="trip-enquiry-form" className="enquiry-form" noValidate onSubmit={submitEnquiry}>
          <fieldset className="trip-type-fieldset"><legend>What kind of trip?</legend><div className="trip-type-options">{tripTypes.map(type => <button key={type.id} type="button" className={trip.type === type.id ? 'selected' : ''} aria-pressed={trip.type === type.id} onClick={() => chooseTripType(type.id)}><span>{type.label}</span><small>{type.route}</small></button>)}</div></fieldset>
          {isOutstation && <div className="trip-toggle-wrap"><span>Trip duration</span><div className="trip-toggle"><button type="button" className={!roundTrip ? 'selected' : ''} aria-pressed={!roundTrip} onClick={() => setRoundTrip(false)}>One-way</button><button type="button" className={roundTrip ? 'selected' : ''} aria-pressed={roundTrip} onClick={() => setRoundTrip(true)}>Round trip</button></div></div>}
          <label className="enquiry-field">Your name<input name="name" autoComplete="name" required value={customerName} onChange={event => setCustomerName(event.target.value)} placeholder="Full name" /></label>
          <label className="enquiry-field">Phone number<input name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" required maxLength="10" placeholder="10-digit mobile number" /></label>
          <label className="enquiry-field">Email <span className="optional-label">Optional</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
          {trip.type === 'outstation' ? <>
            <label className="enquiry-field">Pickup location<input name="pickup" required value={trip.pickup} onChange={event => updateTrip('pickup', event.target.value)} placeholder="Pickup city or address" /></label>
            <label className="enquiry-field">Destination<select name="destination" required value={trip.drop} onChange={event => updateTrip('drop', event.target.value)}><option value="">Choose a destination</option>{destinations.filter(destination => destination.type === 'outstation').map(destination => <option key={destination.name} value={destination.name}>{destination.name}</option>)}<option value="Other">Other</option></select></label>
            {trip.drop === 'Other' && <label className="enquiry-field enquiry-wide">Other destination<input required value={otherDestination} onChange={event => setOtherDestination(event.target.value)} placeholder="Enter destination" /></label>}
          </> : <>
            <label className="enquiry-field">Pickup location<input name="pickup" required value={trip.pickup} onChange={event => updateTrip('pickup', event.target.value)} placeholder="Pickup location" /></label>
            <label className="enquiry-field">Drop location<input name="drop" required value={trip.drop} onChange={event => updateTrip('drop', event.target.value)} placeholder="Destination" /></label>
          </>}
          <label className="enquiry-field">Travel date<input name="travelDate" type="date" required /></label>
          <label className="enquiry-field">Travel time<input name="travelTime" type="time" required /></label>
          {isOutstation && roundTrip && <><label className="enquiry-field">Return date<input name="returnDate" type="date" required /></label><label className="enquiry-field">Return time<input name="returnTime" type="time" required /></label></>}
          {trip.type === 'airport-pickup' && <label className="enquiry-field">Flight number <span className="optional-label">Optional</span><input name="flightNumber" placeholder="e.g. AI 123" /></label>}
          <label className="enquiry-field">Passengers <span className="optional-label">Optional</span><input name="passengers" type="number" min="1" max="99" inputMode="numeric" placeholder="Number of passengers" /></label>
          <label className="enquiry-field">Luggage <span className="optional-label">Optional</span><input name="luggage" type="number" min="0" max="99" inputMode="numeric" placeholder="Number of bags" /></label>
          <label className="enquiry-field enquiry-wide">Preferred car <span className="optional-label">Optional</span><select name="car" defaultValue={initialTrip?.car || ''}><option value="">Open to suggestions</option>{cars.map(car => <option key={car.name}>{car.name}</option>)}</select></label>
          <label className="enquiry-field enquiry-wide">Notes <span className="optional-label">Optional</span><textarea name="notes" rows="3" placeholder="Anything else we should know?" /></label>
          {error && <p className="enquiry-error enquiry-wide" role="alert">{error}</p>}
        </form></div>
        <footer className="enquiry-modal-footer"><p><MessageCircle size={14}/> WhatsApp will open with your details. Review and tap Send.</p><button className="button button-primary" type="submit" form="trip-enquiry-form">Continue to WhatsApp <ArrowRight size={16}/></button></footer>
      </> : <div className="enquiry-success"><span className="success-mark"><Check size={25}/></span><span className="eyebrow">ONE LAST STEP</span><h3>Thanks{customerName ? `, ${customerName}` : ''}.</h3><p>WhatsApp opened with your trip details. Tap <strong>Send</strong> in WhatsApp to deliver your enquiry. Once sent, the Easy Hire team will review the details and reach out shortly.</p><a className="button button-primary" href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Open WhatsApp again</a><button className="text-button" type="button" onClick={onClose}>Done</button></div>}
    </section>
  </div>
}

function App() {
  const [enquiryTrip, setEnquiryTrip] = useState(null)
  const openEnquiry = (trip = {}) => setEnquiryTrip(trip)
  const closeEnquiry = () => setEnquiryTrip(null)
  useEffect(() => {
    document.title = siteConfig.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', siteConfig.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', siteConfig.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', siteConfig.description)
  }, [])
  useEffect(() => {
    const sections = document.querySelectorAll('.section')
    if (!('IntersectionObserver' in window)) { sections.forEach(section => section.classList.add('is-visible')); return }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.06 })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  const schema = { '@context': 'https://schema.org', '@type': ['TaxiService', 'LocalBusiness'], name: siteConfig.brand, description: siteConfig.description, telephone: siteConfig.phoneLink || siteConfig.phone, email: siteConfig.email, address: { '@type': 'PostalAddress', streetAddress: siteConfig.address, addressLocality: siteConfig.city, addressRegion: siteConfig.state, addressCountry: 'IN' }, areaServed: [siteConfig.city, ...destinations.map(destination => destination.shortName)], serviceType: ['Airport taxi', 'Outstation cab', 'Driver-included taxi'] }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/><Header onEnquire={openEnquiry}/><main><Hero onEnquire={openEnquiry}/><Services onEnquire={openEnquiry}/><Fleet onEnquire={openEnquiry}/><HowItWorks/><Reviews/></main><Footer onEnquire={openEnquiry}/><MobileActionBar onEnquire={openEnquiry}/>{enquiryTrip && <EnquiryModal key={`${enquiryTrip.type || 'other'}-${enquiryTrip.drop || ''}-${enquiryTrip.car || ''}`} initialTrip={enquiryTrip} onClose={closeEnquiry}/>}</>
}

export default App
