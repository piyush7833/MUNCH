"use client"
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
type PropsType = {
    imgUrl?: string;
    alt: string;
    type: string;
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
            // setSelectedImage(file);
        }
    };

    // If previewUrl is null and imgUrl is provided, set previewUrl to imgUrl
    React.useEffect(() => {
        if (!previewUrl && imgUrl) {
            setPreviewUrl(imgUrl);
        }
    }, [previewUrl, imgUrl]);

    return (
<div className='flex flex-col gap-2 '>
  <div
    className={`${
      type === 'singleProduct'
        ? 'single-product-imgContainer'
        : type === 'profile'
        ? 'relative h-[50vh] w-[50vh]'
        : ''
    }`}
  >
    <Image
      src={previewUrl || '/images/addImage.png'}
      fill
      alt={alt}
      className='object-cover rounded-full'
      onClick={() => handleImageClick()}
    />
  {edit ? !editing ? (
    <div className="icon absolute bottom-0 right-0 translate-x-[100] translate-y-[100%] flex gap-3">
        <p className='text-lg'>Update Image</p>
        <EditIcon
          onClick={() => setEditing(true)}
          className=''/>
    </div>
    
  ) : (
    <div className="inputContainer absolute bottom-0 right-0 translate-x-[100] translate-y-[100%]">
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
</div>
    );
};

export default ImgContainer;
