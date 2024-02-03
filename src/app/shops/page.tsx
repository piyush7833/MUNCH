import { baseUrl } from '@/baseUrl';
import ShopCard from '@/components/shop/ShopCard';
import { ResponseShopType } from '@/types/types';
import axios from 'axios';
import React from 'react'

const apiUrl = process.env.BASEURL;
const getData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/shop`)
    return response.data;
  } catch (error: any) {
    return error.response.data
  }
}
const Page = async () => {
  const data = await getData();
  if (data.error) {
    return <p>Something went wrong</p>
  }
  const shops: ResponseShopType = data.shops;
  return (
    <div className='menu-container'>
      {shops.map((shop) => (
        <ShopCard key={shop.id} imgUrl={shop.img!} slug={shop.slug} desc={shop.desc!} id={shop.id!} title={shop.title!} />
      ))}
    </div>
  )
}

export default Page
