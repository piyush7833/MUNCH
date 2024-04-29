// "use client"
import React from 'react'
import ShopCard from '../shop/ShopCard'
import Image from 'next/image'
import Link from 'next/link'
import { ResponseShopType } from '@/types/types'
// import { userAuthStore } from '@/utils/userStore'
import { getUserIdFromToken } from '@/utils/server_action'
type propsType = {
  shops?: ResponseShopType[];
  userId?: string;
}
const UserShops = async ({ shops,userId }: propsType) => {
  const id=getUserIdFromToken();
  return (
    <div className="">
      <h1 className='text-4xl px-4'>Shops</h1>
      <div className='store-container hideScrollBar'>
        {shops?.map((shop: any) => (
          <ShopCard key={shop.id} imgUrl={shop.img} slug={shop.slug} desc={shop.desc} id={shop.id} title={shop.title} />
        ))}
        {userId===id && <Link href={'/pages/add/shop'}>
          <div className='store-shop-container shadow-2xl group cursor-pointer'>
            <div className=''>
              <div className={`w-[45vw] sm:w-[25vw] overflow-clip flex flex-col items-center bg-black`}>
                <Image src='/images/add.webp' fill alt='add' className='z-10' />
              </div>
            </div>
          </div>
        </Link>}
      </div>
    </div>
  )
}

export default UserShops
