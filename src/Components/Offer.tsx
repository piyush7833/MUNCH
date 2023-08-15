import Image from 'next/image'
import React from 'react'

const Offer = () => {
  return (
    <div className='overflow-x-scroll text-main'>
      <div className="offer-wraper">

        <div className="single-item">
          <div className="single-imgContainer">
            <Image src='/images/tempfood.webp' alt='food item' fill className='object-contain'/>
          </div>
        
        <div className="single-textContainer">
          <div className='text-xl uppercase  font-bold'>title</div>
          <div>desc</div>
          <div className='text-xl font-bold'>price</div>
          <button className='btn flex text-white '> Add to cart</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Offer
