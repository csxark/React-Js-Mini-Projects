import {} from 'react'
import {resourcesLinks,platformLinks,communityLinks} from '../constants'
function Footer() {
  return (
    <footer className='mt-20 border-t px-5 py-10 border-neutral-700'>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mr-5">
            <div>
                <h3 className='text-md font-semibold mb-4 '>Resources</h3>
                <ul className='space-y-2'>
                    {resourcesLinks.map((link,index)=>{
                        return(
                            <li key={index}>
                                <a className='text-neutral-300 hover:text-white' href={link.href}>{link.text}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <h3 className='text-md font-semibold mb-4 '>Platform</h3>
                <ul className='space-y-2'>
                    {platformLinks.map((link,index)=>{
                        return(
                            <li key={index}>
                                <a className='text-neutral-300 hover:text-white' href={link.href}>{link.text}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <h3 className='text-md font-semibold mb-4 '>Community</h3>
                <ul className='space-y-2'>
                    {communityLinks.map((link,index)=>{
                        return(
                            <li key={index}>
                                <a className='text-neutral-300 hover:text-white' href={link.href}>{link.text}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer