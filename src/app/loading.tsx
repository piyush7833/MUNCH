"use client"
import ImgContainer from '@/components/common/ImgContainer'
import Loader from '@/components/common/Loader'
import React, { useEffect, useState } from 'react'

const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots === '...' ? '' : `${prevDots}.`));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className='main flex items-center justify-center flex-col'>
      <ImgContainer alt='loader' type='loader' imgUrl='/images/loader.gif'/>
      <p className='text-lg'>
        MUNCH is on its way to serve you best
      <span>{dots}</span>
      </p>
    </div>
  )
}

export default Loading
