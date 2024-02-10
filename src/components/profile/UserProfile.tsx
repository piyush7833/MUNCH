"use client"
import { userAuthStore } from '@/utils/userStore'
import React, { useState } from 'react'
import ImgContainer from '../common/ImgContainer'
import EditButton from '../partials/EditButton'
import DeleteButton from '../partials/DeleteButton'
import { httpservice } from '@/utils/httpService'
import { baseUrl } from '@/baseUrl'
import { toast } from 'react-toastify'
import { passwordChangeType, shopOwnerType } from '@/types/types'
import { formatDate } from '@/utils/action'
import { passwordChangeFormData, shopOwnerFormData } from '@/utils/formData'
import FormDialog from '../common/FormDialog'

type propsType = {
  extractedData?: any,
  userData?: any,
  shopOwnerData?: any,
  shopOwnerExtracedData?: any
}
const UserProfile = ({ extractedData, userData, shopOwnerData, shopOwnerExtracedData }: any) => {
  const [roleEditing, setRoleEditing] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);

  const handleEmailVerify = async () => {
    try {
      const response = await httpservice.post(`${baseUrl}/verify`, { timeout: 10000, });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
  const handlePhoneVerify = async () => {

  }
  const handleRoleChange = async (shopOwnerData: shopOwnerType) => {
    try {
      const response = await httpservice.post(`${baseUrl}/shopowner`, shopOwnerData);
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
        const reponse = await httpservice.put(`${baseUrl}/changepassword`, passwordData);
        toast.success(reponse.data.message);
        setIsPasswordChange(false)
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className='main flex items-center justify-center  flex-col md:flex-row'>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <ImgContainer imgUrl={userData?.image} type='profile' alt={userData?.name} />
      </div>
      <div className="flex gap-4 flex-col md:h-4/5 md:justify-center md:gap-4 md:w-1/2 w-full">
        {extractedData && Object.entries(extractedData).map(([key, value]) => (
          <div className="flex w-full justify-start items-center" key={key}>
            <div className="w-1/3 capitalize font-bold">
              {key === "createdAt" ? "Joined On" : key}
            </div>
            <div className="w-2/3 ">
              {key === "user" ?
                (value as any)?.name : key === "address" ?
                  <div className="flex gap-2 flex-wrap">
                    <p>{(value as any)?.street || "street"},</p>
                    <p>{(value as any)?.landmark || "landmark"},</p>
                    <p>{(value as any)?.city || "city"},</p>
                    <p>{(value as any)?.pincode || "pincode"},</p>
                    <p>{(value as any)?.state || "state"}</p>
                  </div> :
                  key === "email" ?
                    <div className="flex gap-2 items-center">
                      <p>{value as string}</p>
                      {!userData?.emailVerified && <p className='text-blue-400 cursor-pointer' onClick={() => handleEmailVerify()}>verify</p>}
                    </div> :
                    key === "phone" ?
                      <div className="flex gap-2 items-center">
                        <p>{value as string}</p>
                        {!userData?.phoneVerified && <p className='text-blue-400 cursor-pointer' onClick={() => handlePhoneVerify()}>verify</p>}
                      </div> :
                      key === "role" ?
                        <div className="flex gap-2 items-center">
                          <p>{value as string}</p>
                          {userData?.role === "User" && <p className='text-blue-400 cursor-pointer' onClick={() => setRoleEditing(true)}>change</p>}
                        </div> :
                        key === "createdAt" ?
                          formatDate((value as string).split('T')[0]) :
                          !value ? "NaN" : value as string}
            </div>
          </div>
        ))}
        {(shopOwnerExtracedData && userData.role==="ShopOwner") && Object.entries(shopOwnerExtracedData).map(([key, value]) => (
          <div className="flex w-full justify-start items-center" key={key}>
            <div className="w-1/3 capitalize font-bold">
              {key === "createdAt" ? "Joined On" : (key === "notVerified" && !value) ? "" : key}
            </div>
            <div className="w-2/3 ">
              {
                key === "createdAt" ?
                  formatDate((value as string).split('T')[0]) :
                  (key === "notVerified" && !value) ? "" :
                    !value ? "NaN" : value as string}
            </div>
          </div>
        ))}
      </div>
      {roleEditing && <FormDialog onClose={() => setRoleEditing(false)} onSave={handleRoleChange} data={shopOwnerFormData} image='/images/shop.png' title="Be a shopowner and serve IIITU Students" />}
      {isPasswordChange && <FormDialog onClose={() => setIsPasswordChange(false)} onSave={handlePasswordChange} data={passwordChangeFormData} image='/images/forget-password.png' title="Change password" />}
      {/* <div className="flex h-1/2 w-1/2" > */}
        {<EditButton url={`/pages/edit/profile/${userData?.id!}`} userId={userData?.id} />}
        {<DeleteButton url={`/user`}  userId={userData?.id}  />}
        <button className='btn absolute bottom-3 right-28'>Logout</button>
        <button className='btn absolute bottom-3 right-56'>Change Password</button>
      {/* </div> */}
    </div>
  )
}

export default UserProfile
