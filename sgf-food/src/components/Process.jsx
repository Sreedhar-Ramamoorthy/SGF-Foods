import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from 'motion/react'
import { CHIP, CHIPS, STEPS } from '../data/chips'
import { useChipType } from '../context/ChipType'
import useMedia from '../hooks/useMedia'
import { EASE, reveal } from '../lib/motion'
import { Chip } from './art/Parts'
import { SCENES } from './art/Scenes'
import SectionHead from './SectionHead'

const pad = (i) => String(i + 1).padStart(2, '0')

function TypeSwitch() {
  const { type, setType } = useChipType()
  return (
    <div className="type-switch" role="tablist" aria-label="Choose a chip">
      {CHIPS.map((k) => (
        <button key={k.id} role="tab" aria-selected={k.id === type} className={k.id === type ? 'on' : ''} onClick={() => setType(k.id)}>
          {k.id === type && (
            <motion.span layoutId="type-pill" className="type-pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
          )}
          <svg viewBox="-24 -24 48 48" aria-hidden="true">
            <Chip type={k.id} c={k.c} />
          </svg>
          <span>{k.name}</span>
        </button>
      ))}
    </div>
  )
}

/** Desktop: the stage pins while the page scrolls; each slice of scroll is one step. */
function ProcessPinned({ t }) {
  const ref = useRef(null)
  const n = STEPS.length
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [step, setStep] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setStep(Math.min(n - 1, Math.max(0, Math.floor(v * n)))))
  const inView = useInView(ref)
  const s = STEPS[step]
  const Scene = SCENES[s.id]

  const goTo = (i) => {
    const el = ref.current
    const y = el.getBoundingClientRect().top + scrollY + (el.offsetHeight - innerHeight) * ((i + 0.5) / n)
    window.__lenis ? window.__lenis.scrollTo(y, { duration: 1.2 }) : scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div ref={ref} className="proc" style={{ height: `${n * 75}vh` }}>
      <div className="proc-pin">
        <div className="proc-side">
          <TypeSwitch />
          <ol className="proc-steps">
            <span className="proc-track" aria-hidden="true">
              <motion.span className="proc-bar" style={{ scaleY: scrollYProgress }} />
            </span>
            {STEPS.map((x, i) => (
              <li key={x.id} className={i === step ? 'on' : i < step ? 'done' : ''}>
                <button onClick={() => goTo(i)} aria-current={i === step ? 'step' : undefined}>
                  <span className="ps-num">{pad(i)}</span>
                  {x.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="proc-stage" style={{ '--tint': t.c.tint }}>
          <span className="proc-big" aria-hidden="true">
            {pad(step)}
          </span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={s.id + t.id}
              className="proc-scene"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -30 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <Scene t={t} play={inView} />
            </motion.div>
          </AnimatePresence>
          <div className="proc-caption">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={s.id + t.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }}>
                <span className="pc-num">
                  Step {step + 1} of {n} · {t.title}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text(t)}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function StepCard({ s, i, t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-15% 0px' })
  const Scene = SCENES[s.id]
  return (
    <motion.li ref={ref} className="proc-card" style={{ '--tint': t.c.tint }} {...reveal(0, 30)}>
      <div className="pcard-art">
        <Scene t={t} play={inView} />
      </div>
      <div className="pcard-body">
        <span className="pc-num">
          {pad(i)} · {s.label}
        </span>
        <h3>{s.title}</h3>
        <p>{s.text(t)}</p>
      </div>
    </motion.li>
  )
}

/** Phones and tablets: a plain list of cards; each scene animates only while it is on screen. */
function ProcessList({ t }) {
  return (
    <>
      <div className="proc-switch-sticky">
        <TypeSwitch />
      </div>
      <ol className="proc-list">
        {STEPS.map((s, i) => (
          <StepCard key={s.id} s={s} i={i} t={t} />
        ))}
      </ol>
    </>
  )
}

export default function Process() {
  const { type } = useChipType()
  const t = CHIP[type]
  const narrow = useMedia('(max-width: 900px)')
  return (
    <section className="process" id="process">
      <div className="container">
        <SectionHead
          kicker="How it's made"
          title={
            <>
              From farm to <em>crunch</em>.
            </>
          }
          sub="Eight steps take a fresh vegetable all the way to a sealed pack. Pick a chip and scroll through its life cycle."
          center
        />
        {narrow ? <ProcessList t={t} /> : <ProcessPinned t={t} />}
      </div>
    </section>
  )
}
