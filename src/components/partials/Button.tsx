import React from 'react'

type propsType={
    text?:string
    type?:string,
    loading?:boolean,
    disabled?:boolean,
    onClick?:()=>void
}
const Button = ({text,type,loading,onClick,disabled}:propsType) => {
  return (
    <button className={`${type==="cancel"?"cancelBtn":"btn"} ${(disabled || loading) && "disabled:cursor-not-allowed"}`}>
      {loading ? (
        <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
            ) : (
                text
            )}
    </button>
  )
}

export default Button
