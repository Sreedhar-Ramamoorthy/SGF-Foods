export const EASE = [0.22, 1, 0.36, 1]
export const EASE_IO = [0.76, 0, 0.24, 1]

export const reveal = (delay = 0, y = 40) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.9, ease: EASE, delay },
})

export function scrollToId(id) {
  const lenis = window.__lenis
  if (id === 'top') {
    lenis ? lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
