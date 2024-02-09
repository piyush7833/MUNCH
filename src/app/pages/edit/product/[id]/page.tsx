"use client"
import { productType } from '@/app/api/product/type'
import { baseUrl } from '@/baseUrl'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import FormContainer from '@/components/common/FormContainer'
import ImgContainer from '@/components/common/ImgContainer'
import Loader from '@/components/common/Loader'
import {  productOptionType } from '@/types/types'
import { handleUploadImage } from '@/utils/action'
import {  editProductFormData } from '@/utils/formData'
import { httpservice } from '@/utils/httpService'
import { useRouter } from 'next/navigation'
import React, {  useState } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'
type Props={
  params:{id:string}
}
const  Page = ({params}:Props) => {
  const fetcher = async (url: string) => {
    const response = await httpservice.get(url);
    return response.data;
  };
  const { data, error, isLoading } = useSWR(`${baseUrl}/product/${params.id}`, fetcher);
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
          const response = await httpservice.put(`${baseUrl}/product/${params.id}`, {title:productData?.title,desc:productData?.desc,type:productData?.type,img:imgUrl,options, price:productData?.price})
          toast.success(response.data.message);
          router.push(`/pages/product/${response.data.updatedProduct.id}`)
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
  if(error){
    return <div>Something went wrong</div>
  }
  if(isLoading || !data){
    return <Loader message='Edit food details easliy on munch' />
  }
console.log(data)
  return (
    <div>
    <div className='main flex flex-col md:flex-row gap-14 md:gap-4 items-center justify-center hideScrollBar w-full'>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSubmit}
        title="Confirm Action"
        message="Are you sure you want to perform this action?"
      />
      <div className=" w-full h-1/2 md:h-1/2 md:w-1/2 flex items-center justify-center">
        <ImgContainer type='singleProduct' alt='add image' edit={true} imgUrl={data?.product?.img} func={handleImageChange} />
      </div>
      {data && <FormContainer onSave={handleSave} data={editProductFormData} originalData={data?.product}  originalAdditionalOptions={data?.product?.options} additional={true} title="Edit Product" />}
    </div>
    </div>
  )
}

export default Page 
