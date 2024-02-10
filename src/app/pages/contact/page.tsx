"use client";
import React, { useState } from 'react'
import FormContainer from '@/components/common/FormContainer';
import { contactForm } from '@/utils/formData';
import { ContactResponseType, ContactType } from '@/types/types';
import { httpservice } from '@/utils/httpService';
import { baseUrl } from '@/baseUrl';
import { toast } from 'react-toastify';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import ImgContainer from '@/components/common/ImgContainer';
import useSWR,{mutate} from 'swr';
import { findKeys, handleUploadImage } from '@/utils/action';
import CustomTable from '@/components/common/Table/CustomTable';
import Error from '@/components/common/Error';
import Loader from '@/components/common/Loader';
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
  const handleSubmit = async () => {
    try {
      let imgUrl;
      if (selectedImage) {
        imgUrl = await handleUploadImage(selectedImage)
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
  const contacts:ContactResponseType[] = data?.contacts;
  const extracedtedData = contacts?.map(({img,user,shop,subject,message}) => ({
    img,
    user,
    shop,
    subject,
    message
}))
  if (error) return <div className="main flex items-center justify-center">
    <Error message={error.response.data.message} />
  </div>;
  if (isLoading) return <Loader message='Contacts are necessary to serve you bets'/>
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
        <FormContainer data={contactForm} title="Contact Us" onSave={handleSave} />
      </div>
      <div className="">
      <h1 className='text-3xl my-4'>Previous Messages</h1>
      {(data && data.contacts.length>0) ?<CustomTable data={extracedtedData} keys={findKeys(extracedtedData)} originalData={data.contacts}/> :"You haven't contacted us earlier"}
      </div>
    </div>
  )
}

export default Contact
