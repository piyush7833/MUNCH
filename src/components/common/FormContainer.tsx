import { productOptionType } from '@/types/types';
import { formType } from '@/utils/formData';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react'

type propsType = {
    data: formType[];
    onSave: any;
    title:string;
    address?:formType[];
    option?:boolean;
  };
const FormContainer = ({ data, onSave,title,address }:propsType) => {
    const [formData, setFormData] = useState<any>({});
    const [addressData, setAdressData] = useState<any>();
    const [option, setOption] = useState<productOptionType>(
      {
          title: null,
          additionalPrice: null
      }
  )
  const [options, setOptions] = useState<productOptionType[]>([])
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
    
      const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(options)
        console.log(addressData)
        if(addressData){
          console.log("object")
          onSave(formData,addressData)
        }
        else if(options.length>0){
          console.log("object")
          onSave(formData,options)
        }
        else{
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
        console.log(options)
    };
  return (
    <form className='form hideScrollBar flex flex-col gap-4 justify-center items-center' onSubmit={(e)=>handleSave(e)}>
        <h1 className='text-4xl'>{title}</h1>
        {data.map((field) => (
        <div key={field.name} className="inputContainer">
          <field.icon />
          {field.type === "select" ? (
            <select
              name={field.name}
              id={field.name}
              onChange={(e) => handleChange(e, field.name)}
              required={field.required}
              className="input"
            >
              <option value="" disabled selected>
                {field.placeholder}
              </option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              onChange={(e) => handleChange(e, field.name)}
              placeholder={field.placeholder}
              required={field.required}
              className="input"
            />
          )}
        </div>
      ))}
      {address?.map((field) => (
            <div key={field.name} className="inputContainer">
            <field.icon />
            {field.type === "select" ? (
              <select
                name={field.name}
                id={field.name}
                onChange={(e) => handleAddressChange(e, field.name)}
                required={field.required}
                className="input"
              >
                <option value="" disabled selected>
                  {field.placeholder}
                </option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                onChange={(e) => handleChange(e, field.name)}
                placeholder={field.placeholder}
                required={field.required}
                className="input"
              />
            )}
          </div>
          ))}
        {option &&
        <div className='flex items-start flex-col'>
        <label htmlFor="option" className='font-bold'>Add Varities</label>
        <div className="option flex gap-2 items-center">
            <input className='text-base font-bold input' type='text' name='title' placeholder='Title' onChange={changeOption} />
            <input className='text-base font-bold input' type='number' name="additionalPrice" placeholder='Additional Price' onChange={changeOption} />
            <button type="button" className='btn' disabled={option.title == null || option.additionalPrice == null || option.title == ""} onClick={() => setOptions((prev) => [...prev, option])}><AddIcon /></button>
        </div>

        {options.length > 0 && <div className="flex justify-between font-bold">
            <p>Title</p>
            <p>Additional Price</p>
            <p></p>
        </div>}
        {options.map((opt, index) => (
            <div
                key={index}
                className="flex justify-between items-center gap-0"
            >
                <p className=''>{opt.title}</p>
                <p className=""> + Rs {opt.additionalPrice}</p>
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
