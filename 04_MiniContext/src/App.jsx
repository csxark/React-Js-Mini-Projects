import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import UserContextProvider from './context/UseContextProvider' 

function App() {
  

  return (
    <UserContextProvider>
      <section className='flex flex-col justify-center items-center h-screen bg-slate-700 text-white'>
      <h1>React with Chai and share is important</h1>
      <Login />
      <Profile /></section>
    </UserContextProvider>
  )
}

export default App 