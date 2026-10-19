import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BUSINESSES, GROUP } from '../data/businesses'
import { EASE, reveal } from '../lib/motion'
import Magnetic from './Magnetic'
import Icon from './Icon'

const LABELS = { idle: 'Send enquiry', sending: 'Sending…', sent: 'Message sent' }

export default function Contact() {
  const [selected, setSelected] = useState(['food'])
  const [status, setStatus] = useState('idle')

  const toggle = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const submit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    // No backend yet — simulate the request.
    setTimeout(() => {
      setStatus('sent')
      form.reset()
      setTimeout(() => setStatus('idle'), 2800)
    }, 1100)
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-glow" />
      <div className="container contact-grid">
        <div className="contact-copy">
          <motion.p className="eyebrow" {...reveal()}>
            Partner with us
          </motion.p>
          <h2 className="contact-title">
            {["Let's build", "what's"].map((t, i) => (
              <span className="line" key={t}>
                <motion.span
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
                >
                  {t}
                </motion.span>
              </span>
            ))}
            <span className="line">
              <motion.span
                className="grad-text"
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              >
                next.
              </motion.span>
            </span>
          </h2>
          <motion.p className="contact-sub" {...reveal(0.2)}>
            Investors, partners, franchisees or future colleagues — tell us what you have in mind and the right team will get
            back within 24 hours.
          </motion.p>
          <motion.ul className="contact-info" {...reveal(0.3)}>
            <li>
              <Icon name="pin" />
              <address>
                <b>{GROUP.name}</b>
                {GROUP.address.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
            </li>
          </motion.ul>
        </div>

        <motion.form className="form" onSubmit={submit} {...reveal(0.15, 60)}>
          <div className="field">
            <input id="f-name" name="name" required placeholder=" " autoComplete="name" />
            <label htmlFor="f-name">Your name</label>
          </div>
          <div className="field">
            <input id="f-email" name="email" type="email" required placeholder=" " autoComplete="email" />
            <label htmlFor="f-email">Email address</label>
          </div>
          <div className="chip-group">
            <span className="chip-title">I'm interested in</span>
            <div className="chips">
              {BUSINESSES.map((b) => {
                const on = selected.includes(b.id)
                return (
                  <motion.button
                    type="button"
                    layout
                    key={b.id}
                    className={`chip ${on ? 'is-on' : ''}`}
                    style={{ '--c': b.color }}
                    onClick={() => toggle(b.id)}
                    whileTap={{ scale: 0.92 }}
                    aria-pressed={on}
                  >
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.span
                          className="chip-check"
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: 'auto', opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                        >
                          <Icon name="check" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {b.name}
                  </motion.button>
                )
              })}
            </div>
          </div>
          <div className="field">
            <textarea id="f-msg" name="message" rows={4} required placeholder=" " />
            <label htmlFor="f-msg">Tell us about your idea</label>
          </div>
          <Magnetic className="form-submit">
            <button type="submit" className={`btn btn-lg ${status === 'sent' ? 'is-sent' : ''}`} disabled={status === 'sending'}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {LABELS[status]}
                </motion.span>
              </AnimatePresence>
              <Icon name={status === 'sent' ? 'check' : 'arrowRight'} />
            </button>
          </Magnetic>
        </motion.form>
      </div>
    </section>
  )
}
