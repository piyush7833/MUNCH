import React from 'react'

const Input = (props:{type:string, placeHolder:string}) => {
  return (
    <input className='w-5/6 rounded-xl text-center border-2 focus:border-2 focus:border-green-400' style={{padding:"1vh 0vh",margin:"0.3vh 0vh"}} type={props.type} placeholder={props.placeHolder }/>
  )
}

export default Input
