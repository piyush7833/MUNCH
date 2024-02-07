"use client"
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
type PropsType = {
    imgUrl?: string;
    alt: string;
    type?: string;
    edit?: boolean;
    func?: any;
};

const ImgContainer: React.FC<PropsType> = ({ imgUrl, type, edit, alt, func }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Initialize to null
    const [editing,setEditing]=useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleImageClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await func(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // If previewUrl is null and imgUrl is provided, set previewUrl to imgUrl
    React.useEffect(() => {
        if (!previewUrl && imgUrl) {
            setPreviewUrl(imgUrl);
        }
    }, [previewUrl, imgUrl]);

    return (
  <div className={`relative ${ (type==="heading" || type==="profile" || type==="not-found")?"h-[30vh] w-[30vh] sm:h-[50vh] sm:w-[50vh]":type==="product"?"h-[20vh] w-[20vh]":type==="singleProduct"?"h-[30vh]  w-[30vh] md:h-[50vh] md:w-[50vh]":"h-[30vh] w-[30vh]"}`} >
    <Image
      src={previewUrl || '/images/addImage.png'}
      fill
      alt={alt}
      className={` ${type==="profile"?"rounded-full object-cover":"object-contain"}`}
      onClick={() => handleImageClick()}
    />
  {edit ? !editing ? (
    <div className="icon absolute -bottom-10 right-20 translate-x-[100] translate-y-[100%] flex gap-3 cursor-pointer" onClick={() => setEditing(true)}>
        <p className='text-2xl'>Update Image</p>
        <EditIcon
          className=''/>
    </div>
    
  ) : (
    <div className="inputContainer absolute -bottom-10 right-20 translate-x-[100] translate-y-[100%]">
      <input
        className='text-2xl uppercase font-bold w-full flex items-center'
        type='file'
        accept='image/*'
        ref={inputRef}
        placeholder='image'
        onChange={handleImageChange}
      />
      <CloseIcon onClick={() => setEditing(false)} />
    </div>
  ) : (
    ''
  )}
  </div>
    );
};

export default ImgContainer;
