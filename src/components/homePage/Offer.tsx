import Image from 'next/image'
import React from 'react'
import dynamic from 'next/dynamic'
 
const CountDown = dynamic(() => import('./CountDown'), { ssr: false })

const Offer = () => {
  return (
    <div className='offerContainer text-white'>
      <div className="offer-textContainer">
        <h1 className="offer-title">
            Delicious burger and french fry
        </h1>
        <p className="offer-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis tempore nam perferendis dolorum impedit recusandae nesciunt nemo? Dolor, ullam cumque.
        </p>
        <CountDown />
        <button className='btn'>Order Now</button>
      </div>
      <div className="offer-imgContainer">
          <Image src='/images/tempfood.webp' alt='offerProduct' fill className='object-contain'/>
      </div>
      </div>
  )
}

export default Offer
