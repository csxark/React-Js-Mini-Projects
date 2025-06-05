import { useState } from 'react'
import PropTypes from 'prop-types';
import { useTodo } from '../Contexts/TodoContext';

function TodoItem({todo}) {
    const [todoedit, settodoedit] = useState(false)
    const [todomessage, settodomessage] = useState(todo.todo)
    const {updateTodo,deleteTodo,togglecomplete}= useTodo()

    const editTodo=()=>{
        updateTodo(todo.id,{...todo,todo:todomessage})
        settodoedit(false)
    }

    const togglecompleted=()=>{
        togglecomplete(todo.id)
    }

    return (
        <div
            className={`flex items-center border rounded-lg px-4 py-2.5 gap-x-4 shadow-lg transition-all duration-300 hover:shadow-xl ${
                todo.completed ? 
                "bg-gradient-to-r from-red-900 to-red-800 border-red-700" : 
                "bg-gradient-to-r from-gray-900 to-black border-orange-800"
            }`}
        >
            <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer accent-red-600 rounded-full transition-transform hover:scale-110"
                checked={todo.completed}
                onChange={togglecompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full py-1 px-2 rounded-md transition-all duration-200 text-orange-100 ${
                    todoedit ? "border-red-600 bg-black/50" : "border-transparent bg-transparent"
                } ${todo.completed ? "line-through text-gray-500" : ""}`}
                value={todomessage}
                onChange={(e) => settodomessage(e.target.value)}
                readOnly={!todoedit}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-9 h-9 rounded-lg text-sm border border-orange-800 justify-center items-center bg-black/50 hover:bg-red-950 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:border-red-600"
                onClick={() => {
                    if (todo.completed) return;
                    if (todoedit) {
                        editTodo();
                    } else settodoedit((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {todoedit ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-9 h-9 rounded-lg text-sm border border-red-800 justify-center items-center bg-black/50 hover:bg-red-950 shrink-0 transition-all duration-200 hover:shadow-md hover:border-red-600"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}
TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        todo: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
};

export default TodoItem;

