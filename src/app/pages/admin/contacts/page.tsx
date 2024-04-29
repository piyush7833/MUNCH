
// "use client"
// import useSWR from 'swr'; // Assuming you have swr installed
import React from 'react'
// import { toast } from 'react-toastify';
// import { baseUrl } from '@/baseUrl';
import Loader from '@/components/common/Loader';
import CustomTable from '@/components/common/Table/CustomTable';
import { ContactResponseType } from '@/types/types';
// import { httpservice } from '@/utils/httpService';
import Error from '@/components/common/Error';
import { findKeys } from '@/utils/action';
import { httpServiceServer } from '@/utils/httpServiceServer';

// const fetcher = async (url: string) => {
//     try {
//         const response = await httpservice.get(url);
//         return response.data;
//     } catch (error: any) {
//         console.log(error)
//         toast.error(error.response.data);
//     }
// }

const Contacts = async () => {
    // const { data, error, isLoading } = useSWR(`${baseUrl}/contact`, fetcher);
    const data= await httpServiceServer.get('contact');
    if (data.error) {
        return <div className="main flex items-center justify-center">
        <Error message={data.message} />
      </div>
    }
    if (!data) {
        return <Loader message='Contacts are imoortant to serve best' />; // You can show a loading indicator
    }
    const contacts:ContactResponseType[] = data.contacts;
    const extracedtedData = contacts.map(({img,user,shop,subject,message}) => ({
        img,
        user,
        shop,
        subject,
        message
    }))
    return (
        <div className='main'>
            <CustomTable data={extracedtedData} keys={findKeys(extracedtedData)} originalData={contacts} type='contacts' />
            {contacts.length === 0 && <p className='text-center'>No Contacts Found</p>}
        </div>
    )
}

export default Contacts;
