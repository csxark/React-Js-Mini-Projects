import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiSearch, FiShoppingBag, FiHeart, FiUser, FiMenu, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { currentUser } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setIsOpen(false)
    }
  }

  const headerClasses = `sticky top-0 z-50 w-full transition-all duration-300 ${
    scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-md py-4'
  }`

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-primary-500">
              IndieBazaar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `text-sm font-medium hover:text-primary-500 transition-colors ${
                  isActive ? 'text-primary-500' : 'text-gray-700'
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-sm font-medium hover:text-primary-500 transition-colors ${
                  isActive ? 'text-primary-500' : 'text-gray-700'
                }`
              }
            >
              Our Story
            </NavLink>
            <NavLink 
              to="/sustainable" 
              className={({ isActive }) => 
                `text-sm font-medium hover:text-primary-500 transition-colors ${
                  isActive ? 'text-primary-500' : 'text-gray-700'
                }`
              }
            >
              Sustainability
            </NavLink>
          </nav>

          {/* Search, Cart, and User Icons */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-44 lg:w-64 rounded-full text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
              />
              <FiSearch className="absolute left-3 text-gray-400" />
            </form>

            <Link to="/wishlist" className="relative p-2 text-gray-700 hover:text-primary-500 transition-colors">
              <FiHeart size={20} />
            </Link>

            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-500 transition-colors">
              <FiShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link 
              to={currentUser ? "/profile" : "/login"} 
              className="p-2 text-gray-700 hover:text-primary-500 transition-colors"
            >
              {currentUser ? (
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border-2 border-primary-500"
                />
              ) : (
                <FiUser size={20} />
              )}
            </Link>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t mt-2 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="flex items-center relative">
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full rounded-full text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                />
                <FiSearch className="absolute left-3 text-gray-400" />
              </form>

              <NavLink 
                to="/products" 
                className={({ isActive }) => 
                  `py-2 text-base font-medium ${isActive ? 'text-primary-500' : 'text-gray-700'}`
                }
                onClick={() => setIsOpen(false)}
              >
                Shop
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `py-2 text-base font-medium ${isActive ? 'text-primary-500' : 'text-gray-700'}`
                }
                onClick={() => setIsOpen(false)}
              >
                Our Story
              </NavLink>
              <NavLink 
                to="/sustainable" 
                className={({ isActive }) => 
                  `py-2 text-base font-medium ${isActive ? 'text-primary-500' : 'text-gray-700'}`
                }
                onClick={() => setIsOpen(false)}
              >
                Sustainability
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header