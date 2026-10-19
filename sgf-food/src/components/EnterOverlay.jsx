import { motion } from 'motion/react'
import { EASE, EASE_IO } from '../lib/motion'

/** Orange curtain that continues the colour wipe started on the SGF Group site, then lifts. */
export default function EnterOverlay() {
  return (
    <motion.div
      className="enter"
      aria-hidden="true"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.95, ease: EASE_IO, delay: 0.3 }}
    >
      <motion.span initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -50 }} transition={{ duration: 0.55, ease: EASE, delay: 0.25 }}>
        Sri Gopal <em>Foods</em>
      </motion.span>
    </motion.div>
  )
}
