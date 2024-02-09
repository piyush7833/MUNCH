"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/baseUrl';
import ImgContainer from '@/components/common/ImgContainer';
import { toast } from 'react-toastify';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import FormContainer from '@/components/common/FormContainer';
import { productType } from '../../../../api/product/type';
import { addProductFormData } from '@/utils/formData';
import { productOptionType } from '@/types/types';
import { handleUploadImage } from '@/utils/action';
import { httpservice } from '@/utils/httpService';


type Props={
    params:{slug:string}
  }

const AddPage = ({params}:Props) => {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [productData, setProductData] = useState<productType>()
    const router = useRouter()
    const [options, setOptions] = useState<productOptionType[]>([])
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            let imgUrl;
            if (selectedImage) {
                imgUrl = await handleUploadImage(selectedImage)
            }
            const response = await httpservice.post(`${baseUrl}/product`, {title:productData?.title,desc:productData?.desc,type:productData?.type,img:imgUrl,options,slug:params.slug, price:productData?.price})
            toast.success(response.data.message);
            router.push(`/pages/product/${response.data.product.id}`)
        } catch (error: any) {
            console.log(error)
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
            <FormContainer onSave={handleSave} data={addProductFormData} title="Add Product" additional={true} />
        </div>
    )
}

export default AddPage
