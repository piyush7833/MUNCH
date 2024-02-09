"use client"; 
import { productOptionType } from '@/types/types';
import { formType } from '@/utils/formData';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react'

type propsType = {
  data: formType[];
  onSave: any;
  title: string;
  address?: formType[];
  shopOwner?: formType[];
  originalShopOwnerData?: any;
  additional?: boolean;
  originalData?: any;
  originalAddressData?: any;
  originalAdditionalOptions?: any[];

};
const FormContainer = ({ data, onSave, title, address, originalData, originalAddressData, additional, originalAdditionalOptions,shopOwner,originalShopOwnerData }: propsType) => {
  const [formData, setFormData] = useState<any>(originalData || null);
  const [addressData, setAdressData] = useState<any>(originalAddressData || null);
  const [shopOwnerData, setShopOwnerData] = useState<any>(originalShopOwnerData || null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [option, setOption] = useState<productOptionType>(
    {
      title: null,
      additionalPrice: null
    }
  )
  const [options, setOptions] = useState<productOptionType[]>(originalAdditionalOptions || [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, name: string) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, name: string) => {
    setAdressData({
      ...addressData,
      [name]: e.target.value,
    });
  };
  const handleShopOwnerChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, name: string) => {
    setShopOwnerData({
      ...shopOwnerData,
      [name]: e.target.value,
    });
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(shopOwnerData){
      onSave(formData, addressData, shopOwnerData);
    }
    else if (addressData) {
      onSave(formData, addressData);
    }
    else if (options.length > 0) {
      onSave(formData, options)
    }
    else {
      onSave(formData)
    }
  };
  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRemoveOption = (index: number) => {
    const updatedList = [...options];
    updatedList.splice(index, 1);
    setOptions(updatedList);
  };
  return (
    <form className='form hideScrollBar flex flex-col gap-4 justify-center items-center' onSubmit={(e) => handleSave(e)}>
      <h1 className='text-4xl'>{title}</h1>
      {data.map((field) => (
        <div key={field.name} className="inputContainer">
          <field.icon />
          {field.type === "select" ? (
               <div className="relative w-full">
               <label
                 htmlFor={field.name}
                 className={`absolute transition-all duration-300 ${focusedInput === field.name || ((originalData && originalData[field.name])) ? 'flex top-0 bottom-0 right-14 items-center text-sm text-blue-500 capitalize' : 'hidden'}`}
               >
                 {field.name}
               </label>
            <select
              name={field.name}
              id={field.name}
              onChange={(e) => handleChange(e, field.name)}
              required={field.required}
              className="input"
              disabled={field.editable === false}
            >
              <option value="" disabled selected>
                {originalData && originalData[field.name] ? originalData[field.name] : field.placeholder}
              </option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            </div>
          ) : (
            <div className="relative w-full">
              <label
                htmlFor={field.name}
                className={`absolute transition-all duration-300 ${focusedInput === field.name || (originalData && originalData[field.name])  ? 'flex top-0 bottom-0 right-14 items-center text-sm text-blue-500 capitalize' : 'hidden'}`}
              >
                {field.name}
              </label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                onChange={(e) => handleChange(e, field.name)}
                placeholder={originalData && originalData[field.name] ? originalData[field.name] : field.placeholder}
                required={field.required}
                className="input"
                disabled={field.editable === false}
              />
            </div>

          )}
        </div>
      ))}
      {address?.map((field) => (
        <div key={field.name} className="inputContainer">
          <field.icon />
          {field.type === "select" ? (
            <div className="relative w-full">
            <label
              htmlFor={field.name}
              className={`absolute transition-all duration-300 ${focusedInput === field.name || (originalAddressData && originalAddressData[field.name] ) ? 'flex top-0 bottom-0 right-14 items-center text-sm text-blue-500 capitalize' : 'hidden'}`}
            >
              {field.name}
            </label>
            <select
              name={field.name}
              id={field.name}
              onChange={(e) => handleAddressChange(e, field.name)}
              required={field.required}
              className="input"
              disabled={field.editable === false}
            >
              <option value="" disabled selected>
                {originalAddressData && originalAddressData[field.name] ? originalAddressData[field.name] : field.placeholder}
              </option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            </div>
          ) : (
            <div className="relative w-full">
              <label
                htmlFor={field.name}
                className={`absolute transition-all duration-300 ${focusedInput === field.name || (originalAddressData && originalAddressData[field.name]) ? 'flex top-0 bottom-0 right-14 items-center text-sm text-blue-500 capitalize' : 'hidden'}`}
              >
                {field.name}
              </label>
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              onChange={(e) => handleAddressChange(e, field.name)}
              placeholder={originalAddressData && originalAddressData[field.name] ? originalAddressData[field.name] : field.placeholder}
              required={field.required}
              className="input"
              disabled={field.editable === false}
            />
            </div>
          )}
        </div>
      ))}
      {shopOwner && shopOwner?.map((field) => (
        <div key={field.name} className="inputContainer">
          <field.icon />
          {field.type === "select" ? (
            <div className="relative w-full">
            <label
              htmlFor={field.name}
              className={`absolute transition-all duration-300 ${focusedInput === field.name || (originalShopOwnerData && originalShopOwnerData[field.name] ) ? 'flex top-0 bottom-0 right-14 items-center text-sm text-blue-500 capitalize' : 'hidden'}`}
            >
              {field.name}
            </label>
            <select
              name={field.name}
              id={field.name}
              onChange={(e) => handleShopOwnerChange(e, field.name)}
              required={field.required}
              className="input"
              disabled={field.editable === false}
            >
              <option value="" disabled selected>
                {originalShopOwnerData && originalShopOwnerData[field.name] ? originalShopOwnerData[field.name] : field.placeholder}
              </option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            </div>
          ) : (
            <div className="relative w-full">
              <label
                htmlFor={field.name}
                className={`absolute transition-all duration-300 ${focusedInput === field.name || (originalShopOwnerData && originalShopOwnerData[field.name]) ? 'flex top-0 bottom-0 right-14 items-center text-sm text-blue-500 capitalize' : 'hidden'}`}
              >
                {field.name}
              </label>
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              onChange={(e) => handleShopOwnerChange(e, field.name)}
              placeholder={originalShopOwnerData && originalShopOwnerData[field.name] ? originalShopOwnerData[field.name] : field.placeholder}
              required={field.required}
              className="input"
              disabled={field.editable === false}
            />
            </div>
          )}
        </div>
      ))}
      {additional &&
        <div className='flex items-start flex-col'>
          <label htmlFor="option" className='font-bold'>Add Varities</label>
          <div className="option flex gap-2 items-center">
            <input className='text-base font-bold input' type='text' name='title' placeholder='Title' onChange={changeOption} />
            <input className='text-base font-bold input' type='number' name="additionalPrice" placeholder='Additional Price' onChange={changeOption} />
            <button type="button" className='btn' disabled={option.title == null || option.additionalPrice == null || option.title == ""} onClick={() => setOptions((prev) => [...prev, option])}><AddIcon /></button>
          </div>

          {originalAdditionalOptions && <div className="flex justify-between font-bold gap-4">
            <p>Title</p>
            <p>Additional Price</p>
            <p></p>
          </div>}
          {originalAdditionalOptions && originalAdditionalOptions?.map((opt, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-4"
            >
              <p className=''>{opt.title}</p>
              <p className="">  Rs {opt.additionalPrice}</p>
              <button type="button" className='btn' onClick={() => handleRemoveOption(index)}><DeleteIcon /></button>
            </div>
          ))}
        </div>
      }
      <button className='btn' >Submit</button>
    </form>
  )
}

export default FormContainer
