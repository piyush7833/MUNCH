"use client"
import Image from 'next/image'
import React,{useState} from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { useRouter } from 'next/navigation'
import { LocalPhone, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from '@/baseUrl';
import { toast } from 'react-toastify';
import { userAuthStore } from '@/utils/userStore';
import tokenHelper from '@/utils/tokenHelper';
import { httpservice } from '@/utils/httpService';


const Auth = () => {
  const [isLogin,SetIsLogin]=useState(true) //for toggling with signup 
  const [method,setMethod]=useState("uname")
  const [passwordVisible,setPasswordVisible]=useState(false)
  const [confirmPasswordVisible,setConfirmPasswordVisible]=useState(false)
  const [confirmPassword,setConfirmPassword]=useState("")
  const [loginData , setLoginData] = useState({
    email:"",
    password:"",
    phone:"",
    userName:""
});
  const [signupData , setSignupData] = useState({
    email:"",
    password:"",
    phone:"",
    userName:"",
    name:"",
    image:"",
});
const {logIn}=userAuthStore()
const router=useRouter()
const handleOnChangeLogin = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const {name , value} = e.target;
  setLoginData({...loginData , [name]:value})
}
const handleOnChangeSignup = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const {name , value} = e.target;
  setSignupData({...signupData , [name]:value})
}
const handleLogin=async(e: React.FormEvent<HTMLFormElement>)=>{
  try {
    e.preventDefault()
    const response = await httpservice.post(`${baseUrl}/auth/login`,loginData, {
      headers: { 'Cache-Control': 'no-store' },
    });
    logIn(response.data.user)
    tokenHelper.create("Authorization",response.data.token);
    tokenHelper.create("role",response.data.user.role);
    router.push('/')
  } catch (error:any) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}
