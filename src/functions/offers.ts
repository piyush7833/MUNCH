// import { offerType } from "@/types/types";
// import { handleUploadImage } from "@/utils/action";
// import { httpservice } from "@/utils/httpService"
// import { toast } from "react-toastify";

// export const createOffers=async(data:offerType, img:File | null)=>{
//     try {
//         if(img){
//             data.img=await handleUploadImage(img);
//         }
//         const res= await httpservice.post('/offers',{title:data.title,desc:data.desc,img:data.img,discountedPrice:data.discountedPrice,discountedPercentage:data.discountedPercentage,discountedOption:data.discountedOption,time:data.time,productId:data.productId,shopSlug:data.shopSlug});
//         console.log(res.data);
//         return toast.success(res.data.message);
//     } catch (error:any) {
//         return toast.error(error.response.data.message);
//     }
// }