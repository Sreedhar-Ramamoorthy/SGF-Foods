import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { BUSINESSES, GROUP } from '../data/businesses'
import { EASE, EASE_IO, scrollToId } from '../lib/motion'
import { usePageTransition } from './Transition'
import Magnetic from './Magnetic'
import Icon from './Icon'

export default function Navbar({ ready }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [active, setActive] = useState(null)
  const [open, setOpen] = useState(false)
  const go = usePageTransition()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > prev && y > 500)

    // Highlight the business whose section is currently on screen
    const mid = innerHeight * 0.5
    let current = null
    for (const b of BUSINESSES) {
      const el = document.getElementById(b.id)
      if (el && el.getBoundingClientRect().top < mid) current = b.id
    }
    const end = document.getElementById('stack-end')
    if (end && end.getBoundingClientRect().top < mid) current = null
    setActive(current)
  })

  const handle = (b, e) => {
    e.preventDefault()
    setOpen(false)
    if (b.url) go(b.url, { color: b.color, label: b.brand }, e)
    else scrollToId(b.id)
  }

  const toggleMenu = () => {
    setOpen((o) => {
      const next = !o
      next ? window.__lenis?.stop() : window.__lenis?.start()
      return next
    })
  }

  const pill = hovered ?? active

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -110 }}
        animate={{ y: !ready || (hidden && !open) ? -110 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="container nav-inner">
          <a
            href="#top"
            className="brand"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('top')
            }}
          >
            <span className="brand-mark">
              <img src="/logo.png" alt="" width="42" height="42" />
            </span>
            <span className="brand-name">
              {GROUP.short} <small>Group</small>
            </span>
          </a>

          <nav className="nav-links" aria-label="Our businesses" onMouseLeave={() => setHovered(null)}>
            {BUSINESSES.map((b) => (
              <a
                key={b.id}
                href={b.url || `#${b.id}`}
                className={`nav-link ${active === b.id ? 'is-active' : ''}`}
                style={{ '--c': b.color }}
                onMouseEnter={() => setHovered(b.id)}
                onClick={(e) => handle(b, e)}
              >
                {pill === b.id && (
                  <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <i className="dot" />
                {b.name}
                {b.url && <Icon name="arrow" className="ext" />}
              </a>
            ))}
          </nav>

          <Magnetic className="nav-cta">
            <a
              href="#contact"
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('contact')
              }}
            >
              <span>Let's talk</span>
              <Icon name="arrowRight" />
            </a>
          </Magnetic>

          <button className={`burger ${open ? 'is-open' : ''}`} onClick={toggleMenu} aria-label="Menu" aria-expanded={open}>
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0px at calc(100% - 42px) 38px)' }}
            animate={{ clipPath: 'circle(150vmax at calc(100% - 42px) 38px)' }}
            exit={{ clipPath: 'circle(0px at calc(100% - 42px) 38px)' }}
            transition={{ duration: 0.8, ease: EASE_IO }}
          >
            <p className="eyebrow">Our businesses</p>
            <ul>
              {BUSINESSES.map((b, i) => (
                <li key={b.id} className="mm-mask">
                  <motion.a
                    href={b.url || `#${b.id}`}
                    style={{ '--c': b.color }}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%', transition: { duration: 0.3 } }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: EASE }}
                    onClick={(e) => {
                      window.__lenis?.start()
                      handle(b, e)
                    }}
                  >
                    <span className="mm-num">0{i + 1}</span>
                    {b.name}
                    {b.url && <Icon name="arrow" className="ext" />}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.a
              href="#contact"
              className="btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              onClick={(e) => {
                e.preventDefault()
                setOpen(false)
                window.__lenis?.start()
                scrollToId('contact')
              }}
            >
              <span>Let's talk</span>
              <Icon name="arrowRight" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
