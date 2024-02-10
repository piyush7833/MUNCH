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
import { formatDate } from '@/utils/action';
import Button from '../partials/Button';

type propsType = {
  data: any;
  type?: string;
  onClose: () => void;
  handleUpdate: () => void;
};


const DataDialog = ({ data, onClose, type, handleUpdate }: propsType) => {
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);
  const [loading,setLoading]=useState(false)
  let verifyUrl: string | undefined;
  let deleteUrl: string | undefined;
  let editUrl: string | undefined;
  if (type === "products") {
    deleteUrl = (`product/${data.id}`);
    editUrl = (`/pages/edit/product/${data.id}`);
  }
  if (type === "shops") {
    verifyUrl = (`shop/${data.slug}`);
    deleteUrl = (`/shop/${data.slug}`);
    editUrl = (`/pages/edit/shop/${data.slug}`);
  }
  if (type === "shop-owners") {
    verifyUrl = (`shopowner`);
    deleteUrl = (`shopowner`);
    editUrl = (`/pages/edit/shopowner`);
  }
  if (type === "contacts") {
    deleteUrl = (`contact/${data.id}`);
    editUrl = (`/pages/contact/${data.id}`);
  }
  const handleVerify = async () => {
    try {
      setLoading(true)
      const response = await httpservice.put(`${baseUrl}/${verifyUrl}`, { verified: true, id: data.id });
      toast.success(response.data.message);
      handleUpdate();
      setLoading(false)
      onClose()
    } catch (error: any) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message);
    }
  }
  const handleReject = async (reason: any) => {
    try {
      setLoading(true)
      const response = await httpservice.put(`${baseUrl}/${verifyUrl}`, { notVerified: reason?.notVerified, id: data.id });
      toast.success(response.data.message);
      handleUpdate();
      setLoading(false);
      onClose()
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="dialog-container main fixed inset-0 bg-opacity-80 bg-white rounded-2xl shadow-2xl flex items-center justify-center overflow-y-scroll hideScrollBar">
      <div className="p-4 max-w-fit max-h-fit flex flex-col md:flex-row items-center justify-center bg-white shadow-2xl rounded-xl overflow-y-scroll hideScrollBar gap-4">
        <div className="hidden sm:flex h-1/3 max-w-fit md:h-full md:w-1/2 relative items-center justify-center overflow-hidden ">
          <ImgContainer imgUrl={data.img || data.user.image} alt="product" type="heading" />
        </div>
        <div className="flex justify-center flex-col items-center gap-2 h-2/3 w-full md:w-1/2 md:h-full px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">{data?.subject || data?.title || data?.user?.name}</h1>
          {Object.entries(data).map(([key, value]) => (
            <div className="flex w-full justify-start items-center" key={key}>
              <div className="w-1/3 capitalize">
                {(key === "img" || key === "softDelete") ? "" : key}
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
                      (value as any)?.title : (key === "img" || key === "softDelete") ?
                        "" : key === "options" ?
                          (value as JSON[]).map((item: any) => ( // Explicitly type 'item' as 'any'
                            <div key={item.title} className="flex gap-2 flex-wrap">
                              <span>{item.title}</span>
                              <span>{item.additionalPrice}</span>
                            </div>
                          ))
                          : key === "createdAt" ? formatDate((value as any)?.split('T')[0]) :
                            !value ? "NaN" : <p className='flex flex-wrap'>{value as string}</p>}
              </div>
            </div>
          ))}
          <div className="mt-4 flex justify-end">
            {(!data?.verified && verifyUrl) && <Button text='Verify' loading={loading} onClick={() => handleVerify()}/>}
            {(!data?.notVerified && verifyUrl) && <Button text='Reject' loading={loading} onClick={() => setIsInputDialogOpen(true)} />}
            {isInputDialogOpen && <InputDialog onClose={() => setIsInputDialogOpen(false)} onSave={handleReject} title="Enter Reason" data={unVerifyForm} />}
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
