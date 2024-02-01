"use client"
import Image from 'next/image';
import React, { useState, useRef } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseUrl } from '@/baseUrl';
import { userAuthStore } from '@/utils/userStore';
import ImgContainer from '@/components/common/ImgContainer';
import { toast } from 'react-toastify';
import axios from 'axios';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import FormContainer from '@/components/common/FormContainer';
import { productType } from '../../api/product/type';
import { addProductFormData } from '@/utils/formData';
import { productOptionType } from '@/types/types';


type Props={
    params:{slug:string}
  }

const AddPage = ({params}:Props) => {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [productData, setProductData] = useState<productType>()
    const router = useRouter()
    const [options, setOptions] = useState<productOptionType[]>([])
    const handleUploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('file', selectedImage!);
            formData.append('type', "single");
            const imageResponse = await axios.post(`${baseUrl}/upload-image`, formData)
            return imageResponse.data.imgUrls;
        } catch (error) {
            toast.error("Image upload failed")
            return null;
        }
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            let imgUrl;
            if (selectedImage) {
                imgUrl = await handleUploadImage()
            }
            const response = await axios.post(`${baseUrl}/product`, {title:productData?.title,desc:productData?.desc,type:productData?.type,img:imgUrl,options,slug:params.slug, price:productData?.price})
            toast.success(response.data.message);
            router.push(`/product/${response.data.product.id}`)
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
            <FormContainer onSave={handleSave} data={addProductFormData} title="Add Product" />
        </div>
    )
}

export default AddPage
