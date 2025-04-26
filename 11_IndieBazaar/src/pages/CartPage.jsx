import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function CartPage() {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponError, setCouponError] = useState('')
  
  // Calculate shipping fee - free for orders over ₹1999
  const shippingFee = totalPrice >= 1999 ? 0 : 99
  
  // Calculate total amount
  const totalAmount = totalPrice - discount + shippingFee
  
  // Handle coupon application
  const applyCoupon = () => {
    setCouponError('')
    
    // For demo purposes
    if (couponCode.toUpperCase() === 'INDIE100') {
      setDiscount(Math.min(100, totalPrice * 0.1)) // 10% off, max ₹100
    } else if (couponCode.toUpperCase() === 'WELCOME20') {
      setDiscount(Math.min(200, totalPrice * 0.2)) // 20% off, max ₹200
    } else {
      setCouponError('Invalid coupon code')
    }
  }
  
  // Proceed to checkout
  const proceedToCheckout = () => {
    if (!currentUser) {
      // Redirect to login with return URL
      navigate('/login', { state: { from: { pathname: '/cart' } } })
    } else {
      navigate('/checkout')
    }
  }
  
  if (cart.length === 0) {
    return (
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-primary-500 mb-6">
              <FiShoppingBag size={64} className="mx-auto" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/products"
              className="btn btn-primary px-8 py-3"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="flex-grow">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Remove</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.tr
                          key={item.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </div>
                                {item.brand && (
                                  <div className="text-sm text-gray-500">
                                    {item.brand}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{item.price.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-md text-gray-400 hover:text-gray-500"
                              >
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <span className="mx-2 text-gray-700">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-md text-gray-400 hover:text-gray-500"
                              >
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <Link
                  to="/products"
                  className="flex items-center text-primary-500 hover:text-primary-600 transition-colors"
                >
                  <FiArrowLeft className="mr-2" size={16} />
                  <span>Continue Shopping</span>
                </Link>
                
                <button
                  onClick={clearCart}
                  className="text-gray-500 hover:text-gray-600 text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-80">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="text-gray-900 font-medium">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600 font-medium">- ₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">
                      {shippingFee === 0 ? 'Free' : `₹${shippingFee.toLocaleString()}`}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-gray-900 font-bold">Total</span>
                    <span className="text-gray-900 font-bold">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Coupon */}
                <div className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                    Apply Coupon Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="input rounded-r-none"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md font-medium hover:bg-gray-300 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-sm mt-1">{couponError}</p>
                  )}
                  {discount > 0 && (
                    <p className="text-green-600 text-sm mt-1">Coupon applied successfully!</p>
                  )}
                </div>
                
                <button
                  onClick={proceedToCheckout}
                  className="btn btn-primary w-full py-3"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage