import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import useLenis from './hooks/useLenis'
import { scrollToId } from './lib/motion'
import { TransitionProvider } from './components/Transition'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import BusinessGrid from './components/BusinessGrid'
import BusinessStack from './components/BusinessStack'
import Contact from './components/Contact'
import Footer from './components/Footer'

const seenThisSession = () => {
  try {
    return sessionStorage.getItem('sgf-seen') === '1'
  } catch {
    return false
  }
}

export default function App() {
  // The preloader only plays on the first visit of a session, so returning from SGF Foods is instant.
  const [ready, setReady] = useState(seenThisSession)
  useLenis(ready)

  const done = useCallback(() => {
    try {
      sessionStorage.setItem('sgf-seen', '1')
    } catch {
      /* storage unavailable */
    }
    setReady(true)
  }, [])

  // Deep links such as /#transport (used by the SGF Foods footer)
  useEffect(() => {
    if (!ready || !location.hash) return
    const t = setTimeout(() => scrollToId(location.hash.slice(1)), 300)
    return () => clearTimeout(t)
  }, [ready])

  return (
    <MotionConfig reducedMotion="user">
      <TransitionProvider>
        <AnimatePresence>{!ready && <Preloader key="pl" onDone={done} />}</AnimatePresence>
        <Cursor />
        <ScrollProgress />
        <div className="noise" />
        <Navbar ready={ready} />
        <main>
          <Hero ready={ready} />
          <Marquee />
          <About />
          <BusinessGrid />
          <BusinessStack />
          <Contact />
        </main>
        <Footer />
      </TransitionProvider>
    </MotionConfig>
  )
}
