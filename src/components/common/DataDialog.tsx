import React from 'react'
import ImgContainer from './ImgContainer'
type propsType={
    data:any,
    edit?:boolean,
    Delete?:boolean,
    verify?:boolean,
    img?:boolean,
    onDelete?:any,
    onVerify?:any,
    onEdit?:any,
    onClose?:any,
}

const DataDialog = ({data,edit,Delete,verify,img,onDelete,onClose,onEdit,onVerify}:propsType) => {
    console.log(data)
    return (
        <div>
            {/* {img && <ImgContainer imgUrl={data.img as string} alt='img' />}
            {data.map((value:any)=>(
                <p key={value}>{value}</p>
            ))} */}
        </div>
    )
}

export default DataDialog
