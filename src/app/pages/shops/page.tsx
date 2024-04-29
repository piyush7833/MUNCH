// "use client"
import ShopCard from '@/components/shop/ShopCard';
import { ResponseShopType } from '@/types/types';
// import useSWR from 'swr'; // Assuming you have swr installed
import React from 'react'
import { toast } from 'react-toastify';
// import { baseUrl } from '@/baseUrl';
import Loader from '@/components/common/Loader';
// import { userAuthStore } from '@/utils/userStore';
// import { httpservice } from '@/utils/httpService';
import Error from '@/components/common/Error';
import { httpServiceServer } from '@/utils/httpServiceServer';

// const fetcher = async (url: string) => {
//   try {
//     const response = await httpservice.get(url);
//     return response.data;
//   } catch (error:any) {
//     toast.error(error.response.data);
//   }
// }

export const metadata={
  title:'Shops',
  description:'Find the best shops around you',
  openGraph: {
    images: ['/images/shop.png'],
  },
}
const Page = async () => {
  const data=await httpServiceServer.get('shop');
  if (data.error) {
    return <div className="main flex items-center justify-center">
            <Error message={data.message || "Something went wrong"} />;
        </div>;
  }
  if (!data) {
    return <Loader message='Shops are coming at your doorstep' />; // You can show a loading indicator
  }
  const shops: ResponseShopType = data.shops;


  return (
    <div className='main'>
      <div className="menu-container">
      {shops.map((shop) => (
        <ShopCard key={shop.id} imgUrl={shop.img!} slug={shop.slug} desc={shop.desc!} id={shop.id!} title={shop.title!} />
      ))}
      </div>
    </div>
  )
}

export default Page;
