import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8">
          <h1 className="text-primary-500 font-serif text-8xl font-bold mb-2">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="btn btn-primary px-8 py-3 inline-block"
          >
            Back to Home
          </Link>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <p className="text-gray-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage