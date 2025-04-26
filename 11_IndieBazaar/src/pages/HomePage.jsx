import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/home/Hero'
import FeaturedProducts from '../components/home/FeaturedProducts'
import CategoryBanner from '../components/home/CategoryBanner'
import BrandStory from '../components/home/BrandStory'
import SustainablePractices from '../components/home/SustainablePractices'
import Newsletter from '../components/home/Newsletter'
import { fetchFeaturedProducts } from '../services/productService'

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchFeaturedProducts()
        setFeaturedProducts(products)
      } catch (error) {
        console.error("Failed to fetch featured products:", error)
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [])

  return (
    <div>
      <Hero />
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Featured Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our handpicked selection of sustainable and ethically produced fashion from India's best indie brands.</p>
          </div>
          
          <FeaturedProducts products={featuredProducts} loading={loading} />
          
          <div className="text-center mt-10">
            <Link 
              to="/products" 
              className="btn btn-primary px-8 py-3"
            >
              View All Collections
            </Link>
          </div>
        </div>
      </motion.section>
      
      <CategoryBanner />
      <BrandStory />
      <SustainablePractices />
      <Newsletter />
    </div>
  )
}

export default HomePage