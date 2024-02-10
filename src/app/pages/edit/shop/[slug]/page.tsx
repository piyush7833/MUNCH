"use client"
import { baseUrl } from '@/baseUrl'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import Error from '@/components/common/Error'
import FormContainer from '@/components/common/FormContainer'
import ImgContainer from '@/components/common/ImgContainer'
import Loader from '@/components/common/Loader'
import { addressType, shopType } from '@/types/types'
import { handleUploadImage } from '@/utils/action'
import { editAddressFormData, editShopFormData } from '@/utils/formData'
import { httpservice } from '@/utils/httpService'
import { userAuthStore } from '@/utils/userStore'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'
type Props = {
  params: { slug: string }
}
const Page = ({ params }: Props) => {
  const { id } = userAuthStore()
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [shopData, setShopData] = useState<shopType>();
  const [addressData, setAddressData] = useState<addressType>();
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const fetcher = async (url: string) => {
    const response = await httpservice.get(url)
    return response.data
  };
  const { data, error, isLoading } = useSWR(`${baseUrl}/shop/${params.slug}`, fetcher);

  const handleSubmit = async () => {
    try {
      let imgUrl;
      setLoading(true)
      if (selectedImage) {
        imgUrl = await handleUploadImage(selectedImage)
      }
      const response = await httpservice.put(`${baseUrl}/shop/${params.slug}`, { title: shopData?.title, desc: shopData?.desc, slug: shopData?.slug, address: addressData, img: imgUrl })
      toast.success(response.data.message);
      setLoading(false)
      router.push(`/pages/shops/${response.data.updatedShop.slug}`)
    } catch (error: any) {
      setLoading(false)
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
  if (error) {
    return <div className="main flex items-center justify-center">
      <Error message={error.response.data.message} />
    </div>
  }
  if (isLoading) {
    return <Loader message='Shops are coming at your doorstep' />
  }
  if (data && data.shop.userId !== id) {
    return <div className="main flex items-center justify-center">
      <Error message="Unauthorized" />
    </div>
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
        <FormContainer onSave={handleSave} data={editShopFormData} address={editAddressFormData} originalData={data.shop} originalAddressData={data.shop.address} title="Edit shop" loading={loading} />
      </div>
    </div>
  )
}

export default Page 
