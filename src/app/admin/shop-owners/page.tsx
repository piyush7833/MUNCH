"use client"
import useSWR from 'swr'; // Assuming you have swr installed
import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '@/baseUrl';
import Loader from '@/components/common/Loader';
import CustomTable from '@/components/common/Table/CustomTable';
import { responseShopOwnerType, shopOwnerType } from '@/types/types';

const fetcher = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.log(error)
        toast.error(error.response.data);
    }
}

const Page = () => {
    const { data, error } = useSWR(`${baseUrl}/shopowner`, fetcher);
    if (error) {
        return <p>Something went wrong</p>;
    }
    if (!data) {
        return <Loader message='Delicious Food Coming Through' />; // You can show a loading indicator
    }
    const shopowner:responseShopOwnerType[] = data.shopOwner;
    const findKeys = (arrayOfObjects: any[]): string[] => {
        const keys = arrayOfObjects.reduce((acc, item) => {
            return acc.concat(Object.keys(item));
        }, []);
        return Array.from(new Set(keys));
    }
    const extracedtedData = shopowner.map(({user,panCard,aadhar,GSTIN,bankAccount,IFSC,verified,notVerified}) => ({
        user,
        panCard,
        aadhar,
        GSTIN,
        bankAccount,
        IFSC,
        verified,
        notVerified
    }))

    return (
        <div className='main'>
            <CustomTable data={extracedtedData} keys={findKeys(extracedtedData)} originalData={shopowner} type='shop-owners' />
            {shopowner.length === 0 && <p className='text-center'>No Shop Owner Found</p>}
        </div>
    )
}

export default Page;
