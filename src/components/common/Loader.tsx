"use client"
import React, { useEffect, useState } from 'react'
import ImgContainer from './ImgContainer'
type propsType={
  message?: string
}
const Loader = ({message}:propsType) => {
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
      <p className='text-lg'>{message}
      <span>{dots}</span>
      </p>
    </div>
  )
}

export default Loader
