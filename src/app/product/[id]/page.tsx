import Price from '@/components/Price'
import { singleProduct } from '@/data'
import Image from 'next/image'
import React from 'react'

const SingleProductPage = () => {
  return (
    <div className='single-productContainer hideScrollBar'>
       <div className="single-product-imgContainer">
        {singleProduct.img && <Image src={singleProduct.img} fill alt={singleProduct.title} className='object-contain'/>}
       </div>
       <div className="single-product-textContainer">
        <h1 className='text-3xl uppercase font-bold'>{singleProduct.title}</h1>
        <p className='text-base'>{singleProduct.desc}</p>
        <Price price={singleProduct.price} id={singleProduct.id} options={singleProduct.options}/>
       </div>
    </div>
  )
}

export default SingleProductPage
