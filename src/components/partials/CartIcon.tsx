'use client'
import Link from 'next/link'
import React,{useEffect} from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { userCartStore } from '@/utils/cartStore';
const CartIcon = () => {
  const {totalItems}=userCartStore()
  useEffect(()=>{
    userCartStore.persist.rehydrate()
  },[])
  return (
      <div className='flex items-center gap-1'>
        <ShoppingCartIcon className='relative'/>
        <span>Cart ({totalItems})</span>
      </div>
  )
}

export default CartIcon
