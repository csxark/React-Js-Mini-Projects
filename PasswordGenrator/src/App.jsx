import { useState,useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [number, setnumber] = useState(false)
  const [char, setchar] = useState(false)
  const [password, setpassword] = useState("")
  const passwordref = useRef(null)

  const passwordgenrator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+="0123456789"
    if(char) str+="!@#$%^&*()_+~|}{[]:;?><,./-="
      for (let i = 0; i < length; i++) {
        let random=Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(random)
        
      }
    setpassword(pass)
  }, [length, number, char, setpassword]);

useEffect(() => {
  passwordgenrator()
  }, [length, number, char, passwordgenrator])

const copypaste = useCallback(()=>{
  passwordref.current?.select()
  window.navigator.clipboard.writeText(password)
  passwordref.current?.setSelectionRange(0,40)
},[password])

return (
    <>
      <h1 className="text-4xl text-center text-white my-8">Password Genrator</h1> 
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-4 text-orange-600 text-xl bg-gray-700'><div className='flex rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} readOnly className='outline-none w-full py-1 px-3  text-black' placeholder='Password' ref={passwordref} />
        <button className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0' onClick={copypaste}>Copy</button></div>
      <div className='flex text-xl gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={40} value={length} className='cursor-pointer' onChange={(e) => {
            setlength(e.target.value)
          }} /> <label>Length:{length}</label></div>
        </div>
        <div className='flex items-center gap-x-2'>
          <input type="checkbox" defaultChecked={number} id='numberinput' onChange={() => {
            setnumber((prev) => !prev)
          }} /> <label>Number</label>
          </div>
        <div className='flex items-center gap-x-2'>
          <input type="checkbox" defaultChecked={char} id='charinput' onChange={() => {
            setchar((prev) => !prev)
          }} /><label>Characters</label>
          </div>    
      </div>

    </>
  )
}

export default App