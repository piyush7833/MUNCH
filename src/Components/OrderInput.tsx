"use client"
import { getAuthSession } from '@/utils/auth';
import React, { useState,useEffect } from 'react';
import { prisma } from "@/utils/connect";
import { useSession } from 'next-auth/react';


const Order = () => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [rating, setRating] = useState(0);
  const [shopOwner, isShopOwner] = useState(false);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleStarClick = (starCount: number) => {
    setSelectedStars(starCount);
    if (handleRatingChange) {
      handleRatingChange(starCount);
    }
  };
const session=useSession();
console.log(session.data?.user.isShopOwner)

  return (
    <div className='flex flex-col justify-center lg:items-start'>
      {session.data?.user.isShopOwner===true?<p className='text-sm text-main font-bold md:text-base'>Status</p>:<p className='text-sm text-main font-bold md:text-base'>Feedback</p>}
      <div className={`${session.data?.user.isShopOwner===true?'hidden':'block'}`}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          className={`cursor-pointer text-2xl sm:text-3xl ${index < selectedStars ? 'text-main' : 'text-gray-400'
            }`}
        >
          &#9733;
        </span>
      ))}
      </div>
      
      {session.data?.user.isShopOwner===true?<textarea rows={3} cols={5} placeholder='Enter status' className=' w-80% text-sm input  ' /> :<textarea rows={3} cols={5} placeholder='Enter Message' className=' w-80% text-sm input  ' />}

      <button className='btn'>Submit</button>
    </div>
  );
};

export default Order;
