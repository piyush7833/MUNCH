// "use client"
// import useSWR from 'swr'; // Assuming you have swr installed
import React from 'react'
// import { toast } from 'react-toastify';
// import { baseUrl } from '@/baseUrl';
import Loader from '@/components/common/Loader';
import CustomTable from '@/components/common/Table/CustomTable';
import { productType } from '@/app/api/product/type';
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

const Page = async () => {
    // const { data, error,isLoading } = useSWR(`${baseUrl}/product`, fetcher);
    const data= await httpServiceServer.get('product')
    if (data.error) {
        return <div className="main flex items-center justify-center">
           <Error message={data.message} />
        </div>
    }
    if (!data) {
        return <Loader message='Delicious Food Coming Through' />; // You can show a loading indicator
    }
    const products: productType[] = data.products;
    const extracedtedData = products.map(({ img, title, desc, type, status }) => ({
        img, title, desc, type, status
    }))

    return (
        <div className='main'>
            <CustomTable data={extracedtedData} keys={findKeys(extracedtedData)} originalData={products} type='products' />
            {products.length === 0 && <p className='text-center'>No Product Owner Found</p>}
        </div>
    )
}

export default Page;
