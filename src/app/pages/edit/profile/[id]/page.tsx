"use client"
import { baseUrl } from '@/baseUrl'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import FormContainer from '@/components/common/FormContainer'
import ImgContainer from '@/components/common/ImgContainer'
import Loader from '@/components/common/Loader'
import { addressType, editUserType, shopOwnerType } from '@/types/types'
import { handleUploadImage } from '@/utils/action'
import {  editAddressFormData, editUserForm, editshopOwnerFormData } from '@/utils/formData'
import { httpservice } from '@/utils/httpService'
import { userAuthStore } from '@/utils/userStore'
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
  const { data, error, isLoading } = useSWR(`${baseUrl}/user/${params.id}`, fetcher);
  const user = data?.user;
  const extractedUserData = {
    userName: user?.userName,
    name: user?.name,
    phone: user?.phone,
    email: user?.email,
    role: user?.role,
  };
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [userData, setUserData] = useState<editUserType>()
  const [addressData, setAddressData] = useState<addressType>()
  const [shopOwnerData, setShopOwnerData] = useState<shopOwnerType>()
  const {logIn}=userAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      try {
          let imgUrl;
          if (selectedImage) {
              imgUrl = await handleUploadImage(selectedImage)
          }
          const shopOwnerResponse=await httpservice.put(`${baseUrl}/shopowner`, {panCard: shopOwnerData?.panCard, bankAccount: shopOwnerData?.bankAccount, IFSC: shopOwnerData?.IFSC, aadhar: shopOwnerData?.aadhar, GSTIN: shopOwnerData?.GSTIN, id: user?.shopOwner?.[0].id})
          const response = await httpservice.put(`${baseUrl}/user`, {name: userData?.name, phone: userData?.phone, email: userData?.email, address: addressData,image: imgUrl})
          logIn(response.data.updatedUser)
          toast.success(response.data.message);
          router.push(`/pages/profile`)
      } catch (error: any) {
          console.log(error,"error")
          toast.error(error.response.data.message)
      }
  }
  const handleImageChange = (selectedImage: File | null) => {
      setSelectedImage(selectedImage);
  };
  const handleSave = async (formDetails: any, addressDetails: any, shopOwnerDetails:any) => {
      try {
          setUserData(formDetails)
          setAddressData(addressDetails)
          setShopOwnerData(shopOwnerDetails)
          setConfirmOpen(true)
      } catch (error) {
          toast.error("Something went wrong")
      }
  }
  if(error){
    return <div>Something went wrong</div>
  }
  if(isLoading || !data){
    return <Loader message='Edit profile details easliy on munch' />
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
        <ImgContainer type='profile' alt='add image' edit={true} imgUrl={user?.image} func={handleImageChange} />
      </div>
      <FormContainer onSave={handleSave} data={editUserForm} originalData={extractedUserData} address={editAddressFormData} originalAddressData={user.address} shopOwner={editshopOwnerFormData} originalShopOwnerData={user?.shopOwner?.[0]} title="Edit Product" />
    </div>
    </div>
  )
}

export default Page 
