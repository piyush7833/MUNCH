import React from 'react'
type propsType={
    text:string;
    onClick:()=>void;

}
const TextBtn = ({text,onClick}:propsType) => {
  return (
    <p className='text-blue-400 cursor-pointer' onClick={() => onClick()}>{text}</p>
  )
}

export default TextBtn
