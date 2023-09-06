"use client"
import Image from 'next/image'
import React,{useState} from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'


const Auth = () => {
  const session = useSession();
  const router=useRouter()
  const {data,status}=useSession();
  const [isLogin,SetIsLogin]=useState(true) //for toggling with signup 
  console.log("data "+data)
  console.log("status "+status)
  if(session.status==="authenticated"){
    router.push("/")
  }
  else if(session.status==="loading"){
    return <p>Loading....</p>
  }
  
  return (
    <div className='h-[calc(100vh-5.1rem)] md:h-[calc(100vh-5.5rem)] flex items-center justify-center p-4'>
      {/* Box */}
      <div className={`p-4 h-full flex-col md:h-3/4 lg:w-2/3 w-full ${isLogin===true?'flex':'hidden'} md:flex-row items-center justify-center shadow-2xl rounded-xl`}>
      {/* img container */}
      <div className="relative hidden sm:block h-1/3 w-full md:h-full md:w-1/2 ">
        <Image src='/images/login.png' alt='welcome' fill className='object-contain'/>
      </div>
      {/* form container */}
      <div className="flex justify-center flex-col items-center gap-4 h-2/3 w-full md:w-1/2 md:h-full">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome To Munch</h1>
        <p className="text-center text-base -mt-4">Mobile Utility for Nourishing campus Hunger</p>
        <p className="text-center text-base">Login to Continue</p>
        <div className="inputContainer">    
        <EmailIcon/>    
        <input type="email" name="email" id="email" placeholder='Enter Email' required className='input' />
        </div>
        <div className="inputContainer">    
        <PasswordIcon/>    
        <input type="password" name="email" id="email" placeholder='Enter Password' required className='input ' />
        </div>
        <p>Do not have an account? <strong className='text-blue-600 cursor-pointer' onClick={()=>SetIsLogin((prev) => (prev===true ? false : true))}>Create One</strong> </p>
        <div className='flex '>
        <button className='btn flex items-center group' onClick={() => {
          signIn("google");  //it is handled by next auth
        }}>Signin with <GoogleIcon className='group-hover:text-blue-500'/> </button>
        <button className='btn flex items-center group'>Signin with <FacebookIcon className='group-hover:text-blue-500'/> </button>
        </div>
        <p>Have a problem? <strong className='text-blue-600 cursor-pointer'>Contact Us</strong> </p>
      </div>
      </div>

      {/* //signup  */}
      <div className={`p-4 h-full flex-col md:h-11/12 lg:w-2/3 w-full ${isLogin===false?'flex':'hidden'} md:flex-row items-center justify-center shadow-2xl rounded-xl`}>
      {/* img container */}
      <div className="relative hidden md:block w-full md:h-full md:w-1/2 ">
        <Image src='/images/signup.png' alt='welcome' fill className='object-contain'/>
      </div>
      {/* form container */}
      <div className="flex justify-center flex-col items-center gap-4 h-2/3 w-full md:w-1/2 md:h-full">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome To Munch</h1>
        <p className="text-center text-base -mt-4">Mobile Utility for Nourishing campus Hunger</p>
        <p className="text-center text-base ">Signup to join us</p>
        <div className="inputContainer">    
        <PersonIcon/>    
        <input type="text" name="name" id="name" placeholder='Enter full name' required className='input' />
        </div>
        <div className="inputContainer">    
        <AccountCircleIcon/>    
        <input type="text" name="username" id="username" placeholder='Enter user name' required className='input' />
        </div>
        <div className="inputContainer">    
        <EmailIcon/>    
        <input type="email" name="email" id="email" placeholder='Enter Email' required className='input' />
        </div>
        <div className="inputContainer">    
        <PasswordIcon/>    
        <input type="password" name="email" id="email" placeholder='Enter Password' required className='input ' />
        </div>
        <div className="inputContainer">    
        <KeyIcon/>    
        <input type="password" name="email" id="email" placeholder='Confirm Password' required className='input ' />
        </div>
        <p>Do not have an account? <strong className='text-blue-600 cursor-pointer' onClick={()=>SetIsLogin((prev) => (prev===true ? false : true))}>Create One</strong> </p>
        <div className='flex '>
        <button className='btn flex items-center group'>Signup with <GoogleIcon className='group-hover:text-blue-500'/> </button>
        <button className='btn flex items-center group'>Signup with <FacebookIcon className='group-hover:text-blue-500'/> </button>
        </div>
        <p>Have a problem? <strong className='text-blue-600 cursor-pointer'>Contact Us</strong> </p>
      </div>
      </div>
    </div>
  )
}

export default Auth
