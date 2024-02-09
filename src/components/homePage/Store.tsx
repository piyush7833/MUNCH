"use client"
import React from 'react';
import useSWR from 'swr';
import ShopCard from '../shop/ShopCard';
import { ResponseShopType } from '@/types/types';
import { baseUrl } from '@/baseUrl';
import { httpservice } from '@/utils/httpService';

const fetcher = async (url:string) => {
  const response =await httpservice.get(url);
  return response.data;
};

const Store = () => {
  const { data, error } = useSWR(`${baseUrl}/shop`, fetcher);

  if (error) {
    return <p>Something went wrong</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const shops: ResponseShopType = data.shops;

  return (
    <div className="store-container hideScrollBar">
      {shops.map((shop) => (
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
