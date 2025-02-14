import { } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Features from './Components/Features'
import Workflow from './Components/Workflow'
import Pricing from './Components/Pricing'
import Testimonals from './Components/Testimonals'
import Footer from './Components/Footer'


function App() {

  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto pt-20 px-6">
    <Hero/>
    <Features/>
    <Workflow />
    <Pricing/>
    <Testimonals />
    </div>
    <Footer/>
    </>
  )
}

export default App
