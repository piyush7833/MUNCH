"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/baseUrl';
import ImgContainer from '@/components/common/ImgContainer';
import { toast } from 'react-toastify';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import FormContainer from '@/components/common/FormContainer';
import { addProductWithShopFormData } from '@/utils/formData';
import { ResponseShopType, productOptionType } from '@/types/types';
import { handleUploadImage } from '@/utils/action';
import { httpservice } from '@/utils/httpService';
import { productType } from '@/app/api/product/type';



const AddPage = () => {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [productData, setProductData] = useState<productType>()
    const router = useRouter()
    const [options, setOptions] = useState<productOptionType[]>([])
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            let imgUrl;
            setLoading(true);
            if (selectedImage) {
                imgUrl = await handleUploadImage(selectedImage)
            }
            const response = await httpservice.post(`${baseUrl}/product`, {title:productData?.title,desc:productData?.desc,type:productData?.type,img:imgUrl,options,slug:productData?.slug, price:productData?.price})
            toast.success(response.data.message);
            setLoading(false);
            router.push(`/pages/product/${response.data.product.id}`)
        } catch (error: any) {
            console.log(error)
            setLoading(false);
            toast.error(error.response.data.message)
        }
    }
    const handleImageChange = (selectedImage: File | null) => {
        setSelectedImage(selectedImage);
    };
    const handleSave = async (formDetails: productType, optionDetails: productOptionType[]) => {
        try {
            setProductData(formDetails)
            setOptions(optionDetails)
            setConfirmOpen(true)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    const [shops, setShops] = useState<ResponseShopType>([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await httpservice.get(`${baseUrl}/shop`);
        setShops(response.data.shops);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShops();
  }, []);
    addProductWithShopFormData[0].options = shops.map(shop => shop.slug)
    console.log(shops)
    return (
        <div className='main flex flex-col md:flex-row gap-14 md:gap-4 items-center justify-center hideScrollBar w-full'>
            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleSubmit}
                title="Confirm Action"
                message="Are you sure you want to perform this action?"
            />
            <div className=" w-full h-1/2 md:h-1/2 md:w-1/2 flex items-center justify-center">
                <ImgContainer type='singleProduct' alt='add image' edit={true} func={handleImageChange} />
            </div>
            <FormContainer onSave={handleSave} data={addProductWithShopFormData} title="Add Product" additional={true} loading={loading} />
        </div>
    )
}

export default AddPage
