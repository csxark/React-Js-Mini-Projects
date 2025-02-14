import {} from 'react'
import { CheckCircle2 } from 'lucide-react'
import codeImg from '../assets/code.jpg'
import { checklistItems } from '../constants'
function Workflow() {
  return (
    <div className='mt-10'>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
            Accelerate your workflow 
            <span className='bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text'>
            {" "}
            with BrainStorm
            </span>
        </h2>
        <div className="flex flex-wrap justify-center">
            <div className="p-2 w-full sm:w-1/2">
            <img src={codeImg} alt="code" /></div>
        <div className="pt-12 w-full lg:w-1/2">
            { checklistItems.map((item, index) =>{
                return(
                    <div key={index} className="flex items-center mb-5">
                        <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <h5 className="mt-1 mb-2 text-xl">
                                {item.title}
                            </h5>
                            <p className="text-mb text-neutral-500">
                                {item.description}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
        </div>
    </div>
  )
}

export default Workflow