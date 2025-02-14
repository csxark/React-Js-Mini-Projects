import {} from 'react'
import { features } from '../constants'
function Features() {
  return (
    <div className='relative mt-20 border-b border-neutral-800 min-h-[800px]'>
        <div className="text-center">
            <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
                Features
            </span>
            <h2 className='text-3xl sm:text-5xl lg:text-6xl mt-5 lg:mt-15 tracking'>
                Easily bulid 
               <span className='bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text'>
                {" "} your code 
                </span>
            </h2>
        </div>
        <div className="flex flex-wrap mt-5 lg:mt-15">
            {features.map((feature,index) => {
                 return(<div key={index} className='w-fullsm:1/2 lg:w-1/3 p-5'>
                    <div className="flex">
                        <div className="flex mx-3 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                        {feature.icon} 
                        </div>
                        <div>
                            <h5 className="mt-1 mb-3 text-xl">{feature.text}</h5>
                            <p className="text-md p-2 mb-10 text-neutral-500">{feature.description}</p>
                        </div>
                    </div>
                </div>
                
            )})}
        </div>
    </div>
  )
}

export default Features