const handleSignup=async(e: React.FormEvent<HTMLFormElement>)=>{
  try {
    e.preventDefault()
    if(confirmPassword!==signupData.password){
      toast.error("Password and confirm password is not same")
    }
    else{
      const response = await httpservice.post(`${baseUrl}/auth/signup`,signupData, {
        headers: { 'Cache-Control': 'no-store' },
      });
      logIn(response.data.newUser)
      tokenHelper.create("Authorization",response.data.token);
      tokenHelper.create("role","User");
        router.push('/')
    }
  } catch (error:any) {
    console.log("error ",error)
    toast.error(error.response.data.message)
  }
}

  
  return (
    <div className='h-[calc(100vh-5.1rem)] md:h-[calc(100vh-5.5rem)] flex items-center justify-center p-4'>
      {/* Box */}
      <form onSubmit={(e)=>handleLogin(e)} className={`p-4 h-full flex-col md:h-3/4 lg:w-2/3 w-full ${isLogin===true?'flex':'hidden'} md:flex-row items-center justify-center shadow-2xl rounded-xl`}>
      {/* img container */}
      <div className="relative hidden sm:block h-1/3 w-full md:h-full md:w-1/2 ">
        <Image src='/images/login.png' alt='welcome' fill className='object-contain'/>
      </div>
      {/* form container */}
      <div className="flex justify-center flex-col items-center gap-4 h-2/3 w-full md:w-1/2 md:h-full">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome To Munch</h1>
        <p className="text-center text-base -mt-4">Mobile Utility for Nourishing campus Hunger</p>
        <p className="text-center text-base">Login to Continue</p>
        {method==="uname"?
          <div className="inputContainer">    
        <AccountCircleIcon/>    
        <input type="userName" name="userName" id="userName" value={loginData.userName} onChange={(e)=>{handleOnChangeLogin(e)}}  placeholder='Enter username' required className='input' />
        </div>
        :method==="email"?
        <div className="inputContainer">    
        <EmailIcon/>    
        <input type="email" name="email" id="email" value={loginData.email} onChange={(e)=>{handleOnChangeLogin(e)}} placeholder='Enter Email' required className='input' />
        </div>
        :
        <div className="inputContainer">    
        <LocalPhone/>    
        <input type="number" name="phone" id="phone" value={loginData.phone} onChange={(e)=>{handleOnChangeLogin(e)}} placeholder='Enter mobile number' required className='input' />
        </div>
        }
        <div className="inputContainer relative">    
        <PasswordIcon/>    

        <input type={passwordVisible ? 'text' : 'password'} name="password" id="password" value={loginData.password} onChange={(e)=>{handleOnChangeLogin(e)}} placeholder='Enter Password' required className='input ' />
        {passwordVisible?<VisibilityOff onClick={()=>{setPasswordVisible(false)}} className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer'/>:<Visibility className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer' onClick={()=>{setPasswordVisible(true)}}/>}
        </div>

        <button className='btn flex items-center group' >Signin</button>
        
        {method!=="phone" && <p onClick={()=>setMethod("phone")} className='cursor-pointer text-main'>Use mobile number to login</p>}
        {method!=="email" && <p onClick={()=>setMethod("email")} className='cursor-pointer text-main'>Use email to login</p>}
        {method!=="uname" && <p onClick={()=>setMethod("uname")} className='cursor-pointer text-main'>Use username to login</p>}
        <p>Do not have an account? <strong className='text-blue-600 cursor-pointer' onClick={()=>SetIsLogin((prev) => (prev===true ? false : true))}>Create One</strong> </p>
        <div className='flex '>
        {/* <button className='btn flex items-center group' onClick={() => {signIn("google");  //it is handled by next auth}}>Signin with <GoogleIcon className='group-hover:text-blue-500'/> </button> */}
        {/* <button className='btn flex items-center group'>Signin with <FacebookIcon className='group-hover:text-blue-500'/> </button> */}
        </div>
        <p>Have a problem? <strong className='text-blue-600 cursor-pointer'>Contact Us</strong> </p>
      </div>
      </form>


      {/* //signup  */}
      <form onSubmit={(e)=>handleSignup(e)} className={`p-4 h-full flex-col md:h-11/12 lg:w-2/3 w-full ${isLogin===false?'flex':'hidden'} md:flex-row items-center justify-center shadow-2xl rounded-xl`}>
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
        <input type="text" name="name" id="name" value={signupData.name} onChange={(e)=>{handleOnChangeSignup(e)}}  placeholder='Enter full name' required className='input' />
        </div>
        <div className="inputContainer">    
        <AccountCircleIcon/>    
        <input type="text" name="userName" id="userName" value={signupData.userName} onChange={(e)=>{handleOnChangeSignup(e)}} placeholder='Enter user name' required className='input' />
        </div>
        <div className="inputContainer">    
        <EmailIcon/>    
        <input type="email" name="email" id="email" value={signupData.email} onChange={(e)=>{handleOnChangeSignup(e)}} placeholder='Enter Email' required className='input' />
        </div>
        <div className="inputContainer">    
        <LocalPhone/>    
        <input type="phone" name="phone" id="phone" value={signupData.phone} onChange={(e)=>{handleOnChangeSignup(e)}} placeholder='Enter mobile number' required className='input' />
        </div>
        <div className="inputContainer relative">    
        <PasswordIcon/>    
        <input type={passwordVisible ? 'text' : 'password'} name="password" value={signupData.password} onChange={(e)=>{handleOnChangeSignup(e)}} id="password" placeholder='Enter Password' required className='input ' />
        {passwordVisible?<VisibilityOff onClick={()=>{setPasswordVisible(false)}} className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer'/>:<Visibility className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer' onClick={()=>{setPasswordVisible(true)}}/>}
        </div>

        <div className="inputContainer relative">    
        <KeyIcon/>    
        <input type={confirmPasswordVisible ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password' required className='input ' />
        {confirmPasswordVisible?<VisibilityOff onClick={()=>{setConfirmPasswordVisible(false)}} className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer'/>:<Visibility className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer' onClick={()=>{setConfirmPasswordVisible(true)}}/>}
        </div>
        <button className='btn flex items-center group'>Signup</button>
        <p>Already have an account? <strong className='text-blue-600 cursor-pointer' onClick={()=>SetIsLogin((prev) => (prev===true ? false : true))}>Log in</strong> </p>
        <div className='flex '>
        {/* <button className='btn flex items-center group'>Signup with <GoogleIcon className='group-hover:text-blue-500'/> </button> */}
        {/* <button className='btn flex items-center group'>Signup with <FacebookIcon className='group-hover:text-blue-500'/> </button> */}
        </div>
        <p>Have a problem? <strong className='text-blue-600 cursor-pointer'>Contact Us</strong> </p>
      </div>
      </form>
    </div>
  )
}

export default Auth
