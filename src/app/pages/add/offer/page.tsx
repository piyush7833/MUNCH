"use client";
import { baseUrl } from "@/baseUrl";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import FormContainer from "@/components/common/FormContainer";
import ImgContainer from "@/components/common/ImgContainer";
import {
	ProductsType,
	ResponseShopType,
	offerType,
	productOptionType,
} from "@/types/types";
import { handleUploadImage } from "@/utils/action";
import { offerFormData, optionType } from "@/utils/formData";
import { httpservice } from "@/utils/httpService";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
	const [isConfirmOpen, setConfirmOpen] = useState(false);
	const [formData, setFormData] = useState<offerType | null>();
	const [loading, setLoading] = useState(false);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [shops, setShops] = useState<ResponseShopType>([]);
	const [products, setProducts] = useState<ProductsType>([]);
	const [selectedShop,setSelectedShop]=useState<string | null>();
	const [selectedProduct,setSelectedProduct]=useState<string | null>();
	const [productOptions, setProductOptions] = useState<string[]>(
		
	);

	useEffect(() => {
		const fetchShops = async () => {
			try {
				const response = await httpservice.get(`${baseUrl}/shop`);
				setShops(response.data.shops);
			} catch (error: any) {
				return toast.error(error.response.data.message);
			}
		};
		fetchShops();
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = selectedShop && await httpservice.post(
					`${baseUrl}/product/${selectedShop}`,
				);
				response && setProducts(response.data.product);
			} catch (error: any) {
				return toast.error(error.response.data.message);
			}
		};
		fetchProducts();
	}, [selectedShop]);
	useEffect(() => {
		const fetchProductOptions = async () => {
			const optionProduct = products.find((product) => product.id === selectedProduct);
			const options=optionProduct?.options?.map((option)=>option.title!) || [];
			setProductOptions(["All", ...options]);
		};
		fetchProductOptions();
	}, [selectedProduct]);


	const handleSave = (data: offerType) => {
		setFormData(data);
		setConfirmOpen(true);
	};
	const handleImageChange = (selectedImage: File | null) => {
		setSelectedImage(selectedImage);
	};

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		try {
			let imgUrl;
			setLoading(true);
			// if (selectedImage) {
			// 	imgUrl = await handleUploadImage(selectedImage);
			// }
			console.log(formData, "formData")
			// const response = await httpservice.post("/offers", {
			// 	title: formData!.title,
			// 	desc: formData!.desc,
			// 	img: formData!.img,
			// 	discountedPrice: formData!.discountedPrice,
			// 	discountedPercentage: formData!.discountedPercentage,
			// 	discountedOption: formData!.discountedOption,
			// 	time: formData!.time,
			// 	productId: formData!.productId,
			// 	shopSlug: formData!.shopSlug,
			// });
			// toast.success(response.data.message);
			setLoading(false);
		} catch (error: any) {
			console.log(error);
			setLoading(false);
			toast.error(error.response.data.message);
		}
	};
	offerFormData[2].options = shops && shops.map((shop) => {return {title:shop.slug,value:shop.id}});
	offerFormData[3].options = products &&  [{title:"All",value:"All"},...products.map((product) => {return {value:product.id,title:product.title}})];
	offerFormData[4].options = productOptions && productOptions.map((option) => {return {title:option,value:option}});
	const handleFormChange = (data:any,name:string) => {
		console.log("object",data,name)
		if(name==="shopId"){
			setSelectedShop(data)
		}
		if(name==="productId"){
			setSelectedProduct(data)
		}
	}
	return (
		<div className="main flex flex-col md:flex-row gap-14 md:gap-4 items-center justify-center hideScrollBar w-full">
			<ConfirmDialog
				isOpen={isConfirmOpen}
				onClose={() => setConfirmOpen(false)}
				onConfirm={handleSubmit}
				title="Confirm Action"
				message="Are you sure you want to perform this action?"
			/>
			<div className=" w-full h-1/2 md:h-1/2 md:w-1/2 flex items-center justify-center">
				<ImgContainer
					type="singleProduct"
					alt="add image"
					edit={true}
					func={handleImageChange}
				/>
			</div>
			<FormContainer
				onSave={handleSave}
				data={offerFormData}
				title="Add Offer"
				loading={loading}
				extraFunction={handleFormChange}
			/>
		</div>
	);
};

export default Page;
