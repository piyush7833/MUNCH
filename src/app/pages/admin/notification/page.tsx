"use client"
import React, { useEffect, useState } from 'react';
import { httpservice } from '@/utils/httpService';
import { baseUrl } from '@/baseUrl';
import { toast } from 'react-toastify';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import FormContainer from '@/components/common/FormContainer';
import ImgContainer from '@/components/common/ImgContainer';
import { handleUploadImage } from '@/utils/action';
import { notificationFormData } from '@/utils/formData';
import { NotificationType } from '@/types/types';

const Page = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [notificationData, setNotificationData] = useState<NotificationType>();
  const [role,setRole]=useState<string>("All");
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recievers, setRecievers] = useState<any[]>([]);

  const handleSubmit = async () => {
    try {
      let imgUrl;
      setLoading(true);
      if (selectedImage) {
        console.log(selectedImage)
        imgUrl = await handleUploadImage(selectedImage);
      }
      const response = await httpservice.post(`${baseUrl}/notification`, {title:notificationData?.title,text:notificationData?.text,image:imgUrl,role:role,recievers:notificationData?.recievers,link:notificationData?.link});
      toast.success(response.data.message);
      setLoading(false);
    } catch (error:any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleSave = async (formDetails: NotificationType) => {
    try {
      setNotificationData(formDetails);
      setConfirmOpen(true);
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleImageChange = (selectedImage: File | null) => {
    setSelectedImage(selectedImage);
  };

  const handleRoleChange = async (updatedRole:string) => {
    const response = await httpservice.post(`${baseUrl}/user`, { role: updatedRole || 'All' });
    const allOptions= response.data.user.map((reciever: any) => reciever.userName || '');
    notificationFormData[4].options = ['All',...allOptions];
    setRecievers(response.data.user);
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
      <FormContainer onSave={handleSave} data={notificationFormData}  title="Send Notification" loading={loading} extraFunction={handleRoleChange}  />
    </div>
  );
}

export default Page;
