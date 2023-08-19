import StarRating from '@/components/StarRating';
import Image from 'next/image';
import React from 'react'
const Orders = () => {

  return (

    <div className='h-[calc(100vh-6rem)] md:h-[calc(100vh-5.5rem)] flex flex-col items-center p-4 overflow-y-auto gap-8 hideScrollBar'>

      {/* single order */}
        <div className="h-fit  sm:h-1/2  md:h-2/5 w-full shadow-xl p-4 rounded-3xl flex flex-col justify-center sm:justify-start sm:gap-8 sm:flex-row hover:border-2 ">
          {/* imgContainer */}
          <div className="relative hidden w-full h-1/3 sm:h-full sm:w-1/3 sm:block lg:w-1/4">
            <Image src='/images/tempfood.webp' fill alt='item'/>
          </div>
          {/* order details */}
          <div className="flex gap-4 mt-2 sm:w-2/3 sm:h-full justify-center items-center">
          <div className="flex flex-col justify-center text-main w-2/3 gap-2">
            <div className="flex justify-between">
            <h1 className=" font-bold hidden sm:block">Item</h1>
            <h1 className=" font-bold">Chicken</h1>
            </div>
            <div className="flex justify-between">
            <h1 className="  hidden sm:block">Shop</h1>
            <h1 className="">HPMC</h1>
            </div>
            <div className="flex justify-between">
            <h1 className="  hidden sm:block">Quanity</h1>
            <h1 className=" ">2</h1>
            </div>
            <div className="flex justify-between">
            <h1 className= "font-bold hidden sm:block ">Price</h1>
            <h1 className=" font-bold">Rs. 200</h1>
            </div>
            <div className="flex justify-between">
            <h1 className=" font-bold hidden sm:block">Status</h1>
            <h1 className=" font-bold">Delievered</h1>
            </div>
          </div>
          <div className="w-1/2">
          <StarRating/>
          </div>
          </div>
        </div>

    </div>

    // <div className='p-4 lg:px-20 xl:px-40 min-h-[calc(100vh-4.5rem)] md:min-h-[calc(100vh-5.5rem)]'>
    //   <table className='w-full border-separate border-spacing-3'>
    //     <thead>
    //       <tr className='text-center'>
    //         <th className='hidden md:block '>Order Id</th>
    //         <th className='hidden md:block'>Date</th>
    //         <th >Produts</th>
    //         <th>Price</th>
    //         <th>Staus</th>
    //         <th>Feedback</th>
    //       </tr>
    //     </thead>
    //     <tbody className='text-center'>
    //       <tr className='bg-red-200 text-black '>
    //         <td className='hidden md:block py-4 '>73472454</td>
    //         <td className='hidden md:block py-4 '>18-08-2023</td>
    //         <td className='py-4 '>Chicken, Paratha</td>
    //         <td className='py-4 '>Rs 320</td>
    //         <td className='py-4 '>On the Way</td>
    //         <td className='py-4 '><StarRating/></td>
    //       </tr>
    //       <tr className=' text-black odd:bg-gray-100 even:bg-gray-400'>
    //         <td className='hidden md:block py-4 '>73472454</td>
    //         <td className='hidden md:block py-4 '>18-08-2023</td>
    //         <td className='py-4 '>Chicken, Paratha</td>
    //         <td className='py-4 '>Rs 320</td>
    //         <td className='py-4 '>On the Way</td>
    //       </tr>
    //       <tr className=' text-black odd:bg-gray-100 even:bg-gray-400'>
    //         <td className='hidden md:block py-4 '>73472454</td>
    //         <td className='hidden md:block py-4 '>18-08-2023</td>
    //         <td className='py-4 '>Chicken, Paratha</td>
    //         <td className='py-4 '>Rs 320</td>
    //         <td className='py-4 '>On the Way</td>
    //       </tr>
    //       <tr className=' text-black odd:bg-gray-100 even:bg-gray-400'>
    //         <td className='hidden md:block py-4 '>73472454</td>
    //         <td className='hidden md:block py-4 '>18-08-2023</td>
    //         <td className='py-4 '>Chicken, Paratha</td>
    //         <td className='py-4 '>Rs 320</td>
    //         <td className='py-4 '>On the Way</td>
    //       </tr>
    //       <tr className=' text-black odd:bg-gray-100 even:bg-gray-400'>
    //         <td className='hidden md:block py-4 '>73472454</td>
    //         <td className='hidden md:block py-4 '>18-08-2023</td>
    //         <td className='py-4 '>Chicken, Paratha</td>
    //         <td className='py-4 '>Rs 320</td>
    //         <td className='py-4 '>On the Way</td>
    //       </tr>
    //       <tr className=' text-black odd:bg-gray-100 even:bg-gray-400'>
    //         <td className='hidden md:block py-4 '>73472454</td>
    //         <td className='hidden md:block py-4 '>18-08-2023</td>
    //         <td className='py-4 '>Chicken, Paratha</td>
    //         <td className='py-4 '>Rs 320</td>
    //         <td className='py-4 '>On the Way</td>
    //       </tr>
    //       <tr className=' text-black odd:bg-gray-100 even:bg-gray-400'>
    //         <td className='hidden md:block py-4 '>73472454</td>
    //         <td className='hidden md:block py-4 '>18-08-2023</td>
    //         <td className='py-4 '>Chicken, Paratha</td>
    //         <td className='py-4 '>Rs 320</td>
    //         <td className='py-4 '>On the Way</td>
    //       </tr>
    //       <tr className=' text-black odd:bg-gray-100 even:bg-gray-400'>
    //         <td className='hidden md:block py-4 '>73472454</td>
    //         <td className='hidden md:block py-4 '>18-08-2023</td>
    //         <td className='py-4 '>Chicken, Paratha</td>
    //         <td className='py-4 '>Rs 320</td>
    //         <td className='py-4 '>On the Way</td>
    //       </tr>
    //       <tr className=' text-black odd:bg-gray-100 even:bg-gray-400'>
    //         <td className='hidden md:block py-4 '>73472454</td>
    //         <td className='hidden md:block py-4 '>18-08-2023</td>
    //         <td className='py-4 '>Chicken, Paratha</td>
    //         <td className='py-4 '>Rs 320</td>
    //         <td className='py-4 '>On the Way</td>
    //       </tr>
    //       <tr className=' text-black odd:bg-gray-100 even:bg-gray-400'>
    //         <td className='hidden md:block py-4 '>73472454</td>
    //         <td className='hidden md:block py-4 '>18-08-2023</td>
    //         <td className='py-4 '>Chicken, Paratha</td>
    //         <td className='py-4 '>Rs 320</td>
    //         <td className='py-4 '>On the Way</td>
    //       </tr>
    //       <tr className=' text-black odd:bg-gray-100 even:bg-gray-400'>
    //         <td className='hidden md:block py-4 '>73472454</td>
    //         <td className='hidden md:block py-4 '>18-08-2023</td>
    //         <td className='py-4 '>Chicken, Paratha</td>
    //         <td className='py-4 '>Rs 320</td>
    //         <td className='py-4 '>On the Way</td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default Orders
