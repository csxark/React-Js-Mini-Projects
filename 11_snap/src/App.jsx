import { } from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import FeaturedServices from './components/FeaturedServices'
import WhyChooseUs from './components/WhyChooseUs'
// import Testimonials from './components/Testimonials'
function App() {
  

  return (
    <>
     <Navbar />
      <HeroSection />
      <FeaturedServices />
      <WhyChooseUs />
      {/* <Testimonials /> */}
      <Footer />
    </>
  )
}

export default App
