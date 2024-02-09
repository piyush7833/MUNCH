"use client"
import React from 'react'
import { Edit } from '@mui/icons-material'
import { useRouter } from 'next/navigation';
import { siteUrl } from '@/baseUrl';
const EditButton = ({ url }: { url: string }) => {
  const router =useRouter()
  return (
    <div>
      <div onClick={()=>router.push(`${siteUrl}/${url}`)} className='bg-red-500 p-2 cursor-pointer text-white rounded-full absolute bottom-3 right-16' >
          <Edit />
      </div>
    </div>
  )
}

export default EditButton
