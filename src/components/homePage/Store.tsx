import React from 'react'
import Link from 'next/link'
import { MenuType } from '@/types/types';
import axios from 'axios';
import ShopCard from '../shop/ShopCard';
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
        <ShopCard key={shop.id} imgUrl={shop.img} slug={shop.slug} desc={shop.desc} id={shop.id} title={shop.title}/>
      ))}
    </div>

  )
}

export default Store
