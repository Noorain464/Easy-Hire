import { useEffect, useState } from 'react'
import { destinations, siteConfig } from './data/siteConfig'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { MobileActionBar } from './components/MobileActionBar'
import { EnquiryModal } from './features/enquiry/EnquiryModal'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Fleet } from './sections/Fleet'
import { HowItWorks } from './sections/HowItWorks'
import { Reviews } from './sections/Reviews'
import './App.css'

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
    if (!('IntersectionObserver' in window)) {
      sections.forEach(section => section.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.06 })

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['TaxiService', 'LocalBusiness'],
    name: siteConfig.brand,
    description: siteConfig.description,
    telephone: siteConfig.phoneLink || siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: 'IN',
    },
    areaServed: [siteConfig.city, ...destinations.map(destination => destination.shortName)],
    serviceType: ['Airport taxi', 'Outstation cab', 'Driver-included taxi'],
  }

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <Header onEnquire={openEnquiry} />
    <main>
      <Hero onEnquire={openEnquiry} />
      <Services onEnquire={openEnquiry} />
      <Fleet onEnquire={openEnquiry} />
      <HowItWorks />
      <Reviews />
    </main>
    <Footer onEnquire={openEnquiry} />
    <MobileActionBar onEnquire={openEnquiry} />
    {enquiryTrip && <EnquiryModal key={`${enquiryTrip.type || 'other'}-${enquiryTrip.drop || ''}-${enquiryTrip.car || ''}`} initialTrip={enquiryTrip} onClose={closeEnquiry} />}
  </>
}

export default App
