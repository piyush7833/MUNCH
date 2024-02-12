"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartIcon from '../partials/CartIcon';
import ModeBtn from '../partials/ModeBtn';
import UserLinks from './UserLinks';
import SearchIcon from '@mui/icons-material/Search';
import Menu from './Menu';
import MenuIcon from '@mui/icons-material/Menu';
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
];
const ownerLinks = [
    { id: 1, title: "Add Shop", url: "/pages/add/shop" },
    { id: 2, title: "Add Product", url: "/pages/add/product" },
];

const Navbar = () => {
    const [open, SetOpen] = useState(false);
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
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className='bg-red-500 p-4 h-fit  flex items-center justify-between border-b-2 border-b-red-600 '>
            <div>
                <Link href='/'>
                    <Image src={"/images/logo.png"} alt='logo' className='h-fit  w-20' width={10} height={10} />
                </Link>
            </div>
            <div className='hidden md:flex gap-4 text-white text-lg items-center flex-wrap justify-end'>
                {showSearchInput && (
                    <form className="relative" onSubmit={(e) => handleSearch(e)}>
                        <input
                            type="text"
                            placeholder="Search Products"
                            value={searchQuery}
                            onChange={(e) => handleSearchInputChange(e)}
                            className="px-3 py-1 text-black rounded-md border-gray-400 focus:outline-none focus:border-gray-600"
                        />
                        <button type='submit' className="absolute right-0 top-0 h-full px-2 bg-main disabled:cursor-not-allowed disabled:bg-gray-200 rounded-r-md hover:bg-green-300 focus:outline-none" disabled={searchQuery.length <= 0}>
                            <SearchIcon />
                        </button>
                    </form>
                )}
                {!showSearchInput && (
                    <button onClick={handleSearchButtonClick} className="text-white hover:text-gray-200">
                        <SearchIcon />
                        Search
                    </button>
                )}
                <ModeBtn />
                <Link href='/pages/cart' className='hover:scale-105 hover:animate-bounce' ><CartIcon /></Link>
                
            <div className="relative">
                <MenuIcon onClick={() => SetOpen(!open)} className='cursor-pointer text-white' />
                {open && <div className="absolute w-40 right-0 top-8 border flex flex-col  shadow-md p-2 rounded-md bg-red-500 border-red-600">
                    {links.map(item => (
                        <Link key={item.id} href={item.url} className='hover:scale-105 hover:animate-bounce block'onClick={()=>{SetOpen(false)}} >{item.title}</Link>
                    ))}
                    {role === "ShopOwner" && ownerLinks.map(item => (
                        <Link key={item.id}
                            href={item.url} className='hover:scale-105 hover:animate-bounce block' onClick={()=>{SetOpen(false)}} >{item.title}</Link>
                    ))}
                    {role === "Admin" && adminLinks.map(item => (
                        <Link key={item.id}
                            href={item.url} className='hover:scale-105 hover:animate-bounce block'onClick={()=>{SetOpen(false)}} >{item.title}</Link>
                    ))}
                    <UserLinks />
                </div>}
            </div>
            </div>
            <div className='md:hidden'>
                <Menu />
            </div>

        </div>
    );
};

export default Navbar;
