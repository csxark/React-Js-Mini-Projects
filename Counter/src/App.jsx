import { useState,useEffect} from 'react'

import './App.css'
 
function App() {
  let [counter , setCounter] =useState(5)
  useEffect(() => {
    console.log('Counter Value:', counter)
  }, [counter])

  const addValue = () => {
    counter += 1
    setCounter(counter) 
  }
  const subtractValue = () => {
    counter -= 1
    setCounter(counter)
  }
  return ( 
    <>
      <h2>Counter Value:{counter}</h2>
      <button onClick={addValue}>Increment</button>
      <br />
      <button onClick={subtractValue}>Decrement</button>
    </>
  )
}

export default App
