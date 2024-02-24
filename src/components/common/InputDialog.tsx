"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { formType } from '@/utils/formData';
import Button from '../partials/Button';

type propsType = {
  data: formType[];
  onClose: () => void;
  onSave: any;
  title: string;
  // loading?:boolean;
};

const InputDialog = ({ data, onClose, onSave, title }: propsType) => {
  const [formData, setFormData] = useState<any | null>(null);
  const [loading, setLaoding] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, name: string) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
    console.log(formData)
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLaoding(true);
    await onSave(formData);
    setLaoding(false);
  };
  const [selectedStars, setSelectedStars] = useState(0);
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setFormData({
      ...formData,
      ["rating"]: newRating,
    });
  };

  const handleStarClick = (starCount: number) => {
    setSelectedStars(starCount);
    if (handleRatingChange) {
      handleRatingChange(starCount);
    }
  };
  return (
    <div className="dialog-container main fixed inset-0 bg-opacity-80 bg-white p-4 rounded-2xl shadow-2xl flex items-center justify-center">
      <form onSubmit={handleSave} className="p-4 max-w-[30%] w-fit md:h-fit max-h-[75%] lg:w-full flex flex-col md:flex-row items-center justify-center bg-white shadow-2xl rounded-xl">
        <div className="flex justify-center flex-col items-center gap-4 h-2/3 w-full md:h-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">{title}</h1>
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
                  disabled={field.editable === false || loading}
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
              ) : field.id === "rating" ?
                <div className='flex w-full justify-around'>
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      onClick={() => handleStarClick(index + 1)}
                      className={`cursor-pointer text-2xl sm:text-3xl ${index < selectedStars ? 'text-main' : 'text-gray-400'
                        }`}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
                :
                (
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
                )}
            </div>
          ))}
          <div className="mt-4 flex justify-end">
            <Button text="Save" type="submit" disabled={formData === null} loading={loading} />
            <Button text="Cancel" type="cancel" onClick={onClose} loading={loading} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputDialog;
