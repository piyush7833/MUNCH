import React from 'react'
import Image from 'next/image'
import NavLogo from '../../public/Images/NavLogo.png'
const Footer = (props: { theme:boolean |undefined}) => {
  return (
    <div className='flex bg-slate-500 rounded-xl items-center justify-between'>
      <div className="logo flex">
        <Image className='h-20 w-5/6 mx-2'
          src={NavLogo}
          alt="Logo"
        />
      </div>
      <div className="list flex justify-evenly">
        <ul>
          <li>Connect with me on</li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
