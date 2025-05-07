import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// Fake user data for demonstration
const DEMO_USERS = [
  {
    id: 1,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    password: 'password123',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 2,
    name: 'Rahul Patel',
    email: 'rahul@example.com',
    password: 'password123',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
]

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('indieBazaarUser')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = (email, password) => {
    setError('')
    const user = DEMO_USERS.find(
      (user) => user.email === email && user.password === password
    )
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user
      setCurrentUser(userWithoutPassword)
      localStorage.setItem('indieBazaarUser', JSON.stringify(userWithoutPassword))
      return true
    } else {
      setError('Invalid email or password')
      return false
    }
  }

  // Signup function
  const signup = (name, email, password) => {
    setError('')
    
    // Check if user already exists
    if (DEMO_USERS.some(user => user.email === email)) {
      setError('User with this email already exists')
      return false
    }
    
    // In a real app, this would make an API call
    // For demo, we'll just create a user object
    const newUser = {
      id: DEMO_USERS.length + 1,
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=C75146&color=fff`
    }
    
    const { password: _, ...userWithoutPassword } = newUser
    setCurrentUser(userWithoutPassword)
    localStorage.setItem('indieBazaarUser', JSON.stringify(userWithoutPassword))
    return true
  }

  // Logout function
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('indieBazaarUser')
  }

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}