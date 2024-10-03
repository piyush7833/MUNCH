"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { formType } from '@/utils/formData';
import validateForm from '@/utils/action';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type propsType = {
  data: formType[];
  onClose: () => void;
  onSave: any;
  image:string;
  title:string;
  loading?: boolean;
};

const FormDialog = ({ data, onClose, onSave,image,title,loading }:propsType) => {
  const [formData, setFormData] = useState<any>();
  const [formError, setFormError] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, name: string) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
    const fieldErrors = validateForm(data, name, e.target.value);
    setFormError({
      ...formError,
      [name]: fieldErrors !== 'valid' && fieldErrors,
    });
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="dialog-container main fixed inset-0 bg-opacity-80 bg-white p-4 rounded-2xl shadow-2xl flex items-center justify-center">
      <form onSubmit={handleSave} className="p-4 w-full max-w-[60%] md:h-3/4 lg:w-full flex flex-col md:flex-row items-center justify-center bg-white shadow-2xl rounded-xl">
        {/* img container */}
        <div className="hidden sm:block h-1/3 w-full md:h-full md:w-1/2 relative">
          <Image src={image} alt="welcome" fill className="object-contain" />
        </div>
        {/* form container */}
        <div className="flex justify-center flex-col items-center gap-4 h-2/3 w-full md:w-1/2 md:h-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">{title}</h1>
          {data.map((field) => (
        <div key={field.name} className="inputContainer">
          <field.icon />
          {field.type === "select" ? (
            <div className="relative w-full flex items-center gap-2">
              <select
                name={field.name}
                id={field.name}
                onChange={(e) => handleChange(e, field.name)}
                required={field.required}
                className="input"
                disabled={field.editable === false || loading}
              >
                <option value="" disabled selected>
                  {field.placeholder}
                </option>
                {field.options?.map((option,idx) => (
                  <option key={idx} value={typeof(option)!=="string"?option?.title:option}>
                    {typeof(option)!=="string"?option?.title:option}
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
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                onChange={(e) => handleChange(e, field.name)}
                placeholder={field.placeholder}
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
          <div className="mt-4 flex justify-end">
            <button type="submit" className="btn mr-2">
              Save
            </button>
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormDialog;
