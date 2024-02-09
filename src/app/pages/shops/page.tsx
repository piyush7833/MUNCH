"use client"
import ShopCard from '@/components/shop/ShopCard';
import { ResponseShopType } from '@/types/types';
import useSWR from 'swr'; // Assuming you have swr installed
import React from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '@/baseUrl';
import Loader from '@/components/common/Loader';
import { userAuthStore } from '@/utils/userStore';
import CustomTable from '@/components/common/Table/CustomTable';
import { httpservice } from '@/utils/httpService';

const fetcher = async (url: string) => {
  try {
    const response = await httpservice.get(url);
    return response.data;
  } catch (error:any) {
    toast.error(error.response.data);
  }
}

const Page = () => {
  const { data, error } = useSWR(`${baseUrl}/shop`, fetcher);
  const {role}=userAuthStore()
  console.log(data)
  if (error) {
    return <p>{error.response.data}</p>;
  }
  if (!data) {
    return <Loader message='Shops are coming at your doorstep' />; // You can show a loading indicator
  }
  const shops: ResponseShopType = data.shops;


  return (
    <div className='main'>
      <div className="menu-container">
      {shops.map((shop) => (
        <ShopCard key={shop.id} imgUrl={shop.img!} slug={shop.slug} desc={shop.desc!} id={shop.id!} title={shop.title!} />
      ))}
      </div>
    </div>
  )
}

export default Page;
