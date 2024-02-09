import Link from 'next/link'
import React from 'react'

type propsType={
    slug:string,
    id:string,
    title:string,
    desc:string,
    imgUrl:string
}
const ShopCard = ({slug,id,title,desc,imgUrl}:propsType) => {
  return (
    <div>
      <Link href={`/pages/shops/${slug}`} className={`store-shop-container shadow-2xl group `} style={{backgroundImage:`url(${imgUrl})`}}>
          <div className=''>
            <div className={`w-[45vw] sm:w-[25vw] overflow-clip flex flex-col items-center`}>
            <h1 className='store-shop-title p-2 group-hover:bg-black group-hover:bg-opacity-50 rounded-xl'>{title}</h1>
            <p className={`store-shop-desc p-2 group-hover:bg-black group-hover:bg-opacity-50 rounded-lg`}>{desc}</p>
            <button className='btn hidden md:block'>See Menu</button>
            </div>
          </div>
        </Link>
    </div>
  )
}

export default ShopCard
