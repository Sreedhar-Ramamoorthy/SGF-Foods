import { Fragment, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { BUSINESSES } from '../data/businesses'
import { EASE, reveal, scrollToId } from '../lib/motion'
import { usePageTransition } from './Transition'
import Magnetic from './Magnetic'
import Icon from './Icon'

function Panel({ b, i, n, progress }) {
  const ref = useRef(null)
  const go = usePageTransition()
  const range = [i / n, 1]
  const scale = useTransform(progress, range, [1, 1 - (n - 1 - i) * 0.045])
  const dim = useTransform(progress, range, [0, (n - 1 - i) * 0.09])

  // Visual zooms in as the panel enters the viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const visualScale = useTransform(scrollYProgress, [0, 1], [1.35, 1])
  const visualRotate = useTransform(scrollYProgress, [0, 1], [-25, 0])

  const item = (d) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-15% 0px' },
    transition: { duration: 0.8, ease: EASE, delay: d },
  })

  return (
    <div ref={ref} className="stack-item">
      <motion.article className="panel" style={{ scale, top: `calc(-3vh + ${i * 22}px)`, '--c': b.color }}>
        <div className="panel-copy">
          <motion.span className="panel-idx" {...item(0)}>
            0{i + 1} <i /> 0{n}
          </motion.span>
          <motion.span className="panel-cat" {...item(0.05)}>
            {b.name}
          </motion.span>
          <motion.h3 {...item(0.1)}>{b.brand}</motion.h3>
          <motion.p className="panel-lead" {...item(0.15)}>
            {b.tagline}
          </motion.p>
          <ul className="panel-list">
            {b.features.map((f, k) => (
              <motion.li key={f} {...item(0.2 + k * 0.07)}>
                <span className="tick">
                  <Icon name="check" />
                </span>
                {f}
              </motion.li>
            ))}
          </ul>
          <motion.div className="panel-actions" {...item(0.45)}>
            {b.url ? (
              <Magnetic>
                <a
                  href={b.url}
                  className="btn btn-color"
                  onClick={(e) => {
                    e.preventDefault()
                    go(b.url, { color: b.color, label: b.brand }, e)
                  }}
                >
                  <span>Visit {b.brand}</span>
                  <Icon name="arrow" />
                </a>
              </Magnetic>
            ) : (
              <>
                <Magnetic>
                  <a
                    href="#contact"
                    className="btn btn-ghost"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToId('contact')
                    }}
                  >
                    <span>Enquire now</span>
                    <Icon name="arrowRight" />
                  </a>
                </Magnetic>
                <span className="soon">Website launching soon</span>
              </>
            )}
          </motion.div>
        </div>

        <div className="panel-visual">
          <motion.div className="pv-inner" style={{ scale: visualScale, rotate: visualRotate }}>
            <div className="pv-rings">
              <i />
              <i />
              <i />
            </div>
            <div className="pv-icon">
              <Icon name={b.icon} />
            </div>
          </motion.div>
          <div className="pv-chip c1">
            <b>{b.stat[0]}</b>
            <span>{b.stat[1]}</span>
          </div>
          <div className="pv-chip c2">
            <i className="live-dot" />
            {b.url ? 'Live now' : 'Operational'}
          </div>
          <span className="pv-num">0{i + 1}</span>
        </div>

        <motion.div className="panel-dim" style={{ opacity: dim }} />
      </motion.article>
    </div>
  )
}

export default function BusinessStack() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const n = BUSINESSES.length

  return (
    <section className="stack-sec">
      <div className="container">
        <div className="sec-head center">
          <motion.p className="eyebrow" {...reveal()}>
            Inside each business
          </motion.p>
          <motion.h2 className="sec-title" {...reveal(0.1)}>
            Built different. <span className="grad-text">Built together.</span>
          </motion.h2>
        </div>
        <div ref={ref} className="stack">
          {BUSINESSES.map((b, i) => (
            <Fragment key={b.id}>
              <span id={b.id} className="anchor" />
              <Panel b={b} i={i} n={n} progress={scrollYProgress} />
            </Fragment>
          ))}
        </div>
      </div>
      <span id="stack-end" />
    </section>
  )
}
