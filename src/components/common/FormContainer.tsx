import { formType } from '@/utils/formData';
import React, { useState } from 'react'

type propsType = {
    data: formType[];
    onSave: any;
    title:string;
    address?:formType[];
  };
const FormContainer = ({ data, onSave,title,address }:propsType) => {
    const [formData, setFormData] = useState<any>({});
    const [addressData, setAdressData] = useState<any>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setFormData({
          ...formData,
          [name]: e.target.value,
        });
      };
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setAdressData({
          ...addressData,
          [name]: e.target.value,
        });
      };
    
      const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(formData,addressData);
      };
  return (
    <form className='form hideScrollBar flex flex-col gap-4 justify-center items-center' onSubmit={(e)=>handleSave(e)}>
        <h1 className='text-4xl'>{title}</h1>
      {data.map((field) => (
            <div key={field.name} className="inputContainer">
              <field.icon/>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                onChange={(e) => handleChange(e, field.name)}
                placeholder={field.placeholder}
                required={field.required}
                className="input"
              />
            </div>
          ))}
      {address?.map((field) => (
            <div key={field.name} className="inputContainer">
              <field.icon/>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                onChange={(e) => handleAddressChange(e, field.name)}
                placeholder={field.placeholder}
                required={field.required}
                className="input"
              />
            </div>
          ))}
          <button className='btn' >Submit</button>
    </form>
  )
}

export default FormContainer
