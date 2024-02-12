"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { userAuthStore } from '@/utils/userStore'

const UserLinks = () => {
  useEffect(() => {
    userAuthStore.persist.rehydrate()
  }, [])
  const { name, userName } = userAuthStore()
  return (
    <div className='flex-col  flex'>
      {(name !== null || userName !== null) ?
        <Link href='/pages/orders' className='hover:scale-105 hover:animate-bounce ' >Orders</Link>
        : <Link href='/pages/auth' className='hover:scale-105 hover:animate-bounce ' >Login</Link>}
      {(name !== null || userName !== null) && <Link href='/pages/profile' className='hover:scale-105 hover:animate-bounce '>{name?.split(" ")[0]}</Link>}
    </div>
  )
}

export default UserLinks
