import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE, EASE_IO } from '../lib/motion'

const TransitionCtx = createContext(() => {})
export const usePageTransition = () => useContext(TransitionCtx)

/** Circular wipe from the click point, then navigate back to the SGF Group site. */
export function TransitionProvider({ children }) {
  const [t, setT] = useState(null)

  const go = useCallback((url, label = 'Sri Gopal Group', e) => {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) {
      window.open(url, '_blank')
      return
    }
    setT({ url, label, x: e?.clientX || innerWidth / 2, y: e?.clientY || innerHeight / 2 })
  }, [])

  useEffect(() => {
    const onShow = (e) => e.persisted && setT(null)
    addEventListener('pageshow', onShow)
    return () => removeEventListener('pageshow', onShow)
  }, [])

  return (
    <TransitionCtx.Provider value={go}>
      {children}
      <AnimatePresence>
        {t && (
          <motion.div
            className="page-transition"
            initial={{ clipPath: `circle(0px at ${t.x}px ${t.y}px)` }}
            animate={{ clipPath: `circle(150vmax at ${t.x}px ${t.y}px)` }}
            transition={{ duration: 0.85, ease: EASE_IO }}
            onAnimationComplete={() => window.location.assign(t.url)}
          >
            <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6, ease: EASE }}>
              {t.label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionCtx.Provider>
  )
}
