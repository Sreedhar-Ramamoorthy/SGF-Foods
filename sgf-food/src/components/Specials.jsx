import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'motion/react'
import { COMBOS } from '../data/menu'
import { useCart } from '../context/Cart'
import { EASE, fmt } from '../lib/motion'
import SectionHead from './SectionHead'
import Icon from './Icon'

export default function Specials() {
  const { add } = useCart()
  const viewport = useRef(null)
  const track = useRef(null)
  const dragging = useRef(false)
  const x = useMotionValue(0)
  const [min, setMin] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return
      const m = Math.min(0, viewport.current.offsetWidth - track.current.scrollWidth)
      setMin(m)
      if (x.get() < m) x.set(m)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(viewport.current)
    return () => ro.disconnect()
  }, [x])

  const step = (dir) => {
    const card = track.current?.firstElementChild
    const w = card ? card.offsetWidth + 20 : 320
    const target = Math.max(min, Math.min(0, x.get() - dir * w))
    animate(x, target, { type: 'spring', stiffness: 200, damping: 30 })
  }

  return (
    <section className="specials" id="specials">
      <div className="container">
        <SectionHead
          kicker="Chef's combos"
          title={
            <>
              More food, <em>less</em> money
            </>
          }
          sub="Handpicked combos that save you up to 22%. Drag to explore →"
        >
          <div className="sp-arrows">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => step(-1)} aria-label="Previous">
              <Icon name="left" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => step(1)} aria-label="Next">
              <Icon name="right" />
            </motion.button>
          </div>
        </SectionHead>

        <div className="sp-viewport" ref={viewport}>
          <motion.div
            ref={track}
            className="sp-track"
            drag="x"
            style={{ x }}
            dragConstraints={{ left: min, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => (dragging.current = true)}
            onDragEnd={() => setTimeout(() => (dragging.current = false), 50)}
          >
            {COMBOS.map((c, i) => {
              const off = Math.round((1 - c.price / c.mrp) * 100)
              return (
                <motion.article
                  key={c.id}
                  className="sp-card"
                  style={{ '--g1': c.g[0], '--g2': c.g[1] }}
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                >
                  <span className="sp-off">-{off}%</span>
                  <span className={`veg ${c.veg ? 'is-veg' : 'is-non'} on-dark`} />
                  <div className="sp-art">
                    <span className="sp-main">{c.emoji}</span>
                    <span className="sp-x a">{c.extras[0]}</span>
                    <span className="sp-x b">{c.extras[1]}</span>
                  </div>
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                  <div className="sp-foot">
                    <div>
                      <s>{fmt(c.mrp)}</s>
                      <b>{fmt(c.price)}</b>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      className="sp-add"
                      onClick={(e) => !dragging.current && add(c.id, e.currentTarget)}
                    >
                      Add combo
                    </motion.button>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
