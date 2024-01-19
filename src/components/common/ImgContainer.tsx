"use client"
import Image, { StaticImageData } from 'next/image'
import React, { useState } from 'react'

type propsType = {
    imgUrl: string | StaticImageData,
    alt: string ,
    type: string,
    edit?: boolean,

}
const ImgContainer = ({imgUrl,type,edit,alt}:propsType) => {
    return (
            <div className={`${type=="singleProduct"?"single-product-imgContainer":type=="profile"?"relative h-[50vh] w-[50vh]":""}`}>
                <Image src={imgUrl} fill alt={alt} className='object-cover rounded-full'/>
            </div>
    )
}

export default ImgContainer
