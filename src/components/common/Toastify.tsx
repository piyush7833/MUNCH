"use client"
import React from 'react'
import { toast } from 'react-toastify'

type propsType={
  // type:string,
  message:string
}
const Toastify = ({message}:propsType) => {
  return (
    <div>
      {toast.error(message)}
    </div>
  )
}

export default Toastify
