import React from 'react'

const Btn = (props: { Text: string,Clr:string }) => {
  return (
    // <div className='px-2 py-1 bg-red-600 rounded-lg border-2 border-red-700 hover:bg-red-700 hover:border-2 hover:border-red-800'>
    <button className=" text-white mx-2 py-2 px-5 rounded-lg bg-red-500 border-red-400 items-center" style={{background:props.Clr,padding:"1vh 1vw",borderRadius:"1.3rem",color:"white"}}>
      {props.Text}
    </button>
    // </div>
  )
}

export default Btn
