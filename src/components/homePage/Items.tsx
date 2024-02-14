"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductsType } from '@/types/types';
import useSWR from 'swr';
import { baseUrl } from '@/baseUrl';
import { httpservice } from '@/utils/httpService';
import ContainerLoader from '../common/ContainerLoader';
import Error from '../common/Error';

const fetcher = async (url:string) => {
  const response = await httpservice.get(url);
  return response.data;
};


const Items = () => {
  const { data, error, isLoading } = useSWR(`${baseUrl}/product`, fetcher);
  if (error) {
    return <div className=" w-screen lg:h-[90vh] h-[60vh] flex">
    <Error message={error.response.data.message}/>
  </div>;
  }

  if (isLoading) {
    return <div className=" w-screen lg:h-[90vh] h-[60vh] flex">
      <ContainerLoader message='MUNCH best food is here' />
    </div>

  }

  const featuredProducts: ProductsType = data?.products;
  return (
    <div className="overflow-x-auto hideScrollBar cursor-pointer">
      <div className="item-wraper">
        {featuredProducts &&
          featuredProducts.map((item) => (
            <Link href={`/pages/product/${item.id}`} key={item.id}>
              <div className="single-item group shadow-2xl" key={item.id}>
                {item.img && (
                  <div className="single-imgContainer group-hover:scale-110 md:group-hover:scale-105">
                    <Image src={item.img} alt={item.title} fill className="object-contain" />
                  </div>
                )}
                <div className="single-textContainer">
                  <div className="text-xl lg:text-3xl uppercase font-bold py-2">{item.title}</div>
                  <p className="text-sm lg:text-base p-4">{item.desc}</p>
                  <div className="text-xl lg:text-3xl font-bold">Rs {item.price}</div>
                  <button className="btn flex text-white "> Add to cart</button>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Items;
