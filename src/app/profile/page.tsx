"use client"
import React from 'react';
import { userAuthStore } from '@/utils/userStore';
import UserProfile from '@/components/profile/UserProfile';
import UserShops from '@/components/profile/UserShops';

const Profile = () => {
const {role}=userAuthStore()
  return (
    <div>
      <div className='main gap-4 hideScrollBar'>
        <UserProfile />
        {role==="shopOwner" && <UserShops/>}
      </div>
    </div>
  );
};

export default Profile;
