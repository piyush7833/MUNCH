"use client"
import React from 'react'
import { Edit } from '@mui/icons-material'
import { useRouter } from 'next/navigation';
import { siteUrl } from '@/baseUrl';
import { userAuthStore } from '@/utils/userStore';
const EditButton = ({ url,userId }: { url: string, userId?:string }) => {
  const router =useRouter()
  const {userName, role,id} = userAuthStore()
  if(!userName  || (userId && userId!==id)){
    return 
}

  return (
    <div>
      <div onClick={()=>router.push(`${siteUrl}/${url}`)} className='bg-red-500 p-2 cursor-pointer text-white rounded-full  ' >
          <Edit />
      </div>
    </div>
  )
}

export default EditButton
