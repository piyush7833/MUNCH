import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { ProductsType } from '@/types/types';
import Alert from '../common/Alert';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = process.env.BASEURL;
const getData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/product`, {
      headers: { 'Cache-Control': 'no-store' },
    });
    return response.data;
  } catch (error) {
    toast.error("Something went wrong")
  }
};
const Items =async () => {
  const data:any=await getData()
  const featuredProducts:ProductsType=data.featuredproducts
  console.log(featuredProducts)
  console.log("data",data)
  return (
    <div className='overflow-x-auto hideScrollBar cursor-pointer'>
      <div className="item-wraper">
        {featuredProducts && featuredProducts.map(item=>(
        <Link href={`/product/${item.id}`} key={item.id}>
        <div className="single-item group shadow-2xl" key={item.id}>
          {item.img && <div className="single-imgContainer group-hover:scale-110 md:group-hover:scale-105">
            <Image src={item.img} alt={item.title} fill className='object-contain'/>
          </div>}
        
        <div className="single-textContainer">
          <div className='text-xl lg:text-3xl uppercase  font-bold py-2'>{item.title}</div>
          <p className='text-sm lg:text-base p-4'>{item.desc}</p>
          <div className='text-xl lg:text-3xl font-bold'>Rs {item.price}</div>
          <button className='btn flex text-white '> Add to cart</button>
        </div>
      </div>
      </Link>
       ))}
      </div>
    </div>
  )
}

export default Items
