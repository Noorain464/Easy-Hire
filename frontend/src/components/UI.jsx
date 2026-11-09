export function IconCircle({ children }) { return <span className="icon-circle">{children}</span> }

export function SectionTitle({ eyebrow, title, text, align = 'center' }) {
  return <div className={`section-title ${align === 'center' ? 'text-center' : ''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
}
