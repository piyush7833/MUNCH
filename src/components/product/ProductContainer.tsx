"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ImgContainer from '../common/ImgContainer'
import { ProductType } from '@prisma/client'
import DeleteButton from '../partials/DeleteButton'
import { baseUrl } from '@/baseUrl'
import EditButton from '../partials/EditButton'

type propsType = {
  img?: string,
  id?: string,
  title: string,
  price?: number,
  edit?: boolean,
  add?: boolean
  productType?: string,
  shopSlug?: string,
  shopUserId?: string,
  desc?: string
}
const ProductContainer = ({ img, id, title, price, edit, add, productType, shopSlug, shopUserId, desc }: propsType) => {
  let href;
  if (edit) {
    href = `/pages/edit/product/${id}`
  }
  if (add) {
    href = `/pages/add/product/${shopSlug}`
  }
  else {
    href = `/product/${id}`
  }
  return (
    <div className="relative flex  h-fit w-[80%] sm:w-[33%] md:w-[45%] px-4 py-2 items-center rounded-md shadow-md hover:shadow-lg hover:shadow-main shadow-main justify-around">
      <Link className='flex h-fit flex-col md:flex-row w-full items-center justify-around ' href={href} key={id} >
        {!add ? <div className="details w-[80%]">
          <p className='text-center md:text-start'>{title}</p>
          <p className='text-center md:text-start'>{desc}</p>
          <p className='text-center md:text-start'>{productType}</p>
          <p className='text-center md:text-start'>Rs {price}</p>
        </div> : <div className="details w-[80%]">
          <p className='text-center md:text-start text-3xl'>{title}</p>
        </div>}
        <div className="img flex">
          <ImgContainer imgUrl={img} alt={title} type='product' />
        </div>
      </Link>
      {!add && <DeleteButton url={`${baseUrl}/product/${id}`} />}
      {!add && <EditButton url={`/edit/product/${id}`} />}
    </div>
  )
}

export default ProductContainer
