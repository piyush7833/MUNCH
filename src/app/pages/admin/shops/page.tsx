"use client"
import { ResponseShopType } from '@/types/types';
import useSWR, { mutate } from 'swr'; // Assuming you have swr installed
import React from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '@/baseUrl';
import Loader from '@/components/common/Loader';
import CustomTable from '@/components/common/Table/CustomTable';
import { httpservice } from '@/utils/httpService';
import Error from '@/components/common/Error';

const fetcher = async (url: string) => {
  try {
    const response = await httpservice.get(url);
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data);
  }
}

const Page = () => {
  const { data, error } = useSWR(`${baseUrl}/shop`, fetcher);
  if (error) {
    return <div className="main flex items-center justify-center">
      <Error message={error.response.data.message} />
    </div>
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
  const extracedtedData = shops.map(({ img, title, desc, slug, address, user, status, createdAt, verified, notVerified }) => ({
    img, title, desc, slug, address, user, status, createdAt, verified, notVerified
  }))
  const handleUpdate = async () => {
    mutate(`${baseUrl}/shop`)
  }
  return (
    <div className='main'>
      <CustomTable data={extracedtedData} keys={findKeys(extracedtedData)} originalData={shops} handleUpdate={handleUpdate} type='shops' />
      {shops.length === 0 && <p className='text-center'>No Shops Found</p>}
    </div>
  )
}

export default Page;
