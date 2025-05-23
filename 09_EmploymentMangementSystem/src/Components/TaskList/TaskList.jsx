import {} from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
    return (
        <div className='h-[50%] overflow-x-auto scrollbar-thin scrollbar-thumb-emerald-500 
          scrollbar-track-gray-700 flex items-center justify-start gap-5 flex-nowrap 
          w-full py-1 mt-16 px-2'>
            {data.tasks.length === 0 ? (
                <div className="w-full text-center text-gray-500">
                    No tasks available
                </div>
            ) : (
                data.tasks.map((elem, idx) => {
                    if (elem.active) return <AcceptTask key={idx} data={elem} />
                    if (elem.newTask) return <NewTask key={idx} data={elem} />
                    if (elem.completed) return <CompleteTask key={idx} data={elem} />
                    if (elem.failed) return <FailedTask key={idx} data={elem} />
                })
            )}
        </div>
    )
}

export default TaskList