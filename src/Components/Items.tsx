import React from 'react'
import Image from 'next/image'
import { featuredProducts } from '@/data'
const Items = () => {
  return (
    <div className='overflow-x-auto hideScrollBar'>
      <div className="item-wraper">
        {featuredProducts.map(item=>(
        <div className="single-item group" key={item.id}>
          {item.img && <div className="single-imgContainer group-hover:scale-110 md:group-hover:scale-105">
            <Image src={item.img} alt='food item' fill className='object-contain'/>
          </div>}
        
        <div className="single-textContainer">
          <div className='text-xl lg:text-3xl uppercase  font-bold py-2'>{item.title}</div>
          <p className='text-sm lg:text-base p-4'>{item.desc}</p>
          <div className='text-xl lg:text-3xl font-bold'>Rs{item.price}</div>
          <button className='btn flex text-white '> Add to cart</button>
        </div>
      </div>
       ))}
      </div>
    </div>
  )
}

export default Items
