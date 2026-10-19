import { MotionConfig } from 'motion/react'
import useLenis from './hooks/useLenis'
import { CartProvider } from './context/Cart'
import { TransitionProvider } from './components/Transition'
import EnterOverlay from './components/EnterOverlay'
import GroupBar from './components/GroupBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Tapes from './components/Tapes'
import Menu from './components/Menu'
import Specials from './components/Specials'
import HowItWorks from './components/HowItWorks'
import Reviews from './components/Reviews'
import Cta from './components/Cta'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

export default function App() {
  useLenis()
  return (
    <MotionConfig reducedMotion="user">
      <TransitionProvider>
        <CartProvider>
          <EnterOverlay />
          <GroupBar />
          <Navbar />
          <main>
            <Hero />
            <Tapes />
            <Menu />
            <Specials />
            <HowItWorks />
            <Reviews />
            <Cta />
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </TransitionProvider>
    </MotionConfig>
  )
}
