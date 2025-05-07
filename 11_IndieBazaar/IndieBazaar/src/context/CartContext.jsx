import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Initialize cart from localStorage if available
  useEffect(() => {
    const savedCart = localStorage.getItem('indieBazaarCart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Update localStorage and totals whenever cart changes
  useEffect(() => {
    localStorage.setItem('indieBazaarCart', JSON.stringify(cart))
    
    // Calculate totals
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
    const price = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    
    setTotalItems(itemCount)
    setTotalPrice(price)
  }, [cart])

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      // Check if item is already in cart
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id)
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        }
        return updatedCart
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity }]
      }
    })
  }

  // Update quantity of cart item
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  // Clear entire cart
  const clearCart = () => {
    setCart([])
  }

  const value = {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}