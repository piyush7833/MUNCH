// import { menu } from '@/data'  
import { MenuType } from '@/types/types';
import { error } from 'console';
import Link from 'next/link'
import React from 'react'

const apiUrl = process.env.BASEURL;
const getData=async()=>{
  const res=await fetch(`${apiUrl}/shops`,{
    cache:"no-store",

  })
  if(!res.ok){
    console.log(error);
    throw new Error("Something went wrong ")
  }
  return res.json();
}
const MenuPage = async () => {
  const menu:MenuType=await getData();
  return (
    <div className='menu-container'>
      {menu.map((shop)=>(
        <Link href={`/menu/${shop.slug}`} key={shop.id} className={`menu-shop-container shadow-2xl group `} style={{backgroundImage:`url(${shop.img})`,objectFit:'contain'}}>
          <div className=''>
            <div className={` w-full overflow-clip flex flex-col items-center`}>
            <h1 className='menu-shop-title p-2 group-hover:bg-black group-hover:bg-opacity-50 rounded-xl'>{shop.title}</h1>
            <p className={`menu-shop-desc p-2 group-hover:bg-black group-hover:bg-opacity-50 rounded-lg`}>{shop.desc}</p>
            <button className='btn hidden md:block'>See Menu</button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MenuPage
