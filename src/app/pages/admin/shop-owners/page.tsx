"use client"
import useSWR, { mutate } from 'swr'; // Assuming you have swr installed
import React from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '@/baseUrl';
import Loader from '@/components/common/Loader';
import CustomTable from '@/components/common/Table/CustomTable';
import { responseShopOwnerType } from '@/types/types';
import { httpservice } from '@/utils/httpService';
import Error from '@/components/common/Error';

const fetcher = async (url: string) => {
    try {
        const response = await httpservice.get(url);
        return response.data;
    } catch (error: any) {
        console.log(error)
        toast.error(error.response.data);
    }
}

const Page = () => {
    const { data, error } = useSWR(`${baseUrl}/shopowner`, fetcher);
    if (error) {
        return <div className="main flex items-center justify-center">
           <Error message={error.response.data.message} />
        </div>
    }
    if (!data) {
        return <Loader message='Delicious Food Coming Through' />; // You can show a loading indicator
    }
    const shopowner: responseShopOwnerType[] = data.shopOwner;
    const findKeys = (arrayOfObjects: any[]): string[] => {
        const keys = arrayOfObjects.reduce((acc, item) => {
            return acc.concat(Object.keys(item));
        }, []);
        return Array.from(new Set(keys));
    }
    const handleUpdate = async () => {
        mutate(`${baseUrl}/shopowner`)
    }
    const extracedtedData = shopowner.map(({ user, panCard, aadhar, GSTIN, bankAccount, IFSC, verified, notVerified }) => ({
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
            <CustomTable data={extracedtedData} keys={findKeys(extracedtedData)} originalData={shopowner} handleUpdate={handleUpdate} type='shop-owners' />
            {shopowner.length === 0 && <p className='text-center'>No Shop Owner Found</p>}
        </div>
    )
}

export default Page;
