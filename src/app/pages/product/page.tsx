"use client"
import useSWR from 'swr'; // Assuming you have swr installed
import React from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '@/baseUrl';
import Loader from '@/components/common/Loader';
import { userAuthStore } from '@/utils/userStore';
import ProductContainer from '@/components/product/ProductContainer';
import { ProductType } from '@/types/types';
import { httpservice } from '@/utils/httpService';
import Error from '@/components/common/Error';

const fetcher = async (url: string) => {
    try {
        const response = await httpservice.get(url);
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        console.log(error)
        toast.error(error.response.data);
    }
}

const Page = () => {
    const { data, error, isLoading } = useSWR(`${baseUrl}/product`, fetcher);
    const { role } = userAuthStore()
    if (error) {
        return <div className="main flex items-center justify-center">
            <Error message={error.response.data.message} />;
        </div>;
    }
    if (!data || isLoading) {
        return <Loader message='Delicious Food Coming Through' />; // You can show a loading indicator
    }
    const products: ProductType[] = data.products;
    return (
        <div className='main'>
            <div className="products flex flex-wrap flex-grow justify-around gap-6">
                {role !== "Admin" &&
                    products.map((product: ProductType) => (
                        <ProductContainer key={product.id} img={product.img!} desc={product.desc!} id={product.id!} title={product.title!} price={product.price!}/>
                    ))}
                {role === "ShopOwner" && <ProductContainer id='new' img='/images/add.webp' title='Add new' add={true} productType='Veg' />}
            </div>
        </div>
    )
}

export default Page;
