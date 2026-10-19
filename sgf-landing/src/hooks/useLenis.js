import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useLenis(enabled) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    window.__lenis = lenis
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  useEffect(() => {
    const lenis = window.__lenis
    if (enabled) lenis?.start()
    else lenis?.stop()
    document.body.classList.toggle('is-locked', !enabled)
  }, [enabled])
}
