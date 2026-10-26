import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from 'motion/react'
import { BUSINESSES, COUNT_WORD, byId } from '../data/businesses'
import { LITE, reveal } from '../lib/motion'

// {word|businessId} tokens are highlighted in that business's colour as the text scrubs in.
const COPY = `Rooted in Tiruchirappalli, Sri Gopal Group builds businesses that {move,|transport} {grow,|farms} {secure,|investments} {feed|food} and {house|realestate} families across Tamil Nadu. ${COUNT_WORD} businesses. One promise — trust, quality and service with heart.`

const WORDS = COPY.split(' ').map((t) => {
  const m = t.match(/^\{([^|]+)\|(\w+)\}$/)
  return m ? { text: m[1], color: byId[m[2]]?.color } : { text: t }
})

function Word({ children, progress, range, color }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <span className="w">
      <motion.span style={{ opacity, y, color }}>{children}</motion.span>
    </span>
  )
}

// Lite devices: no per-word scroll scrub (dozens of styles updated every scroll frame)
function StaticText() {
  return (
    <motion.p className="scrub" {...reveal()}>
      {WORDS.map((w, i) => (
        <span key={i} className="w">
          <span style={{ color: w.color }}>{w.text}</span>
        </span>
      ))}
    </motion.p>
  )
}

function ScrubText() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const n = WORDS.length
  return (
    <p ref={ref} className="scrub">
      {WORDS.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / n, (i + 1) / n]} color={w.color}>
          {w.text}
        </Word>
      ))}
    </p>
  )
}

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString('en-IN') + suffix)
  useEffect(() => {
    if (!inView) return
    const c = animate(mv, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1] })
    return () => c.stop()
  }, [inView, mv, to])
  return <motion.span ref={ref}>{text}</motion.span>
}

// Only the first figure is real — replace the rest with the client's numbers before launch.
const STATS = [
  { to: BUSINESSES.length, suffix: '', label: 'Businesses, one family' },
  { to: 25, suffix: '+', label: 'Years of trust' },
  { to: 500, suffix: '+', label: 'Team members' },
  { to: 10000, suffix: '+', label: 'Happy customers' },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <motion.p className="eyebrow" {...reveal()}>
          Who we are
        </motion.p>
        {LITE ? <StaticText /> : <ScrubText />}
        <div className="stats">
          {STATS.map((s, i) => (
            <motion.div key={s.label} className="stat" {...reveal(i * 0.1)}>
              <b>
                <Counter to={s.to} suffix={s.suffix} />
              </b>
              <p>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
