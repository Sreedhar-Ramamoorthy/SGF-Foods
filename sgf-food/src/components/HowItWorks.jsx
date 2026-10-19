import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { EASE, reveal } from '../lib/motion'
import SectionHead from './SectionHead'

const STEPS = [
  { e: '📱', title: 'Pick your meal', text: 'Browse our dishes and combos. Add notes for the chef if you like it extra spicy.' },
  { e: '👩‍🍳', title: 'We cook it fresh', text: 'Your order reaches the Sri Gopal Foods kitchen instantly and is cooked from scratch.' },
  { e: '🛵', title: 'Hot at your door', text: 'Sealed, spill-proof packing and live rider tracking, right to your doorstep.' },
]

const STATUS = [
  { label: 'Order confirmed', e: '✅', eta: 28 },
  { label: 'Cooking in kitchen', e: '🔥', eta: 21 },
  { label: 'Out for delivery', e: '🛵', eta: 9 },
  { label: 'Arriving now', e: '🏠', eta: 1 },
]

const ROUTE = 'M40 210 C 140 210, 150 70, 270 95 S 430 215, 560 60'

function Tracker() {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-20% 0px' })
  const [s, setS] = useState(0)

  useEffect(() => {
    if (!inView) return
    const t = setInterval(() => setS((v) => (v + 1) % STATUS.length), 1600)
    return () => clearInterval(t)
  }, [inView])

  const st = STATUS[s]

  return (
    <motion.div ref={ref} className="tracker" {...reveal(0.1, 60)}>
      <div className="tr-head">
        <div>
          <small>Order #SG2048</small>
          <AnimatePresence mode="wait">
            <motion.b key={st.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {st.e} {st.label}
            </motion.b>
          </AnimatePresence>
        </div>
        <div className="tr-eta">
          <AnimatePresence mode="popLayout">
            <motion.b key={st.eta} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
              {st.eta}
            </motion.b>
          </AnimatePresence>
          <small>min</small>
        </div>
      </div>

      <div className="tr-map">
        <svg viewBox="0 0 600 260" aria-hidden="true">
          <path id="route" d={ROUTE} className="route-bg" />
          <motion.path
            d={ROUTE}
            className="route-line"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: EASE }}
          />
          <g className="pin-start">
            <circle cx="40" cy="210" r="16" />
            <text x="40" y="211">🏪</text>
          </g>
          <g className="pin-end">
            <circle cx="560" cy="60" r="20" className="pulse-ring" />
            <circle cx="560" cy="60" r="16" />
            <text x="560" y="61">🏠</text>
          </g>
          <g className="rider">
            <circle r="20" />
            <text y="1">🛵</text>
            <animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".45 0 .55 1">
              <mpath href="#route" />
            </animateMotion>
          </g>
        </svg>
      </div>

      <div className="tr-steps">
        {STATUS.map((x, i) => (
          <div key={x.label} className={`tr-step ${i <= s ? 'done' : ''}`}>
            <i />
            <span>{x.label}</span>
          </div>
        ))}
        <motion.div className="tr-bar" animate={{ scaleX: (s + 1) / STATUS.length }} transition={{ duration: 0.6, ease: EASE }} />
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="container">
        <SectionHead
          center
          kicker="How it works"
          title={
            <>
              From our kitchen to you in <em>three</em> steps
            </>
          }
        />
        <div className="how-grid">
          <div className="steps">
            {STEPS.map((s, i) => (
              <motion.div key={s.title} className="step" {...reveal(i * 0.12)}>
                <motion.span
                  className="step-ic"
                  initial={{ scale: 0, rotate: -40 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.2 + i * 0.12 }}
                >
                  {s.e}
                </motion.span>
                <div>
                  <span className="step-n">Step 0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <Tracker />
        </div>
      </div>
    </section>
  )
}
