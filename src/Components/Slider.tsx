"use client"
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
const items = [
  {
    'id': 0,
    'imgSrc': '/images/first.png',
    'title': 'M.U.N.C.H.',
    'subtitle': 'Faster Easier Better',
    'desc': 'Introducing the IIIT Una Canteen Web App, designed to revolutionize the way students order food from their hostel. No more waiting in long queues or dealing with cash transactions. Our user-friendly app provides a seamless and convenient experience.'
  },
  {
    'id': 1,
    'imgSrc': '/images/faster.png',
    'title': 'Faster',
    'subtitle': 'No More Waiting Queues',
    'desc': `At IIIT Una, we understand that waiting in long queues at the canteen for food preparation can be time-consuming and inconvenient, especially when you have a busy schedule. That's why we've created this user-friendly web app to bring the canteen experience to your fingertips and din in when food is prepared or you get delivery at your door steps`
  },
  {
    'id': 2,
    'imgSrc': '/images/easier.png',
    'title': 'Easier',
    'subtitle': 'Order food easily',
    'desc': `With our web app, you can browse through a wide range of delicious and nutritious food options available at the canteen. Whether you're craving a hearty breakfast, a quick lunch, or a late-night snack, our app has got you covered. Simply select your desired items, customize your order according to your preferences, and place it with just a few taps`
  },
  {
    'id': 3,
    'imgSrc': '/images/better.png',
    'title': 'Better',
    'subtitle': 'Better Than Before',
    'desc': `We also understand the importance of maintaining records for both the canteen and the students. Our web app provides a robust system for record maintenance, keeping track of your orders, transaction history, and even nutritional information. This way, you can easily monitor your food choices and make informed decisions about your meals.`
  },
]
const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);


  return (
    <div className="relative w-full h-[calc(100vh-5.5rem)] bg-gradient-to-r from-darkGradient1 to-darkGradient2 overflow-hidden">
      <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div key={index} className="w-full h-[calc(100vh-5.5rem)] flex-shrink-0">
            <div className="w-full h-full flex items-center justify-center rounded">

              <div className={`slider-card ${item.id % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`} >
                <div className="img h-[calc(100vh-16rem)] w-1/2 bg-inherit items-center justify-center rounded-3xl">
                  <div className="imgContainer h-full w-full flex items-center justify-center ">
                    <Image src={item.imgSrc} alt={item.title} height={60} width={400} className='' />
                  </div>
                </div>
                <div className="content h-[calc(100vh-16rem)] w-1/2 bg-inherit flex items-start justify-evenly flex-col">
                  <div className="h4/6 flex flex-col text-white">
                    <div className="title text-6xl text-orange-600">{item.title}</div>
                    <div className="subTitle text-2xl text-orange-300">{item.subtitle}</div>
                    <br />
                    <div className="info text-base text-justify w-4/5">
                      {item.desc}
                    </div>
                   {<div className={`flex w-1/3 justify-between`}>
                    <Link href='/auth'>
                      <button className='btn'>
                        Login
                      </button>
                      </Link>
                      <Link href='/auth'>
                      <button className='btn'>
                        Signup
                      </button>
                      </Link>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded"
        onClick={goToPrevSlide}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded"
        onClick={goToNextSlide}
      >
        &gt;
      </button>
    </div>
  )
}

export default Slider
