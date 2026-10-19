import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useSpring, useTransform } from 'motion/react'
import { DELIVERY_FEE, FREE_DELIVERY_AT, ITEMS } from '../data/menu'
import { useCart } from '../context/Cart'
import { EASE, fmt, scrollToId } from '../lib/motion'
import Icon from './Icon'

function Money({ value }) {
  const mv = useSpring(value, { stiffness: 140, damping: 22 })
  const text = useTransform(mv, (v) => fmt(v))
  useEffect(() => mv.set(value), [mv, value])
  return <motion.b>{text}</motion.b>
}

const CONFETTI = ['🍛', '🎉', '🍕', '✨', '🍔', '🧡', '🍜', '🎊']

function Success({ onClose }) {
  const bits = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const a = (i / 22) * Math.PI * 2 + Math.random() * 0.4
        const r = 120 + Math.random() * 120
        return { e: CONFETTI[i % CONFETTI.length], x: Math.cos(a) * r, y: Math.sin(a) * r, rot: Math.random() * 360 - 180 }
      }),
    [],
  )
  return (
    <motion.div className="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="confetti">
        {bits.map((b, i) => (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, scale: 0.3, opacity: 1 }}
            animate={{ x: b.x, y: b.y + 60, scale: 1.1, opacity: 0, rotate: b.rot }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            {b.e}
          </motion.span>
        ))}
      </div>
      <motion.svg viewBox="0 0 100 100" className="check" initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
        <motion.circle cx="50" cy="50" r="44" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: EASE }} />
        <motion.path d="M30 52 l14 14 l27 -30" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, ease: EASE, delay: 0.45 }} />
      </motion.svg>
      <motion.h3 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        Order placed!
      </motion.h3>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        Our kitchen has started cooking. Your food will arrive in about <b>28 minutes</b>.
      </motion.p>
      <motion.button className="btn" onClick={onClose} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        Keep browsing
      </motion.button>
    </motion.div>
  )
}

export default function CartDrawer() {
  const { entries, count, subtotal, open, setOpen, setQty, clear } = useCart()
  const [placed, setPlaced] = useState(false)

  const fee = subtotal === 0 || subtotal >= FREE_DELIVERY_AT ? 0 : DELIVERY_FEE
  const total = subtotal + fee
  const toFree = Math.max(0, FREE_DELIVERY_AT - subtotal)

  useEffect(() => {
    const lenis = window.__lenis
    open ? lenis?.stop() : lenis?.start()
    document.body.classList.toggle('is-locked', open)
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open, setOpen])

  const close = () => {
    setOpen(false)
    setTimeout(() => setPlaced(false), 400)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="scrim" onClick={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-label="Your cart"
            initial={{ x: '105%' }}
            animate={{ x: 0 }}
            exit={{ x: '105%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 34 }}
          >
            <header className="d-head">
              <h3>
                Your order {count > 0 && !placed && <span>{count} items</span>}
              </h3>
              <motion.button whileTap={{ scale: 0.85 }} whileHover={{ rotate: 90 }} className="d-x" onClick={close} aria-label="Close cart">
                <Icon name="close" />
              </motion.button>
            </header>

            {placed ? (
              <Success onClose={close} />
            ) : count === 0 ? (
              <motion.div className="d-empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  🛍️
                </motion.span>
                <h4>Your cart is empty</h4>
                <p>Good food is just a tap away.</p>
                <button
                  className="btn"
                  onClick={() => {
                    close()
                    setTimeout(() => scrollToId('menu'), 300)
                  }}
                >
                  Browse menu
                </button>
              </motion.div>
            ) : (
              <>
                <div className="d-body" data-lenis-prevent>
                  <AnimatePresence initial={false}>
                    {entries.map(([id, q]) => {
                      const d = ITEMS[id]
                      return (
                        <motion.div
                          key={id}
                          layout
                          className="ci"
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 80, transition: { duration: 0.25 } }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                          <span className="ci-art" style={{ background: d.bg || `linear-gradient(135deg, ${d.g[0]}, ${d.g[1]})` }}>
                            {d.emoji}
                          </span>
                          <div className="ci-info">
                            <b>{d.name}</b>
                            <small>{fmt(d.price)}</small>
                          </div>
                          <div className="qty">
                            <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQty(id, q - 1)} aria-label="Decrease">
                              −
                            </motion.button>
                            <AnimatePresence mode="popLayout" initial={false}>
                              <motion.span key={q} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}>
                                {q}
                              </motion.span>
                            </AnimatePresence>
                            <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQty(id, q + 1)} aria-label="Increase">
                              +
                            </motion.button>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>

                <footer className="d-foot">
                  <div className="free">
                    <p>{toFree > 0 ? <>Add <b>{fmt(toFree)}</b> more for free delivery 🛵</> : <>🎉 You've unlocked <b>free delivery</b></>}</p>
                    <div className="free-bar">
                      <motion.i animate={{ scaleX: Math.min(1, subtotal / FREE_DELIVERY_AT) }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
                    </div>
                  </div>
                  <div className="row">
                    <span>Subtotal</span>
                    <Money value={subtotal} />
                  </div>
                  <div className="row">
                    <span>Delivery</span>
                    {fee ? <Money value={fee} /> : <b className="free-txt">FREE</b>}
                  </div>
                  <div className="row total">
                    <span>Total</span>
                    <Money value={total} />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="btn full"
                    onClick={() => {
                      setPlaced(true)
                      clear()
                    }}
                  >
                    Place order · {fmt(total)} <Icon name="arrow" />
                  </motion.button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
