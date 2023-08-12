import React from 'react'
import Menu from './Menu'
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/images/logo.png'
import CartIcon from './CartIcon';

const  user = true;
const links = [
    { id: 1, title: "Home", url: "/" },
    { id: 2, title: "Menu", url: "/menu" },
    { id: 3, title: "Contact Us", url: "/contact" },
]
const Navbar = () => {
    return (
        <div className='bg-red-500 px-4 h-12 flex items-center justify-between border-b-2 border-b-red-600'>
            <div>
                <Link href='/'>
                    <Image src={Logo} alt='logo' className='h-fit  w-20' />
                </Link>
            </div>
            <div className='hidden md:flex gap-4 text-white text-lg'>
                {links.map(item => (
                    <Link key={item.id} href={item.url} className='hover:scale-105 hover:animate-bounce' >{item.title}</Link>
                ))}
                {!user ? <Link href='/auth' className='hover:scale-105 hover:animate-bounce' >Login</Link> : <Link href='/orders' className='hover:scale-105 hover:animate-bounce' >Orders</Link>}
                <Link href='./cart' className='hover:scale-105 hover:animate-bounce' ><CartIcon/></Link>
            </div>
            <div className='md:hidden'>
                <Menu />
            </div>
        </div>
    )
}

export default Navbar
