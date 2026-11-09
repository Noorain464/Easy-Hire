import { Check, MessageCircle, Navigation } from 'lucide-react'
import { howItWorks, siteConfig } from '../data/siteConfig'
import { SectionTitle } from '../components/UI'

export function HowItWorks() {
  return <section className="section steps-section"><div className="container"><SectionTitle eyebrow={siteConfig.copy.howEyebrow} title={siteConfig.copy.howTitle}/><div className="steps-grid">{howItWorks.map((step, index) => <article className="step-card" key={step.title}><div className="step-top"><span className="step-icon">{index === 0 ? <MessageCircle/> : index === 1 ? <Check/> : <Navigation/>}</span><span className="step-number">0{index + 1}</span></div><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>
}
