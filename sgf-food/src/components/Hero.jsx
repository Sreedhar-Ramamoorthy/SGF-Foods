import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ITEMS } from '../data/menu'
import { useCart } from '../context/Cart'
import { EASE, ENTER_DELAY, fmt, scrollToId } from '../lib/motion'
import Magnetic from './Magnetic'
import Icon from './Icon'

const HERO_DISHES = ['biryani', 'pizza', 'burger', 'noodles', 'lava'].map((id) => ITEMS[id])

const INGREDIENTS = [
  { e: '🌶️', top: '6%', left: '12%', depth: 1.6, size: 44, dur: 5 },
  { e: '🍅', top: '14%', left: '82%', depth: 1.1, size: 50, dur: 6 },
  { e: '🌿', top: '70%', left: '4%', depth: 2, size: 46, dur: 7 },
  { e: '🧄', top: '82%', left: '72%', depth: 1.4, size: 40, dur: 5.5 },
  { e: '🍋', top: '44%', left: '93%', depth: 2.2, size: 38, dur: 6.5 },
  { e: '🧅', top: '38%', left: '-2%', depth: 1.2, size: 36, dur: 4.5 },
]

function Ingredient({ g, i, sx, sy }) {
  const x = useTransform(sx, (v) => v * 40 * g.depth)
  const y = useTransform(sy, (v) => v * 40 * g.depth)
  return (
    <motion.span className="ing" style={{ top: g.top, left: g.left, x, y, fontSize: g.size }}>
      <motion.span
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: ENTER_DELAY + 0.5 + i * 0.08 }}
      >
        <span className="ing-float" style={{ animationDuration: `${g.dur}s` }}>
          {g.e}
        </span>
      </motion.span>
    </motion.span>
  )
}

export default function Hero() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const { add } = useCart()
  const d = HERO_DISHES[idx]

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_DISHES.length), 3800)
    return () => clearInterval(t)
  }, [paused])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 16 })
  const sy = useSpring(my, { stiffness: 60, damping: 16 })
  const plateX = useTransform(sx, (v) => v * 14)
  const plateY = useTransform(sy, (v) => v * 14)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const fade = (delay) => ({
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay: ENTER_DELAY + delay },
  })

  const line = (content, i) => (
    <span className="ln">
      <motion.span
        initial={{ y: '115%', rotate: 3 }}
        animate={{ y: '0%', rotate: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: ENTER_DELAY + 0.1 + i * 0.1 }}
      >
        {content}
      </motion.span>
    </span>
  )

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.span className="pill" {...fade(0)}>
            <span className="pill-fire">🔥</span> Hot &amp; fresh, straight from our kitchen
          </motion.span>

          <h1 className="title">
            {line('Fresh food,', 0)}
            {line(
              <>
                <span className="fast">
                  fast
                  <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
                    <motion.path
                      d="M3 14 C 50 4, 120 4, 197 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: EASE, delay: ENTER_DELAY + 0.9 }}
                    />
                  </svg>
                </span>{' '}
                to your
              </>,
              1,
            )}
            {line('door.', 2)}
          </h1>

          <motion.p className="hero-sub" {...fade(0.45)}>
            Authentic Tamil Nadu flavours and fast-food favourites from the Sri Gopal Foods kitchen in Manachanallur — cooked the
            moment you order and delivered hot to your door.
          </motion.p>

          <motion.div className="hero-actions" {...fade(0.55)}>
            <Magnetic>
              <button className="btn" onClick={() => scrollToId('menu')}>
                Order now <Icon name="arrow" />
              </button>
            </Magnetic>
            <Magnetic>
              <button className="btn btn-ghost" onClick={() => scrollToId('how')}>
                <span className="play">
                  <Icon name="play" />
                </span>
                How it works
              </button>
            </Magnetic>
          </motion.div>

          <motion.div className="hero-proof" {...fade(0.65)}>
            <div className="avatars">
              {['🧑🏽', '👩🏾', '👨🏻', '👩🏽'].map((a, i) => (
                <span key={i} style={{ zIndex: 4 - i }}>
                  {a}
                </span>
              ))}
            </div>
            <div>
              <b>Made fresh</b>
              <small>for every single order</small>
            </div>
            <div className="proof-sep" />
            <div>
              <b>Trichy</b>
              <small>Manachanallur &amp; nearby</small>
            </div>
          </motion.div>
        </div>

        <motion.div className="hero-art" onPointerMove={onMove} {...fade(0.2)}>
          <div className="blob" />
          <motion.div className="plate" style={{ x: plateX, y: plateY }}>
            <div className="plate-ring" />
            <div className="plate-inner">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={d.id}
                  className="plate-dish"
                  initial={{ rotate: -140, scale: 0.2, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 140, scale: 0.2, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 15 }}
                >
                  <span className="wobble">{d.emoji}</span>
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {INGREDIENTS.map((g, i) => (
            <Ingredient key={g.e} g={g} i={i} sx={sx} sy={sy} />
          ))}

          <div className="float-card fc1">
            <span className="fc-ic">🛵</span>
            <div>
              <b>Rider on the way</b>
              <small>2.1 km · 8 min</small>
            </div>
          </div>

          <div className="dish-tag">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <small>Today's pick</small>
                <b>{d.name}</b>
                <span className="dt-price">{fmt(d.price)}</span>
              </motion.div>
            </AnimatePresence>
            <motion.button whileTap={{ scale: 0.85 }} className="dt-add" onClick={(e) => add(d.id, e.currentTarget)} aria-label={`Add ${d.name}`}>
              +
            </motion.button>
          </div>

          <div className="thumbs" role="tablist" aria-label="Featured dishes">
            {HERO_DISHES.map((h, i) => (
              <button
                key={h.id}
                className={i === idx ? 'on' : ''}
                onClick={() => {
                  setIdx(i)
                  setPaused(true)
                }}
                aria-label={h.name}
                role="tab"
                aria-selected={i === idx}
              >
                {i === idx && <motion.span layoutId="thumb-ring" className="thumb-ring" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                <span>{h.emoji}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
