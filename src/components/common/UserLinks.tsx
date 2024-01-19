"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { userAuthStore } from '@/utils/userStore'
import axios from 'axios'
import { baseUrl } from '@/baseUrl'
import { toast } from 'react-toastify'
const UserLinks = () => {


  useEffect(() => {
    userAuthStore.persist.rehydrate()
  }, [])
  const { name, userName } = userAuthStore()
  // console.log(session)
  return (
    <div className='gap-4 flex-col lg:flex-row flex'>
      {(name !== null || userName !== null) ?
        <Link href='/orders' className='hover:scale-105 hover:animate-bounce' >Orders</Link>
        : <Link href='/auth' className='hover:scale-105 hover:animate-bounce' >Login</Link>}
      {(name !== null || userName !== null) && <Link href='/profile' className='hover:scale-105 hover:animate-bounce'>{name?.split(" ")[0]}</Link>}
    </div>
  )
}

export default UserLinks
