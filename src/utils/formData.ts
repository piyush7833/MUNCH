import PinIcon from '@mui/icons-material/Pin';
import StreetviewIcon from '@mui/icons-material/Streetview';
import NearMeIcon from '@mui/icons-material/NearMe';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';


export type addressFormType={
    type:string,
    name:string,
    id:string,
    placeholder:string,
    icon:OverridableComponent<SvgIconTypeMap<{}, "svg">> 
}
export const addressFormData:addressFormType[]=[
    {
        type:"text",
        name:"street",
        id:"street",
        placeholder:"Enter street",
        icon: StreetviewIcon
    },
    {
        type:"text",
        name:"landmark",
        id:"landmark",
        placeholder:"Enter landmark",
        icon:NearMeIcon
    },
    {
        type:"text",
        name:"city",
        id:"city",
        placeholder:"Enter city",
        icon:LocationCityIcon
    },
    {
        type:"text",
        name:"pincode",
        id:"pincode",
        placeholder:"Enter pincode",
        icon:PinIcon
    },
    {
        type:"text",
        name:"state",
        id:"state",
        placeholder:"Enter state",
        icon:HolidayVillageIcon
    },
]