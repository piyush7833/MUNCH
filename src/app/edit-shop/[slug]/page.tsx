"use client"
import { baseUrl } from '@/baseUrl'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import FormContainer from '@/components/common/FormContainer'
import ImgContainer from '@/components/common/ImgContainer'
import { addressType, shopType } from '@/types/types'
import { addShopFormData, addressFormData, editAddressFormData, editShopFormData } from '@/utils/formData'
import { userAuthStore } from '@/utils/userStore'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
type Props={
  params:{slug:string}
}
const  Page = ({params}:Props) => {
  const [data,setData]=useState<any>()
  const {id}=userAuthStore()
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [shopData, setShopData] = useState<shopType>();
  const [addressData, setAddressData] = useState<addressType>();
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const router=useRouter()
  useEffect(() => {
    const getData = async (slug:string) => {
      try {
        const response = await axios.get(`${baseUrl}/shop/${slug}`)
        setData(response.data);
      } catch (error: any) {
        setData(error.response)
      }
    }
    getData(params.slug)
  }, [params.slug])
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
      const response =await  axios.put(`${baseUrl}/shop/${params.slug}`, { title:shopData?.title, desc:shopData?.desc, slug:shopData?.slug  ,address: addressData,img:imgUrl })
      toast.success(response.data.message);
      router.push(`/shops/${response.data.updatedShop.slug}`)
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
  if(data && data.error){
    return <div>Something went wrong</div>
  }
  if(!data){
    return <div>Loading...</div>
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
