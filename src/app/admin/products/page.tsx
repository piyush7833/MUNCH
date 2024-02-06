"use client"
import useSWR from 'swr'; // Assuming you have swr installed
import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '@/baseUrl';
import Loader from '@/components/common/Loader';
import { userAuthStore } from '@/utils/userStore';
import CustomTable from '@/components/common/Table/CustomTable';
import { productType } from '@/app/api/product/type';

const fetcher = async (url: string) => {
    try {
        const response = await axios.get(url);
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        console.log(error)
        toast.error(error.response.data);
    }
}

const Page = () => {
    const { data, error,isLoading } = useSWR(`${baseUrl}/product`, fetcher);
    console.log(data)
    if (error) {
        return <p>Something went wrong</p>
    }
    if (isLoading) {
        return <Loader message='Delicious Food Coming Through' />; // You can show a loading indicator
    }
    const products: productType[] = data.products;

    const findKeys = (arrayOfObjects: any[]): string[] => {
        const keys = arrayOfObjects.reduce((acc, item) => {
            return acc.concat(Object.keys(item));
        }, []);
        return Array.from(new Set(keys));
    }
    const extracedtedData = products.map(({ img, title, desc, type, status }) => ({
        img, title, desc, type, status
    }))

    return (
        <div className='main'>
            <CustomTable data={extracedtedData} keys={findKeys(extracedtedData)} />
        </div>
    )
}

export default Page;
