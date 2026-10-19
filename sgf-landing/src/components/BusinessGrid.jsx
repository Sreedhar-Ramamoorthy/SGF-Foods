import { useRef } from 'react'
import { motion, useSpring } from 'motion/react'
import { BUSINESSES, COUNT_WORD } from '../data/businesses'
import { EASE, reveal, scrollToId } from '../lib/motion'
import { usePageTransition } from './Transition'
import Icon from './Icon'

const TILT = { stiffness: 200, damping: 20 }

function Card({ b, i }) {
  const go = usePageTransition()
  const inner = useRef(null)
  const rx = useSpring(0, TILT)
  const ry = useSpring(0, TILT)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = inner.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    rx.set((py - 0.5) * -12)
    ry.set((px - 0.5) * 12)
    inner.current.style.setProperty('--mx', `${px * 100}%`)
    inner.current.style.setProperty('--my', `${py * 100}%`)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.a
      href={b.url || `#${b.id}`}
      className={`biz-card ${b.url ? 'is-live' : ''}`}
      style={{ '--c': b.color }}
      data-cursor={b.url ? 'Visit' : 'Explore'}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1, ease: EASE, delay: (i % 3) * 0.1 }}
      onClick={(e) => {
        e.preventDefault()
        b.url ? go(b.url, { color: b.color, label: b.brand }, e) : scrollToId(b.id)
      }}
    >
      <motion.div ref={inner} className="card-in" style={{ rotateX: rx, rotateY: ry }} onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="card-spot" />
        <div className="card-top">
          <span className="biz-num">0{i + 1}</span>
          <span className="biz-badge">
            {b.url ? (
              <>
                <i className="live-dot" /> Live website
              </>
            ) : (
              'Website coming soon'
            )}
          </span>
        </div>
        <div className="biz-icon">
          <Icon name={b.icon} />
        </div>
        <span className="biz-cat">{b.name}</span>
        <h3>{b.brand}</h3>
        <p>{b.desc}</p>
        <span className="biz-link">
          {b.url ? 'Visit website' : 'Explore vertical'} <Icon name="arrow" />
        </span>
        <Icon name={b.icon} className="biz-wm" />
      </motion.div>
    </motion.a>
  )
}

export default function BusinessGrid() {
  return (
    <section className="biz" id="businesses">
      <div className="container">
        <div className="sec-head">
          <motion.p className="eyebrow" {...reveal()}>
            Our verticals
          </motion.p>
          <motion.h2 className="sec-title" {...reveal(0.1)}>
            {COUNT_WORD} businesses.
            <br />
            <span className="muted">One standard of excellence.</span>
          </motion.h2>
        </div>
        <div className="biz-grid">
          {BUSINESSES.map((b, i) => (
            <Card key={b.id} b={b} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
