import React from 'react'

const Input = (props:{type:string, placeHolder:string}) => {
  const InputStyle={
    padding:"1vh 0vh",
    margin:"0.3vh 0vh",
    focus:{
      background:"green"
    }
  }
  return (
    <input className='w-5/6 rounded-xl text-center' style={InputStyle} type={props.type} placeholder={props.placeHolder }/>
  )
}

export default Input
