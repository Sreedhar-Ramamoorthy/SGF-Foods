import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, animate, motion } from 'motion/react'
import { ITEMS } from '../data/menu'

const CartCtx = createContext(null)
export const useCart = () => useContext(CartCtx)

const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('sgf-cart')) || {}
    return Object.fromEntries(Object.entries(saved).filter(([id, q]) => ITEMS[id] && q > 0))
  } catch {
    return {}
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)
  const [open, setOpen] = useState(false)
  const [flyers, setFlyers] = useState([])
  const [toasts, setToasts] = useState([])
  const cartBtnRef = useRef(null)

  useEffect(() => {
    try {
      localStorage.setItem('sgf-cart', JSON.stringify(items))
    } catch {
      /* storage unavailable */
    }
  }, [items])

  const bump = useCallback(() => {
    if (cartBtnRef.current) animate(cartBtnRef.current, { scale: [1, 1.28, 0.94, 1], rotate: [0, -12, 6, 0] }, { duration: 0.5 })
  }, [])

  const toast = useCallback((msg) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t.slice(-2), { id, msg }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600)
  }, [])

  const add = useCallback(
    (id, fromEl) => {
      const d = ITEMS[id]
      setItems((s) => ({ ...s, [id]: (s[id] || 0) + 1 }))
      toast(`${d.emoji}  ${d.name} added`)
      const target = cartBtnRef.current
      if (!fromEl || !target || matchMedia('(prefers-reduced-motion: reduce)').matches) return bump()
      const a = fromEl.getBoundingClientRect()
      const b = target.getBoundingClientRect()
      const x = a.left + a.width / 2
      const y = a.top + a.height / 2
      setFlyers((f) => [...f, { key: id + Date.now(), emoji: d.emoji, x, y, dx: b.left + b.width / 2 - x, dy: b.top + b.height / 2 - y }])
    },
    [bump, toast],
  )

  const setQty = useCallback((id, q) => {
    setItems((s) => {
      const next = { ...s }
      if (q <= 0) delete next[id]
      else next[id] = q
      return next
    })
  }, [])

  const clear = useCallback(() => setItems({}), [])

  const value = useMemo(() => {
    const entries = Object.entries(items)
    return {
      items,
      entries,
      count: entries.reduce((n, [, q]) => n + q, 0),
      subtotal: entries.reduce((n, [id, q]) => n + ITEMS[id].price * q, 0),
      add,
      setQty,
      clear,
      open,
      setOpen,
      cartBtnRef,
      toast,
    }
  }, [items, add, setQty, clear, open, toast])

  return (
    <CartCtx.Provider value={value}>
      {children}

      {/* Emoji that arcs from the "Add" button into the cart */}
      {flyers.map((f) => (
        <motion.span
          key={f.key}
          className="flyer"
          style={{ left: f.x, top: f.y }}
          initial={{ x: 0, y: 0, scale: 1 }}
          animate={{ x: f.dx, y: [0, Math.min(f.dy * 0.3, 0) - 140, f.dy], scale: [1, 1.6, 0.35], rotate: [0, -25, 15] }}
          transition={{
            duration: 0.85,
            x: { duration: 0.85, ease: 'linear' },
            y: { duration: 0.85, times: [0, 0.42, 1], ease: ['easeOut', 'easeIn'] },
          }}
          onAnimationComplete={() => {
            setFlyers((fs) => fs.filter((x) => x.key !== f.key))
            bump()
          }}
        >
          {f.emoji}
        </motion.span>
      ))}

      <div className="toasts" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              className="toast"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {t.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </CartCtx.Provider>
  )
}
