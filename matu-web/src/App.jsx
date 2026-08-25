import { useCallback, useState } from 'react'
import useReveal from './hooks/useReveal'
import useScrollFx from './hooks/useScrollFx'
import { CartProvider } from './context/CartContext'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import CartDrawer from './components/CartDrawer'
import Checkout from './components/Checkout'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import CleanestSip from './components/CleanestSip'
import Shop from './components/Shop'
import OurStory from './components/OurStory'
import WhyMatu from './components/WhyMatu'
import HealthBenefits from './components/HealthBenefits'
import FounderFrame from './components/FounderFrame'
import GrownWithin from './components/GrownWithin'
import Species from './components/Species'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  const handleDone = useCallback(() => setReady(true), [])

  // hold the reveals until the intro curtain has lifted
  useReveal(ready)
  useScrollFx()

  return (
    <CartProvider>
      <div className="page relative">
        <Preloader onDone={handleDone} />
        <ScrollProgress />
        <Header />
        <main>
          <Hero ready={ready} />
          <Marquee
            text="YOUR RITUAL IS WAITING"
            gap="1.9875rem"
            size="1.5rem"
            duration="52s"
          />
          <CleanestSip />
          <Shop />
          <WhyMatu />
          <FounderFrame />
          <GrownWithin />
          <Species />
          <OurStory />
          <Marquee
            text={[
              '🇦🇷',
              'NOT SMOKED',
              'SIP SUAVE',
              'BREW WILD',
              'DRINK MATU',
              'PROTECT THE WILD',
            ]}
            mark="pegasus"
            repeat={12}
            gap="3.797rem"
            size="1.7875rem"
            duration="38s"
          />
          <HealthBenefits />
          <Newsletter />
        </main>
        <Footer />
      </div>

      <CartDrawer />
      <Checkout />
    </CartProvider>
  )
}
