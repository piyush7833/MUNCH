// "use client"
// import { baseUrl } from '@/baseUrl';
import Error from '@/components/common/Error';
import Loader from '@/components/common/Loader';
import ProductContainer from '@/components/product/ProductContainer';
import ShopHeading from '@/components/shop/ShopHeading';
import { ProductType } from '@/types/types';
// import {  getUserIdFromToken } from '@/utils/action';
// import { httpservice } from '@/utils/httpService';
import { httpServiceServer } from '@/utils/httpServiceServer';
import { getUserIdFromToken } from '@/utils/server_action';
import { Metadata, ResolvingMetadata } from 'next';
// import { userAuthStore } from '@/utils/userStore';
import React from 'react'
// import useSWR from 'swr';

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data=await httpServiceServer.get(`shop/${params.slug}`);
  const previousImages = (await parent).openGraph?.images || [];
  const img=data?.shop?.img || '/images/shop.webp';
  return {
    title: data?.shop?.title + ' | MUNCH',
    description: data?.shop?.desc,
    openGraph: {
      images: [img, ...previousImages]
    },
  }
}

const ShopMenuPage = async ({ params }: Props) => {
  // const { id } = userAuthStore();
  const id=getUserIdFromToken();
  const data=await httpServiceServer.get(`shop/${params.slug}`);
  // const fetcher = async (url: string) => {
  //   const response = await httpservice.get(url);
  //   return response.data;
  // };
  // const { data, error, isLoading } = useSWR(`${baseUrl}/shop/${params.slug}`, fetcher);
  if (data.error) {
    // console.log(error)
     return <div className="main flex items-center justify-center">
    <Error message={data.message} />;
</div>;
  }
  if (!data) {
    return <Loader message='Shops are coming at your doorsteps' />
  }
  return (
    <div className='flex text-main flex-wrap min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-5.5rem)] gap-4'>
      <ShopHeading title={data?.shop?.title} userId={data?.shop?.user?.id} address={data?.shop?.address} owner={data?.shop?.user?.name} totalProducts={data?.shop?.products?.length} desc={data?.shop?.desc} img={data?.shop?.img} slug={data?.shop?.slug}  />
      {data.shop.verified? <div className="products flex flex-wrap flex-grow justify-around gap-6">
        {data?.shop?.products.map((item: ProductType) => (
          <ProductContainer key={item.id} img={item.img} title={item.title} id={item.id!} price={item.price} productType={item.type!} shopUserId={data.shop.user.id} />
        ))}
        {id === data?.shop?.user?.id && <ProductContainer img='/images/add.webp' title='Add new' add={true}  shopSlug={data.shop.slug} />}
      </div> :
      !data.shop.notVerified? 
        <p className='text-center w-full'>
          Shop verification is in progress. Please check back later
        </p>: <p className='text-center w-full'>Shop is not verified due to {data.shop.notVerified}</p> 
      }
    </div>
  )
}

export default ShopMenuPage
