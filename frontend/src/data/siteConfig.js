export const siteConfig = {
  brand: 'Easy Hire',
  city: 'Mysore',
  state: 'Karnataka',
  phone: '9880218707',
  phoneLink: '+919880218707',
  whatsapp: '919880218707',
  whatsappDisplay: '+91 98802 18707',
  email: 'baqermohammed929@gmail.com',
  address: '#3423 Pulikeshi Road, Tilak Nagar, Mysore, Karnataka 570001',
  tagline: 'Airport taxis & outstation cabs, made simple.',
  title: 'Airport Taxi & Outstation Cabs in Mysore | Easy Hire',
  description: 'Book a driver-included taxi from Mysore to Bengaluru Airport, Ooty, Wayanad, Coorg and destinations across South India. Enquire with Easy Hire by WhatsApp, phone or email.',
  copy: {
    heroKicker: 'MYSORE, KARNATAKA',
    heroHeadline: ['Airport taxis &', 'outstation cabs', 'in Mysore.'],
    heroDescription: 'Reliable rides to Bengaluru Airport, Ooty, Wayanad and beyond.',
    quickRoutePrompt: 'Where are you headed?',
    contactCardEyebrow: 'LOCAL TEAM, DIRECT CONTACT',
    contactCardTitle: 'Talk to us',
    servicesEyebrow: 'HOW CAN WE HELP?',
    servicesTitle: 'A straightforward start to your next trip.',
    servicesDescription: 'Choose a service to start an enquiry. We’ll confirm the details with you.',
    customTripPrompt: 'Have another destination in mind?',
    customTripAction: 'Tell us where you’d like to go',
    fleetEyebrow: 'DRIVER-INCLUDED CARS',
    fleetTitle: 'A comfortable ride for your group.',
    fleetDescription: 'Choose a vehicle to include it in your trip enquiry.',
    fleetDisclaimer: 'Passenger and luggage capacities are approximate. Confirm vehicle details when you enquire.',
    howEyebrow: 'SIMPLE FROM THE START',
    howTitle: 'Three steps to your ride.',
    ctaEyebrow: 'YOUR NEXT TRIP STARTS HERE',
    ctaTitle: 'Planning a trip?',
    ctaHighlight: 'Tell us where you’re headed.',
    ctaDescription: 'Airport transfers and outstation cabs from Mysore.',
    mapDisclaimer: 'Map location is approximate. Confirm the pickup point with Easy Hire.',
  },
  links: {
    instagram: '',
    facebook: '',
  },
  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Routes', href: '#routes' },
    { label: 'Cars', href: '#cars' },
  ],
  showReviews: false,
  reviews: [],
}

export const destinations = [
  { name: 'Bengaluru International Airport', shortName: 'Bengaluru Airport', distance: 'Approx. 170 km', duration: 'Around 3–4 hours', type: 'airport-drop', pickup: 'Mysore', drop: 'Bengaluru International Airport' },
  { name: 'Ooty', shortName: 'Ooty', distance: 'Approx. 150 km', duration: 'Around 4–5 hours', type: 'outstation', pickup: 'Mysore', drop: 'Ooty' },
  { name: 'Wayanad (Kalpetta)', shortName: 'Wayanad', distance: 'Approx. 140 km', duration: 'Around 3–4 hours', type: 'outstation', pickup: 'Mysore', drop: 'Wayanad (Kalpetta)' },
  { name: 'Coorg (Madikeri)', shortName: 'Coorg', distance: 'Approx. 120 km', duration: 'Around 3–4 hours', type: 'outstation', pickup: 'Mysore', drop: 'Coorg (Madikeri)' },
  { name: 'Bandipur', shortName: 'Bandipur', distance: 'Approx. 80 km', duration: 'Around 1.5–2.5 hours', type: 'outstation', pickup: 'Mysore', drop: 'Bandipur' },
  { name: 'Kabini', shortName: 'Kabini', distance: 'Approx. 80 km', duration: 'Around 2–2.5 hours', type: 'outstation', pickup: 'Mysore', drop: 'Kabini' },
  { name: 'Bengaluru City', shortName: 'Bengaluru City', distance: 'Approx. 145 km', duration: 'Around 2.5–3.5 hours', type: 'outstation', pickup: 'Mysore', drop: 'Bengaluru City' },
]

export const cars = [
  { name: 'Toyota Innova Crysta', passengers: 7, ac: '[CONFIRM WITH OWNER]', driverIncluded: true, bestFor: 'Families and groups travelling to the airport or outstation.' },
  { name: 'Toyota Innova', passengers: 7, ac: '[CONFIRM WITH OWNER]', driverIncluded: true, bestFor: 'Family trips and small groups with extra luggage.' },
  { name: 'Toyota Etios', passengers: 4, ac: '[CONFIRM WITH OWNER]', driverIncluded: true, bestFor: 'Airport and city trips for a small group.' },
  { name: 'Maruti Swift Dzire', passengers: 4,ac: '[CONFIRM WITH OWNER]', driverIncluded: true, bestFor: 'Airport and city trips for a small group.' },
]

export const services = [
  { id: 'airport', title: 'Airport transfers', description: 'Plan a driver-included ride between Mysore and Bengaluru (Kempegowda) International Airport.', icon: 'plane', trip: { type: 'airport-drop', pickup: 'Mysore', drop: 'Bengaluru International Airport' }, action: 'Enquire about the trip' },
  { id: 'outstation', title: 'Outstation trips', description: 'Travel from Mysore to Ooty, Wayanad, Coorg, Bandipur and other destinations.', icon: 'route', trip: { type: 'outstation', pickup: 'Mysore', drop: '' }, action: 'Enquire about the trip' },
]

export const quickRoutes = [
  { label: 'Mysore → Bengaluru Airport', trip: { type: 'airport-drop', pickup: 'Mysore', drop: 'Bengaluru International Airport' } },
  { label: 'Airport → Mysore', trip: { type: 'airport-pickup', pickup: 'Bengaluru International Airport', drop: 'Mysore' } },
  { label: 'Ooty', trip: { type: 'outstation', pickup: 'Mysore', drop: 'Ooty' } },
  { label: 'Wayanad', trip: { type: 'outstation', pickup: 'Mysore', drop: 'Wayanad (Kalpetta)' } },
]

export const howItWorks = [
  { title: 'Tell us your trip', description: 'Share your route, travel date, timing and any preferences.' },
  { title: 'We confirm the car and rate', description: 'The Easy Hire team will follow up to confirm your trip details.' },
  { title: 'Your driver arrives on time', description: 'Your driver-included ride is arranged for the confirmed pickup.' },
]

export const tripTypes = [
  { id: 'airport-drop', label: 'Airport drop', route: 'Mysore → Airport' },
  { id: 'airport-pickup', label: 'Airport pickup', route: 'Airport → Mysore' },
  { id: 'outstation', label: 'Outstation trip', route: 'Mysore → Destination' },
  { id: 'other', label: 'Other', route: 'Custom route' },
]

export const whatsappUrl = (message) => {
  const digits = siteConfig.whatsapp.replace(/\D/g, '')
  const internationalNumber = digits.length === 10 ? `91${digits}` : digits
  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(message)}`
}
