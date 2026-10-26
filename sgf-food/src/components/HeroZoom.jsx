import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'motion/react'
import { CHIPS, STEPS } from '../data/chips'
import { COMPANY } from '../data/company'
import { EASE, ENTER_DELAY, scrollToId } from '../lib/motion'
import { SCENES } from './art/Scenes'
import Magnetic from './Magnetic'
import Icon from './Icon'

const CLIP_MS = 3200
const pad = (i) => String(i + 1).padStart(2, '0')

/**
 * Stand-in "footage" until the client's video arrives: the 8 life-cycle scenes cut one after another
 * like a film, each with a slow Ken Burns zoom. The chip type changes after every full cycle.
 */
function Montage({ play }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!play) return
    const id = setInterval(() => setN((v) => v + 1), CLIP_MS)
    return () => clearInterval(id)
  }, [play])
  const i = n % STEPS.length
  const t = CHIPS[Math.floor(n / STEPS.length) % CHIPS.length]
  const s = STEPS[i]
  const Scene = SCENES[s.id]

  return (
    <div className="montage">
      <AnimatePresence initial={false}>
        <motion.div
          key={n}
          className="mt-clip"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.6 }, scale: { duration: CLIP_MS / 1000 + 0.6, ease: 'linear' } }}
        >
          <Scene t={t} play={play} />
        </motion.div>
      </AnimatePresence>
      <div className="mt-bars" aria-hidden="true">
        {STEPS.map((x, k) => (
          <span key={x.id}>
            <i className={k < i ? 'full' : k === i && play ? 'run' : ''} key={k === i ? n : x.id} style={{ animationDuration: `${CLIP_MS}ms` }} />
          </span>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={n} className="mt-cap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
          <b>{pad(i)}</b> {s.label} · {t.title}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/** The client's video, once COMPANY.heroVideo is set (e.g. '/hero.mp4' placed in sgf-food/public). */
function Video({ play }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    play ? v.play().catch(() => {}) : v.pause()
  }, [play])
  return <video ref={ref} className="hz-video" src={COMPANY.heroVideo} poster={COMPANY.heroPoster || undefined} muted loop playsInline autoPlay preload="metadata" />
}

/**
 * Scroll-zoom hero: the footage starts as a card under the headline and grows to fill the screen as you scroll.
 * Only transforms and opacity change while scrolling, so the browser never has to repaint the frame.
 */
export default function HeroZoom() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Starting size and offset of the footage card (phones start wider and lower, under the headline).
  // The media box is 80px larger than the screen, so its rounded corners sit off screen at full zoom.
  const [start, setStart] = useState({ scale: 0.56, y: '30vh' })
  useEffect(() => {
    const set = () => setStart(innerWidth < 700 ? { scale: 0.8, y: '42vh' } : { scale: 0.56, y: '30vh' })
    set()
    addEventListener('resize', set)
    return () => removeEventListener('resize', set)
  }, [])

  const scale = useTransform(p, [0, 0.6], [start.scale, 1])
  const mediaY = useTransform(p, [0, 0.6], [start.y, '0vh'])
  const innerScale = useTransform(p, [0, 0.6], [1.2, 1])
  const copyOpacity = useTransform(p, [0, 0.25], [1, 0])
  const copyY = useTransform(p, [0, 0.3], [0, -140])
  const overlayOpacity = useTransform(p, [0.5, 0.7], [0, 1])
  const overlayY = useTransform(p, [0.5, 0.7], [40, 0])

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
    <section className="hz" id="top" ref={ref}>
      <div className="hz-pin">
        <motion.div className="hz-copy" style={{ opacity: copyOpacity, y: copyY }}>
          <motion.span className="pill" {...fade(0)}>
            <span className="pill-star">✦</span> {COMPANY.tagline}
          </motion.span>
          <h1 className="title">
            {line('Every crunch starts', 0)}
            {line(
              <>
                on the{' '}
                <span className="mark">
                  farm.
                  <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
                    <motion.path
                      d="M3 14 C 50 4, 120 4, 197 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: EASE, delay: ENTER_DELAY + 0.9 }}
                    />
                  </svg>
                </span>
              </>,
              1,
            )}
          </h1>
          <motion.p className="hz-scroll" {...fade(0.5)}>
            Scroll to watch it happen <Icon name="arrow" />
          </motion.p>
        </motion.div>

        <motion.div className="hz-media" style={{ scale, y: mediaY }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: ENTER_DELAY + 0.3 }}>
          <motion.div className="hz-inner" style={{ scale: innerScale }}>
            {COMPANY.heroVideo ? <Video play={inView} /> : <Montage play={inView} />}
          </motion.div>
          <motion.div className="hz-shade" style={{ opacity: overlayOpacity }} />
          <motion.div className="hz-overlay" style={{ opacity: overlayOpacity, y: overlayY }}>
            <h2>
              From the farm to <em>your hands</em>.
            </h2>
            <p>Potato, banana and tapioca chips from Sri Gopal Foods, made in Manachanallur, Tiruchirappalli.</p>
            <div className="hz-actions">
              <Magnetic>
                <button className="btn" onClick={() => scrollToId('process')}>
                  See how it's made <Icon name="arrow" />
                </button>
              </Magnetic>
              <Magnetic>
                <button className="btn btn-light" onClick={() => scrollToId('products')}>
                  Our chips
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
