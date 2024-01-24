"use client"
import Image from 'next/image';
import React, { useState, useRef } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseUrl } from '@/baseUrl';
import { userAuthStore } from '@/utils/userStore';


type optionType = {
    title: string | null,
    additionalPrice: number |null
}
type Inputs = {
    title: string;
    desc: string;
    price: number;
};
type Review = {
    userId: string;
    comment: string;
    rating:number
};

const AddPage = () => {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("/images/addImage.png");
    const [shop, setShop] = useState<string|null>("HPMC"); //logic to be cleared
    const [review, setReview] = useState<number>(4); //logic to be cleared

    const [input, setInputs] = useState<Inputs>({
        title: "",
        desc: "",
        price: 0,
    })
    const [option, setOption] = useState<optionType>(
        {
            title:null,
            additionalPrice:null
        }
    )
    const [options, setOptions] = useState<optionType[]>([])
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {userName,role}=userAuthStore()
    const { data: session, status } = useSession()
    const router = useRouter()
    if (status === "loading") {
        return <p>loading...</p>
    }
    if (!userName || role!=="ShopOwner") {
        router.push('/')
    }
    const handleImageClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };

            reader.readAsDataURL(file);
            setSelectedImage(file);
        }
    };

    const uploadImage = async () => {
        try {
            const data = new FormData();
            data.append("file", selectedImage!);
            data.append("upload_preset", "munch783");
            console.log(data)
            const res = await fetch("https://api.cloudinary.com/v1_1/dcrwspwsc/image/upload", {
              method: "POST",
              headers: { "Content-Type": "multipart/form-data" },
              body: data,
            });
        
            const resData = await res.json();
            console.log(resData.url)
            return resData.url;
        } catch (error) {
            console.log(error)
        }
      };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
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

    const handleSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        // setShopSlug("hpmc");
        // setShop("hpmc");
        const url=await uploadImage()
        console.log("hello");
        try {
            const res=await fetch(`${baseUrl}/products`,{
                method:"POST",
                body:JSON.stringify({
                    ...input,
                    options,
                    // shopSlug,
                    review,
                    shop,
                    image:url
                    // selectedImage
                })
            })
            const data=await res.json()
            console.log(data)
            // router.push(`product/${data.id}`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form  >
                <div className="main text-main relative">
                    <div className="heading flex justify-center mt-4">
                        <h1 className='text-3xl lg:text-5xl'>Add Product</h1>
                    </div>
                    <div className='single-productContainer hideScrollBar'>
                        <div className="items w-full h-full flex flex-col justify-center">
                            <div className="single-product-imgContainer">
                                {<Image src={previewUrl} fill alt={previewUrl} className='object-contain' onClick={() => handleImageClick()} />}
                            </div>
                            <input className='text-2xl uppercase font-bold w-full flex items-center' type='file' accept="image/*" ref={inputRef} placeholder='Image of product' onChange={handleImageChange} />
                        </div>
                        <div className="single-product-textContainer hideScrollBar">
                            <input className='text-3xl font-bold addProductInput' name='title' onChange={handleInputChange} type='text' required placeholder='Enter name of product *' />
                            <input className='text-base font-bold addProductInput' name='price' onChange={handleInputChange} type='number' required placeholder='Enter price of product *' />
                            <textarea className='text-base font-bold addProductInput h-[20vh]' name='desc' onChange={handleInputChange} rows={5} cols={20} required placeholder='Enter description of product *' />

                            <label htmlFor="option" className='font-bold'>Add Varities</label>
                            <div className="option flex gap-2 items-center">
                                <input className='text-base font-bold addOptionInput' type='text' name='title' placeholder='Title' onChange={changeOption} />
                                <input className='text-base font-bold addOptionInput' type='number' name="additionalPrice" placeholder='Additional Price' onChange={changeOption} />
                                <button type="button" className='btn' disabled={option.title==null || option.additionalPrice==null || option.title==""} onClick={() => setOptions((prev) => [...prev, option])}><AddIcon /></button>
                            </div>

                            {options.length>0 && <div className="flex justify-between font-bold">
                                <p>Title</p>
                                <p>Additional Price</p>
                                <p></p>
                            </div>}
                            {options.map((opt,index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center gap-0"                   
                                    >
                                    <p className=''>{opt.title}</p>
                                    <p className=""> + Rs {opt.additionalPrice}</p>
                                    <button type="button" className='btn' onClick={()=>handleRemoveOption(index)}><DeleteIcon/></button>
                                </div>
                            ))}
                            <button type="button" className='btn' onClick={(e)=>handleSubmit(e)} >Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddPage
