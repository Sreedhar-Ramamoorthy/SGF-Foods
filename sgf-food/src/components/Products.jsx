import { motion } from 'motion/react'
import { CHIPS } from '../data/chips'
import { useChipType } from '../context/ChipType'
import { EASE, scrollToId } from '../lib/motion'
import { Chip, Veg } from './art/Parts'
import SectionHead from './SectionHead'
import Icon from './Icon'

// Loose chips scattered around the vegetable on each card
const SCATTER = [
  [-92, 40, -20, 1],
  [-58, 66, 30, 0.9],
  [70, 54, 60, 1.05],
  [100, 22, -40, 0.85],
  [34, 76, 10, 0.95],
]

export default function Products() {
  const { setType } = useChipType()

  return (
    <section className="products" id="products">
      <div className="container">
        <SectionHead kicker="Our chips" title={<>Three kinds of <em>crunch</em>.</>} sub="Each one starts as a fresh vegetable and ends up golden in a sealed pack." center />
        <div className="prod-grid">
          {CHIPS.map((t, i) => (
            <motion.article
              key={t.id}
              className="prod"
              style={{ '--tint': t.c.tint }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
            >
              <div className="prod-art">
                <svg viewBox="-150 -90 300 190" aria-hidden="true">
                  <ellipse cy="78" rx="120" ry="12" fill="#000" opacity="0.06" />
                  <g className="prod-veg">
                    <Veg type={t.id} c={t.c} scale={1.25} />
                  </g>
                  {SCATTER.map(([x, y, r, s], k) => (
                    <g key={k} transform={`translate(${x} ${y})`}>
                      <g className="prod-chip" style={{ '--r': `${r}deg`, '--d': `${k * 40}ms` }}>
                        <Chip type={t.id} c={t.c} scale={s} />
                      </g>
                    </g>
                  ))}
                </svg>
              </div>
              <div className="prod-body">
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                <button
                  className="prod-link"
                  onClick={() => {
                    setType(t.id)
                    scrollToId('process')
                  }}
                >
                  See how it's made <Icon name="arrow" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
