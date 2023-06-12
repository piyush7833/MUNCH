/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
// 'use client';
// import { useRouter } from 'next/navigation';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import HomeLogo from '../Images/HomeLogo.png'

export default function Home() {
  return (
    <>
      <Navbar />
  <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img className="object-cover object-center rounded" alt="logo" src='../Images/HomeLogo.png'/>
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">  Before they sold out
      </h1>
      <p className="mb-8 leading-relaxed text-justify text-white ">Introducing the IIIT Una Canteen Web App, designed to revolutionize the way students order food from their hostel. No more waiting in long queues or dealing with cash transactions. Our user-friendly app provides a seamless and convenient experience.

With a wide range of delicious food options available, students can browse through the menu and customize their orders according to their preferences. From breakfast to late-night snacks, everything is just a few taps away.

The app also offers hassle-free transactions with multiple payment options, including debit/credit cards, net banking, and mobile wallets. Students can make secure payments online without the need for cash.

Record maintenance is a priority for us. The app keeps track of orders, transaction history, and even provides nutritional information. This enables students to make informed choices and monitor their food intake.

By using the IIIT Una Canteen Web App, students can save time, avoid queues, and enjoy delicious meals whenever they want. It's a convenient, efficient, and hassle-free way to order food. Elevate your canteen experience today and join us in embracing the future of online food ordering.</p>
      <div className="flex justify-center">
        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Sign in</button>
        <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg shadow-white-2 focus:shadow-outline">Sign up</button>
      </div>
    </div>
  </div>
</section>
      <Footer />
    </>
  )
}
