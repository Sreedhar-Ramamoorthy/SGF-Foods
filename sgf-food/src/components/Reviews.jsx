import { REVIEWS } from '../data/menu'
import SectionHead from './SectionHead'

function Card({ r }) {
  const initials = r.name
    .split(' ')
    .map((p) => p[0])
    .join('')
  return (
    <figure className="review">
      <div className="stars">★★★★★</div>
      <blockquote>“{r.text}”</blockquote>
      <figcaption>
        <span className="rv-av" style={{ background: r.color }}>
          {initials}
        </span>
        <span>
          <b>{r.name}</b>
          <small>{r.city}</small>
        </span>
      </figcaption>
    </figure>
  )
}

function Row({ items, reverse }) {
  return (
    <div className="rv-row">
      <div className={`rv-track ${reverse ? 'rev' : ''}`}>
        {[0, 1].map((k) => (
          <div key={k} className="rv-group" aria-hidden={k === 1}>
            {items.map((r) => (
              <Card key={r.name} r={r} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <SectionHead
          center
          kicker="Customer love"
          title={
            <>
              What our <em>customers</em> say
            </>
          }
        />
      </div>
      <Row items={REVIEWS.slice(0, 4)} />
      <Row items={REVIEWS.slice(4)} reverse />
    </section>
  )
}
