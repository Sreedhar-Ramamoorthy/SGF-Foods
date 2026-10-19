import { forwardRef, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CATEGORIES, MENU } from '../data/menu'
import { useCart } from '../context/Cart'
import { EASE, fmt, reveal } from '../lib/motion'
import SectionHead from './SectionHead'
import Icon from './Icon'

const DishCard = forwardRef(function DishCard({ d, i }, ref) {
  const { add, items } = useCart()
  const qty = items[d.id] || 0

  return (
    <motion.article
      ref={ref}
      layout
      className="dish-card"
      style={{ '--bg': d.bg }}
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: (i % 4) * 0.06 } }}
      viewport={{ once: true, margin: '-5% 0px' }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      transition={{ layout: { type: 'spring', stiffness: 260, damping: 30 } }}
    >
      <div className="dc-top">
        <span className={`veg ${d.veg ? 'is-veg' : 'is-non'}`} title={d.veg ? 'Veg' : 'Non-veg'} />
        {d.tag && <span className="dc-tag">{d.tag}</span>}
        <span className="dc-rating">★ {d.rating}</span>
      </div>
      <div className="dc-art">
        <span className="dc-emoji">{d.emoji}</span>
        <AnimatePresence>
          {qty > 0 && (
            <motion.span
              key={qty}
              className="dc-qty"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              ×{qty}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <h3>{d.name}</h3>
      <p>{d.desc}</p>
      <div className="dc-foot">
        <div>
          <b className="price">{fmt(d.price)}</b>
          <small>
            <Icon name="clock" /> {d.time} min
          </small>
        </div>
        <motion.button whileTap={{ scale: 0.85 }} className="add" onClick={(e) => add(d.id, e.currentTarget)} aria-label={`Add ${d.name} to cart`}>
          <span className="add-plus">+</span>
          <span className="add-lbl">Add</span>
        </motion.button>
      </div>
    </motion.article>
  )
})

export default function Menu() {
  const [cat, setCat] = useState('all')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const query = q.trim().toLowerCase()
    return MENU.filter((d) => (cat === 'all' || d.cat === cat) && (!query || `${d.name} ${d.desc}`.toLowerCase().includes(query)))
  }, [cat, q])

  return (
    <section className="menu" id="menu">
      <div className="container">
        <SectionHead
          kicker="Our menu"
          title={
            <>
              Pick your <em>craving</em>
            </>
          }
          sub="Cooked fresh in our kitchens the moment you order. No freezers, no shortcuts."
        />

        <motion.div className="menu-tools" {...reveal(0.2)}>
          <div className="chips" data-lenis-prevent>
            {CATEGORIES.map((c) => (
              <button key={c.id} className={`chip ${cat === c.id ? 'on' : ''}`} onClick={() => setCat(c.id)}>
                {cat === c.id && <motion.span layoutId="chip-pill" className="chip-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="chip-label">
                  <span>{c.icon}</span>
                  {c.label}
                </span>
              </button>
            ))}
          </div>
          <label className="search">
            <Icon name="search" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes…" aria-label="Search dishes" />
            <AnimatePresence>
              {q && (
                <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} onClick={() => setQ('')} aria-label="Clear search">
                  <Icon name="close" />
                </motion.button>
              )}
            </AnimatePresence>
          </label>
        </motion.div>

        <motion.div layout className="menu-grid">
          <AnimatePresence mode="popLayout">
            {list.map((d, i) => (
              <DishCard key={d.id} d={d} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {list.length === 0 && (
            <motion.p className="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <span>🍽️</span>
              No dishes match “{q}”. Try something else?
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
