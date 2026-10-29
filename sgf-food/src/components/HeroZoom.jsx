import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { COMPANY } from '../data/company'
import { EASE, ENTER_DELAY, scrollToId } from '../lib/motion'
import MotionPoster from './MotionPoster'
import Magnetic from './Magnetic'
import Icon from './Icon'

/** A single client video instead of the poster, once COMPANY.heroVideo is set (e.g. '/hero.mp4' in sgf-food/public). */
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
    const set = () =>
      setStart(
        innerHeight < 560 // landscape phones / short windows: smaller card, lower, so the headline stays clear
          ? { scale: 0.5, y: '56vh' }
          : innerWidth < 700
            ? { scale: 0.8, y: '42vh' }
            : { scale: 0.56, y: '30vh' },
      )
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
            {line('From farm', 0)}
            {line(
              <>
                to{' '}
                <span className="mark">
                  flavour.
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
            Scroll to watch the story <Icon name="arrow" />
          </motion.p>
        </motion.div>

        <motion.div className="hz-media" style={{ scale, y: mediaY }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: ENTER_DELAY + 0.3 }}>
          <motion.div className="hz-inner" style={{ scale: innerScale }}>
            {COMPANY.heroVideo ? <Video play={inView} /> : <MotionPoster play={inView} />}
          </motion.div>
          <motion.div className="hz-overlay" style={{ opacity: overlayOpacity, y: overlayY }}>
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
