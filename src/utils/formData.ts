import PinIcon from '@mui/icons-material/Pin';
import StreetviewIcon from '@mui/icons-material/Streetview';
import NearMeIcon from '@mui/icons-material/NearMe';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { httpservice } from './httpService';
import { baseUrl } from '@/baseUrl';
export type formType={
    type:string,
    name:string,
    id:string,
    placeholder:string,
    required:boolean,
    icon:OverridableComponent<SvgIconTypeMap<{}, "svg">> | any
    options?: string[];
    editable?:boolean;
    actualType?:string;
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    value?:string;
    error?:string;
}
export const addressFormData:formType[]=[
    {
        type:"text",
        name:"street",
        id:"street",
        placeholder:"Enter street",
        icon: StreetviewIcon,
        required:true,
        actualType:"text"
    },
    {
        type:"text",
        name:"landmark",
        id:"landmark",
        placeholder:"Enter landmark",
        icon:NearMeIcon,
        required:true,
        actualType:"text"
    },
    {
        type:"select",
        name:"state",
        id:"state",
        placeholder:"Enter state",
        icon:HolidayVillageIcon,
        required:true,
        actualType:"option",
        options:[
            "Andaman and Nicobar Islands",
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chandigarh",
            "Chhattisgarh",
            "Dadra and Nagar Haveli",
            "Daman and Diu",
            "Delhi",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Lakshadweep",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Puducherry",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal"
          ] 
    },
    {
        type:"text",
        name:"city",
        id:"city",
        placeholder:"Enter city",
        icon:LocationCityIcon,
        required:true,
        actualType:"text"
    },
    {
        type:"text",
        name:"pincode",
        id:"pincode",
        placeholder:"Enter pincode",
        icon:PinIcon,
        required:true,
        actualType:"number"
    },
 
]
export const editAddressFormData:formType[]=[
    {
        type:"text",
        name:"street",
        id:"street",
        placeholder:"Enter street",
        icon: StreetviewIcon,
        required:false,
        actualType:"text"
    },
    {
        type:"text",
        name:"landmark",
        id:"landmark",
        placeholder:"Enter landmark",
        icon:NearMeIcon,
        required:false,
        actualType:"text"
    },
    {
        type:"select",
        name:"state",
        id:"state",
        placeholder:"Enter state",
        icon:HolidayVillageIcon,
        required:false,
        actualType:"option",
        options:[
            "Andaman and Nicobar Islands",
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chandigarh",
            "Chhattisgarh",
            "Dadra and Nagar Haveli",
            "Daman and Diu",
            "Delhi",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Lakshadweep",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Puducherry",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal"
          ] 
    },
    {
        type:"text",
        name:"city",
        id:"city",
        placeholder:"Enter city",
        icon:LocationCityIcon,
        required:false,
        actualType:"text"
    },
    {
        type:"text",
        name:"pincode",
        id:"pincode",
        placeholder:"Enter pincode",
        icon:PinIcon,
        required:false,
        actualType:"number"
    },
 
]
export const passwordChangeFormData:formType[]=[
    {
        type:"password",
        name:"current_password",
        id:"current_password",
        placeholder:"Enter current password",
        icon: StreetviewIcon,
        required:true,
        actualType:"password"
    },
    {
        type:"password",
        name:"password",
        id:"password",
        placeholder:"Enter password",
        icon: StreetviewIcon,
        required:true,
        actualType:"password"
    },
    {
        type:"password",
        name:"confirm_password",
        id:"confirm_password",
        placeholder:"Confirm password",
        icon: StreetviewIcon,
        required:true,
        actualType:"password"
    },
]
export const shopOwnerFormData:formType[]=[
    {
        type:"text",
        name:"panCard",
        id:"panCard",
        placeholder:"Enter pan card number.",
        icon: StreetviewIcon,
        required:true,
        actualType:"pancard"
    },
    {
        type:"text",
        name:"aadhar",
        id:"aadhar",
        placeholder:"Enter aadhar number.",
        icon: StreetviewIcon,
        required:true,
        actualType:"aadhar"
    },
    {
        type:"text",
        name:"bankAccount",
        id:"bankAccount",
        placeholder:"Enter bank accout number.",
        icon: StreetviewIcon,
        required:true,
        actualType:"number"
    },
    {
        type:"text",
        name:"IFSC",
        id:"IFSC",
        placeholder:"Enter IFSC number of bank.",
        icon: StreetviewIcon,
        required:true,
        actualType:"text"
    },
    {
        type:"text",
        name:"GSTIN",
        id:"GSTIN",
        placeholder:"Enter GSTIN number (optional).",
        icon: StreetviewIcon,
        required:true,
        actualType:"text"
    },
]
export const editshopOwnerFormData:formType[]=[
    {
        type:"text",
        name:"panCard",
        id:"panCard",
        placeholder:"Enter pan card number.",
        icon: StreetviewIcon,
        required:false,
        actualType:"pancard"
    },
    {
        type:"text",
        name:"aadhar",
        id:"aadhar",
        placeholder:"Enter aadhar number.",
        icon: StreetviewIcon,
        required:false,
        actualType:"aadhar"
    },
    {
        type:"text",
        name:"bankAccount",
        id:"bankAccount",
        placeholder:"Enter bank accout number.",
        icon: StreetviewIcon,
        required:false,
        actualType:"number"
    },
    {
        type:"text",
        name:"IFSC",
        id:"IFSC",
        placeholder:"Enter IFSC number of bank.",
        icon: StreetviewIcon,
        required:false,
        actualType:"text"
    },
    {
        type:"text",
        name:"GSTIN",
        id:"GSTIN",
        placeholder:"Enter GSTIN number (optional).",
        icon: StreetviewIcon,
        required:false,
        actualType:"text"
    },
]
export const addShopFormData:formType[]=[
    {
        type:"text",
        name:"title",
        id:"title",
        placeholder:"Enter name of shop.",
        icon: StreetviewIcon,
        required:true,
        actualType:"text"
    },
    {
        type:"text",
        name:"desc",
        id:"desc",
        placeholder:"Enter description of shop.",
        icon: StreetviewIcon,
        required:true,
        actualType:"text"
    },
    {
        type:"text",
        name:"slug",
        id:"slug",
        placeholder:"Enter unique identifier for your shop.",
        icon: StreetviewIcon,
        required:true,
        actualType:"text"
    }
]
export const editShopFormData:formType[]=[
    {
        type:"text",
        name:"title",
        id:"title",
        placeholder:"Enter name of shop.",
        icon: StreetviewIcon,
        required:false,
        actualType:"text"
    },
    {
        type:"text",
        name:"desc",
        id:"desc",
        placeholder:"Enter description of shop.",
        icon: StreetviewIcon,
        required:false,
        actualType:"text"
    },
    {
        type:"text",
        name:"slug",
        id:"slug",
        placeholder:"Enter unique identifier for your shop.",
        icon: StreetviewIcon,
        required:false,
        editable:false,
        actualType:"text"
    }
]
const userShops=async()=>{
    try {
        const shops=await httpservice.get(`${baseUrl}/shop`);
        return shops.data;
    } catch (error) {
        return []
    }
}

