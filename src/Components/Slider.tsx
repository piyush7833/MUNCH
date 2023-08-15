"use client"
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
const items = [
  {
    id: 0,
    imgSrc: '/images/first.png',
    title: 'M.U.N.C.H.',
    subtitle: 'Elevating Campus Dining',
    desc: 'Introducing the M.U.N.C.H. Web App, designed to transform the way students enjoy their meals. No more waiting in long queues or dealing with cash transactions. Our intuitive app provides a seamless and convenient dining experience.',
  },
  {
    id: 1,
    imgSrc: '/images/faster.png',
    title: 'Faster',
    subtitle: 'Skip the Queues',
    desc: `We understand that waiting in long queues at the dining hall for food preparation can be time-consuming and inconvenient, especially with a busy schedule. Our user-friendly web app brings the canteen to your fingertips, enabling you to dine in when your food is ready or have it delivered to your doorstep.`,
  },
  {
    id: 2,
    imgSrc: '/images/easier.png',
    title: 'Easier',
    subtitle: 'Effortless Food Ordering',
    desc: `Browse through a diverse selection of delicious and nutritious food options available at the dining hall. Whether you're craving breakfast, lunch, or a late-night snack, our app has you covered. Simply select your desired items, customize your order, and place it with a few taps.`,
  },
  {
    id: 3,
    imgSrc: '/images/better.png',
    title: 'Better',
    subtitle: 'Smarter Food Choices',
    desc: `We prioritize efficient record-keeping for both the dining hall and students. Our web app offers a robust system for maintaining records, tracking orders, transaction history, and nutritional information. This empowers you to make smarter food choices and monitor your dietary preferences.`,
  },
  {
    id: 4,
    imgSrc: '/images/get.png',
    title: 'Get on Board',
    subtitle: 'Right Now',
    desc: `By using the IIIT Una Canteen Web App, you can save precious time, avoid unnecessary waiting, and enjoy delicious meals whenever it suits you. So, why wait? Embrace the convenience, efficiency, and ease of our web app today and elevate your canteen experience to a whole new level.`,
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
    <div className="relative w-full h-[calc(100vh-5.5rem)] bg-inher overflow-hidden">
      <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div key={index} className="w-full h-[calc(100vh-5.5rem)] flex-shrink-0">
            <div className="w-full h-full flex items-center justify-center rounded">

              <div className={`slider-card`}>
                <div className="img h-2/3 md:h-[calc(100vh-16rem)] w-4/5 md:w-1/2 bg-inherit items-center justify-center rounded-3xl">
                  <div className="imgContainer h-full w-full flex items-center justify-center ">
                    <Image src={item.imgSrc} alt={item.title} height={60} width={400} className='h-2/3 md:h-fit' />
                  </div>
                </div>
                <div className="content h-[calc(100vh-16rem)] w-4/5 md:w-1/2 bg-inherit items-start flex md:items-center">
                  <div className="h-2/3 md:h-3/6 flex flex-col text-white md:justify-evenly">
                    <div className="title text-2xl md:text-6xl text-orange-600">{item.title}</div>
                    <div className="subTitle text-base md:text-2xl text-orange-300">{item.subtitle}</div>
                    <br />
                    <div className="info text-xs md:text-base text-justify md:w-4/5">
                      {item.desc}
                    </div>
                   {item.id===0 || item.id===4?<div className={`flex w-1/3`}>
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
                    </div>:""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded opacity-60 hover:opacity-100"
        onClick={goToPrevSlide}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded opacity-60 hover:opacity-100"
        onClick={goToNextSlide}
      >
        &gt;
      </button>
    </div>
  )
}

export default Slider
