import React from 'react'
// import Logo from '../../public/images/logo.png'
import Image from 'next/image'
const Footer = () => {
  return (
    <div className='h-fit bg-red-500 py-4 px-4 flex items-center justify-between text-base md:text-2xl text-white bottom-0 gap-8 text-center'>
      <Image src={"/images/logo.png"} width={10} height={10} alt='logo' className=' h-10 w-24 md:h-14 md:w-32'/>
      <p>Made with love by Piyush</p>
    </div>
  )
}

export default Footer
