import {useState} from 'react'
import { useTodo } from '../Contexts/TodoContext'

function TodoForm() {
    const [todo, settodo] = useState("")
    const { addTodo } = useTodo()

    const add =(e)=>{
        e.preventDefault()
        if(!todo) return
            addTodo({todo,completed:false})
            settodo("")
    }
        

    return (
        <form onSubmit={add} className="flex group">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-red-600/40 rounded-l-lg px-4 outline-none 
                duration-300 bg-black/40 py-2.5 text-orange-100 
                placeholder:text-orange-500 focus:border-red-500 
                focus:bg-black/60 focus:shadow-[0_0_15px_rgba(255,0,0,0.3)]
                hover:border-red-500/70"
                value={todo}
                onChange={(e)=>settodo(e.target.value)}
            />
            <button type="submit" 
                className="rounded-r-lg px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-500 
                text-white hover:from-red-500 hover:to-red-400 active:from-red-700 
                active:to-red-600 transition-all duration-300 border-y border-r 
                border-red-600/40 hover:border-red-500 
                hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] font-medium
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:shadow-none disabled:hover:border-red-600/40"
                disabled={!todo.trim()}>
                Add
            </button>
        </form>
    );
}

export default TodoForm;

