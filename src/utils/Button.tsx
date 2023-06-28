import React from 'react'

const Btn = (props: { Text: string,Clr:string }) => {
  return (
    <input  type='button' className=" text-white mx-2 py-2 px-5 rounded-lg bg-red-500 border-red-400 items-center focus:shadow-xl focus:shadow-red-400 cursor-pointer" style={{background:props.Clr,padding:"1vh 1vw",borderRadius:"1.3rem",color:"white"}} value={props.Text} />
  )
}

export default Btn
