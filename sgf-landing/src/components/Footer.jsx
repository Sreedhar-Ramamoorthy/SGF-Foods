import { motion } from 'motion/react'
import { BUSINESSES, GROUP } from '../data/businesses'
import { EASE, scrollToId } from '../lib/motion'
import { usePageTransition } from './Transition'
import Icon from './Icon'

const BIG = GROUP.short.toUpperCase()

export default function Footer() {
  const go = usePageTransition()
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-top">
          <div className="foot-brand">
            <span className="brand-mark">
              <span>{GROUP.mark}</span>
            </span>
            <p>{GROUP.name} — {BUSINESSES.map((b) => b.name.toLowerCase()).join(', ')}. Rooted in Tiruchirappalli, Tamil Nadu.</p>
            <address>
              {GROUP.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
          </div>
          <div>
            <h4>Businesses</h4>
            <ul>
              {BUSINESSES.map((b) => (
                <li key={b.id}>
                  <a
                    href={b.url || `#${b.id}`}
                    style={{ '--c': b.color }}
                    onClick={(e) => {
                      e.preventDefault()
                      b.url ? go(b.url, { color: b.color, label: b.brand }, e) : scrollToId(b.id)
                    }}
                  >
                    <i />
                    {b.brand}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              {['About us', 'Leadership', 'Careers', 'Investors', 'Newsroom'].map((l) => (
                <li key={l}>
                  <a href="#about" onClick={(e) => (e.preventDefault(), scrollToId('about'))}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              {['LinkedIn', 'Instagram', 'X / Twitter', 'YouTube'].map((l) => (
                <li key={l}>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-big" aria-label={BIG}>
          {BIG.split('').map((c, i) => (
            <span key={i} className="fb-mask">
              <motion.span
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE, delay: i * 0.05 }}
              >
                {c === ' ' ? ' ' : c}
              </motion.span>
            </span>
          ))}
        </div>

        <div className="foot-bottom">
          <span>
            © {new Date().getFullYear()} {GROUP.name}. All rights reserved.
          </span>
          <button className="to-top" onClick={() => scrollToId('top')}>
            Back to top <Icon name="arrowUp" />
          </button>
        </div>
      </div>
    </footer>
  )
}
