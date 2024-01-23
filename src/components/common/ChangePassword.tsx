import Image from 'next/image';
import React, { useState } from 'react';
import PinIcon from '@mui/icons-material/Pin';
import StreetviewIcon from '@mui/icons-material/Streetview';
import NearMeIcon from '@mui/icons-material/NearMe';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { addressType } from '@/types/types';
type propsType = {
  onClose: any,
  onSave: any
}


const ChangePassword = ({ onSave, onClose }: propsType) => {
  const [formData, setFormData] = useState<addressType>({});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave(formData);
    onClose();
    setFormData({});
  };

  return (
    <div className="dialog-container main fixed inset-0 bg-opacity-80 bg-white p-4 rounded-2xl shadow-2xl flex items-center justify-center">
      <form onSubmit={(e) => handleSave(e)} className="p-4 w-full max-w-[60%] md:h-3/4 lg:w-full flex flex-col md:flex-row items-center justify-center bg-white shadow-2xl rounded-xl">
        {/* img container */}
        <div className="hidden sm:block h-1/3 w-full md:h-full md:w-1/2 relative">
          <Image src="/images/login.png" alt="welcome" fill className="object-contain" />
        </div>
        {/* form container */}
        <div className="flex justify-center flex-col items-center gap-4 h-2/3 w-full md:w-1/2 md:h-full">
          <h1 className="text-2xl sm:text-3xl font-bold">Edit Address</h1>
          <div className="inputContainer">
            <StreetviewIcon />
            <input type="text" name="street" id="street" onChange={(e) => { handleChange(e) }} placeholder='Enter street name' required className='input' />
          </div>
          <div className="inputContainer">
            <NearMeIcon />
            <input type="text" name="landmark" id="landmark" onChange={(e) => { handleChange(e) }} placeholder='Enter landmark' required className='input' />
          </div>
          <div className="inputContainer">
            <LocationCityIcon />
            <input type="text" name="city" id="city" onChange={(e) => { handleChange(e) }} placeholder='Enter city' required className='input' />
          </div>
          <div className="inputContainer">
            <PinIcon />
            <input type="text" name="pinCode" id="pinCode" onChange={(e) => { handleChange(e) }} placeholder='Enter pin code' required className='input' />
          </div>
          <div className="inputContainer">
            <HolidayVillageIcon />
            <input type="text" name="state" id="state" onChange={(e) => { handleChange(e) }} placeholder='Enter state' required className='input' />
          </div>
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

export default ChangePassword;