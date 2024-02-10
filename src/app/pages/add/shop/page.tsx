"use client"
import { baseUrl } from '@/baseUrl'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import FormContainer from '@/components/common/FormContainer'
import ImgContainer from '@/components/common/ImgContainer'
import { addressType, shopType } from '@/types/types'
import { handleUploadImage } from '@/utils/action'
import { addShopFormData, addressFormData } from '@/utils/formData'
import { httpservice } from '@/utils/httpService'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [shopData, setShopData] = useState<shopType>();
  const [addressData, setAddressData] = useState<addressType>();
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const router=useRouter()
  const handleSubmit = async () => {
    try {
      let imgUrl;
      setLoading(true);
      if (selectedImage) {
        imgUrl = await handleUploadImage(selectedImage)
      }
      console.log("shop",shopData)
      console.log("address",addressData)
      const response =await  httpservice.post(`${baseUrl}/shop`, { title:shopData?.title, desc:shopData?.desc, slug:shopData?.slug  ,address: addressData,img:imgUrl })
      toast.success(response.data.message);
      setLoading(false);
      router.push(`/pages/shops/${response.data.newShop.slug}`)
    } catch (error:any) {
      toast.error(error.response.data.message)
      setLoading(false);
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
      <FormContainer onSave={handleSave} data={addShopFormData} address={addressFormData} title="Add shop" loading={loading} />
    </div>
  )
}

export default Page
