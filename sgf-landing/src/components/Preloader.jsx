import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { BUSINESSES, GROUP } from '../data/businesses'
import { EASE, EASE_IO } from '../lib/motion'

const WORDS = GROUP.short.split(' ')

export default function Preloader({ onDone }) {
  const progress = useMotionValue(0)
  const pct = useTransform(progress, (v) => `${Math.round(v)}%`)
  const barScale = useTransform(progress, [0, 100], [0, 1])

  useEffect(() => {
    const c = animate(progress, 100, { duration: 1.05, ease: [0.65, 0, 0.35, 1] })
    const t = setTimeout(onDone, 1250)
    return () => {
      c.stop()
      clearTimeout(t)
    }
  }, [onDone, progress])

  let n = 0
  return (
    <motion.div
      className="preloader"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.9, ease: EASE_IO }}
    >
      <div className="pl-logo" aria-label={GROUP.short}>
        {WORDS.map((w, wi) => (
          <span key={w} className={`pl-word ${wi === WORDS.length - 1 ? 'is-grad' : ''}`}>
            {w.split('').map((c, i) => (
              <span key={i} className="pl-mask">
                <motion.span initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ delay: 0.1 + n++ * 0.05, duration: 0.8, ease: EASE }}>
                  {c}
                </motion.span>
              </span>
            ))}
          </span>
        ))}
      </div>
      <div className="pl-bar">
        <motion.i style={{ scaleX: barScale }} />
      </div>
      <div className="pl-foot">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {BUSINESSES.map((b) => b.name).join(' · ')}
        </motion.p>
        <motion.b>{pct}</motion.b>
      </div>
    </motion.div>
  )
}
