import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { GROUP_NAME, GROUP_URL } from '../data/company'
import { EASE, ENTER_DELAY, scrollToId } from '../lib/motion'
import { usePageTransition } from './Transition'
import Icon from './Icon'

const LINKS = [
  { id: 'products', label: 'Our chips' },
  { id: 'process', label: "How it's made" },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(null)
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

        <button className="nav-cta" onClick={() => scrollToId('process')}>
          <span className="nav-cta-txt">See how it's made</span>
          <Icon name="arrow" />
        </button>
      </div>
    </motion.header>
  )
}
