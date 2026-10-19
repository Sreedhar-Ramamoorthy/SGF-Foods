import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { BUSINESSES, COUNT_WORD, GROUP, byId } from '../data/businesses'
import { EASE, scrollToId } from '../lib/motion'
import { usePageTransition } from './Transition'
import Magnetic from './Magnetic'
import Icon from './Icon'

function Rotator({ index }) {
  const b = BUSINESSES[index]
  return (
    <motion.span layout className="rotator" transition={{ layout: { duration: 0.55, ease: EASE } }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={b.word}
          className="rot-word"
          style={{ color: b.color }}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {b.word}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}

function Orbit() {
  const go = usePageTransition()
  return (
    <div className="orbit-wrap">
      <div className="ring r1" />
      <div className="ring r2" />
      <div className="ring r3" />
      <div className="core">
        <b>{GROUP.mark}</b>
        <small>Group</small>
      </div>
      <div className="orbit" style={{ '--n': BUSINESSES.length }}>
        {BUSINESSES.map((b, i) => (
          <a
            key={b.id}
            href={b.url || `#${b.id}`}
            className="node"
            style={{ '--i': i, '--c': b.color }}
            data-label={b.name}
            aria-label={b.brand}
            onClick={(e) => {
              e.preventDefault()
              b.url ? go(b.url, { color: b.color, label: b.brand }, e) : scrollToId(b.id)
            }}
          >
            <Icon name={b.icon} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const go = usePageTransition()
  const food = byId.food

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 18 })
  const sy = useSpring(my, { stiffness: 50, damping: 18 })
  const visX = useTransform(sx, (v) => v * 24)
  const visY = useTransform(sy, (v) => v * 24)
  const rotX = useTransform(sy, (v) => v * -8)
  const rotY = useTransform(sx, (v) => v * 8)
  const blobX = useTransform(sx, (v) => v * -40)
  const blobY = useTransform(sy, (v) => v * -40)

  const [word, setWord] = useState(0)
  useEffect(() => {
    if (!ready) return
    const t = setInterval(() => setWord((i) => (i + 1) % BUSINESSES.length), 2400)
    return () => clearInterval(t)
  }, [ready])

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    mx.set(e.clientX / innerWidth - 0.5)
    my.set(e.clientY / innerHeight - 0.5)
  }

  const fade = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease: EASE, delay },
  })

  const line = (content, i) => (
    <span className="line">
      <motion.span
        initial={{ y: '115%', rotate: 4 }}
        animate={ready ? { y: '0%', rotate: 0 } : {}}
        transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.1 }}
      >
        {content}
      </motion.span>
    </span>
  )

  return (
    <section className="hero" id="top" ref={ref} onPointerMove={onMove}>
      <motion.div className="hero-bg" style={{ x: blobX, y: blobY }}>
        <div className="aurora">
          <span className="b1" />
          <span className="b2" />
          <span className="b3" />
        </div>
      </motion.div>
      <div className="grid-bg" />

      <motion.div className="container hero-inner" style={{ y, opacity, scale }}>
        <div className="hero-copy">
          <motion.p className="hero-eyebrow" {...fade(0.1)}>
            <span className="pulse" /> {GROUP.name} · Tiruchirappalli
          </motion.p>

          <h1 className="hero-title">
            {line(
              <>
                One <span className="grad-text">group.</span>
              </>,
              0,
            )}
            {line(`${COUNT_WORD} businesses.`, 1)}
            {line(
              <>
                Powering <Rotator index={word} />.
              </>,
              2,
            )}
          </h1>

          <motion.p className="hero-sub" {...fade(0.55)}>
            From the farm to your table, the goods on the road, the home you buy and the future you save for — {GROUP.name}{' '}
            builds the businesses that move everyday life forward.
          </motion.p>

          <motion.div className="hero-actions" {...fade(0.65)}>
            <Magnetic>
              <a
                href="#businesses"
                className="btn"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('businesses')
                }}
              >
                <span>Explore our businesses</span>
                <Icon name="arrowRight" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={food.url}
                className="btn btn-ghost"
                style={{ '--c': food.color }}
                onClick={(e) => {
                  e.preventDefault()
                  go(food.url, { color: food.color, label: food.brand }, e)
                }}
              >
                <span>Order from {food.brand}</span>
                <Icon name="arrow" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul className="hero-chips" {...fade(0.75)}>
            {BUSINESSES.map((b) => (
              <li key={b.id} style={{ '--c': b.color }}>
                <i />
                {b.name}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
          animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1.6, ease: EASE, delay: 0.25 }}
        >
          <motion.div className="hero-visual-tilt" style={{ x: visX, y: visY, rotateX: rotX, rotateY: rotY }}>
            <Orbit />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.button
        className="scroll-cue"
        onClick={() => scrollToId('about')}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        <span>Scroll</span>
        <i />
      </motion.button>
    </section>
  )
}
