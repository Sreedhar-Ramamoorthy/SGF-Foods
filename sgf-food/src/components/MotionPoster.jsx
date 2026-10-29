import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { POSTER } from '../data/poster'
import { EASE } from '../lib/motion'

const pad = (i) => String(i + 1).padStart(2, '0')

/**
 * Plays the poster scenes back to back like one film.
 * Only the previous (fading out), current and next clip are mounted, so the page downloads one scene ahead and no more.
 */
export default function MotionPoster({ play }) {
  const [idx, setIdx] = useState(0)
  const [advanced, setAdvanced] = useState(false)
  const refs = useRef({})
  const n = POSTER.length
  const next = (idx + 1) % n
  const prev = (idx - 1 + n) % n // kept mounted so it can fade out under the new clip

  // Start the current clip from the top; pause it while the hero is off screen
  useEffect(() => {
    const v = refs.current[idx]
    if (!v) return
    if (play) {
      if (v.ended) v.currentTime = 0
      v.play().catch(() => {})
    } else v.pause()
  }, [idx, play])

  const advance = () => {
    setAdvanced(true)
    setIdx((i) => (i + 1) % n)
  }
  const s = POSTER[idx]

  return (
    <div className={`poster ${play ? '' : 'is-paused'}`}>
      {POSTER.map((sc, i) =>
        i === idx || i === next || (advanced && i === prev) ? (
          <video
            key={sc.id}
            ref={(el) => (refs.current[i] = el)}
            className={`pv ${i === idx ? 'on' : ''}`}
            src={sc.src}
            poster={sc.poster}
            muted
            playsInline
            preload={i === idx ? 'auto' : 'metadata'}
            onEnded={i === idx ? advance : undefined}
            style={{ animationDuration: `${sc.dur}s`, objectPosition: sc.pos }}
          />
        ) : null,
      )}

      <div className="pv-grade" />
      {s.brand && <div className="pv-gold" />}

      <div className="pv-bars" aria-hidden="true">
        {POSTER.map((sc, i) => (
          <span key={sc.id}>
            <i key={i === idx ? `run-${idx}` : sc.id} className={i < idx ? 'full' : i === idx ? 'run' : ''} style={{ animationDuration: `${sc.dur}s` }} />
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={s.id} className={`pv-text ${s.brand ? 'is-brand' : ''}`} exit={{ opacity: 0, y: -16, transition: { duration: 0.35 } }}>
          {s.brand && (
            <motion.span
              className="pv-logo"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.2 }}
            >
              <img src="/logo.png" alt="" width="96" height="96" />
            </motion.span>
          )}
          <motion.span className="pv-label" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}>
            <b>{pad(idx)}</b> {s.name}
          </motion.span>
          <h2 className="pv-line">
            {s.text.split(/(?<=\.)\s/).map((part, k) => (
              <span key={k} className="ln">
                <motion.span initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.9, ease: EASE, delay: 0.3 + k * 0.12 }}>
                  {part}
                </motion.span>
              </span>
            ))}
          </h2>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
