"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/baseUrl';
import ImgContainer from '@/components/common/ImgContainer';
import { userAuthStore } from '@/utils/userStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { addressType, passwordChangeType, shopOwnerType } from '@/types/types';
import FormDialog from '../common/FormDialog';
import { addressFormData, passwordChangeFormData, shopOwnerFormData } from '@/utils/formData';
import tokenHelper from '@/utils/tokenHelper';

const UserProfile = () => {
  const [phoneEditing, setPhoneEditing] = useState(false);
  const [emailEditing, setEmailEditing] = useState(false);
  const [nameEditing, setNameEditing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [roleEditing, setRoleEditing] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const handleOnChangeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateDetails({ ...updateDetails, [name]: value })
  }
  const router = useRouter()
  const { logOut, logIn } = userAuthStore()
  const handleSignout = async () => {
    try {
      const response = await axios.post(`${baseUrl}/auth/logout`, {
        headers: { 'Cache-Control': 'no-store' },
      });
      logOut(null)
      tokenHelper.delete("Authorization")
      tokenHelper.delete("Role")
      router.push('/')
    } catch (error: any) {
      console.log("error ", error)
      toast.error(error.response.data.message)
    }
  }
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      let formData;
      let response;
      if (selectedImage) {
        formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('type', "single");
        const imageResponse = await axios.post(`${baseUrl}/upload-image`, formData)
        const imageUrl = imageResponse.data.imgUrls;
        response = await axios.put(`${baseUrl}/user`, { updateDetails, image: imageUrl }, { timeout: 10000, });
        toast.success(imageResponse.data.message);
        toast.success(response.data.message);
        setEditing(false)
        setNameEditing(false)
        setPhoneEditing(false)
        setEmailEditing(false)
      }
      else {
        response = await axios.put(`${baseUrl}/user`, { updateDetails }, { timeout: 10000, });
        toast.success(response.data.message);
      }
      logIn(response?.data.updatedUser!)

    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }
  const handleEmailVerify = async () => {
    try {
      const response = await axios.post(`${baseUrl}/verify`, { timeout: 10000, });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
  const handlePhoneVerify = async () => {

  }
  const handleSaveAddress = async (addressData: addressType) => {
    try {
      const response = await axios.put(`${baseUrl}/user`, {address:addressData});
      logIn(response?.data.updatedUser!)
      toast.success(response.data.message);
      setIsDialogOpen(false)
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const handleRoleChange = async (shopOwnerData: shopOwnerType) => {
    try {
      const response = await axios.post(`${baseUrl}/shopowner`, shopOwnerData);
      toast.success(response.data.message);
      setRoleEditing(false)
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const handlePasswordChange = async (passwordData: passwordChangeType) => {
    try {
      if (passwordData.confirm_password != passwordData.password) {
        return toast.error("Password and confirm password is different")
      }
      else {
        const reponse = await axios.put(`${baseUrl}/changepassword`, passwordData);
        toast.success(reponse.data.message);
        setIsPasswordChange(false)
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const handleImageChange = (selectedImage: File | null) => {
    setSelectedImage(selectedImage);
    setEditing(true)
  };
  const { name, userName, address, email, phone, image, emailVerified, phoneVerified,role } = userAuthStore()
  return (
    <div className='main flex flex-col md:flex-row gap-14 md:gap-4 items-center justify-center hideScrollBar w-full'>
      <div className="profileImg w-full h-1/2 md:h-1/2 md:w-1/2 flex items-center justify-center">
        <ImgContainer imgUrl={image!} alt={name!} edit={true} func={handleImageChange} type='profile' />
      </div>
      <div className="detailsContainer flex flex-col w-full h-1/2 md:h-full md:w-1/2 gap-[2vh]">
        <div className='text-lg flex flex-col gap-[1.5vh]'>
          <div className="details py-1 w-full flex justify-start gap-[4vw] px-4">
            <p className='font-bold w-[20%]'>User name :</p>
            <p className='w-[30%]'>{userName! || "user name"}</p>
          </div>
          {!nameEditing ? <div className="details py-1 w-full flex justify-start gap-[4vw] px-4">
            <p className='font-bold w-[20%]'>Name :</p>
            <p className='w-[30%] '>{name! || "name"}</p>
            <EditIcon onClick={() => setNameEditing(true)} />
          </div>
            :
            <div className="details  w-full flex justify-start gap-[4vw] px-4">
              <p className='font-bold w-[20%]'>Name :</p>
              <input type="name" name="name" id="name" onChange={(e) => { handleOnChangeUpdate(e) }} placeholder={name! || 'Enter Name'} required className='updateinput text-green-400' />
              <CloseIcon onClick={() => setNameEditing(false)} />
            </div>
          }
          {!emailEditing ? <div className="details py-1 w-full flex justify-start gap-[4vw] px-4">
            <p className='font-bold w-[20%]'>Email :</p>
            <div className="email w-[30%]  flex gap-2">
              <p className=''>{email! || "email"}</p>
              {!emailVerified ? <p className='text-red-400 font-bold italic cursor-pointer' onClick={() => handleEmailVerify()} >verify</p> : <p className='text-green-400'>verified</p>}
            </div>
            <EditIcon onClick={() => setEmailEditing(true)} />
          </div>
            :
            <div className="details w-full flex justify-start gap-[4vw] px-4">
              <p className='font-bold w-[20%]'>Email :</p>
              <input type="email" name="email" id="email" onChange={(e) => { handleOnChangeUpdate(e) }} placeholder={email || 'Enter Email'} required className='updateinput' />
              <CloseIcon onClick={() => setEmailEditing(false)} />
            </div>
          }
          {!phoneEditing ? <div className="details py-1 w-full flex justify-start gap-[4vw] px-4">
            <p className='font-bold w-[20%]'>Phone :</p>
            <div className="phone w-[30%]  flex gap-2">
              <p className=''>{phone || "Phone"}</p>
              {!phoneVerified ? <p className='text-red-400 font-bold italic cursor-pointer' onClick={() => handlePhoneVerify()}>verify</p> : <p className='text-green-400'>verified</p>}
            </div>
            <EditIcon onClick={() => setPhoneEditing(true)} />
          </div>
            :
            <div className="details w-full flex justify-start gap-[4vw] px-4">
              <p className='font-bold w-[20%]'>Phone :</p>
              <input type="phone" name="phone" id="phone" onChange={(e) => { handleOnChangeUpdate(e) }} placeholder={phone || 'Enter Phone Number'} required className='updateinput' />
              <CloseIcon onClick={() => setPhoneEditing(false)} />
            </div>
          }
          {!roleEditing && <div className="details py-1 w-full flex justify-start gap-[4vw] px-4">
            <p className='font-bold w-[20%]'>Role :</p>
            <div className="phone w-[30%]  flex gap-2">
              <p className=''>{role || "role"}</p>
            </div>
            {role==="User" && <EditIcon onClick={() => setRoleEditing(true)}/>}
          </div>}
          {roleEditing && <FormDialog onClose={() => setRoleEditing(false)} onSave={handleRoleChange} data={shopOwnerFormData} image='/images/shop.png' title="Be a shopowner and serve IIITU Students" />}
          {!isDialogOpen ? <div className="details py-1 w-full flex justify-start gap-[4vw] px-4">
            <p className='font-bold w-[20%]'>Address :</p>
            <div className="AddressDetails w-[30%] flex flex-col gap-2">
              <p className=''>{address?.street || "Street"}</p>
              <p className=''>{address?.landmark || "Landmark"}</p>
              <p className=''>{address?.pincode || "Pincode"}</p>
              <p className=''>{address?.city || "City"}</p>
              <p className=''>{address?.state || "State"}</p>
            </div>
            <EditIcon onClick={() => setIsDialogOpen(true)} />
          </div>
            :
            <FormDialog onClose={() => setIsDialogOpen(false)} onSave={handleSaveAddress} data={addressFormData} image='/images/address.png' title="Edit Address" />
          }
        </div>
        {isPasswordChange && <FormDialog onClose={() => setIsPasswordChange(false)} onSave={handlePasswordChange} data={passwordChangeFormData} image='/images/forget-password.png' title="Change password" />}
        <div className="buttons flex flex-col md:flex-row ">
          <button className='btn' onClick={() => setIsPasswordChange(true)}>Change Password</button>
          <button className='btn' onClick={() => handleSignout()}>Logout</button>
          {(nameEditing || phoneEditing || emailEditing || isDialogOpen || editing) && <button className='btn' onClick={(e) => handleUpdate(e)} >Update</button>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
