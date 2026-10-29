import { MotionConfig } from 'motion/react'
import useLenis from './hooks/useLenis'
import { ChipTypeProvider } from './context/ChipType'
import { TransitionProvider } from './components/Transition'
import EnterOverlay from './components/EnterOverlay'
import GroupBar from './components/GroupBar'
import Navbar from './components/Navbar'
import HeroZoom from './components/HeroZoom'
import Tapes from './components/Tapes'
import Journey from './components/Journey'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useLenis()
  return (
    <MotionConfig reducedMotion="user">
      <TransitionProvider>
        <ChipTypeProvider>
          <EnterOverlay />
          <GroupBar />
          <Navbar />
          <main>
            <HeroZoom />
            <Tapes />
            <Journey />
            <Process />
            <Contact />
          </main>
          <Footer />
        </ChipTypeProvider>
      </TransitionProvider>
    </MotionConfig>
  )
}
