"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/baseUrl';
import ImgContainer from '@/components/common/ImgContainer';
import { userAuthStore } from '@/utils/userStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import UserProfile from '@/components/profile/UserProfile';

const Profile = () => {

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/shops`, { timeout: 10000, });
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
  const { logOut } = userAuthStore()
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
  const handleUpdate = async () => {

  }
  const handleEmailVerify = async () => {

  }
  const handlePhoneVerify = async () => {

  }
  return (
    <div>
      {/* {data ? ( */}
          <div className='main gap-4 hideScrollBar'>
            <UserProfile/>
          </div>
      {/* ) : "Something went wrong" */}
    </div>
  );
};

export default Profile;
