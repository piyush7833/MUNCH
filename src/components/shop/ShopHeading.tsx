import React from 'react'
import ImgContainer from '../common/ImgContainer'
import { addressType } from '@/types/types'
import { userAuthStore } from '@/utils/userStore'
import { Edit } from '@mui/icons-material'
import Link from 'next/link'
import DeleteButton from '../partials/DeleteButton'
import { baseUrl } from '@/baseUrl'
import EditButton from '../partials/EditButton'

type propsType={
    title:string,
    img:string,
    desc:string,
    address:addressType,
    userId:string,
    owner:string,
    totalProducts:number,
    slug:string
}
const ShopHeading = ({title,img,desc,address,userId,owner,totalProducts,slug}:propsType) => {
    const {id}=userAuthStore()
  return (
    <div className='shopHeading relative gap-5 px-4'>
        <div className="img w-full flex items-center justify-center md:w-1/5">
      <ImgContainer imgUrl={img} alt={title} type="heading"/>
        </div>
        <div className="basic-details w-full md:w-2/5 flex flex-col justify-center gap-1 md:gap-4 items-stretch">
            <p>Basic Details</p>
            <div className="details flex flex-row ">
                <p className='font-bold text-lg w-1/2'>Shop name</p>
                <p className='text-lg w-1/2'>{title}</p>
            </div>
            <div className="details flex flex-row">
                <p className='font-bold text-lg w-1/2'>Owner name</p>
                <p className='text-lg w-1/2'>{owner}</p>
            </div>
            <div className="details flex flex-row">
                <p className='font-bold text-lg w-1/2'>Total Products</p>
                <p className='text-lg w-1/2'>{totalProducts}</p>
            </div>
            <div className="details flex flex-row">
                <p className='font-bold text-lg w-1/2'>Description</p>
                <p className='text-lg w-1/2'>{desc}</p>
            </div>
        </div>
        <div className="address-details w-full md:w-2/5 flex flex-col justify-center gap-1 md:gap-4 items-stretch">
            <p>Address</p>
            <div className="details flex flex-row ">
                <p className='font-bold text-lg w-1/2'>Street</p>
                <p className='text-lg w-1/2'>{address.street}</p>
            </div>
            <div className="details flex flex-row">
                <p className='font-bold text-lg w-1/2'>Landmark</p>
                <p className='text-lg w-1/2'>{address.landmark}</p>
            </div>
            <div className="details flex flex-row">
                <p className='font-bold text-lg w-1/2'>City</p>
                <p className='text-lg w-1/2'>{address.city}</p>
            </div>
            <div className="details flex flex-row">
                <p className='font-bold text-lg w-1/2'>State</p>
                <p className='text-lg w-1/2'>{address.state}</p>
            </div>
        </div>
        {userId===id && <DeleteButton url={`${baseUrl}/shop/${slug}`} />}
        {userId===id && <EditButton  url={`editshops/${slug}`} />}
    </div>
  )
}

export default ShopHeading
