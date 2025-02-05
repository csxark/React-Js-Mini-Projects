import Login from './components/Login'
import Profile from './components/Profile'
import UserContextProvider from './context/UseContextProvider' 

function App() {
  

  return (
    <UserContextProvider>
      <section className="flex flex-col items-center justify-center h-screen bg-slate-500 text-center text-gray-900">
      <Login />
      <Profile />
      </section>
    </UserContextProvider>
  )
}

export default App 