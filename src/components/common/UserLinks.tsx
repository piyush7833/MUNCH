"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { userAuthStore } from '@/utils/userStore'
type propsType = {
  onClick?: () => void
}
const UserLinks = ({ onClick }: propsType) => {
  useEffect(() => {
    userAuthStore.persist.rehydrate()
  }, [])
  const { name, userName } = userAuthStore()
  return (
    <div className='flex-col  flex'>
      {(name !== null || userName !== null) ?
        <Link href='/pages/orders' className='hover:scale-105 hover:animate-bounce ' >
          <p onClick={onClick} >
            Orders
          </p>
        </Link>
        : <Link href='/pages/auth' className='hover:scale-105 hover:animate-bounce ' >
          <p onClick={onClick} >
            Login
          </p>
        </Link>}
      {(name !== null || userName !== null) && <Link href='/pages/profile' className='hover:scale-105 hover:animate-bounce '>
        <p onClick={onClick} >
          {name?.split(" ")[0]}
        </p>
      </Link>}
    </div>
  )
}

export default UserLinks
