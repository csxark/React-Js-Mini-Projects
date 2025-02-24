import { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './Context/AuthProvider'
import { getLocalStorage  } from './utils/localStorage'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, SetUserData] = useContext(AuthContext)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')

    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }

  }, [])


  const handleLogin = (email, password) => {
    const { admin } = getLocalStorage()
    
    // Check admin login
    if (admin.find(a => a.email === email && a.password === password)) {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
      return
    }
  
    // Check employee login
    if (userData) {
      const employee = userData.find(e => e.email === email && e.password === password)
      if (employee) {
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ 
          role: 'employee', 
          data: employee 
        }))
        return
      }
    }
  
    alert("Invalid Credentials")
  }



  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user == 'admin' ? <AdminDashboard changeUser={setUser} /> : (user == 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : null)}
    </>
  )
}

export default App