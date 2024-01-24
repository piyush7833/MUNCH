"use client"
import { baseUrl } from '@/baseUrl'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ShopCard from '../shop/ShopCard'
import Image from 'next/image'
import FormDialog from '../common/FormDialog'
import { addShopFormData } from '@/utils/formData'
import { shopType } from '@/types/types'
import { toast } from 'react-toastify'
import Link from 'next/link'

const UserShops = () => {
  const [data, setData] = useState<any[]>()
  const [error, setError] = useState()
  const [addShopDialog, setAddShopDialog] = useState(false)
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/shop`)
        setData(response.data.shops);
      } catch (error: any) {
        setData(error.response.message)
      }
    }
    getData()
  }, [])

  const handleAddshop=async(shopData:shopType,image:File)=>{
    try {
      const response=await axios.post(`${baseUrl}/shop`,shopData);
      toast.error(response.data.message);
    } catch (error:any) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <>
      {!error ?
      <div className="">
        <h1 className='text-4xl px-4'>Your Shops</h1>
        <div className='store-container hideScrollBar'>
          {data?.map((shop: any) => (
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
