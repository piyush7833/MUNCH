import React from 'react'
// import Logo from '../../public/images/logo.png'
import Image from 'next/image'
import ImgContainer from './ImgContainer'
import Link from 'next/link'
const Footer = () => {
  const links = [
    { id: 1, title: 'Term & Conditions', url: '/pages/terms' },
    { id: 2, title: 'FaQs', url: '/pages/faq' },
    { id: 3, title: 'Help & Support', url: '/pages/contact' },
  ]
  return (
    <div className='h-fit bg-red-500 py-4 px-4 flex items-center justify-between text-base md:text-2xl text-white bottom-0 gap-8 text-center mt-4'>
      <ImgContainer imgUrl='/images/logo.png' alt='logo' type="logo" />
      <div className="links max-w-fit flex gap-4 text-base">
        {links.map(item => (
          <Link key={item.id} href={item.url} className='hover:scale-105 hover:animate-bounce cursor-pointer' >{item.title}</Link>
        ))}
      </div>
    </div>
  )
}

export default Footer
