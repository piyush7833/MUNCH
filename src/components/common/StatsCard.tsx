import React from 'react'
type propsType={
  title:string,
  value:number | string,
  icon?:any
}
const StatsCard = ({title,value,icon}:propsType) => {
  return (
    <div className='flex rounded-lg overflow-hidden shadow-xl shadow-gray-200 dark:shadow-black items-center justify-around w-fit p-4 gap-4 '>
     {icon && <div className="icon">
        {icon}
      </div>}
      <div className="flex flex-col text-main justify-center items-center">
          <h1>{title}</h1>
          <p>{value}</p>
      </div>
    </div>
  )
}

export default StatsCard
