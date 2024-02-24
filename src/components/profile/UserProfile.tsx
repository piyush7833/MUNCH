"use client"
import { userAuthStore } from '@/utils/userStore'
import React, { useEffect, useState } from 'react'
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
import tokenHelper from '@/utils/tokenHelper'
import { useRouter } from 'next/navigation'
import Button from '../partials/Button'

type propsType = {
  extractedData?: any,
  userData?: any,
  shopOwnerData?: any,
  shopOwnerExtracedData?: any
}
const UserProfile = ({ extractedData, userData, shopOwnerData, shopOwnerExtracedData }: propsType) => {
  const [roleEditing, setRoleEditing] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false)
  useEffect(() => {
    userAuthStore.persist.rehydrate()
  }, [])
  const {id } = userAuthStore()
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
      setPasswordChangeLoading(true)
      if (passwordData.confirm_password != passwordData.password) {
        setPasswordChangeLoading(false)
        return toast.error("Password and confirm password is different")
      }
      else {
        setPasswordChangeLoading(false)
        const reponse = await httpservice.put(`${baseUrl}/changepassword`, passwordData);
        setIsPasswordChange(false)
        return toast.success(reponse.data.message);
      }
    } catch (error: any) {
      setPasswordChangeLoading(false)
      return toast.error(error.response.data.message);
    }
  };
  const { logOut, logIn } = userAuthStore()
  const router = useRouter()
  const handleSignout = async () => {
    try {
      setLogoutLoading(true)
      console.log("object")
      const response = await httpservice.post(`${baseUrl}/auth/logout`, {
        headers: { 'Cache-Control': 'no-store' },
      });
      logOut(null)
      tokenHelper.delete("Authorization")
      tokenHelper.delete("Role")
      toast.success(response.data.message);
      setLogoutLoading(false)
      router.push('/')
    } catch (error: any) {
      console.log("error ", error)
      setLogoutLoading(false)
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className="main flex items-center justify-center  flex-col ">

    
    <div className='h-full w-full flex items-center justify-center  flex-col md:flex-row '>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <ImgContainer imgUrl={userData?.image} type='profile' alt={userData?.name} />
      </div>
      <div className="flex gap-4 flex-col md:h-4/5 md:justify-center md:gap-4 md:w-1/2 w-full flex-wrap">
        {extractedData && Object.entries(extractedData).map(([key, value]) => (
          <div className="flex w-full justify-start items-center flex-wrap" key={key}>
            <div className="w-1/3 capitalize font-bold flex-wrap">
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
        {(shopOwnerExtracedData && userData.role === "ShopOwner") && Object.entries(shopOwnerExtracedData).map(([key, value]) => (
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
    </div>
    <div className="w-full max-h-fit flex flex-row gap-4 flex-wrap justify-end items-center">
      {id ===userData.id && <Button onClick={()=>handleSignout()} loading={logoutLoading} text="Logout" />}
      {id===userData.id && <Button onClick={() => setIsPasswordChange(true)} text='Change Password' loading={passwordChangeLoading}/>}
      <EditButton url={`/pages/edit/profile/${userData?.id!}`} userId={userData?.id} />
      <DeleteButton url={`/user`} userId={userData?.id} />
    </div>
    </div>
  )
}

export default UserProfile
