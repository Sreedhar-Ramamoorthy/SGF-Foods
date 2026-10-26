import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { CHIPS } from '../data/chips'
import { COMPANY, GROUP_NAME, GROUP_URL } from '../data/company'
import { EASE } from '../lib/motion'
import { usePageTransition } from './Transition'
import { Chip } from './art/Parts'
import Magnetic from './Magnetic'
import Icon from './Icon'

const FLOATERS = [
  { l: '5%', t: '14%', d: 4, s: 70, k: 0 },
  { l: '86%', t: '10%', d: 5, s: 78, k: 1 },
  { l: '80%', t: '68%', d: 4.5, s: 62, k: 2 },
  { l: '10%', t: '70%', d: 5.5, s: 66, k: 1 },
  { l: '48%', t: '-8%', d: 6, s: 54, k: 0 },
]

export default function Contact() {
  const ref = useRef(null)
  const go = usePageTransition()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.88, 1])
  const radius = useTransform(scrollYProgress, [0, 0.4], [80, 40])

  return (
    <section className="cta-sec" id="contact" ref={ref}>
      <div className="container">
        <motion.div className="cta" style={{ scale, borderRadius: radius }}>
          {FLOATERS.map((f, i) => {
            const t = CHIPS[f.k]
            return (
              <span key={i} className="cta-float" style={{ left: f.l, top: f.t, width: f.s, height: f.s, animationDuration: `${f.d}s` }}>
                <svg viewBox="-28 -28 56 56" aria-hidden="true">
                  <Chip type={t.id} c={t.c} />
                </svg>
              </span>
            )
          })}
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }}>
            Let’s talk <em>chips</em>.
          </motion.h2>
          <address className="cta-address">
            <b>{COMPANY.name}</b>
            {COMPANY.address.join(', ')}
          </address>
          <div className="cta-actions">
            <Magnetic>
              <a
                className="btn btn-dark"
                href={`${GROUP_URL}/#contact`}
                onClick={(e) => {
                  e.preventDefault()
                  go(`${GROUP_URL}/#contact`, GROUP_NAME, e)
                }}
              >
                Contact us <Icon name="arrow" />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-light" href={COMPANY.mapUrl} target="_blank" rel="noreferrer">
                Get directions <Icon name="arrowUp" />
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
