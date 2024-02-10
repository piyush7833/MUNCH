"use client"
import React from 'react';
import UserProfile from '@/components/profile/UserProfile';
import UserShops from '@/components/profile/UserShops';
import useSWR from 'swr';
import { httpservice } from '@/utils/httpService';
import { baseUrl } from '@/baseUrl';
import { responseShopOwnerType, responseUserType } from '@/types/types';
import Error from '@/components/common/Error';
import Loader from '@/components/common/Loader';

const Profile = () => {
  const fetcher = async (url:string) => {
    const response = await httpservice.get(url);
    return response.data;
  };
  const { data, error, isLoading } = useSWR(`${baseUrl}/user`, fetcher);
  if (error) {
     return <div className="main flex items-center justify-center">
    <Error message={error.response.data.message} />;
</div>;
  }
  if (isLoading || !data) {
    return <Loader message='Expore your profile'/>
  }
  const user: responseUserType = data.user;
  const shopData = user.shops;
  const userData = {
    name: user.name,
    id: user.id,
    userName: user.userName,
    email: user.email,
    role: user.role,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
    phoneVerified: user.phoneVerified,
    phone: user.phone,
    image: user.image
  };
  const extractedUserData = {
    userName: user.userName,
    name: user.name,
    phone: user.phone,
    email: user.email,
    role: user.role,
    address: user.address,
    createdAt: user.createdAt
  };
  const shopOwnerData:responseShopOwnerType | null | undefined = user?.shopOwner?.[0];
  const shopOwnerExtracedData = {
    panCard: shopOwnerData?.panCard,
    aadhar: shopOwnerData?.aadhar,
    IFSC: shopOwnerData?.IFSC,
    bankAccount: shopOwnerData?.bankAccount,
    GSTIN: shopOwnerData?.GSTIN,
    notVerified: shopOwnerData?.notVerified
  };
  return (
    <div>
      <div className='main gap-4 hideScrollBar'>
        <UserProfile userData={userData} extractedData={extractedUserData} shopOwnerData={shopOwnerData} shopOwnerExtracedData={shopOwnerExtracedData}/>
        {(userData.role==="ShopOwner" && user?.shopOwner?.[0].verified)&&<UserShops shops={shopData} userId={userData.id!}/>}
        {(userData.role==="ShopOwner" && !user?.shopOwner?.[0].verified)&& <div>ShopOwner details are updated and yet to be verified</div> }
      </div>
    </div>
  );
};

export default Profile;
