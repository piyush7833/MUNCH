"use client"
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import CartIcon from '../partials/CartIcon';
import UserLinks from './UserLinks';
import ModeBtn from '../partials/ModeBtn';
import SearchIcon from '@mui/icons-material/Search';
import { userAuthStore } from '@/utils/userStore';

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Shops", url: "/pages/shops" },
  { id: 3, title: "Products", url: "/pages/product" },
  { id: 4, title: "Contact Us", url: "/pages/contact" },
];
const adminLinks = [
  { id: 2, title: "Shops", url: "/pages/admin/shops" },
  { id: 3, title: "Products", url: "/pages/admin/product" },
  { id: 4, title: "Owners", url: "/pages/admin/shop-owners" },
  { id: 5, title: "Orders", url: "/pages/admin/orders" },
  { id: 6, title: "Contact Us", url: "/pages/admin/contact" },
  { id: 7, title: "Notification", url: "/pages/admin/notification" },
];
const ownerLinks = [
  { id: 1, title: "Add Shop", url: "/pages/add/shop" },
  { id: 2, title: "Add Product", url: "/pages/add/product" },
];
const Menu = () => {
  const [open, SetOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { role } = userAuthStore();
  const handleSearchButtonClick = () => {
    setShowSearchInput(true);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetOpen(false);
    console.log("Searching for:", searchQuery);
  };
  return (
    <div>
      <div className='cursor-pointer text-white'>
        {open === false ? <MenuIcon onClick={() => SetOpen(!open)} /> : <h1 className='text-2xl' onClick={() => SetOpen(!open)} >x</h1>}
      </div>

      {open && <div className='bg-red-500 text-white absolute left-0 right-0 top-12  h-[calc(100vh-3rem)] flex flex-col items-center justify-center text-2xl gap-4 w-full z-10'>
      <ModeBtn />
      {showSearchInput && (
                    <form className="relative" onSubmit={(e)=>handleSearch(e)}>
                        <input
                            type="text"
                            placeholder="Search Products"
                            value={searchQuery}
                            onChange={(e)=>handleSearchInputChange(e)}
                            className="px-3 py-1 text-black rounded-md border-gray-400 focus:outline-none focus:border-gray-600"
                        />
                        <button type='submit' className="absolute right-0 top-0 h-full px-2 bg-main disabled:cursor-not-allowed disabled:bg-gray-200 rounded-r-md hover:bg-green-300 focus:outline-none" disabled={searchQuery.length<=0}>
                            <SearchIcon />
                        </button>
                    </form>
                )}
                {!showSearchInput && (
                    <button onClick={handleSearchButtonClick} className="text-white hover:text-gray-200">
                        <SearchIcon />
                    </button>
                )}
        {links.map(item => (
          <Link key={item.id} href={item.url} className='hover:scale-105 hover:animate-bounce'  onClick={() => SetOpen(false)}>{item.title}</Link>
        ))}
        {role === "ShopOwner" && ownerLinks.map(item => (
          <Link key={item.id}
            href={item.url} className='hover:scale-105 hover:animate-bounce' onClick={() => SetOpen(false)}>{item.title}</Link>
        ))}
        {role === "Admin" && adminLinks.map(item => (
          <Link key={item.id}
            href={item.url} className='hover:scale-105 hover:animate-bounce' onClick={() => SetOpen(false)} >{item.title}</Link>
        ))}
        <Link href='/cart' onClick={() => SetOpen(false)}><CartIcon /></Link>
        <UserLinks onClick={() => SetOpen(false)} />
        
      </div>}
    </div>
  )
}

export default Menu
