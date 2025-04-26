import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhoneCall } from 'react-icons/fi'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-serif font-bold text-primary-500">
                IndieBazaar
              </span>
            </Link>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Your marketplace for sustainable, ethically produced fashion from India's finest indie brands. 
              Celebrating craftsmanship and tradition.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-base font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=clothing" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/products?category=home" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link to="/products?tag=new" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products?tag=best-seller" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-base font-semibold mb-4">Help</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600 text-sm">
                <FiMail className="mr-2" />
                <span>support@indiebazaar.com</span>
              </li>
              <li className="flex items-center text-gray-600 text-sm">
                <FiPhoneCall className="mr-2" />
                <span>+91 99999 88888</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full"
                />
                <button className="bg-primary-500 text-white px-4 py-2 text-sm font-medium rounded-r-md hover:bg-primary-600 transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} IndieBazaar. All Rights Reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-primary-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-primary-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer