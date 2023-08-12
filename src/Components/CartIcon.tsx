import Link from 'next/link'
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const CartIcon = () => {
  return (
      <div className='flex items-center gap-1'>
        <ShoppingCartIcon className='relative'/>
        <span>Cart</span>
      </div>
  )
}

export default CartIcon
