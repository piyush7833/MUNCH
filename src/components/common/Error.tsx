import React from 'react'
import ImgContainer from './ImgContainer';
type propsType={
  message:string;
}
const Error = ({message}:propsType) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <ImgContainer type='not-found' alt='error' imgUrl='/images/error500.png' />
      <p className='text-main text-4xl'>{message}</p>
    </div>
  )
}

export default Error
