import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { GROUP_NAME, GROUP_URL } from '../data/menu'
import { useCart } from '../context/Cart'
import { EASE, ENTER_DELAY, scrollToId } from '../lib/motion'
import { usePageTransition } from './Transition'
import Icon from './Icon'

const LINKS = [
  { id: 'menu', label: 'Menu' },
  { id: 'specials', label: 'Combos' },
  { id: 'how', label: 'How it works' },
  { id: 'reviews', label: 'Reviews' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(null)
  const { count, setOpen, cartBtnRef } = useCart()
  const go = usePageTransition()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 50))

  return (
    <motion.header
      className={`nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: ENTER_DELAY }}
    >
      <div className="container nav-inner">
        <a
          href={GROUP_URL}
          className="back"
          onClick={(e) => {
            e.preventDefault()
            go(GROUP_URL, GROUP_NAME, e)
          }}
          aria-label={`Back to ${GROUP_NAME}`}
        >
          <span className="back-ic">
            <Icon name="back" />
          </span>
          <span className="back-txt">Sri Gopal Group</span>
        </a>

        <a
          href={GROUP_URL}
          className="logo"
          onClick={(e) => {
            e.preventDefault()
            go(GROUP_URL, GROUP_NAME, e)
          }}
          aria-label={`Sri Gopal Foods — go to ${GROUP_NAME}`}
        >
          <span className="logo-badge">
            <img src="/logo.png" alt="" width="40" height="40" />
          </span>
          <span className="logo-txt">
            Sri Gopal<em>Foods</em>
          </span>
        </a>

        <nav className="links" onMouseLeave={() => setHovered(null)}>
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onMouseEnter={() => setHovered(l.id)}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(l.id)
              }}
            >
              {hovered === l.id && <motion.span layoutId="link-pill" className="link-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span>{l.label}</span>
            </a>
          ))}
        </nav>

        <button ref={cartBtnRef} className="cart-btn" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
          <Icon name="bag" />
          <span className="cart-txt">Cart</span>
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key={count}
                className="badge"
                initial={{ scale: 0, y: 6 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.header>
  )
}