export const addProductWithShopFormData:formType[]=[
    {
        type:"select",
        name:"slug",
        id:"slug",
        placeholder:"Select shop slug in which you want to add product.",
        icon: StreetviewIcon,
        required:true,
        actualType:"option",
        options:[]
    },
    {
        type:"text",
        name:"title",
        id:"title",
        placeholder:"Enter name of product.",
        icon: StreetviewIcon,
        required:true,
        actualType:"text"
    },
    {
        type:"text",
        name:"desc",
        id:"desc",
        placeholder:"Enter description of product.",
        icon: StreetviewIcon,
        required:true,
        actualType:"text"
    },
    {
        type:"text",
        name:"price",
        id:"price",
        placeholder:"Enter price of product.",
        icon: StreetviewIcon,
        required:true,
        actualType:"number"
    },
    {
        type:"select",
        name:"type",
        id:"type",
        placeholder:"Enter type of product (Veg, Non-Veg).",
        icon: StreetviewIcon,
        required:true,
        options:["Veg" , "Non_Veg"],
        actualType:"option"
    }
]
export const addProductFormData:formType[]=[
    {
        type:"text",
        name:"title",
        id:"title",
        placeholder:"Enter name of product.",
        icon: StreetviewIcon,
        required:true,
        actualType:"text"
    },
    {
        type:"text",
        name:"desc",
        id:"desc",
        placeholder:"Enter description of product.",
        icon: StreetviewIcon,
        required:true,
        actualType:"text"
    },
    {
        type:"text",
        name:"price",
        id:"price",
        placeholder:"Enter price of product.",
        icon: StreetviewIcon,
        required:true,
        actualType:"number"
    },
    {
        type:"select",
        name:"type",
        id:"type",
        placeholder:"Enter type of product (Veg, Non-Veg).",
        icon: StreetviewIcon,
        required:true,
        options:["Veg" , "Non_Veg"],
        actualType:"option"
    }
]
export const editProductFormData:formType[]=[
    {
        type:"text",
        name:"title",
        id:"title",
        placeholder:"Enter name of product.",
        icon: StreetviewIcon,
        required:false,
        actualType:"text"
    },
    {
        type:"text",
        name:"desc",
        id:"desc",
        placeholder:"Enter description of product.",
        icon: StreetviewIcon,
        required:false,
        actualType:"text"
    },
    {
        type:"text",
        name:"price",
        id:"price",
        placeholder:"Enter price of product.",
        icon: StreetviewIcon,
        required:false,
        actualType:"number"
    },
    {
        type:"select",
        name:"type",
        id:"type",
        placeholder:"Enter type of product (Veg, Non-Veg).",
        icon: StreetviewIcon,
        required:false,
        options:["Veg" , "Non_Veg"],
        actualType:"option"
    }
]
export const contactForm:formType[]=[
    {
        type:"text",
        name:"subject",
        id:"subject",
        placeholder:"Enter subject.",
        icon: StreetviewIcon,
        required:false,
        actualType:"text"
    },
    {
        type:"text",
        name:"message",
        id:"message",
        placeholder:"Enter message",
        icon: StreetviewIcon,
        required:false,
        actualType:"text"
    },
    {
        type:"select",
        name:"shopId",
        id:"shopId",
        placeholder:"Select shop if querry is related to particular shop (optional)",
        icon: StreetviewIcon,
        required:false,
        actualType:"option"
    }
]
export const unVerifyForm:formType[]=[
    {
        type:"text",
        name:"notVerified",
        id:"notVerified",
        placeholder:"Enter reason to not verify.",
        icon: StreetviewIcon,
        required:false,
        actualType:"text"
    }
]

