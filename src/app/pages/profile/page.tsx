// "use client"
import React from 'react';
import UserProfile from '@/components/profile/UserProfile';
import UserShops from '@/components/profile/UserShops';
// import useSWR from 'swr';
// import { httpservice } from '@/utils/httpService';
// import { baseUrl } from '@/baseUrl';
import { responseShopOwnerType, responseUserType } from '@/types/types';
import Error from '@/components/common/Error';
import Loader from '@/components/common/Loader';
import { httpServiceServer } from '@/utils/httpServiceServer';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data=await httpServiceServer.get(`user`);
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: data?.user?.name,
    description: data?.user?.userName,
    openGraph: {
      images: [data?.user?.image, ...previousImages]
    },
  }
}
const Profile = async() => {
  // const fetcher = async (url:string) => {
  //   const response = await httpservice.get(url);
  //   return response.data;
  // };
  // const { data, error, isLoading } = useSWR(`${baseUrl}/user`, fetcher);.
  const data=await httpServiceServer.get('user');
  if (data.error) {
     return <div className="main flex items-center justify-center">
    <Error message={data.message} />;
</div>;
  }
  if (!data) {
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
