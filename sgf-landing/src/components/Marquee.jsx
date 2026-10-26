import { useRef } from 'react'
import { motion, useAnimationFrame, useInView, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { BUSINESSES } from '../data/businesses'

const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

/** Infinite marquee whose speed, direction and skew react to scroll velocity. */
function VelocityRow({ children, baseVelocity, className }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const skewX = useTransform(smooth, [-3000, 3000], [10, -10])
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
  const dir = useRef(1)
  const ref = useRef(null)
  const inView = useInView(ref)

  useAnimationFrame((_, delta) => {
    if (!inView) return
    let move = dir.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * f
    baseX.set(baseX.get() + move)
  })

  return (
    <div ref={ref} className={`mq ${className}`}>
      <motion.div className="mq-track" style={{ x, skewX }}>
        {[0, 1, 2, 3].map((k) => (
          <span key={k} className="mq-group">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  const items = BUSINESSES.map((b) => (
    <span key={b.id} className="mq-item" style={{ '--c': b.color }}>
      {b.name}
      <b>✦</b>
    </span>
  ))
  return (
    <section className="marquee" aria-hidden="true">
      <VelocityRow baseVelocity={-2} className="mq-solid">
        {items}
      </VelocityRow>
      <VelocityRow baseVelocity={2} className="mq-outline">
        {items}
      </VelocityRow>
    </section>
  )
}