export const editUserForm:formType[]=[
    {
        type:"text",
        name:"name",
        id:"name",
        placeholder:"Enter your name.",
        icon: StreetviewIcon,
        required:false,
        actualType:"text"
    },
    {
        type:"text",
        name:"email",
        id:"email",
        placeholder:"Enter your email.",
        icon: StreetviewIcon,
        required:false,
        actualType:"email"
    },
    {
        type:"text",
        name:"phone",
        id:"phone",
        placeholder:"Enter your phone.",
        icon: StreetviewIcon,
        required:false,
        actualType:"phone"
    },
]
export const logInFormData:formType[]=[
    {
        type:"text",
        name:"userName",
        id:"userName",
        placeholder:"Enter your user name.",
        icon: StreetviewIcon,
        required:false,
        actualType:"userName"
    },
    {
        type:"text",
        name:"email",
        id:"email",
        placeholder:"Enter your email.",
        icon: StreetviewIcon,
        required:false,
        actualType:"email"
    },
    {
        type:"text",
        name:"phone",
        id:"phone",
        placeholder:"Enter your phone.",
        icon: StreetviewIcon,
        required:false,
        actualType:"phone"
    },
    {
        type:"password",
        name:"password",
        id:"password",
        placeholder:"Enter your password.",
        icon: StreetviewIcon,
        required:true,
        actualType:"password"
    },
]
export const signupFormData:formType[]=[
    {
        type:"text",
        name:"userName",
        id:"userName",
        placeholder:"Enter your user name.",
        icon: StreetviewIcon,
        required:true,
        actualType:"userName"
    },
    {
        type:"text",
        name:"name",
        id:"name",
        placeholder:"Enter your name.",
        icon: StreetviewIcon,
        required:true,
        actualType:"rexr"
    },
    {
        type:"text",
        name:"email",
        id:"email",
        placeholder:"Enter your email.",
        icon: StreetviewIcon,
        required:false,
        actualType:"email"
    },
    {
        type:"text",
        name:"phone",
        id:"phone",
        placeholder:"Enter your phone.",
        icon: StreetviewIcon,
        required:false,
        actualType:"phone"
    },
    {
        type:"password",
        name:"password",
        id:"password",
        placeholder:"Enter your password.",
        icon: StreetviewIcon,
        required:true,
        actualType:"password"
    },
]