"use client"
import { ResponseShopType } from '@/types/types';
import useSWR from 'swr'; // Assuming you have swr installed
import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '@/baseUrl';
import Loader from '@/components/common/Loader';
import { userAuthStore } from '@/utils/userStore';
import CustomTable from '@/components/common/Table/CustomTable';

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
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
    return <p>Something went wrong</p>;
  }
  if (!data) {
    return <Loader message='Shops are coming at your doorstep' />; // You can show a loading indicator
  }
  const shops: ResponseShopType = data.shops;

  const findKeys = (arrayOfObjects: any[]): string[] => {
    const keys = arrayOfObjects.reduce((acc, item) => {
      return acc.concat(Object.keys(item));
    }, []);
    return Array.from(new Set(keys));
  }
  const extracedtedData=shops.map(({img,title,desc,slug,address,user,status,createdAt,verified})=>({
    img,title,desc,slug,address,user,status,createdAt,verified
  }))

  return (
    <div className='main'>
    <CustomTable data={extracedtedData} keys={findKeys(extracedtedData)} />
    </div>
  )
}

export default Page;
