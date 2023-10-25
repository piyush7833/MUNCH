"use client"
import { userCartStore } from '@/utils/store'
import Image from 'next/image'
import React,{useEffect} from 'react'


const Cart = () => {
  const { products, totalItems, totalPrice, removeFromCart } = userCartStore()
  const serviceCharge = totalPrice > 100 ?  1 : totalPrice * 0.01;
  useEffect(()=>{
    userCartStore.persist.rehydrate()
  },[])
  return (
    <div className='h-[calc(100vh-9rem)] md:h-[calc(100vh-5.5rem)] flex flex-col text-main lg:flex-row'>

      {/* product container*/}
      <div className="h-1/2 p-4 flex flex-col items-center  overflow-y-auto lg:h-full lg:w-2/3 xl:w-1/2 lg:px-20 xl:px-40 hideScrollBar">
        {/* single item container */}

        {products.map((item) => (
          <div className="w-[150%] h-36 flex items-center justify-around mb-4 shadow-xl" key={item.id}>
            <div className="h-32 w-32 relative">
              {item.img && <Image src={item.img} fill alt='cart' />}
            </div>
            <div className="">
              <h1 className='uppercase font-bold text-xl'>{item.title} x {item.quantity}</h1>
              <span>{item?.optionTitle}</span>
            </div>
            <div className="">
              <h2 className='font-bold'>Rs {item.price}</h2>
            </div>
              <span className='text-red text-2xl cursor-pointer' onClick={() => removeFromCart(item)} >X</span>
          </div>))}
        {/* <div className=" w-full flex items-center justify-between mb-4 ">
          <div className="h-32 w-32 relative">
              <Image src='/images/tempfood.webp' fill alt='cart'/>
              </div>
              <div className="">
                <h1 className='uppercase font-bold text-xl'>title</h1>
                <span>option</span>
              </div>
              <div className="">
                <h2 className='font-bold'>Price</h2>
                <span className='text-red text-2xl cursor-pointer'>x</span>
              </div>
        </div>
        <div className=" w-full flex items-center justify-between mb-4">
          <div className="h-32 w-32 relative">
              <Image src='/images/tempfood.webp' fill alt='cart'/>
              </div>
              <div className="">
                <h1 className='uppercase font-bold text-xl'>title</h1>
                <span>option</span>
              </div>
              <div className="">
                <h2 className='font-bold'>Price</h2>
                <span className='text-red text-2xl cursor-pointer'>x</span>
              </div>
        </div>
        <div className=" w-full flex items-center justify-between mb-4">
          <div className="h-32 w-32 relative">
              <Image src='/images/tempfood.webp' fill alt='cart'/>
              </div>
              <div className="">
                <h1 className='uppercase font-bold text-xl'>title</h1>
                <span>option</span>
              </div>
              <div className="">
                <h2 className='font-bold'>Price</h2>
                <span className='text-red text-2xl cursor-pointer'>x</span>
              </div>
        </div>
        <div className=" w-full flex items-center justify-between mb-4">
          <div className="h-32 w-32 relative">
              <Image src='/images/tempfood.webp' fill alt='cart'/>
              </div>
              <div className="">
                <h1 className='uppercase font-bold text-xl'>title</h1>
                <span>option</span>
              </div>
              <div className="">
                <h2 className='font-bold'>Price</h2>
                <span className='text-red text-2xl cursor-pointer'>x</span>
              </div>
        </div> */}


      </div>

      {/* payment container*/}
      <div className={`h-1/2 p-4 bg-gray-600 flex flex-col gap-4 lg:h-full lg:w-1/3 xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6 lg:justify-center`}>
        <div className="flex justify-between">
          <span>Subtotal {totalItems} items </span>
          <span>Rs {totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Service cost</span>
          <span>{serviceCharge}</span>
        </div>
        <div className="flex justify-between text-green-300">
          <span>Delievery cost</span>
          <span>free</span>
        </div>
        <hr className='my-2' />
        <div className="flex justify-between font-bold text-xl">
          <span className=''>Total</span>
          <span>{totalPrice + serviceCharge} </span>
        </div>
        <button className='btn self-end'>CheckOut</button>
      </div>
    </div>
  )
}

export default Cart
