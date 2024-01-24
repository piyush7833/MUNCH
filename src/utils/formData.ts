import PinIcon from '@mui/icons-material/Pin';
import StreetviewIcon from '@mui/icons-material/Streetview';
import NearMeIcon from '@mui/icons-material/NearMe';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type formType={
    type:string,
    name:string,
    id:string,
    placeholder:string,
    required:boolean,
    icon:OverridableComponent<SvgIconTypeMap<{}, "svg">> 
}
export const addressFormData:formType[]=[
    {
        type:"text",
        name:"street",
        id:"street",
        placeholder:"Enter street",
        icon: StreetviewIcon,
        required:true
    },
    {
        type:"text",
        name:"landmark",
        id:"landmark",
        placeholder:"Enter landmark",
        icon:NearMeIcon,
        required:true
    },
    {
        type:"text",
        name:"city",
        id:"city",
        placeholder:"Enter city",
        icon:LocationCityIcon,
        required:true
    },
    {
        type:"text",
        name:"pincode",
        id:"pincode",
        placeholder:"Enter pincode",
        icon:PinIcon,
        required:true
    },
    {
        type:"text",
        name:"state",
        id:"state",
        placeholder:"Enter state",
        icon:HolidayVillageIcon,
        required:true
    },
]
export const passwordChangeFormData:formType[]=[
    {
        type:"password",
        name:"current_password",
        id:"current_password",
        placeholder:"Enter current password",
        icon: StreetviewIcon,
        required:true
    },
    {
        type:"password",
        name:"password",
        id:"password",
        placeholder:"Enter password",
        icon: StreetviewIcon,
        required:true
    },
    {
        type:"password",
        name:"confirm_password",
        id:"confirm_password",
        placeholder:"Confirm password",
        icon: StreetviewIcon,
        required:true
    },
]
export const shopOwnerFormData:formType[]=[
    {
        type:"text",
        name:"panCard",
        id:"panCard",
        placeholder:"Enter pan card number.",
        icon: StreetviewIcon,
        required:true
    },
    {
        type:"text",
        name:"aadhar",
        id:"aadhar",
        placeholder:"Enter aadhar number.",
        icon: StreetviewIcon,
        required:true
    },
    {
        type:"text",
        name:"bankAccount",
        id:"bankAccount",
        placeholder:"Enter bank accout number.",
        icon: StreetviewIcon,
        required:true
    },
    {
        type:"text",
        name:"IFSC",
        id:"IFSC",
        placeholder:"Enter IFSC number of bank.",
        icon: StreetviewIcon,
        required:true
    },
    {
        type:"text",
        name:"GSTIN",
        id:"GSTIN",
        placeholder:"Enter GSTIN number (optional).",
        icon: StreetviewIcon,
        required:true
    },
]
export const addShopFormData:formType[]=[
    {
        type:"text",
        name:"title",
        id:"title",
        placeholder:"Enter name of shop.",
        icon: StreetviewIcon,
        required:true
    },
    {
        type:"text",
        name:"desc",
        id:"desc",
        placeholder:"Enter description of shop.",
        icon: StreetviewIcon,
        required:true
    },
    {
        type:"text",
        name:"slug",
        id:"slug",
        placeholder:"Enter unique identifier for your shop.",
        icon: StreetviewIcon,
        required:true
    }
]