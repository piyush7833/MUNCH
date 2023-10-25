"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
const UserLinks = () => {
  const router=useRouter()
  const handleSignout=async()=>{
    await signOut();
    router.push('/')
  }
  
  const session=useSession()
  return (
    <div className='gap-4 flex-col lg:flex-row flex'>
      {session.status==='authenticated'? 
      <Link href='/orders' className='hover:scale-105 hover:animate-bounce' >Orders</Link>
      :<Link href='/auth' className='hover:scale-105 hover:animate-bounce' >Login</Link>}
      {session.status==='authenticated' && <button className='hover:scale-105 hover:animate-bounce' onClick={handleSignout}>Logout</button>}
    </div>
  )
}

export default UserLinks
