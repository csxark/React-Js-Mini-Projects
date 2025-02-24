import {} from 'react'

const NewTask = ({data}) => {
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-opacity-90 bg-green-400 rounded-xl 
          transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded-full font-medium'>{data.category}</h3>
                <h4 className='text-sm font-medium'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold line-clamp-1'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 line-clamp-3 text-gray-800'>
                {data.taskDescription}
            </p>
            <div className='mt-6'>
                <button className='w-full bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg 
                  font-medium py-2 px-4 text-sm text-white'>Accept Task</button>
            </div>
        </div>
    )
}

export default NewTask