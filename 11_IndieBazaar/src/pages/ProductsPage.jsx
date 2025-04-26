import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../components/product/ProductCard'
import { fetchProducts } from '../services/productService'

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  
  // Get filter values from URL params
  const initialCategory = searchParams.get('category') || ''
  const initialSearch = searchParams.get('search') || ''
  const initialMinPrice = searchParams.get('minPrice') || ''
  const initialMaxPrice = searchParams.get('maxPrice') || ''
  const initialSort = searchParams.get('sort') || 'newest'
  
  // Filter state
  const [filters, setFilters] = useState({
    category: initialCategory,
    search: initialSearch,
    minPrice: initialMinPrice,
    maxPrice: initialMaxPrice,
    sort: initialSort,
    tags: searchParams.get('tag') ? [searchParams.get('tag')] : []
  })

  // Categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'home', name: 'Home Decor' }
  ]
  
  // Tags
  const tags = [
    { id: 'sustainable', name: 'Sustainable' },
    { id: 'handcrafted', name: 'Handcrafted' },
    { id: 'new', name: 'New Arrivals' },
    { id: 'best-seller', name: 'Best Sellers' }
  ]
  
  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'best-seller', label: 'Best Sellers' }
  ]
  
  // Load products on page load and when filters change
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const data = await fetchProducts(filters)
        setProducts(data)
      } catch (err) {
        setError('Failed to load products. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    getProducts()
    
    // Update URL params
    const params = new URLSearchParams()
    if (filters.category) params.set('category', filters.category)
    if (filters.search) params.set('search', filters.search)
    if (filters.minPrice) params.set('minPrice', filters.minPrice)
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
    if (filters.sort) params.set('sort', filters.sort)
    if (filters.tags.length === 1) params.set('tag', filters.tags[0])
    
    setSearchParams(params)
  }, [filters, setSearchParams])
  
  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setFilters(prev => ({
      ...prev,
      category: categoryId === 'all' ? '' : categoryId
    }))
  }
  
  // Handle tag toggle
  const handleTagToggle = (tagId) => {
    setFilters(prev => {
      if (prev.tags.includes(tagId)) {
        return {
          ...prev,
          tags: prev.tags.filter(id => id !== tagId)
        }
      } else {
        return {
          ...prev,
          tags: [...prev.tags, tagId]
        }
      }
    })
  }
  
  // Handle price range changes
  const handlePriceChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Handle sort change
  const handleSortChange = (e) => {
    setFilters(prev => ({
      ...prev,
      sort: e.target.value
    }))
  }
  
  // Handle search
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const searchValue = e.target.search.value
    setFilters(prev => ({
      ...prev,
      search: searchValue
    }))
  }
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      minPrice: '',
      maxPrice: '',
      sort: 'newest',
      tags: []
    })
  }
  
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Artisanal Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Shop our curated collection of sustainably made, handcrafted products from India's finest independent artisans.
          </p>
        </div>
        
        {/* Search and Sort */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <form onSubmit={handleSearchSubmit} className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  defaultValue={filters.search}
                  placeholder="Search products..."
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            
            <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2 hidden md:inline">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={filters.sort}
                  onChange={handleSortChange}
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="md:hidden bg-white px-3 py-2 rounded-lg border border-gray-300 flex items-center text-sm font-medium"
              >
                <FiFilter className="mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-bold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        (category.id === 'all' && !filters.category) || filters.category === category.id
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <h3 className="text-lg font-bold mb-3">Product Features</h3>
                <div className="space-y-2">
                  {tags.map(tag => (
                    <label
                      key={tag.id}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.tags.includes(tag.id)}
                        onChange={() => handleTagToggle(tag.id)}
                        className="rounded text-primary-500 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="text-gray-700">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="text-lg font-bold mb-3">Price Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                      Min (₹)
                    </label>
                    <input
                      type="number"
                      id="minPrice"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handlePriceChange}
                      min="0"
                      className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                      Max (₹)
                    </label>
                    <input
                      type="number"
                      id="maxPrice"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handlePriceChange}
                      min="0"
                      className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="text-primary-500 font-medium text-sm hover:text-primary-600 transition"
              >
                Clear all filters
              </button>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="card animate-pulse">
                    <div className="aspect-w-1 aspect-h-1 rounded-t-lg bg-gray-200 w-full" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-6 bg-gray-200 rounded w-1/4 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {error ? (
                  <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-4">
                    {error}
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-16">
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">No products found</h2>
                    <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
                    <button
                      onClick={clearFilters}
                      className="btn btn-primary px-6"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Sidebar */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex md:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="ml-auto w-4/5 max-w-xs bg-white h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-gray-500"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                
                <div className="space-y-8">
                  {/* Categories */}
                  <div>
                    <h3 className="text-lg font-bold mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => {
                            handleCategoryChange(category.id)
                            setMobileFiltersOpen(false)
                          }}
                          className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                            (category.id === 'all' && !filters.category) || filters.category === category.id
                              ? 'bg-primary-50 text-primary-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div>
                    <h3 className="text-lg font-bold mb-3">Product Features</h3>
                    <div className="space-y-2">
                      {tags.map(tag => (
                        <label
                          key={tag.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={filters.tags.includes(tag.id)}
                            onChange={() => handleTagToggle(tag.id)}
                            className="rounded text-primary-500 focus:ring-primary-500 h-4 w-4"
                          />
                          <span className="text-gray-700">{tag.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <h3 className="text-lg font-bold mb-3">Price Range</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="mobileMinPrice" className="block text-sm font-medium text-gray-700 mb-1">
                          Min (₹)
                        </label>
                        <input
                          type="number"
                          id="mobileMinPrice"
                          name="minPrice"
                          value={filters.minPrice}
                          onChange={handlePriceChange}
                          min="0"
                          className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="mobileMaxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                          Max (₹)
                        </label>
                        <input
                          type="number"
                          id="mobileMaxPrice"
                          name="maxPrice"
                          value={filters.maxPrice}
                          onChange={handlePriceChange}
                          min="0"
                          className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => {
                      clearFilters()
                      setMobileFiltersOpen(false)
                    }}
                    className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="flex-1 py-2 bg-primary-500 text-white rounded-lg font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductsPage