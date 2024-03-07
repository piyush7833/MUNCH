"use client"
import React from 'react'
import Countdown from 'react-countdown'

const endDate=new Date("2024-08-30")
const CountDown = () => {
  return (
    <Countdown className='text-bold text-3xl md:text-5xl text-yellow-400' date={endDate} />
  )
}

export default CountDown
