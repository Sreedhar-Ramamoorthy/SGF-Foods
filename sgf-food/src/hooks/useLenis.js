import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Step snapping for full-screen sections marked data-snap (the farm-to-shelf steps).
 * When a scroll comes to rest between two of them, the page glides on to the next one in the
 * direction you were scrolling — so one scroll gesture moves exactly one step. Outside that
 * run of sections the page scrolls freely.
 */
function stepSnap(lenis) {
  let timer
  let dir = 1
  let gliding = false
  const tops = () => [...document.querySelectorAll('[data-snap]')].map((el) => Math.round(el.getBoundingClientRect().top + scrollY))

  const settle = () => {
    if (gliding) return
    const t = tops()
    if (!t.length) return
    const y = lenis.scroll
    // only inside the run of steps (from the first step's top to the last step's top)
    if (y < t[0] - innerHeight * 0.35 || y > t[t.length - 1] + 2) return
    if (t.some((top) => Math.abs(top - y) <= 2)) return // already resting on a step
    const target = dir > 0 ? t.find((top) => top > y) : [...t].reverse().find((top) => top < y)
    if (target === undefined) return
    gliding = true
    lenis.scrollTo(target, { duration: 0.9, lock: true, onComplete: () => (gliding = false) })
  }

  const onScroll = (l) => {
    if (l.direction) dir = l.direction
    clearTimeout(timer)
    timer = setTimeout(settle, 140)
  }
  lenis.on('scroll', onScroll)
  return () => {
    clearTimeout(timer)
    lenis.off('scroll', onScroll)
  }
}

export default function useLenis() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.14, smoothWheel: true })
    window.__lenis = lenis
    const stopSnap = stepSnap(lenis)
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(id)
      stopSnap()
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])
}
