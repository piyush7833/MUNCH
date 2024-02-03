"use client"
import ImgContainer from '@/components/common/ImgContainer'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center main'>
      <ImgContainer alt='not-found' type='not-found' imgUrl='/images/not-found.png'/>
      <div className="flex">
      <button className='btn' onClick={() => history.back()}>Go Back</button>
      <Link href={'/'}>
      <button className='btn'>Go to Homepage</button>
      </Link>
      </div>
    </div>
  )
}

export default page
