import React from 'react'
import Link from 'next/link'
import { menu } from '@/data'
const Store = () => {
  return (
    
    <div className='store-container hideScrollBar'>
      {menu.map(shop=>(
        <Link href={`/menu/${shop.slug}`} key={shop.id} className={`store-shop-container group `} style={{backgroundImage:`url(${shop.img})`}}>
          <div className=''>
            <div className={`w-[45vw] sm:w-[25vw] overflow-clip flex flex-col items-center`}>
            <h1 className='store-shop-title p-2 group-hover:bg-black group-hover:bg-opacity-50 rounded-xl'>{shop.title}</h1>
            <p className={`store-shop-desc p-2 group-hover:bg-black group-hover:bg-opacity-50 rounded-lg`}>{shop.desc}</p>
            <button className='btn hidden md:block'>See Menu</button>
            </div>
          </div>
        </Link>
      ))}
    </div>

  )
}

export default Store
