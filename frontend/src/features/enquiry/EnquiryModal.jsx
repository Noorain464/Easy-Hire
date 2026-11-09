import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, MessageCircle, X } from 'lucide-react'
import { cars, destinations, siteConfig, tripTypes, whatsappUrl } from '../../data/siteConfig'

const tripInitial = (trip = {}) => ({
  type: trip.type || 'other',
  pickup: trip.pickup || (trip.type === 'airport-pickup' ? 'Bengaluru International Airport' : trip.type === 'airport-drop' || trip.type === 'outstation' ? 'Mysore' : ''),
  drop: trip.drop || (trip.type === 'airport-drop' ? 'Bengaluru International Airport' : trip.type === 'airport-pickup' ? 'Mysore' : ''),
  roundTrip: Boolean(trip.roundTrip),
})

export function EnquiryModal({ initialTrip, onClose }) {
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
