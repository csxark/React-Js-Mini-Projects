import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiShoppingBag, FiHeart, FiArrowLeft, FiTruck, FiPackage, FiRefreshCw } from 'react-icons/fi'
import { fetchProductById } from '../services/productService'
import { useCart } from '../context/CartContext'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const { addToCart } = useCart()
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const data = await fetchProductById(id)
        setProduct(data)
        setSelectedImage(0)
      } catch (err) {
        setError('Product not found')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [id])
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    if (value > 0) {
      setQuantity(value)
    }
  }
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      
      // Show a toast or some feedback
      window.alert(`${quantity} ${product.name} added to cart!`)
    }
  }
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 w-full" />
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-200 rounded-lg aspect-w-1 aspect-h-1" />
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
                <div className="h-10 bg-gray-200 rounded w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</h2>
          <p className="text-gray-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/products')}
            className="btn btn-primary px-6"
          >
            <FiArrowLeft className="mr-2" />
            Back to Products
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/products')}
              className="flex items-center text-primary-500 hover:text-primary-600 transition-colors"
            >
              <FiArrowLeft className="mr-2" size={16} />
              <span>Back to Products</span>
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12">
            {/* Product Images */}
            <div className="w-full md:w-1/2">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg overflow-hidden aspect-w-1 aspect-h-1 bg-gray-100"
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg overflow-hidden aspect-w-1 aspect-h-1 ${
                      selectedImage === index 
                        ? 'ring-2 ring-primary-500' 
                        : 'ring-1 ring-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="w-full md:w-1/2">
              {product.brand && (
                <h2 className="text-sm text-gray-500 mb-2">{product.brand}</h2>
              )}
              
              <h1 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-baseline mb-6">
                <div className="text-2xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </div>
                {product.originalPrice && (
                  <div className="ml-3 text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </div>
                )}
                {product.originalPrice && (
                  <div className="ml-3 text-sm font-medium text-green-600">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                  </div>
                )}
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const hasReviews = product.reviews && product.reviews.length > 0
                    const avgRating = hasReviews
                      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
                      : 0
                    
                    return (
                      <FiStar
                        key={index}
                        className={`${
                          index < Math.floor(avgRating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        } h-5 w-5`}
                      />
                    )
                  })}
                </div>
                <div className="ml-2 text-sm text-gray-600">
                  {product.reviews ? product.reviews.length : 0} reviews
                </div>
              </div>
              
              <div className="prose prose-sm mb-6 text-gray-600">
                <p>{product.description}</p>
              </div>
              
              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map(tag => {
                    let badgeClass = 'badge'
                    
                    if (tag === 'sustainable') badgeClass += ' badge-sustainable'
                    else if (tag === 'handcrafted') badgeClass += ' badge-handcrafted'
                    else if (tag === 'organic') badgeClass += ' badge-organic'
                    else badgeClass += ' bg-gray-100 text-gray-600'
                    
                    return (
                      <span key={tag} className={badgeClass}>
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </span>
                    )
                  })}
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 border-y border-gray-300 py-2 text-center focus:outline-none"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart and Wishlist */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-1 py-3 flex items-center justify-center gap-2"
                >
                  <FiShoppingBag size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={toggleFavorite}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md border ${
                    isFavorite
                      ? 'border-primary-500 text-primary-500 bg-primary-50'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <FiHeart
                    size={18}
                    className={isFavorite ? 'fill-current' : ''}
                  />
                  {isFavorite ? 'Added to Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
              
              {/* Shipping Info */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-start">
                  <FiTruck className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Free Shipping</h3>
                    <p className="text-sm text-gray-500">On orders over ₹1999</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiPackage className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Sustainable Packaging</h3>
                    <p className="text-sm text-gray-500">Plastic-free and biodegradable</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiRefreshCw className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Easy Returns</h3>
                    <p className="text-sm text-gray-500">10-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button className="border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                  Product Details
                </button>
                <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                  Reviews ({product.reviews ? product.reviews.length : 0})
                </button>
                <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                  Artisan Story
                </button>
              </nav>
            </div>
            
            <div className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Sustainable Features */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Sustainable Features</h3>
                  <ul className="space-y-2">
                    {product.sustainableFeatures && product.sustainableFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Artisan Info */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Artisan Information</h3>
                  {product.artisan && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium">{product.artisan.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{product.artisan.location}</p>
                      <p className="text-gray-600 text-sm">{product.artisan.story}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage