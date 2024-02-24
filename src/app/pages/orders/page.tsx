"use client"
import useSWR, { mutate } from 'swr'; // Assuming you have swr installed
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '@/baseUrl';
import Loader from '@/components/common/Loader';
import { httpservice } from '@/utils/httpService';
import Error from '@/components/common/Error';
import CustomTable from '@/components/common/Table/CustomTable';
import { OrderResponseType } from '@/types/types';
import { findKeys } from '@/utils/action';
import { userAuthStore } from '@/utils/userStore';

const fetcher = async (url: string) => {
  try {
    const response = await httpservice.get(url);
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    console.log(error)
    toast.error(error.response.data);
  }
}

const Page = () => {
  useEffect(() => {
    userAuthStore.persist.rehydrate()
  }, [])
  const {role}=userAuthStore();
  const { data, error, isLoading } = useSWR(`${baseUrl}/orders`, fetcher);
  if (error) {
    return <div className="main flex items-center justify-center">
      <Error message={error.response.data.message} />;
    </div>;
  }
  if (isLoading) {
    return <Loader message='Delicious Food Coming Through' />; // You can show a loading indicator
  }
  const orders: OrderResponseType[] = data.orders;
  let extractedData: any[] = [];
  const handleUpdate = async () => {
    mutate(`${baseUrl}/orders`)
}
  
  if(role==="Admin"){
    extractedData = orders?.map(({ id,products, totalPrice, user,shop, status }) => ({
      id,
      products,
      totalPrice,
      user,
      shop,
      status
    }))
  }
  if(role==="User"){
    extractedData = orders?.map(({ id,products, totalPrice, shop, status }) => ({
      id,
      products,
      totalPrice,
      shop,
      status
    }))
  }
  if(role==="ShopOwner"){
    extractedData = orders?.map(({ id, products, totalPrice, user, status }) => ({
      id,
      products,
      totalPrice,
      user,
      status
    }))
  }


  return (
    <div className='main'>
      <CustomTable data={extractedData} keys={findKeys(extractedData)} originalData={orders} type='orders' handleUpdate={handleUpdate} />
    </div>
  )
}

export default Page;
