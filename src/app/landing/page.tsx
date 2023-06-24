/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import HomeFirst from '../../../public/Images/HomeFirst.gif'
import HomeFirstDark from '../../../public/Images/HomeFirstDark.gif'
import HomeFaster from '../../../public/Images/HomeFaster.gif'
import HomeFasterDark from '../../../public/Images/HomeFasterDark.gif'
import HomeEasier from '../../../public/Images/HomeEasier.gif'
import HomeEasierDark from '../../../public/Images/HomeEasierDark.gif'
import HomeBetter from '../../../public/Images/HomeBetter.gif'
import HomeBetterDark from '../../../public/Images/HomeBetterDark.gif'
import HomeGet from '../../../public/Images/HomeGet.gif'
import HomeGetDark from '../../../public/Images/HomeGetDark.gif'
import Btn from '@/utils/Button'

const page = (props: { theme:boolean|undefined}) => {
  return (
    <>
      <div className="main">
        <div className="first h-s flex items-center justify-center">

          <div className="image w-1/2 flex justify-center">
            <Image className='mx-2 h-110 w-auto'
              src= {props.theme===true?HomeFirstDark:HomeFirst}
              alt="Logo"
            />
          </div>

          <div className="infos flex flex-col  w-1/2">
            <div className="title text-6xl text-orange-600">IIITU-Canteen</div>
            <div className="subTitle text-2xl text-orange-300">Faster Easier Better</div>
            <br />
            <div className="info text-base text-justify w-4/5">
              Introducing the IIIT Una Canteen Web App, designed to revolutionize the way students order food from their hostel. No more waiting in long queues or dealing with cash transactions. Our user-friendly app provides a seamless and convenient experience.
            </div>
            <div className="btn mt-4 flex">
              <Btn Text="Login" Clr="red"></Btn>
              <Btn Text="Signup" Clr="gray"></Btn>
            </div>
          </div>
        </div>


        <div className="second h-s flex items-center justify-around">

          <div className="infos w-1/2 flex flex-col items-end">
            <div>
              <div className="title text-6xl text-orange-600">Faster</div>
              <div className="subTitle text-2xl text-orange-300">No More Waiting Queues</div>
            </div>
            <br />
            <div className="info text-base text-justify w-4/5">
              At IIIT Una, we understand that waiting in long queues at the canteen for food preparation can be time-consuming and inconvenient, especially when you have a busy schedule. That's why we've created this user-friendly web app to bring the canteen experience to your fingertips and din in when food is prepared or you get delivery at your door steps.
            </div>
          </div>

          <div className="image w-1/2 flex justify-center">
            <Image className='mx-2 h-96 w-auto'
              src= {props.theme===true?HomeFasterDark:HomeFaster}
              alt="Logo"
            />
          </div>
        </div>


        <div className="third h-s flex items-center justify-center">

          <div className="image w-1/2 flex justify-center">
            <Image className='mx-2 h-96 w-auto'
              src= {props.theme===true?HomeEasierDark:HomeEasier}
              alt="Logo"
            />
          </div>

          <div className="infos w-1/2">
            <div className="title text-6xl text-orange-600">Easier</div>
            <div className="subTitle text-2xl text-orange-300">Order Foods Easily</div>
            <br />
            <div className="info text-base text-justify w-4/5">
              With our web app, you can browse through a wide range of delicious and nutritious food options available at the canteen. Whether you're craving a hearty breakfast, a quick lunch, or a late-night snack, our app has got you covered. Simply select your desired items, customize your order according to your preferences, and place it with just a few taps.
            </div>
          </div>
        </div>


        <div className="fourth h-s flex items-center justify-around">

          <div className="infos w-1/2 flex flex-col items-end">
            <div>
              <div className="title text-6xl text-orange-600">Better</div>
              <div className="subTitle text-2xl text-orange-300">Better Than Before</div>
            </div>
            <br />
            <div className="info text-base text-justify w-4/5">
              We also understand the importance of maintaining records for both the canteen and the students. Our web app provides a robust system for record maintenance, keeping track of your orders, transaction history, and even nutritional information. This way, you can easily monitor your food choices and make informed decisions about your meals.
            </div>
          </div>

          <div className="image w-1/2 flex justify-center">
            <Image className='mx-2 h-96 w-auto'
              src= {props.theme===true?HomeBetterDark:HomeBetter}
              alt="Logo"
            />
          </div>
        </div>


        <div className="fifth h-s flex items-center justify-center">

          <div className="image w-1/2 flex justify-center">
            <Image className='mx-2 h-96 w-auto'
              src= {props.theme===true?HomeGetDark:HomeGet}
              alt="Logo"
            />
          </div>

          <div className="infos flex flex-col  w-1/2">
            <div className="title text-6xl text-orange-600">Get On Board</div>
            <div className="subTitle text-2xl text-orange-300">Right Now</div>
            <br />
            <div className="info text-base text-justify w-4/5">
              By using the IIIT Una Canteen Web App, you can save precious time, avoid unnecessary waiting, and enjoy delicious meals whenever it suits you. So, why wait? Embrace the convenience, efficiency, and ease of our web app today and elevate your canteen experience to a whole new level.
              <br />
              <br />
              Welcome to a world of hassle-free food ordering and delightful meals at the IIIT Una Canteen Web App!
            </div>
            <div className="btn mt-4 flex">
              <Btn Text="Login" Clr="red"></Btn>
              <Btn Text="Signup" Clr="gray"></Btn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
