import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheck, FiShield } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function CheckoutPage() {
  const { cart, totalItems, totalPrice, clearCart } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    saveInfo: true
  })
  
  // Validation state
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')
  
  // Calculate shipping fee - free for orders over ₹1999
  const shippingFee = totalPrice >= 1999 ? 0 : 99
  
  // Calculate total amount
  const totalAmount = totalPrice + shippingFee
  
  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      navigate('/cart')
    }
  }, [cart, navigate, orderPlaced])
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    // Required fields
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode']
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required'
      }
    })
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }
    
    // Pincode validation
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode'
    }
    
    // Payment method validation
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required'
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number'
      }
      
      if (!formData.cardExpiry) {
        newErrors.cardExpiry = 'Expiry date is required'
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Please use MM/YY format'
      }
      
      if (!formData.cardCvv) {
        newErrors.cardCvv = 'CVV is required'
      } else if (!/^\d{3}$/.test(formData.cardCvv)) {
        newErrors.cardCvv = 'Please enter a valid 3-digit CVV'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate random order ID
      const randomOrderId = `IB${Math.floor(100000 + Math.random() * 900000)}`
      setOrderId(randomOrderId)
      setOrderPlaced(true)
      clearCart()
    } catch (error) {
      console.error('Error placing order:', error)
      alert('There was an error processing your order. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  if (orderPlaced) {
    return (
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-green-600" size={32} />
            </div>
            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-4">Order Successful!</h1>
            <p className="text-gray-600 mb-2">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <p className="text-gray-900 font-medium mb-8">
              Order ID: {orderId}
            </p>
            <p className="text-gray-600 mb-8">
              We've sent a confirmation email to {formData.email} with all the details of your order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/products')}
                className="btn btn-primary px-8 py-3"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="btn btn-outline px-8 py-3"
              >
                View Order
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Checkout Form */}
            <div className="flex-grow">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`input ${errors.fullName ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input ${errors.email ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`input ${errors.phone ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address*
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`input ${errors.address ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`input ${errors.city ? 'border-red-500' : ''}`}
                          required
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State*
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`input ${errors.state ? 'border-red-500' : ''}`}
                          required
                        />
                        {errors.state && (
                          <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode*
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          className={`input ${errors.pincode ? 'border-red-500' : ''}`}
                          required
                        />
                        {errors.pincode && (
                          <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="saveInfo"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-500 rounded border-gray-300 focus:ring-primary-500"
                      />
                      <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-700">
                        Save this information for next time
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                      />
                      <label htmlFor="card" className="ml-2 block text-sm font-medium text-gray-700">
                        Credit / Debit Card
                      </label>
                    </div>
                    
                    {formData.paymentMethod === 'card' && (
                      <div className="pl-6 mt-3 space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number*
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            className={`input ${errors.cardNumber ? 'border-red-500' : ''}`}
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date*
                            </label>
                            <input
                              type="text"
                              id="cardExpiry"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              className={`input ${errors.cardExpiry ? 'border-red-500' : ''}`}
                            />
                            {errors.cardExpiry && (
                              <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV*
                            </label>
                            <input
                              type="text"
                              id="cardCvv"
                              name="cardCvv"
                              value={formData.cardCvv}
                              onChange={handleChange}
                              placeholder="123"
                              className={`input ${errors.cardCvv ? 'border-red-500' : ''}`}
                            />
                            {errors.cardCvv && (
                              <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                      />
                      <label htmlFor="cod" className="ml-2 block text-sm font-medium text-gray-700">
                        Cash on Delivery
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="upi"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                      />
                      <label htmlFor="upi" className="ml-2 block text-sm font-medium text-gray-700">
                        UPI
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center text-sm text-gray-500">
                    <FiShield className="mr-2" />
                    <p>Your payment information is processed securely.</p>
                  </div>
                </div>
                
                <div className="lg:hidden">
                  <OrderSummary
                    cart={cart}
                    totalItems={totalItems}
                    totalPrice={totalPrice}
                    shippingFee={shippingFee}
                    totalAmount={totalAmount}
                  />
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full py-3 mt-6"
                  >
                    {loading ? 'Processing...' : `Place Order - ₹${totalAmount.toLocaleString()}`}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="hidden lg:block w-80">
              <div className="sticky top-24">
                <OrderSummary
                  cart={cart}
                  totalItems={totalItems}
                  totalPrice={totalPrice}
                  shippingFee={shippingFee}
                  totalAmount={totalAmount}
                />
                
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                  className="btn btn-primary w-full py-3 mt-6"
                >
                  {loading ? 'Processing...' : `Place Order`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderSummary({ cart, totalItems, totalPrice, shippingFee, totalAmount }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h3>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-sm font-medium text-gray-900">
              ₹{(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span className="text-gray-900 font-medium">₹{totalPrice.toLocaleString()}</span>
        </div>
        
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
    </div>
  )
}

export default CheckoutPage