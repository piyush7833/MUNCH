"use client"
import React from 'react'
import Image from 'next/image'
import Signup from '../../../public/Images/Signup.gif'
import SignupDark from '../../../public/Images/SignupDark.gif'
import Login from '../../../public/Images/Login.gif'
import LoginDark from '../../../public/Images/LoginDark.gif'
import EmailIcon from '@mui/icons-material/Email';
import FaceIcon from '@mui/icons-material/Face';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import LockResetIcon from '@mui/icons-material/LockReset';
import Btn from '@/utils/Button'
import Input from '@/utils/Input'
import { useState } from 'react';


const Auth = (props: { theme: boolean | undefined }) => {
  const [isActive, setActive] = useState(true)
  return (


    <div className='h-screen flex w-screen items-center justify-center'>
      {isActive === true ?
        <div className="login flex h-3/4 w-3/4 items-center justify-center">

          <div className="img w-1/2 items-center justify-center ">
            <Image className=''
              src={props.theme === true ? LoginDark : Login}
              alt="Logo"
            />

          </div>

          <div className="info flex flex-col w-1/2 h-1/2 items-center justify-center  ">
          <div className="in flex justify-between items-center">
              <PersonIcon/>
              <Input type="text" placeHolder="Enter User Name"/>
            </div>
            <div className="in flex justify-between items-center">
              <KeyIcon/>
              <Input type="text" placeHolder="Enter Password"/>
            </div>
            <div className='flex justify-between items-center my-2'>
              <LockResetIcon/>
              <p>Forget Password</p>
            </div>
              <Btn Text='Login' Clr='red'/>
              <p className='text-center'>Do not have an account ? <span className='text-blue-600 cursor-pointer' onClick={()=>{setActive(!isActive)}} >Create One</span>  </p>
          </div>
        </div>

        :

        <div className="signup flex h-3/4 w-3/4 items-center justify-center  ">

          <div className="img w-1/2 items-center justify-center ">
            <Image className=''
              src={props.theme === true ? SignupDark : Signup}
              alt="Logo"
            />
          </div>

          <div className="info flex flex-col w-1/2 h-1/2 items-center justify-center">
            <div className="in flex justify-between items-center">
              <FaceIcon/>
              <Input type="text" placeHolder="Enter Your name"/>
            </div>
            <div className="in flex justify-between items-center">
              <PersonIcon/>
              <Input type="text" placeHolder="Enter User Name"/>
            </div>
            <div className="in flex justify-between items-center">
              <EmailIcon/>
              <Input type="text" placeHolder="Enter College Email"/>
            </div>
            <div className="in flex justify-between items-center">
              <KeyIcon/>
              <Input type="text" placeHolder="Enter Password"/>
            </div>
            <div className="in flex justify-between items-center">
              <KeyOffIcon/>
              <Input type="text" placeHolder="Confirm Password"/>
            </div>
            <div className='flex justify-between items-center my-2'>
              <LockResetIcon/>
              <p>Forget Password</p>
            </div>
              <Btn Text='Login' Clr='red'/>
              <p className='text-center'>Already have an account ? <span className='text-blue-600 cursor-pointer' onClick={()=>{setActive(!isActive)}} >Log in</span>  </p>
          </div>
        </div>
        }
    </div>
  )
}

export default Auth
