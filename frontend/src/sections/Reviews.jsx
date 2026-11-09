import { siteConfig } from '../data/siteConfig'
import { SectionTitle } from '../components/UI'

export function Reviews() {
  if (!siteConfig.showReviews || !siteConfig.reviews.length) return null
  return <section className="section reviews-section" id="reviews"><div className="container"><SectionTitle eyebrow="REVIEWS" title="Experiences shared by our passengers."/><div className="reviews-grid">{siteConfig.reviews.map(review => <article className="review-card" key={review.name}><p>“{review.text}”</p><strong>{review.name}</strong></article>)}</div></div></section>
}
