"use client"
import { baseUrl } from '@/baseUrl';
import ProductContainer from '@/components/product/ProductContainer';
import ShopHeading from '@/components/shop/ShopHeading';
import { ProductType } from '@/types/types';
import { userAuthStore } from '@/utils/userStore';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Props={
  params:{slug:string}
}

const ShopMenuPage = ({params}:Props) => {
  const [data,setData]=useState<any>()
  const {id}=userAuthStore()
  useEffect(() => {
    const getData = async (slug:string) => {
      try {
        const response = await axios.get(`${baseUrl}/shop/${slug}`)
        setData(response.data);
      } catch (error: any) {
        setData(error.response)
      }
    }
    getData(params.slug)
  }, [params.slug])
  
  if(data && data.error){
    return <div>Something went wrong</div>
  }
  if(!data){
    return <div>Loading...</div>
  }
  return (
    <div className='flex text-main flex-wrap min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-5.5rem)] gap-4'>
      <ShopHeading title={data.shop.title} userId={data.shop.user.id} address={data.shop.address} owner={data.shop.user.name} totalProducts={data.shop.products.length} desc={data.shop.desc} img={data.shop.img} />
    {data.shop.products.map((item: ProductType)=>(
      <ProductContainer key={item.id} img={item.img} title={item.title} id={item.id!} price={item.price} />
    ))}
    {id===data.shop.user.id && <ProductContainer id='new' img='/images/add.webp' title='Add new' add={true}/>}
    </div>
  )
}

export default ShopMenuPage
