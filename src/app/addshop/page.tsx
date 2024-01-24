"use client"
import { baseUrl } from '@/baseUrl'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import FormContainer from '@/components/common/FormContainer'
import ImgContainer from '@/components/common/ImgContainer'
import { addressType, shopType } from '@/types/types'
import { addShopFormData, addressFormData } from '@/utils/formData'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [shopData, setShopData] = useState<shopType>();
  const [addressData, setAddressData] = useState<addressType>();
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const router=useRouter()
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
  const handleSubmit = async () => {
    try {
      let imgUrl;
      if (selectedImage) {
        imgUrl = await handleUploadImage()
      }
      console.log("shop",shopData)
      console.log("address",addressData)
      const response =await  axios.post(`${baseUrl}/shop`, { title:shopData?.title, desc:shopData?.desc, slug:shopData?.slug  ,address: addressData,img:imgUrl })
      toast.success(response.data.message);
      router.push(`/shop/${response.data.newShop.slug}`)
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
  return (
    <div className='main flex flex-col md:flex-row gap-14 md:gap-4 items-center justify-center hideScrollBar w-full'>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSubmit}
        title="Confirm Action"
        message="Are you sure you want to perform this action?"
      />
      <div className="profileImg w-full h-1/2 md:h-1/2 md:w-1/2 flex items-center justify-center">
        <ImgContainer type='singleProduct' alt='add image' edit={true} func={handleImageChange} />
      </div>
      <FormContainer onSave={handleSave} data={addShopFormData} address={addressFormData} title="Add shop" />
    </div>
  )
}

export default Page
