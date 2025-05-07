import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-4">
              Ethically Made • Sustainable • 100% Indian
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Discover India's Finest <span className="text-primary-500">Artisanal</span> Fashion
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Handcrafted pieces from independent Indian designers who prioritize sustainability, ethical practices, and traditional craftsmanship.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="btn btn-primary px-8 py-3 text-base"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="btn btn-outline px-8 py-3 text-base"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/12677287/pexels-photo-12677287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Model wearing handcrafted Indian fashion"
                className="w-full h-full object-cover"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs"
            >
              <div className="flex items-start gap-3">
                <div className="bg-accent-100 rounded-full p-2 text-accent-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Sustainable Practices</h3>
                  <p className="text-gray-500 text-xs mt-1">Every purchase supports eco-friendly production and fair wages for artisans</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-0 w-full py-6 bg-white/80 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-y-4">
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-gray-500">Trusted by over 10,000+ happy customers</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <span className="text-gray-400 font-serif text-lg">Brand 1</span>
              <span className="text-gray-400 font-serif text-lg">Brand 2</span>
              <span className="text-gray-400 font-serif text-lg">Brand 3</span>
              <span className="text-gray-400 font-serif text-lg">Brand 4</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero