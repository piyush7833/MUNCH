"use client"
import { baseUrl } from '@/baseUrl'
import React from 'react'
import ShopCard from '../shop/ShopCard'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { httpservice } from '@/utils/httpService'

const UserShops = () => {
  const fetcher = async (url:string) => {
    const response = await httpservice.get(url);
    console.log(response.data, "response.data")
    return response.data;
  };
  const { data, error, isLoading } = useSWR(`${baseUrl}/shop`, fetcher);

  if (error) {
    return <div>Error loading shops</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      {!error ?
      <div className="">
        <h1 className='text-4xl px-4'>Your Shops</h1>
        <div className='store-container hideScrollBar'>
          {data?.shops?.map((shop: any) => (
            <ShopCard key={shop.id} imgUrl={shop.img} slug={shop.slug} desc={shop.desc} id={shop.id} title={shop.title} />
          ))}
          <Link href={'/addshop'}>
          <div className='store-shop-container shadow-2xl group cursor-pointer'>
            <div className=''>
              <div className={`w-[45vw] sm:w-[25vw] overflow-clip flex flex-col items-center bg-black`}>
                <Image src='/images/add.webp' fill alt='add' className='z-10' />
              </div>
            </div>
          </div>
          </Link>
        </div>
        </div> : "error"}
    </>
  )
}

export default UserShops
