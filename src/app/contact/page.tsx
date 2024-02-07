"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import FormContainer from '@/components/common/FormContainer';
import { contactForm } from '@/utils/formData';
import { ContactType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { httpservice } from '@/utils/httpService';
import { baseUrl } from '@/baseUrl';
import { toast } from 'react-toastify';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import ImgContainer from '@/components/common/ImgContainer';
import useSWR,{mutate} from 'swr';
const Contact = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [contactData, setContactData] = useState<ContactType>();
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const fetcher = async (url: string) => {
    try {
      const response = await httpservice.get(url);
      console.log(response.data.contacts)
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data);
    }
  }
  const { data, error, isLoading } = useSWR(`${baseUrl}/contact`, fetcher);
  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedImage!);
      formData.append('type', "single");
      const imageResponse = await httpservice.post(`${baseUrl}/upload-image`, formData)
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
      const response = await httpservice.post(`${baseUrl}/contact`, { subject: contactData?.subject, shopId: contactData?.shopId, message: contactData?.message, img: imgUrl })
      toast.success(response.data.message);
      mutate(`${baseUrl}/contact`);
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  const handleSave = async (formDetails: ContactType) => {
    try {
      setContactData(formDetails)
      setConfirmOpen(true)
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  const handleImageChange = (selectedImage: File | null) => {
    setSelectedImage(selectedImage);
  };
  if (error) return <p>Something went wrong</p>;
  if (isLoading) return <p>Loading...</p>
  return (
    <div className='main flex flex-col justify-center gap-[4vh]'>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSubmit}
        title="Confirm Action"
        message="Are you sure you want to perform this action?"
      />
      <div className="main flex flex-col md:flex-row items-center justify-center">
        {/* {selectedImage? */}
        <ImgContainer type='singleProduct' alt='add image' imgUrl='/images/contact.png' edit={true} func={handleImageChange} />
        {/* :<div className="w-full h-1/3 relative md:w-1/2 md:h-full flex ">
          <Image src='/images/contact.png' alt='contact' fill={true} />
        </div>} */}
        <FormContainer data={contactForm} title="Contact Us" onSave={handleSave} />
      </div>
      <div className="">
      <h1 className='text-3xl my-4'>Previous Messages</h1>
      {(data && data.contacts.length>0) ? data.contacts?.map((item: any) => (
        <div key={item._id} className='flex gap-4'>
          <h1>{item.subject}</h1>
          <p>{item.message}</p>
        </div>
      )):"You haven't contacted us earlier"}
      </div>
    </div>
  )
}

export default Contact
