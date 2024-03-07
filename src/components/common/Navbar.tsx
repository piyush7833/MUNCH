"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CartIcon from '../partials/CartIcon';
import ModeBtn from '../partials/ModeBtn';
import UserLinks from './UserLinks';
import SearchIcon from '@mui/icons-material/Search';
import Menu from './Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { userAuthStore } from '@/utils/userStore';
import { toast } from 'react-toastify';
import { getMessaging, getToken } from 'firebase/messaging';
import app from '@/app/api/utils/firebase';
import ImgContainer from './ImgContainer';
import { httpservice } from '@/utils/httpService';
import { baseUrl } from '@/baseUrl';
import SearchDialog from './SearchDialog';

const links = [
    { id: 1, title: "Home", url: "/" },
    { id: 2, title: "Shops", url: "/pages/shops" },
    { id: 3, title: "Products", url: "/pages/product" },
    { id: 4, title: "Contact Us", url: "/pages/contact" },
];
const adminLinks = [
    { id: 1, title: "Home", url: "/" },
    { id: 2, title: "Shops", url: "/pages/admin/shops" },
    { id: 3, title: "Products", url: "/pages/admin/products" },
    { id: 4, title: "Owners", url: "/pages/admin/shop-owners" },
    { id: 5, title: "Orders", url: "/pages/admin/orders" },
    { id: 6, title: "Contact Us", url: "/pages/admin/contacts" },
    { id: 7, title: "Notification", url: "/pages/admin/notification" },
    { id: 8, title: "Add Shop", url: "/pages/add/shop" },
    { id: 9, title: "Add Product", url: "/pages/add/product" },
];
const ownerLinks = [
    { id: 1, title: "Add Shop", url: "/pages/add/shop" },
    { id: 2, title: "Add Product", url: "/pages/add/product" },
];

const Navbar = () => {
    useEffect(() => {
        userAuthStore.persist.rehydrate()
    }, [])
    const { userName, notificationIds, logIn } = userAuthStore()
    useEffect(() => {
        userName && requestPermission();
    }, [userName]);
    const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
    const [searchData, setSearchData] = useState({ owners: [], products: [], shops: [] });
    const requestPermission = async () => {
        const messaging = getMessaging(app);
        const permission = await Notification.requestPermission();
        try {
            if (permission === "granted") {
                let response = null;
                const token = await getToken(messaging, { vapidKey: "BIiWeWMjEC1Mw3-s_5vEWkAt8LW3xAFKpVMhfL6KxKGU1dMwuXnx__mrOmTz5v0JuIAYSZAZoD_2cbwnAYw-C3U" });
                response = !notificationIds.includes(token) ? await httpservice.put(`${baseUrl}/user`, { notificationId: token }) : null;
                if (response !== null) {
                    logIn(response.data.updatedUser)
                    toast.success("Notification permission granted");
                }
            }
            else {
                toast.warning("Notification permission denied");
            }
        } catch (error: any) {
            console.log(error, "Error in getting notification permission");
            toast.error(error.toString());
        }
    }


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

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
        try {
            const response = await httpservice.put(`${baseUrl}/search`, { query: searchQuery });
            setSearchData({
                owners: response.data.shopOwners,
                products: response.data.products,
                shops: response.data.shops
            });
            setSearchDialogOpen(true)
            console.log(response, "Search response")
        } catch (error) {
            toast.error("Error in searching");
        }
    };

    return (
        <div className='bg-red-500 p-4 h-fit  flex items-center justify-between border-b-2 border-b-red-600 '>
            <div>
                <Link href='/'>
                    <ImgContainer imgUrl='/images/logo.png' alt='logo' type="logo" />
                </Link>
            </div>
            <div className='hidden md:flex gap-4 text-white text-lg items-center flex-wrap justify-end'>
                {showSearchInput && (
                    <form className="relative" onSubmit={(e) => handleSearch(e)}>
                        <input
                            type="text"
                            placeholder="Search"
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
                {role === "User" && <Link href='/pages/cart' className='hover:scale-105 hover:animate-bounce' ><CartIcon /></Link>}

                <div className="relative z-10">
                    <MenuIcon onClick={(e) => { e.preventDefault(); SetOpen(!open); }} className='cursor-pointer text-white' />
                    {open && <div className="absolute min-w-fit w-44 right-0 top-8 border flex flex-col h-auto  shadow-md p-2 rounded-md bg-red-500 border-red-600">
                        {role !== "Admin" && links.map(item => (
                            <Link key={item.id}
                                href={item.url} className='hover:scale-105 hover:animate-bounce cursor-pointer'>
                                <p onClick={() => { SetOpen(false) }} >{item.title}</p>
                            </Link>
                        ))}
                        {role === "ShopOwner" && ownerLinks.map(item => (
                            <Link key={item.id}
                                href={item.url} className='hover:scale-105 hover:animate-bounce cursor-pointer'>
                                <p onClick={() => { SetOpen(false) }} >{item.title}</p>
                            </Link>
                        ))}
                        {role === "Admin" && adminLinks.map(item => (
                            <Link key={item.id}
                                href={item.url} className='hover:scale-105 hover:animate-bounce cursor-pointer'>
                                <p onClick={() => { SetOpen(false) }} >{item.title}</p>
                            </Link>
                        ))}
                        <UserLinks onClick={()=>SetOpen(false)}/>
                    </div>}
                </div>
            </div>
            <div className='md:hidden'>
                <Menu />
            </div>
            {isSearchDialogOpen && <SearchDialog onClose={() => setSearchDialogOpen(false)} data={searchData} />}
        </div>
    );
};

export default Navbar;
