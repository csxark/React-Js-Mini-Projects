import { useEffect, useState } from 'react'
import { Todoprovider } from './Contexts/TodoContext'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/Todoitems'


function App() {
  const [todos,setTodos]=useState([])

  const addTodo=(todo)=>{
    setTodos((prevTodos)=>[{id:Date.now(),...todo},...prevTodos])
  }

  const updateTodo=(id,todo)=>{
    setTodos((prevTodos)=>prevTodos.map((t)=>t.id===id?{...t,todo}:t))
  }

  const deleteTodo=(id)=>{
    setTodos((prevTodos)=>prevTodos.filter((t)=>t.id!==id))
  }

  const togglecomplete=(id)=>{
    setTodos((prevTodos)=>prevTodos.map((t)=>t.id===id?{...t,completed:!t.completed}:t))
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos")) 
    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])



  return (
    <Todoprovider value={{todos, addTodo, updateTodo, deleteTodo, togglecomplete}}>
      <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen py-12 px-4">
        <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-xl px-8 py-8 bg-black/40 backdrop-blur-lg border border-red-900/30 hover:shadow-red-500/10">
          <h1 className="text-5xl font-extrabold text-center mb-10 mt-2 px-0.5 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-red-500 animate-gradient">
            Manage Your Todos
          </h1>
          <div className="mb-6">
            <TodoForm />
          </div>
          <div className="flex flex-col gap-4">
            {todos.map((todo) => (
              <div 
                key={todo.id} 
                className="w-full transition-all duration-300 hover:translate-x-1"
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Todoprovider>
  )
}

export default App
