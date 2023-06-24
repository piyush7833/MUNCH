"use client"
import React from 'react'
import { useState } from 'react';
const Auth = () => {
  const[isActive,setActive]=useState(false)
  return (

    
    <div>
      {isActive===true?
      <div className="login">
        login
      </div>
      :
      <div className="signin">
        signup
      </div>}
    </div>
  )
}

export default Auth
