import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addTodo} from '../features/todo/TodoSlice.js' 

function AddTodo() {

    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()
        dispatch(addTodo(input)),
        setInput('')
    }

  return (
    <form onSubmit={addTodoHandler} className="max-w-md mx-auto p-4 mt-12">
      <input
        type="text"
        className="w-full md:w-2/3 bg-gray-800 rounded-lg border border-gray-700 
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 
        text-base outline-none text-gray-100 py-2 px-4 
        leading-8 transition-colors duration-200 ease-in-out
        placeholder-gray-400"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 text-white bg-indigo-600 border-0 py-2 px-6 
        focus:outline-none hover:bg-indigo-700 rounded-lg text-lg
        transition-colors duration-200 shadow-lg hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!input.trim()}
      >
        Add Todo
      </button>
    </form>
  )
}

export default AddTodo