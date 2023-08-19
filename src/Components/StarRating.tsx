"use client"
import React, { useState } from 'react';



const StarRating = () => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleStarClick = (starCount: number) => {
    setSelectedStars(starCount);
    if (handleRatingChange) {
      handleRatingChange(starCount);
    }
  };

  return (
    <div className='flex flex-col justify-center lg:items-start'>
      <p className='text-sm'>Feedback</p>
      <div className="">
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
      <textarea rows={3} cols={5} placeholder='Enter Message' className=' w-80% text-sm input  ' />

      <button className='btn'>Submit</button>
    </div>
  );
};

export default StarRating;
