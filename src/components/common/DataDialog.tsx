"use client";
import React, { useState } from 'react';
import ImgContainer from './ImgContainer';
import EditButton from '../partials/EditButton';
import DeleteButton from '../partials/DeleteButton';
import { toast } from 'react-toastify';
import { httpservice } from '@/utils/httpService';
import InputDialog from './InputDialog';
import { unVerifyForm } from '@/utils/formData';
import { baseUrl } from '@/baseUrl';

type propsType = {
  data: any;
  type?: string;
  onClose: () => void;
};


const DataDialog = ({ data, onClose, type }: propsType) => {
  const [reason,setReason]=useState <any>();
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);
 let verifyUrl:string | undefined;
 let deleteUrl:string | undefined;
 let editUrl:string | undefined;
  if (type === "products") {
    deleteUrl=(`product/${data.id}`);
    editUrl=(`/product/${data.id}`);
  }
  if (type === "shops") {
    verifyUrl=(`shop/${data.slug}`);
    deleteUrl=(`/shop/${data.slug}`);
    editUrl=(`/shop/${data.slug}`);
  }
  if (type === "shop-owners") {
    verifyUrl=(`shopowner`);
    deleteUrl=(`shopowner`);
    editUrl=(`shopowner`);
  }
  if (type === "contacts") {
    deleteUrl=(`contact/${data.id}`);
    editUrl=(`contact/${data.id}`);
  }
  const handleVerify = async () => {
    try {
      const response = await httpservice.put(`${baseUrl}/${verifyUrl}`,{verified:true, id:data.id});
      toast.success(response.data.message);
    } catch (error:any) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }
  const handleReject = async () => {
    try {
      const response = await httpservice.put( `${baseUrl}/${verifyUrl}`,{notVerified:reason?.notVerified,id:data.id});
      toast.success(response.data.message);
    } catch (error:any) {
      toast.error(error.response.data.message);
    }
  }
  const handleInputUnverify = async (reason:string) => {
    setReason(reason);
    setIsInputDialogOpen(false);
    handleReject();
  }
  return (
    <div className="dialog-container main fixed inset-0 bg-opacity-80 bg-white p-4 rounded-2xl shadow-2xl flex items-center justify-center">
      <div className="p-4 w-full max-w-[60%] md:h-3/4 lg:w-full flex flex-col md:flex-row items-center justify-center bg-white shadow-2xl rounded-xl overflow-y-auto hideScrollBar">
        <div className="hidden sm:flex h-1/3 w-full md:h-full md:w-1/2 relative items-center justify-center ">
          <ImgContainer imgUrl={data.img || data.user.image} alt="product" type="heading" />
        </div>
        <div className="flex justify-center flex-col items-center gap-2 h-2/3 w-full md:w-1/2 md:h-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">{data?.subject || data?.title || data?.user?.name}</h1>
          {Object.entries(data).map(([key, value]) => (
            <div className="flex w-full justify-start items-center" key={key}>
              <div className="w-1/3 capitalize">
                {(key === "img" || key==="softDelete") ? "" : key}
              </div>
              <div className="w-2/3 ">
                {key === "user" ?
                  (value as any)?.name : key === "address" ?
                    <div className="flex gap-2 flex-wrap">
                      <p>{(value as any)?.street},</p>
                      <p>{(value as any)?.landmark},</p>
                      <p>{(value as any)?.city},</p>
                      <p>{(value as any)?.pincode},</p>
                      <p>{(value as any)?.state}</p>
                    </div> : key === "shop" ?
                      (value as any)?.title : (key === "img" || key==="softDelete")  ?
                        "" : key === "options" ?
                        (value as JSON[]).map((item: any) => ( // Explicitly type 'item' as 'any'
                          <div key={item.title} className="flex gap-2">
                            <span>{item.title}</span>
                            <span>{item.additionalPrice}</span>
                          </div>
                        ))
                          :!value?"NaN": value as string}
              </div>
            </div>
          ))}
          <div className="mt-4 flex justify-end">
            {(!data?.verified && verifyUrl)&&<button type="submit" className="btn mr-2" onClick={()=>handleVerify()} >
              Verify
            </button>}
            {(!data?.notVerified && verifyUrl) &&<button type="submit" className="btn mr-2" onClick={()=>setIsInputDialogOpen(true)} >
              Reject
            </button>}
            {isInputDialogOpen && <InputDialog onClose={()=>setIsInputDialogOpen(false)} onSave={handleInputUnverify} title="Enter Reason" data={unVerifyForm}  />}
            {editUrl && <EditButton url={editUrl!} />}
            {deleteUrl && <DeleteButton url={deleteUrl!} />}
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDialog;
