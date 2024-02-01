import React from 'react'
import axios from 'axios';
import ShopCard from '../shop/ShopCard';
import { ResponseShopType } from '@/types/types';
import { baseUrl } from '@/baseUrl';
// import { menu } from '@/data'
const apiUrl = process.env.BASEURL;
const getData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/shop`, {
      headers: { 'Cache-Control': 'no-store' },
    });
    return response.data;
  } catch (error:any) {
    return error.response.data
  }
}
const Store =async () => {
  const data = await getData();
  if (data.error) {
    return <p>Something went wrong</p>
  }
  const shops: ResponseShopType = data.shops;
  return (
    
    <div className='store-container hideScrollBar'>
      {shops.map((shop:any)=>(
        <ShopCard key={shop.id} imgUrl={shop.img} slug={shop.slug} desc={shop.desc} id={shop.id} title={shop.title}/>
      ))}
    </div>

  )
}

export default Store
