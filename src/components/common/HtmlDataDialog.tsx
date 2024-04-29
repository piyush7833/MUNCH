import React from 'react'
type propsType={
    title:string,
    subTitle?:string,
    onClose:any,
    content:any
}
const HtmlDataDialog = ({title,subTitle,onClose,content}:propsType) => {
    console.log(content,"content")
  return (
    <div className="main inset-0 fixed w-full backdrop-blur-md flex justify-center items-center hideScrollBar overflow-y-auto">
          <div className="w-full h-fit md:w-1/2 flex items-center justify-center p-4 ">
            <div className="w-auto h-1/2 bg-white dark:bg-darkGradient2 rounded-md p-4 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                <h1 className="font-bold text-main text-xl">{title}</h1>
                {subTitle&&<h2>{subTitle}</h2>}
                </div>
                <p
                  className="cursor-pointer font-bold"
                  onClick={()=>onClose()}
                >
                  X
                </p>
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: content }}
                className="text-start space-y-2 overflow-y-auto"
              ></p>
            </div>
          </div>
        </div>
  )
}

export default HtmlDataDialog
