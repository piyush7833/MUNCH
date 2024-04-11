import { baseUrl } from "@/baseUrl";
import { httpservice } from "./httpService";
import { toast } from "react-toastify";
import { formType } from "./formData";
export function formatDate(inputDate:string) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const [year, month, day] = inputDate.split('-');
    const monthName = months[parseInt(month, 10) - 1];
  
    return `${parseInt(day, 10)} ${monthName} ${year}`;
  }

  export const handleUploadImage = async (selectedImage:File) => {
    try {
        const formData = new FormData();
        formData.append('file', selectedImage!);
        formData.append('type', "single");
        const imageResponse = await httpservice.post(`${baseUrl}/upload-image`, formData)
        return imageResponse.data.imgUrls;
    } catch (error:any) {
        console.log(error)
        toast.error("Failed to upload image")
        return null;
    }
}


export const findKeys = (arrayOfObjects: any[]): string[] => {
  const keys = arrayOfObjects.reduce((acc, item) => {
      return acc.concat(Object.keys(item));
  }, []);
  return Array.from(new Set(keys));
}


type FormData = {
  [key: string]: string | number;
};

const validateFormField = (field: formType, value: string): string => {
  if (field.required && !value) {
    return `Please enter ${field.name}`;
  }
  if (field.actualType === 'email' && value) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
  }
  if (field.actualType === 'number' && value) {
    const numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(value)) {
      return 'Please enter a valid number';
    }
  }
  if (field.actualType === 'phone' && value) {
    const numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(value) || value.length < 10 || value.length > 12) {
      return 'Please enter a valid phone number';
    }
  }
  if (field.actualType === 'aadhar' && value) {
    const numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(value) || value.length !== 12) {
      return 'Please enter a valid aadhar number';
    }
  }
  if (field.actualType === 'text' && value) {
    const textRegex = /^[a-zA-Z0-9\s]*$/;
    if (!textRegex.test(value)) {
      return 'Please enter a valid text';
    }
  }
  if (field.actualType === 'textWithComma' && value) {
    const textRegex = /^[a-zA-Z,'\s]/
    if (!textRegex.test(value)) {
      return 'Please enter a valid text';
    }
  }
  if (field.actualType === 'option' && value) {
    return 'valid';
  }
  if (field.actualType === 'password' && value) {
    const textRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+])[A-Za-z\d!@#$%^&*()-+]{8,}$/;
    if (!textRegex.test(value)) {
      return 'Please enter a valid password';
    }
  }
  return 'valid';
};

const validateForm = (formData: formType[], fieldId: string, fieldValue: string): string => {
  const field = formData.find(field => field.id === fieldId);
  if (field) {
    return validateFormField(field, fieldValue);
  }
  return 'Field not found';
};


export default validateForm;

export const formatStats = (stats: any[]) => {
  let totalEarnings = 0;
  let bestSellerProductAllShops : any|null = null;
  if(stats?.length>0){
      stats.forEach((shop: any) => {
          totalEarnings += shop.totalEarnings;
          const ownerBestSellerProduct=shop.bestSellerProduct;
          if(!bestSellerProductAllShops || (ownerBestSellerProduct && (ownerBestSellerProduct.quantity > bestSellerProductAllShops.quantity|| ownerBestSellerProduct.price > bestSellerProductAllShops.price))){
              bestSellerProductAllShops=ownerBestSellerProduct;
          }
      });
  }
  return {totalEarnings,bestSellerProductAllShops};
};

export const filterStats = (stats: any, selectedShop: string | null) => {
  const filteredProductGraphData = selectedShop ? stats?.shopStats[selectedShop]?.productGraphData : stats?.productGraphData;
  return filteredProductGraphData;
}


export const getCookie = (tokenName: string) => {
    
  var name = tokenName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};