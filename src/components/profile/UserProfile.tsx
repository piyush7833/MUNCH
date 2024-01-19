"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/baseUrl';
import ImgContainer from '@/components/common/ImgContainer';
import { userAuthStore } from '@/utils/userStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const UserProfile = () => {

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({})
  const [address, setAddress] = useState(
    {
      fullAddress:"",
      pinCode: "",
      coordinates: {
        lat: "",
        long: ""
      }
    }
  )
  const handleOnChangeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateDetails({ ...updateDetails, [name]: value })
  }
  const handleOnChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value })
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user`, { timeout: 10000, });
        console.log(response)
        setData(response.data.user);
      } catch (error: any) {
        console.log(error)
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); //
  console.log(data)
  const router = useRouter()
  const { logOut, logIn } = userAuthStore()
  const handleSignout = async () => {
    try {
      const response = await axios.post(`${baseUrl}/auth/logout`, {
        headers: { 'Cache-Control': 'no-store' },
      });
      logOut(null)
      router.push('/')
    } catch (error: any) {
      console.log("error ", error)
      toast.error(error.response.data.message)
    }
  }
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
        const response = await axios.put(`${baseUrl}/user`, updateDetails,{ timeout: 10000, });
        console.log(response)
        setData(response.data.user);
        logIn(response.data.user)
      } catch (error: any) {
        console.log(error)
        toast.error(error.response.data.message);
      }
    //    finally {
    //     setLoading(false);
    //   }
  }
  const handleEmailVerify = async () => {

  }
  const handlePhoneVerify = async () => {

  }
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data ? (
          <div className='main flex flex-col md:flex-row gap-4 items-center justify-center hideScrollBar w-full'>
            <div className="profileImg w-full h-1/2 md:h-1/2 md:w-1/2 flex items-center justify-center">
              <ImgContainer imgUrl={data.image} alt={data.name} type='profile' />
            </div>
            <div className="detailsContainer flex flex-col w-full h-1/2 md:h-full md:w-1/2 gap-[2vh]">
              {!editing ?
                <div className='text-lg flex flex-col gap-[1.5vh]'>
                  <div className="details w-full flex justify-start gap-[4vw] px-4">
                    <p className='font-bold w-[15%]'>User name :</p>
                    <p className=''>{data.userName}</p>
                  </div>
                  <div className="details w-full flex justify-start gap-[4vw] px-4">
                    <p className='font-bold w-[15%]'>Name :</p>
                    <p className=''>{data.name}</p>
                  </div>
                  <div className="details w-full flex justify-start gap-[4vw] px-4">
                    <p className='font-bold w-[15%]'>Email :</p>
                    <div className="email flex gap-2">
                      <p className=''>{data.email}</p>
                      {!data.emailVerified ? <p className='text-red-400 font-bold italic cursor-pointer' onClick={() => handleEmailVerify()} >verify</p> : <p className='text-green-400'>verified</p>}
                    </div>
                  </div>
                  <div className="details w-full flex justify-start gap-[4vw] px-4">
                    <p className='font-bold w-[15%]'>Phone :</p>
                    <div className="email flex gap-2">
                      <p className=''>{data.phone}</p>
                      {!data.phoneVerified ? <p className='text-red-400 font-bold italic cursor-pointer' onClick={() => handlePhoneVerify()}>verify</p> : <p className='text-green-400'>verified</p>}
                    </div>
                  </div>
                  <div className="details w-full flex justify-start gap-[4vw] px-4">
                    <p className='font-bold w-[15%]'>Address :</p>
                    <div className="AddressDetails flex flex-col gap-2">
                    {data.address?.street && <p className=''>{data.address.street}</p>}
                    {data.address?.landmark && <p className=''>{data.address.landmark}</p>}
                    {data.address?.pincode && <p className=''>{data.address.pincode}</p>}
                    {data.address?.city && <p className=''>{data.address.city}</p>}
                    </div>
                  </div>
                </div>
                :
                <div className="updateDetails">
                <div className='text-lg flex flex-col gap-[1.5vh] '>
                  <div className="details w-full flex justify-start gap-[4vw] px-4">
                    <p className='font-bold w-[15%]'>Name :</p>
                    <input type="name" name="name" id="name" value={updateDetails.name} onChange={(e) => { handleOnChangeUpdate(e) }} placeholder={data.name || 'Enter Name'} required className='updateinput text-green-400' />
                  </div>
                  <div className="details w-full flex justify-start gap-[4vw] px-4">
                    <p className='font-bold w-[15%]'>Email :</p>
                    <input type="email" name="email" id="email" value={updateDetails.email} onChange={(e) => { handleOnChangeUpdate(e) }} placeholder={data.email || 'Enter Email'} required className='updateinput' />
                  </div>
                  <div className="details w-full flex justify-start gap-[4vw] px-4">
                    <p className='font-bold w-[15%]'>Phone :</p>
                    <input type="phone" name="phone" id="phone" value={updateDetails.phone} onChange={(e) => { handleOnChangeUpdate(e) }} placeholder={data.phone || 'Enter Phone Number'} required className='updateinput' />
                  </div>
                  <div className="details w-full flex justify-start gap-[4vw] px-4">
                    <p className='font-bold w-[15%]'>Address :</p>
                    <div className="inputAddress flex flex-col gap-2">
                      <input type="text" name="fullAddress" id="fullAddress"  onChange={(e) => { handleOnChangeAddress(e) }} placeholder={data.address?.street || 'Enter full address'} required className='updateinput' />
                      {(address.fullAddress!== "" || data.address?.pinCode)  && <input type="number" name="pinCode" id="pinCode" value={address.pinCode} onChange={(e) => { handleOnChangeAddress(e) }} placeholder={data.address?.pincode || 'Enter Pincode'} required className='updateinput' />}
                    </div>
                  </div>
                </div>
              </div>
              }
              <div className="buttons flex flex-col md:flex-row ">
                {!editing && <button className='btn' onClick={() => setEditing(true)} >Edit</button>}
                {editing && <button className='btn' onClick={() => setEditing(false)} >Cancel</button>}
                {editing && <button className='btn' onClick={(e) => handleUpdate(e)} >Update</button>}
                <button className='btn'>Change Password</button>
                <button className='btn' onClick={() => handleSignout()}>Logout</button>
              </div>
            </div>
          </div>
      ) : "Something went wrong"}
    </div>
  );
};

export default UserProfile;
