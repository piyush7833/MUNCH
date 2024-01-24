import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type propsType={
    img?:string,
    id:string,
    title:string,
    price?:number,
    edit?:boolean,
    add?:boolean
}
const ProductContainer = ({img,id,title,price,edit,add}:propsType) => {
  let href;
  if(edit){
    href=`/edit-product/${id}`
  }
  if(add){
    href=`/add-product`
  }
  else{
    href=`/product/${id}`
  }
  return (
    <Link className='product-container group'  href={href} key={id} >
    <div className="product-imgContainer">
    <Image src={img!} fill  alt={title} className='object-contain w-fit' />
    </div>
    <div className="product-textContainer">
      <h1 className='text-xl uppercase p-2'>{title}</h1>
      <h2 className='group-hover:hidden text-xl'>Rs {price}</h2>
      <button className='btn hidden group-hover:block'>Add to Cart</button>  
    </div>
  </Link>
  )
}

export default ProductContainer
