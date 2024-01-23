import Image from 'next/image';
import React, { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import PinIcon from '@mui/icons-material/Pin';
import StreetviewIcon from '@mui/icons-material/Streetview';
import NearMeIcon from '@mui/icons-material/NearMe';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { addressType } from '@/types/types';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { addressFormType } from '@/utils/formData';

type AddressDialogProps = {
  data: addressFormType[];
  onClose: () => void;
  onSave: (data: addressType) => void;
  image:string;
  title:string;
};

const FormDialog = ({ data, onClose, onSave,image,title }:AddressDialogProps) => {
  const [formData, setFormData] = useState<addressType>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
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
          <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
          {data.map((field) => (
            <div key={field.name} className="inputContainer">
              <field.icon/>
              <input
                type="text"
                name={field.name}
                id={field.name}
                onChange={(e) => handleChange(e, field.name)}
                placeholder={field.placeholder}
                required
                className="input"
              />
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
