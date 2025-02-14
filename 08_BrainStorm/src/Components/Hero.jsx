import {} from 'react'
import video1 from '../assets/video1.mp4'
import video2 from '../assets/video2.mp4'

function Hero() {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
            Welcome to 
          <span className='bg-gradient-to-r from-orange-400 to-orange-700 text-transparent bg-clip-text font-bold'>
             {" "} BrainStorm
          </span>
        </h1>
        <p className='mt-8 text-lg text-center text-neutral-500 max-w-4xl'>
        Empower your creativity and bring your VR app ideas to life with our
        intuitive development tools. Get started today and turn your imagination
        into immersive reality!
        </p>
        <div className="flex justtify-center my-10">
          <a href="#" className="bg-gradient-to-r from-orange-400 to-orange-700 text-white px-4 py-3 rounded-lg text-lg mx-3">Get Started 
          </a>
          <a href="" className="py-3 px-4 mx-3 rounded-md border">
            Documentation 
          </a>
        </div>
        <div className="flex mt-10 justify-center">
          <video autoPlay loop muted className='rounded-md w-1/2 border border-orange-400 shadow-orange-400 mx-2 my-4'>
            <source src={video1} type='video/mp4'/> 
          </video>
          <video autoPlay loop muted className='rounded-md w-1/2 border border-orange-400 shadow-orange-400 mx-2 my-4'>
            <source src={video2} type='video/mp4'/> 
          </video>
        </div>
    </div>
  ) 
}

export default Hero