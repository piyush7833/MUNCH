"use client"
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import Image from 'next/image';
import CartIcon from './CartIcon';

const links=[
    {id:1,title:"Home",url:"/"},
    {id:2,title:"Menu",url:"/"},
    {id:3,title:"Contact Us",url:"/"},
]
const user=true;
const Menu = () => {
    const [open,SetOpen]=useState(false)
  return (
    <div>
    <div className='cursor-pointer text-white'>
      {open===false?<MenuIcon onClick={()=>SetOpen(!open)} />:<h1 className='text-2xl' onClick={()=>SetOpen(!open)} >x</h1>}
    </div>
    {open && <div className='bg-red-500 text-white absolute left-0 right-0 top-12  h-[calc(100vh-3rem)] flex flex-col items-center justify-center text-2xl gap-4 w-full z-10'>
        {links.map(item=>(
            <Link key={item.id} href={item.url} onClick={()=>SetOpen(false)}>{item.title}</Link>
        ))}
    {!user?<Link href='/auth' onClick={()=>SetOpen(false)} >Login</Link>:<Link href='/orders' onClick={()=>SetOpen(false)}>Orders</Link>}
    <Link href='/cart' onClick={()=>SetOpen(false)}><CartIcon/></Link>
    </div>}
    </div>
  )
}

export default Menu
