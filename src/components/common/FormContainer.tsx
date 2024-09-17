"use client";
import { productOptionType } from '@/types/types';
import { formType } from '@/utils/formData';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react'
import Button from '../partials/Button';
import validateForm from '@/utils/action';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


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
  loading?: boolean;
  extraFunction?: any;
  btnText?: string;
};
const FormContainer = ({ data, onSave, title, address, originalData, originalAddressData, additional, originalAdditionalOptions, shopOwner, originalShopOwnerData, loading, extraFunction,btnText }: propsType) => {
  const [formData, setFormData] = useState<any>(originalData || null);
  const [addressData, setAdressData] = useState<any>(originalAddressData || null);
  const [shopOwnerData, setShopOwnerData] = useState<any>(originalShopOwnerData || null);
  const [addressError, setAddressError] = useState<object>({});
  const [shopOwnerError, setShopOwnerError] = useState<object>({});
  const [formError, setFormError] = useState<object>({});
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
    if(name==="shopId" || name==="productId"){
        extraFunction && extraFunction(e.target.value,name)
    }
    else if(name==="role"){
      console.log(e.target.value)
      extraFunction && extraFunction(e.target.value,name)
    }
    const fieldErrors = validateForm(data, name, e.target.value);
    setFormError({
      ...formError,
      [name]: fieldErrors !== 'valid' && fieldErrors,
    });
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, name: string) => {
    setAdressData({
      ...addressData,
      [name]: e.target.value,
    });
    const fieldErrors = validateForm(address!, name, e.target.value);
    setAddressError({
      ...addressError,
      [name]: fieldErrors !== 'valid' && fieldErrors,
    });
  };
  const handleShopOwnerChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, name: string) => {
    setShopOwnerData({
      ...shopOwnerData,
      [name]: e.target.value,
    });
    const fieldErrors = validateForm(shopOwner!, name, e.target.value);
    setShopOwnerError({
      ...shopOwnerError,
      [name]: fieldErrors !== 'valid' && fieldErrors,
    });
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (shopOwnerData) {
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
            <div className="relative w-full flex items-center gap-2">
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
                disabled={field.editable === false || loading}
              >
                <option value="" disabled selected>
                  {originalData && originalData[field.name] ? originalData[field.name] : field.placeholder}
                </option>
                {field.options?.map((option) => (
                  <option key={typeof option === 'object' ? option.value : option} value={typeof option === 'object' ? option.value : option}>
                    {typeof option === 'object' ? option.title : option}
                  </option>
                ))}
              </select>
              {formError[field.name as keyof typeof formError] && (
                <div className="relative group">
                <ErrorOutlineIcon className='text-red-600 cursor-pointer' />
                <div className="hidden group-hover:block absolute top-0 left-full bg-gray-200 p-2 rounded shadow-md text-xs">
                  {formError[field.name as keyof typeof formError] }
                </div>
              </div>
              )}
            </div>
          ) : (
            <div className="relative w-full flex items-center gap-2">
              <label
                htmlFor={field.name}
                className={`absolute transition-all duration-300 ${focusedInput === field.name || (originalData && originalData[field.name]) ? 'flex top-0 bottom-0 right-14 items-center text-sm text-blue-500 capitalize' : 'hidden'}`}
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
                disabled={field.editable === false || loading}
              />
              {formError[field.name as keyof typeof formError] && (
                <div className="relative group">
                <ErrorOutlineIcon className='text-red-600 cursor-pointer' />
                <div className="hidden group-hover:block absolute top-0 left-full bg-gray-200 p-2 rounded shadow-md text-xs">
                  {formError[field.name as keyof typeof formError] }
                </div>
              </div>
              )}
            </div>

          )}
        </div>
      ))}
      {address?.map((field) => (
        <div key={field.name} className="inputContainer">
          <field.icon />
          {field.type === "select" ? (
            <div className="relative w-full flex items-center gap-2">
              <label
                htmlFor={field.name}
                className={`absolute transition-all duration-300 ${focusedInput === field.name || (originalAddressData && originalAddressData[field.name]) ? 'flex top-0 bottom-0 right-14 items-center text-sm text-blue-500 capitalize' : 'hidden'}`}
              >
                {field.name}
              </label>
              <select
                name={field.name}
                id={field.name}
                onChange={(e) => handleAddressChange(e, field.name)}
                required={field.required}
                className="input"
                disabled={field.editable === false || loading}
              >
                <option value="" disabled selected>
                  {originalAddressData && originalAddressData[field.name] ? originalAddressData[field.name] : field.placeholder}
                </option>
                {field.options?.map((option) => (
                   <option key={typeof option === 'object' ? option.value : option} value={typeof option === 'object' ? option.value : option}>
                   {typeof option === 'object' ? option.title : option}
                 </option>
                ))}
              </select>
              {addressError[field.name as keyof typeof addressError] && (
                <div className="relative group">
                <ErrorOutlineIcon className='text-red-600 cursor-pointer' />
                <div className="hidden group-hover:block absolute top-0 left-full bg-gray-200 p-2 rounded shadow-md text-xs">
                  {addressError[field.name as keyof typeof addressError] }
                </div>
              </div>
              )}

            </div>
          ) : (
            <div className="relative w-full flex items-center gap-2">
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
                disabled={field.editable === false || loading}
              />
              {addressError[field.name as keyof typeof addressError] && (
                <div className="relative group">
                <ErrorOutlineIcon className='text-red-600 cursor-pointer' />
                <div className="hidden group-hover:block absolute top-0 left-full bg-gray-200 p-2 rounded shadow-md text-xs">
                  {addressError[field.name as keyof typeof addressError] }
                </div>
              </div>
              )}
            </div>
          )}
        </div>
      ))}
      {shopOwner && shopOwner?.map((field) => (
        <div key={field.name} className="inputContainer">
          <field.icon />
          {field.type === "select" ? (
            <div className="relative w-full flex items-center gap-2">
              <label
                htmlFor={field.name}
                className={`absolute transition-all duration-300 ${focusedInput === field.name || (originalShopOwnerData && originalShopOwnerData[field.name]) ? 'flex top-0 bottom-0 right-14 items-center text-sm text-blue-500 capitalize' : 'hidden'}`}
              >
                {field.name}
              </label>
              <select
                name={field.name}
                id={field.name}
                onChange={(e) => handleShopOwnerChange(e, field.name)}
                required={field.required}
                className="input"
                disabled={field.editable === false || loading}
              >
                <option value="" disabled selected>
                  {originalShopOwnerData && originalShopOwnerData[field.name] ? originalShopOwnerData[field.name] : field.placeholder}
                </option>
                {field.options?.map((option) => (
                   <option key={typeof option === 'object' ? option.value : option} value={typeof option === 'object' ? option.value : option}>
                   {typeof option === 'object' ? option.title : option}
                 </option>
                ))}
              </select>
              {shopOwnerError[field.name as keyof typeof shopOwnerError] && (
                <div className="relative group">
                <ErrorOutlineIcon className='text-red-600 cursor-pointer' />
                <div className="hidden group-hover:block absolute top-0 left-full bg-gray-200 p-2 rounded shadow-md text-xs">
                  {shopOwnerError[field.name as keyof typeof shopOwnerError] }
                </div>
              </div>
              )}
            </div>
          ) : (
            <div className="relative w-full flex items-center gap-2">
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
                disabled={field.editable === false || loading}
              />
              {shopOwnerError[field.name as keyof typeof shopOwnerError] && (
                <div className="relative group">
                <ErrorOutlineIcon className='text-red-600 cursor-pointer' />
                <div className="hidden group-hover:block absolute top-0 left-full bg-gray-200 p-2 rounded shadow-md text-xs">
                  {shopOwnerError[field.name as keyof typeof shopOwnerError] }
                </div>
              </div>
              )}
            </div>
          )}
        </div>
      ))}
      {additional &&
        <div className='flex items-start flex-col'>
          <label htmlFor="option" className='font-bold'>Add Varities</label>
          <div className="option flex gap-2 items-center">
            <input className='text-base font-bold input' type='text' disabled={loading} name='title' placeholder='Title' onChange={changeOption} />
            <input className='text-base font-bold input' type='number' disabled={loading} name="additionalPrice" placeholder='Additional Price' onChange={changeOption} />
            <button type="button" className='btn' disabled={option.title == null || option.additionalPrice == null || option.title == "" || loading} onClick={() => setOptions((prev) => [...prev, option])}><AddIcon /></button>
          </div>

          {originalAdditionalOptions && <div className="flex justify-between font-bold gap-4">
            <p>Title</p>
            <p>Additional Price</p>
            <p></p>
          </div>}
          {options && options?.map((opt, index) => (
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
      <Button type='submit' text={btnText || 'Save'} loading={loading} disabled={Object.values(formError).some((error) => error !== false) || Object.values(shopOwnerError).some((error) => error !== false) || Object.values(addressError).some((error) => error !== false)  }/>
    </form>
  )
}

export default FormContainer
