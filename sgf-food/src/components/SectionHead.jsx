import { motion } from 'motion/react'
import { reveal } from '../lib/motion'

export default function SectionHead({ kicker, title, sub, center = false, children }) {
  return (
    <div className={`sec-head ${center ? 'center' : ''}`}>
      <div>
        <motion.span className="kicker" {...reveal()}>
          {kicker}
        </motion.span>
        <motion.h2 className="sec-title" {...reveal(0.08)}>
          {title}
        </motion.h2>
        {sub && (
          <motion.p className="sec-sub" {...reveal(0.16)}>
            {sub}
          </motion.p>
        )}
      </div>
      {children}
    </div>
  )
}
