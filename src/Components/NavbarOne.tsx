"use client"
import React, { useState } from 'react'
import NavLogo from '../Images/NavLogo.png'
import Btn from '@/utils/Button'
import ModeBtn from '@/utils/ModeBtn'
import NavbarLogo from '../../public/Images/NavLogo.png'
import Image from 'next/image'
const NavbarOne = (props: { theme:boolean | undefined,setTheme:any}) => {
  return (
    <div className={`nav flex items-center w-screen bg-slate-300 dark:bg-black text-white  fixed `} >
      <div className="logo flex">
      <Image className='h-20 w-5/6 mx-2'
      src={NavbarLogo}
      alt="Logo"
    />
      </div>
      <div className="btn h-3/5 w-11/12 flex justify-end">
        <div className='w-1/8 flex mr-8'>
        <Btn Text="Login" Clr="red"></Btn>
        <Btn Text="Signup" Clr="gray"></Btn>
        <ModeBtn theme={props.theme} setTheme={props.setTheme} ></ModeBtn>
        </div>
      </div>
    </div>
  )
}

export default NavbarOne
