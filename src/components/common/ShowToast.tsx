import React from 'react'
import { toast } from 'react-toastify'
type propsType={
    message:string
    type:"success"|"error"|"info"|"warning"
}
const ShowToast = ({message,type}:propsType) => {
  return (toast as any )[type](
    <div className="flex">
        <h1>{message}</h1>
    </div>,
      {
        icon: false,
        closeButton: false,
        style: {
          padding: 0,
          borderRadius: "5px",
        },
        position: "bottom-right",
        autoClose: 3000,
      }
  )
}

export default ShowToast
