"use client"
import { baseUrl } from '@/baseUrl'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import FormContainer from '@/components/common/FormContainer'
import ImgContainer from '@/components/common/ImgContainer'
import { addressType, shopType } from '@/types/types'
import { handleUploadImage } from '@/utils/action'
import { editAddressFormData, editShopFormData } from '@/utils/formData'
import { httpservice } from '@/utils/httpService'
import { userAuthStore } from '@/utils/userStore'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'
type Props={
  params:{slug:string}
}
const  Page = ({params}:Props) => {
  const {id}=userAuthStore()
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [shopData, setShopData] = useState<shopType>();
  const [addressData, setAddressData] = useState<addressType>();
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const router=useRouter()
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };
  const { data, error, isLoading } = useSWR(`${baseUrl}/shop/${params.slug}`, fetcher);

  const handleSubmit = async () => {
    try {
      let imgUrl;
      if (selectedImage) {
        imgUrl = await handleUploadImage(selectedImage)
      }
      const response =await  httpservice.put(`${baseUrl}/shop/${params.slug}`, { title:shopData?.title, desc:shopData?.desc, slug:shopData?.slug  ,address: addressData,img:imgUrl })
      toast.success(response.data.message);
      router.push(`/pages/shops/${response.data.updatedShop.slug}`)
    } catch (error:any) {
      toast.error(error.response.data.message)
    }
  }
  const handleSave = async (formDetails: shopType, addressDetails: addressType) => {
    try {
      setShopData(formDetails)
      setAddressData(addressDetails)
      setConfirmOpen(true)
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  const handleImageChange = (selectedImage: File | null) => {
    setSelectedImage(selectedImage);
  };
  if(error){
    return <div>Something went wrong</div>
  }
  if(isLoading){
    return <div>Loading...</div>
  }
  if(data && data.shop.userId!==id){
    return <div>Unauthorised</div>
  }
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
        <ImgContainer type='singleProduct' alt='add image' edit={true} imgUrl={data.shop.img} func={handleImageChange} />
      </div>
      <FormContainer onSave={handleSave} data={editShopFormData} address={editAddressFormData} originalData={data.shop} originalAddressData={data.shop.address} title="Edit shop" />
    </div>
    </div>
  )
}

export default Page 
