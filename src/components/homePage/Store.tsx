import React from 'react'
import Link from 'next/link'
import { MenuType } from '@/types/types';
import axios from 'axios';
// import { menu } from '@/data'
const apiUrl = process.env.BASEURL;
const getData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/shop`, {
      headers: { 'Cache-Control': 'no-store' },
    });
    return response.data;
  } catch (error) {
    // toast.error("Something went wrong")
  }
}
const Store =async () => {
  const menu:any=await getData();
  const data:MenuType=menu.allShops;
  return (
    
    <div className='store-container hideScrollBar'>
      {data.map((shop:any)=>(
        <Link href={`/menu/${shop.slug}`} key={shop.id} className={`store-shop-container shadow-2xl group `} style={{backgroundImage:`url(${shop.img})`}}>
          <div className=''>
            <div className={`w-[45vw] sm:w-[25vw] overflow-clip flex flex-col items-center`}>
            <h1 className='store-shop-title p-2 group-hover:bg-black group-hover:bg-opacity-50 rounded-xl'>{shop.title}</h1>
            <p className={`store-shop-desc p-2 group-hover:bg-black group-hover:bg-opacity-50 rounded-lg`}>{shop.desc}</p>
            <button className='btn hidden md:block'>See Menu</button>
            </div>
          </div>
        </Link>
      ))}
    </div>

  )
}

export default Store
