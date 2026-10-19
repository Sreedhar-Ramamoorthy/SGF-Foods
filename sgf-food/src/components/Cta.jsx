import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { EASE, scrollToId } from '../lib/motion'
import Magnetic from './Magnetic'
import Icon from './Icon'

const FLOATERS = [
  { e: '🍕', l: '6%', t: '18%', d: 4, s: 64 },
  { e: '🍔', l: '86%', t: '12%', d: 5, s: 70 },
  { e: '🍟', l: '78%', t: '70%', d: 4.5, s: 56 },
  { e: '🍜', l: '12%', t: '72%', d: 5.5, s: 60 },
  { e: '🥤', l: '50%', t: '-6%', d: 6, s: 48 },
]

export default function Cta() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.88, 1])
  const radius = useTransform(scrollYProgress, [0, 0.4], [80, 40])

  return (
    <section className="cta-sec" ref={ref}>
      <div className="container">
        <motion.div className="cta" style={{ scale, borderRadius: radius }}>
          {FLOATERS.map((f, i) => (
            <motion.span
              key={f.e}
              className="cta-float"
              style={{ left: f.l, top: f.t, fontSize: f.s }}
              animate={{ y: [0, -18, 0], rotate: [0, i % 2 ? 10 : -10, 0] }}
              transition={{ duration: f.d, repeat: Infinity, ease: 'easeInOut' }}
            >
              {f.e}
            </motion.span>
          ))}
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }}>
            Hungry? <em>Sri Gopal Foods</em> is just a tap away.
          </motion.h2>
          <p>Fresh, hot and made just for you — order now from Manachanallur, Trichy.</p>
          <Magnetic>
            <button className="btn btn-dark" onClick={() => scrollToId('menu')}>
              Start your order <Icon name="arrow" />
            </button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
