import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'

const INTERACTIVE = 'a,button,input,textarea,select,label,[data-cursor]'

export default function Cursor() {
  const [enabled] = useState(() => matchMedia('(hover: hover) and (pointer: fine)').matches)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 450, damping: 38, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 450, damping: 38, mass: 0.6 })
  const [state, setState] = useState({ hover: false, label: '' })

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      const t = e.target.closest?.(INTERACTIVE)
      const label = t?.closest('[data-cursor]')?.dataset.cursor || ''
      setState((s) => (s.hover === !!t && s.label === label ? s : { hover: !!t, label }))
    }
    addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    return () => {
      removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div className="cursor-ring" style={{ x: rx, y: ry }}>
        <motion.div
          className={`cursor-ring-in ${state.label ? 'has-label' : ''}`}
          animate={{ scale: state.label ? 2.6 : state.hover ? 1.6 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        />
        <AnimatePresence>
          {state.label && (
            <motion.span
              key={state.label}
              className="cursor-label"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
