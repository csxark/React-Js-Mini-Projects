import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart } = useCart()

  const toggleFavorite = (e) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  if (!product) return null

  return (
    <motion.div
      className="card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-t-lg aspect-w-1 aspect-h-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {product.tags && product.tags.includes('new') && (
            <span className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
          
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={toggleFavorite}
              className={`w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md transition-colors ${
                isFavorite ? 'text-primary-500' : 'text-gray-400 hover:text-primary-500'
              }`}
            >
              <FiHeart fill={isFavorite ? 'currentColor' : 'none'} size={16} />
            </button>
          </div>
          
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-3 px-4 transform transition-transform duration-300 ${
              isHovered ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="w-full btn btn-primary flex items-center justify-center gap-2 text-sm"
            >
              <FiShoppingBag size={16} />
              Add to Cart
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {product.brand && (
            <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
          )}
          <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
          <div className="flex justify-between items-start mt-2">
            <div>
              <p className="font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
              {product.originalPrice && (
                <p className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </p>
              )}
            </div>
            
            <div className="flex space-x-1">
              {product.tags && product.tags.includes('sustainable') && (
                <span className="badge badge-sustainable">Sustainable</span>
              )}
              {product.tags && product.tags.includes('handcrafted') && (
                <span className="badge badge-handcrafted">Handcrafted</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard