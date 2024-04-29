// "use client"
import React from 'react';
import useSWR from 'swr';
import ShopCard from '../shop/ShopCard';
import { ResponseShopType } from '@/types/types';
import { baseUrl } from '@/baseUrl';
import { httpservice } from '@/utils/httpService';
import ContainerLoader from '../common/ContainerLoader';
import Error from '../common/Error';
import { httpServiceServer } from '@/utils/httpServiceServer';

// const fetcher = async (url:string) => {
//   const response =await httpservice.get(url);
//   return response.data;
// };

const Store =async () => {
  // const { data, error } = useSWR(`${baseUrl}/shop`, fetcher);
  const data=await httpServiceServer.get("shop");
  if (data.error) {
    return <div className="w-screen  h-[30vh] sm:h-[30vh] md:h-[60vh]">
    <Error message={data.message}/>
  </div>;
  }

  const shops: ResponseShopType = data.shops;
  if (!data) {
    return <div className="w-screen  h-[30vh] sm:h-[30vh] md:h-[60vh]">
      <ContainerLoader message="Munch shops are loading" />
    </div>;
  }

  return (
    <div className="store-container hideScrollBar">
      {shops && shops.map((shop) => (
        <ShopCard
          key={shop.id}
          imgUrl={shop.img!}
          slug={shop.slug}
          desc={shop.desc!}
          id={shop.id}
          title={shop.title}
        />
      ))}
    </div>
  );
};

export default Store;
