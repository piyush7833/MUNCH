// "use client"
import Link from 'next/link'
import React from 'react'
import ImgContainer from '../common/ImgContainer'
import DeleteButton from '../partials/DeleteButton'
import { baseUrl } from '@/baseUrl'
import EditButton from '../partials/EditButton'
import { cookies } from 'next/headers'

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
  const cookieStore = cookies();
  const role = cookieStore.get("role")?.value;
  let href;
  if (edit) {
    href = `/pages/edit/product/${id}`
  }
  if (add) {
    href = `/pages/add/product/${shopSlug}`
  }
  else {
    href = `/pages/product/${id}`
  }
  return (
    <div className="relative flex h-fit w-[80%] sm:w-[33%] md:w-[45%] px-4 py-2 items-center rounded-md shadow-md hover:shadow-lg hover:shadow-main shadow-main justify-around gap-4">
    <div className="flex h-full w-full">
      <Link className='flex h-fit flex-col md:flex-row w-full items-center justify-around ' href={href} key={id} >
        {!add ? <div className="details w-[80%]">
          <p className='text-center md:text-start capitalize'>{title}</p>
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
    </div>
    <div className="w-fit flex flex-col justify-end gap-4 ">
      {!add  && <DeleteButton url={`${baseUrl}/product/${id}`} userId={shopUserId!} />}
      {!add && <EditButton url={`/pages/edit/product/${id}`} userId={shopUserId!}/>}
    </div>
    </div>
  )
}

export default ProductContainer
