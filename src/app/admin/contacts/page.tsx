"use client"
import useSWR from 'swr'; // Assuming you have swr installed
import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '@/baseUrl';
import Loader from '@/components/common/Loader';
import CustomTable from '@/components/common/Table/CustomTable';
import { ContactResponseType } from '@/types/types';

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
    const { data, error } = useSWR(`${baseUrl}/contact`, fetcher);
    console.log(data)
    if (error) {
        return <p>Something went wrong</p>;
    }
    if (!data) {
        return <Loader message='Delicious Food Coming Through' />; // You can show a loading indicator
    }
    const contacts:ContactResponseType[] = data.contacts;
    const findKeys = (arrayOfObjects: any[]): string[] => {
        const keys = arrayOfObjects.reduce((acc, item) => {
            return acc.concat(Object.keys(item));
        }, []);
        return Array.from(new Set(keys));
    }
    const extracedtedData = contacts.map(({img,user,shop,subject,message}) => ({
        img,
        user,
        shop,
        subject,
        message
    }))
    console.log(extracedtedData)
    return (
        <div className='main'>
            <CustomTable data={extracedtedData} keys={findKeys(extracedtedData)} originalData={contacts} type='contacts' />
            {contacts.length === 0 && <p className='text-center'>No Contacts Found</p>}
        </div>
    )
}

export default Page;
