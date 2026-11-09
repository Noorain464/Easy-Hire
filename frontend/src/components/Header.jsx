import { ArrowRight } from 'lucide-react'
import brandLogo from '../assets/easy-hire-logo-transparent.png'
import { TalkMenu } from './TalkMenu'

export function Header({ onEnquire }) {
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
