"use client"
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/baseUrl';
import { toast } from 'react-toastify';
const DeleteButton = ({id}:{id:String}) => {
    const {data:session,status}=useSession()
    const router=useRouter()
    if(status==="loading"){
        return <p>loading...</p>
    }
    if(status==="unauthenticated" || !session?.user.isShopOwner){
        return 
    }
    const handleDelete=async()=>{
        const res=await fetch(`${baseUrl}/products/${id}`,{
            method:"Delete"
        })
        if(res.status===200){
            router.push("/menu")
            toast.success("The product has been deleted")
        }
        else{
            const data=await res.json()
            toast.error(data.message)
        }
    }
  return (
    <div>
      <button className='bg-red-500 p-2 text-white rounded-full absolute top-4 right-4' onClick={()=>handleDelete()}><DeleteIcon/></button>
    </div>
  )
}

export default DeleteButton
