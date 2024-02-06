"use client"
import { baseUrl } from '@/baseUrl';
import ImgContainer from '@/components/common/ImgContainer';
import Loader from '@/components/common/Loader';
import DeleteButton from '@/components/partials/DeleteButton';
import EditButton from '@/components/partials/EditButton';
import Price from '@/components/product/Price'
import { images } from '@/utils/formData';
import { userAuthStore } from '@/utils/userStore';
import axios from 'axios';
import React, { useEffect, useState } from 'react'



const Product =  ({ params }: { params: { id: string } }) => {
  const [data,setData]=useState<any>()
  const {role}=userAuthStore()
  useEffect(() => {
    const getData = async (id:string) => {
      try {
        const response = await axios.get(`${baseUrl}/product/${id}`)
        setData(response.data.product);
      } catch (error: any) {
        setData(error.response)
      }
    }
    getData(params.id)
  }, [params.id])
  if(data && data.error){
    return <div>Something went wrong</div>
  }
  if(!data){
    return <Loader  message='Delicious Food Comming Through'/>
  }
  return (
    <div className="main text-main relative">
      <div className='single-productContainer hideScrollBar'>
          <ImgContainer imgUrl={data.img} type='singleProduct' alt={data.title}/>
        <div className="single-product-textContainer">
          <h1 className='text-3xl uppercase font-bold'>{data.title}</h1>
          {data.rating && <h1 className='text-xl first-letter:uppercase font-bold'>Rating {data.rating}</h1>}
          <p className='text-base'>{data.desc}</p>
          <Price product={data} />
        </div>
        {role!=="User" && <EditButton url={`/edit-product/${data.id}`} />}
        {role!=="User" && <DeleteButton url={`/product/${data.id}`} />}
      </div>
      <div className="review px-4 md:px-10">
        <p className='text-lg'>Reviews</p>
        {data.review && <div className='text-xl first-letter:uppercase font-bold'>
          {data.review.length && data.review?.map((r: any, index: number) => (
            <div className="singleReview" key={index}>
              <div className="userName">
                {r.userName}
              </div>
              <div className="userName">
                {r.comment}
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  )
}

export default Product
