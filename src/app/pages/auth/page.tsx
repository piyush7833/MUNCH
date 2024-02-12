"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { useRouter } from 'next/navigation'
import { LocalPhone, Visibility, VisibilityOff } from '@mui/icons-material';
import { baseUrl } from '@/baseUrl';
import { toast } from 'react-toastify';
import { userAuthStore } from '@/utils/userStore';
import tokenHelper from '@/utils/tokenHelper';
import { httpservice } from '@/utils/httpService';
import Button from '@/components/partials/Button';
import validateForm from '@/utils/action';
import { formType, logInFormData, signupFormData } from '@/utils/formData';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const InputField = ({ icon, type, name, value, placeholder, onChange, error, required , id}: formType) => {
  return (
    <div className="inputContainer relative">
      {icon}
      <input type={type} id={id} required={required} name={name} value={value} onChange={onChange} placeholder={placeholder}  className='input' />
      {error && (
        <div className="relative group">
          <ErrorOutlineIcon className='text-red-600 cursor-pointer' />
          <div className="hidden group-hover:block absolute top-0 left-full bg-gray-200 p-2 rounded shadow-md text-xs">
            {error}
          </div>
        </div>
      )}
    </div>
  );
}

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [method, setMethod] = useState("uname");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    phone: "",
    userName: ""
  });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    phone: "",
    userName: "",
    name: "",
    image: "",
  });
  const [signinLoading, setSigninLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const { logIn } = userAuthStore();
  const router = useRouter();
  const [logInErrors, setLogInErrors] = useState({});
  const [signUpErrors, setSignupErrors] = useState({});

  const handleOnChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    const fieldErrors = validateForm(logInFormData, name, value);
    setLogInErrors({
      ...logInErrors,
      [name]: fieldErrors !== 'valid' && fieldErrors,
    });
  }

  const handleOnChangeSignup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldErrors = validateForm(signupFormData, name, value);
    setSignupErrors({
      ...signUpErrors,
      [name]: fieldErrors !== 'valid' && fieldErrors,
    });
    setSignupData({ ...signupData, [name]: value });
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setSigninLoading(true);
      const response = await httpservice.post(`${baseUrl}/auth/login`, loginData, {
        headers: { 'Cache-Control': 'no-store' },
      });
      logIn(response.data.user);
      tokenHelper.create("Authorization", response.data.token);
      tokenHelper.create("role", response.data.user.role);
      setSigninLoading(false);
      toast.success(response.data.message);
      router.push('/');
    } catch (error: any) {
      console.log(error);
      setSigninLoading(false);
      toast.error(error.response.data.message);
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setSignupLoading(true);
      if (confirmPassword !== signupData.password) {
        toast.error("Password and confirm password do not match");
      } else {
        const response = await httpservice.post(`${baseUrl}/auth/signup`, signupData, {
          headers: { 'Cache-Control': 'no-store' },
        });
        logIn(response.data.newUser);
        tokenHelper.create("Authorization", response.data.token);
        tokenHelper.create("role", "User");
        toast.success(response.data.message);
        setSignupLoading(false);
        router.push('/');
      }
    } catch (error: any) {
      console.log("error ", error);
      setSignupLoading(false);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='h-[calc(100vh-5.1rem)] md:h-[calc(100vh-5.5rem)] flex items-center justify-center p-4'>
      {/* Login Box */}
      <form onSubmit={handleLogin} className={`p-4 h-full md:h-11/12 flex-col lg:w-2/3 w-full ${isLogin === true ? 'flex' : 'hidden'} md:flex-row items-center justify-center shadow-2xl rounded-xl `}>
        <div className="relative hidden sm:block h-1/3 w-full md:h-full md:w-1/2 ">
          <Image src='/images/login.png' alt='welcome' fill className='object-contain' />
        </div>
        <div className="flex justify-center flex-col items-center gap-4 h-2/3 w-full md:w-1/2 md:h-full">
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome To Munch</h1>
          <p className="text-center text-base -mt-4">Mobile Utility for Nourishing campus Hunger</p>
          <p className="text-center text-base">Login to Continue</p>
          {method === "uname" ?
            <InputField
              icon={<AccountCircleIcon />}
              type="text"
              name="userName"
              required={true}
              id="userName"
              value={loginData.userName}
              placeholder="Enter username"
              onChange={handleOnChangeLogin}
              error={(logInErrors as any).userName}
            />
            : method === "email" ?
              <InputField
                icon={<EmailIcon />}
                type="email"
                name="email"
                required={false}
                id='email'
                value={loginData.email}
                placeholder="Enter Email"
                onChange={handleOnChangeLogin}
                error={(logInErrors as any).email}
              />
              :
              <InputField
                icon={<LocalPhone />}
                type="number"
                name="phone"
                required={false}
                id='phone'
                value={loginData.phone}
                placeholder="Enter mobile number"
                onChange={handleOnChangeLogin}
                error={(logInErrors as any).phone}
              />
          }
          <div className="inputContainer relative">
            <PasswordIcon />

            <input type={passwordVisible ? 'text' : 'password'} name="password" id="password" value={loginData.password} onChange={handleOnChangeLogin} placeholder='Enter Password' required className='input ' />
            {passwordVisible ? <VisibilityOff onClick={() => setPasswordVisible(false)} className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer' /> : <Visibility className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer' onClick={() => setPasswordVisible(true)} />}
          </div>
          {(logInErrors as any).password && <p className='text-red-600 text-center'>{(logInErrors as any).password}</p>}
          <Button type='submit' text='Signin' loading={signinLoading} disabled={Object.keys(logInErrors).length <=0 || Object.values(logInErrors).some((error) => error !== false)} />

          {method !== "phone" && <p onClick={() => setMethod("phone")} className='cursor-pointer text-main'>Use mobile number to login</p>}
          {method !== "email" && <p onClick={() => setMethod("email")} className='cursor-pointer text-main'>Use email to login</p>}
          {method !== "uname" && <p onClick={() => setMethod("uname")} className='cursor-pointer text-main'>Use username to login</p>}
          <p>Do not have an account? <strong className='text-blue-600 cursor-pointer' onClick={() => setIsLogin(prev => !prev)}>Create One</strong> </p>
          <div className='flex '>
          </div>
          <p>Have a problem? <strong className='text-blue-600 cursor-pointer'>Contact Us</strong> </p>
        </div>
      </form>

      {/* Signup Form */}
      <form onSubmit={handleSignup} className={`p-4 h-full flex-col md:h-11/12 lg:w-2/3 w-full ${isLogin === false ? 'flex' : 'hidden'} md:flex-row items-center justify-center shadow-2xl rounded-xl`}>
        <div className="relative hidden md:block w-full md:h-full md:w-1/2 ">
          <Image src='/images/signup.png' alt='welcome' fill className='object-contain' />
        </div>
        <div className="flex justify-center flex-col items-center gap-4 h-2/3 w-full md:w-1/2 md:h-full">
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome To Munch</h1>
          <p className="text-center text-base -mt-4">Mobile Utility for Nourishing campus Hunger</p>
          <p className="text-center text-base ">Signup to join us</p>
          <InputField
            icon={<PersonIcon />}
            type="text"
            name="name"
            value={signupData.name}
            required={true}
            id='name'
            placeholder="Enter full name"
            onChange={handleOnChangeSignup}
            error={(signUpErrors as any).name}
          />
          <InputField
            icon={<AccountCircleIcon />}
            type="text"
            name="userName"
            required={true}
            id='userName'
            value={signupData.userName}
            placeholder="Enter user name"
            onChange={handleOnChangeSignup}
            error={(signUpErrors as any).userName}
          />
          <InputField
            icon={<EmailIcon />}
            type="email"
            name="email"
            required={true}
            id="email"
            value={signupData.email}
            placeholder="Enter Email"
            onChange={handleOnChangeSignup}
            error={(signUpErrors as any).email}
          />
          <InputField
            icon={<LocalPhone />}
            type="number"
            name="phone"
            required={true}
            id='phone'
            value={signupData.phone}
            placeholder="Enter mobile number"
            onChange={handleOnChangeSignup}
            error={(signUpErrors as any).phone}
          />
          <div className="inputContainer relative">
            <PasswordIcon />
            <input type={passwordVisible ? 'text' : 'password'} name="password" value={signupData.password} onChange={handleOnChangeSignup} id="password" placeholder='Enter Password' required className='input ' />
            {passwordVisible ? <VisibilityOff onClick={() => setPasswordVisible(false)} className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer' /> : <Visibility className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer' onClick={() => setPasswordVisible(true)} />}
          </div>
          <div className="inputContainer relative">
            <KeyIcon />
            <input type={confirmPasswordVisible ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' required className='input ' />
            {confirmPasswordVisible ? <VisibilityOff onClick={() => setConfirmPasswordVisible(false)} className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer' /> : <Visibility className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer' onClick={() => setConfirmPasswordVisible(true)} />}
          </div>
          {(signUpErrors as any).password && <p className='text-red-600 text-center'>{(signUpErrors as any).password}</p>}
          <Button type='submit' text='Signup' loading={signupLoading} disabled={Object.keys(signUpErrors).length <=0 || Object.values(signUpErrors).some((error) => error !== false)} />
          <p>Already have an account? <strong className='text-blue-600 cursor-pointer' onClick={() => setIsLogin(prev => !prev)}>Log in</strong> </p>
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

export default Auth;
