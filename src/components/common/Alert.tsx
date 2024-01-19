// components/AlertDialog.tsx
"use client"
import { useState } from 'react';

type AlertDialogProps = {
  type: 'success' | 'error' | 'info';
  heading: string;
  text: any;
};

const Alert = ({ type, heading, text }:AlertDialogProps) => {
  const [isOpen, setIsOpen] = useState(true);
  console.log("text ", text)
  const handleClose = () => {
    setIsOpen(false);
  };

  const getAlertClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <>
    {isOpen && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-100"></div>
        <div className={`relative w-[25%] p-4 bg-opacity-90 backdrop-blur-md rounded-md shadow-lg z-200 ${getAlertClasses()} overflow-x-clip text-center`}>
          <div className="flex items-center justify-center mb-4">
            <p className="font-bold text-4xl">{heading}</p>
          </div>
          <p className='text-lg'>{text}</p>
          <button
            className="absolute top-2 right-2 text-white focus:outline-none"
            onClick={()=>handleClose()}
          >
            <span className='text-3xl'>x</span>
          </button>
        </div>
      </div>
    )}
  </>
  );
};

export default Alert;
