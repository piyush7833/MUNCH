import PinIcon from '@mui/icons-material/Pin';
import StreetviewIcon from '@mui/icons-material/Streetview';
import NearMeIcon from '@mui/icons-material/NearMe';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { httpservice } from './httpService';
import { baseUrl } from '@/baseUrl';
export type optionType={
    value:string;
    title:string;
}
export type formType = {
    type: string,
    name: string,
    id: string,
    placeholder: string,
    required: boolean,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | any
    options?: optionType[] | string[];
    editable?: boolean;
    actualType?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    error?: string;
}
export const addressFormData: formType[] = [
    {
        type: "text",
        name: "street",
        id: "street",
        placeholder: "Enter street",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    },
    {
        type: "text",
        name: "landmark",
        id: "landmark",
        placeholder: "Enter landmark",
        icon: NearMeIcon,
        required: true,
        actualType: "text"
    },
    {
        type: "select",
        name: "state",
        id: "state",
        placeholder: "Enter state",
        icon: HolidayVillageIcon,
        required: true,
        actualType: "option",
        options: [
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
        type: "text",
        name: "city",
        id: "city",
        placeholder: "Enter city",
        icon: LocationCityIcon,
        required: true,
        actualType: "text"
    },
    {
        type: "text",
        name: "pincode",
        id: "pincode",
        placeholder: "Enter pincode",
        icon: PinIcon,
        required: true,
        actualType: "number"
    },

]
export const editAddressFormData: formType[] = [
    {
        type: "text",
        name: "street",
        id: "street",
        placeholder: "Enter street",
        icon: StreetviewIcon,
        required: false,
        actualType: "text"
    },
    {
        type: "text",
        name: "landmark",
        id: "landmark",
        placeholder: "Enter landmark",
        icon: NearMeIcon,
        required: false,
        actualType: "text"
    },
    {
        type: "select",
        name: "state",
        id: "state",
        placeholder: "Enter state",
        icon: HolidayVillageIcon,
        required: false,
        actualType: "option",
        options: [
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
        type: "text",
        name: "city",
        id: "city",
        placeholder: "Enter city",
        icon: LocationCityIcon,
        required: false,
        actualType: "text"
    },
    {
        type: "text",
        name: "pincode",
        id: "pincode",
        placeholder: "Enter pincode",
        icon: PinIcon,
        required: false,
        actualType: "number"
    },

]
export const passwordChangeFormData: formType[] = [
    {
        type: "password",
        name: "current_password",
        id: "current_password",
        placeholder: "Enter current password",
        icon: StreetviewIcon,
        required: true,
        actualType: "password"
    },
    {
        type: "password",
        name: "password",
        id: "password",
        placeholder: "Enter password",
        icon: StreetviewIcon,
        required: true,
        actualType: "password"
    },
    {
        type: "password",
        name: "confirm_password",
        id: "confirm_password",
        placeholder: "Confirm password",
        icon: StreetviewIcon,
        required: true,
        actualType: "password"
    },
]
export const shopOwnerFormData: formType[] = [
    {
        type: "text",
        name: "panCard",
        id: "panCard",
        placeholder: "Enter pan card number.",
        icon: StreetviewIcon,
        required: true,
        actualType: "pancard"
    },
    {
        type: "text",
        name: "aadhar",
        id: "aadhar",
        placeholder: "Enter aadhar number.",
        icon: StreetviewIcon,
        required: true,
        actualType: "aadhar"
    },
    {
        type: "text",
        name: "bankAccount",
        id: "bankAccount",
        placeholder: "Enter bank accout number.",
        icon: StreetviewIcon,
        required: true,
        actualType: "number"
    },
    {
        type: "text",
        name: "IFSC",
        id: "IFSC",
        placeholder: "Enter IFSC number of bank.",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    },
    {
        type: "text",
        name: "GSTIN",
        id: "GSTIN",
        placeholder: "Enter GSTIN number (optional).",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    },
]
export const editshopOwnerFormData: formType[] = [
    {
        type: "text",
        name: "panCard",
        id: "panCard",
        placeholder: "Enter pan card number.",
        icon: StreetviewIcon,
        required: false,
        actualType: "pancard"
    },
    {
        type: "text",
        name: "aadhar",
        id: "aadhar",
        placeholder: "Enter aadhar number.",
        icon: StreetviewIcon,
        required: false,
        actualType: "aadhar"
    },
    {
        type: "text",
        name: "bankAccount",
        id: "bankAccount",
        placeholder: "Enter bank accout number.",
        icon: StreetviewIcon,
        required: false,
        actualType: "number"
    },
    {
        type: "text",
        name: "IFSC",
        id: "IFSC",
        placeholder: "Enter IFSC number of bank.",
        icon: StreetviewIcon,
        required: false,
        actualType: "text"
    },
    {
        type: "text",
        name: "GSTIN",
        id: "GSTIN",
        placeholder: "Enter GSTIN number (optional).",
        icon: StreetviewIcon,
        required: false,
        actualType: "text"
    },
]
export const addShopFormData: formType[] = [
    {
        type: "text",
        name: "title",
        id: "title",
        placeholder: "Enter name of shop.",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    },
    {
        type: "text",
        name: "desc",
        id: "desc",
        placeholder: "Enter description of shop.",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    },
    {
        type: "text",
        name: "slug",
        id: "slug",
        placeholder: "Enter unique identifier for your shop.",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    }
]
export const editShopFormData: formType[] = [
    {
        type: "text",
        name: "title",
        id: "title",
        placeholder: "Enter name of shop.",
        icon: StreetviewIcon,
        required: false,
        actualType: "text"
    },
    {
        type: "text",
        name: "desc",
        id: "desc",
        placeholder: "Enter description of shop.",
        icon: StreetviewIcon,
        required: false,
        actualType: "text"
    },
    {
        type: "text",
        name: "slug",
        id: "slug",
        placeholder: "Enter unique identifier for your shop.",
        icon: StreetviewIcon,
        required: false,
        editable: false,
        actualType: "text"
    }
]
const userShops = async () => {
    try {
        const shops = await httpservice.get(`${baseUrl}/shop`);
        return shops.data;
    } catch (error) {
        return []
    }
}

export const addProductWithShopFormData: formType[] = [
    {
        type: "select",
        name: "slug",
        id: "slug",
        placeholder: "Select shop slug in which you want to add product.",
        icon: StreetviewIcon,
        required: true,
        actualType: "option",
        options: []
    },
    {
        type: "text",
        name: "title",
        id: "title",
        placeholder: "Enter name of product.",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    },
    {
        type: "text",
        name: "desc",
        id: "desc",
        placeholder: "Enter description of product.",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    },
    {
        type: "text",
        name: "price",
        id: "price",
        placeholder: "Enter price of product.",
        icon: StreetviewIcon,
        required: true,
        actualType: "number"
    },
    {
        type: "select",
        name: "type",
        id: "type",
        placeholder: "Enter type of product (Veg, Non-Veg).",
        icon: StreetviewIcon,
        required: true,
        options: ["Veg", "Non_Veg"],
        actualType: "option"
    }
]
export const addProductFormData: formType[] = [
    {
        type: "text",
        name: "title",
        id: "title",
        placeholder: "Enter name of product.",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    },
    {
        type: "text",
        name: "desc",
        id: "desc",
        placeholder: "Enter description of product.",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    },
    {
        type: "text",
        name: "price",
        id: "price",
        placeholder: "Enter price of product.",
        icon: StreetviewIcon,
        required: true,
        actualType: "number"
    },
    {
        type: "select",
        name: "type",
        id: "type",
        placeholder: "Enter type of product (Veg, Non-Veg).",
        icon: StreetviewIcon,
        required: true,
        options: ["Veg", "Non_Veg"],
        actualType: "option"
    }
]
export const editProductFormData: formType[] = [
    {
        type: "text",
        name: "title",
        id: "title",
        placeholder: "Enter name of product.",
        icon: StreetviewIcon,
        required: false,
        actualType: "text"
    },
    {
        type: "text",
        name: "desc",
        id: "desc",
        placeholder: "Enter description of product.",
        icon: StreetviewIcon,
        required: false,
        actualType: "text"
    },
    {
        type: "text",
        name: "price",
        id: "price",
        placeholder: "Enter price of product.",
        icon: StreetviewIcon,
        required: false,
        actualType: "number"
    },
    {
        type: "select",
        name: "type",
        id: "type",
        placeholder: "Enter type of product (Veg, Non-Veg).",
        icon: StreetviewIcon,
        required: false,
        options: ["Veg", "Non_Veg"],
        actualType: "option"
    }
]
export const contactForm: formType[] = [
    {
        type: "text",
        name: "subject",
        id: "subject",
        placeholder: "Enter subject.",
        icon: StreetviewIcon,
        required: false,
        actualType: "text"
    },
    {
        type: "text",
        name: "message",
        id: "message",
        placeholder: "Enter message",
        icon: StreetviewIcon,
        required: false,
        actualType: "text"
    },
    {
        type: "select",
        name: "shopId",
        id: "shopId",
        placeholder: "Select shop if querry is related to particular shop (optional)",
        icon: StreetviewIcon,
        required: false,
        actualType: "option"
    }
]
export const unVerifyForm: formType[] = [
    {
        type: "text",
        name: "notVerified",
        id: "notVerified",
        placeholder: "Enter reason to not verify.",
        icon: StreetviewIcon,
        required: false,
        actualType: "text"
    }
]

export const editUserForm: formType[] = [
    {
        type: "text",
        name: "name",
        id: "name",
        placeholder: "Enter your name.",
        icon: StreetviewIcon,
        required: false,
        actualType: "text"
    },
    {
        type: "text",
        name: "email",
        id: "email",
        placeholder: "Enter your email.",
        icon: StreetviewIcon,
        required: false,
        actualType: "email"
    },
    {
        type: "text",
        name: "phone",
        id: "phone",
        placeholder: "Enter your phone.",
        icon: StreetviewIcon,
        required: false,
        actualType: "phone"
    },
]
export const logInFormData: formType[] = [
    {
        type: "text",
        name: "userName",
        id: "userName",
        placeholder: "Enter your user name.",
        icon: StreetviewIcon,
        required: false,
        actualType: "userName"
    },
    {
        type: "text",
        name: "email",
        id: "email",
        placeholder: "Enter your email.",
        icon: StreetviewIcon,
        required: false,
        actualType: "email"
    },
    {
        type: "text",
        name: "phone",
        id: "phone",
        placeholder: "Enter your phone.",
        icon: StreetviewIcon,
        required: false,
        actualType: "phone"
    },
    {
        type: "password",
        name: "password",
        id: "password",
        placeholder: "Enter your password.",
        icon: StreetviewIcon,
        required: true,
        actualType: "password"
    },
]
export const signupFormData: formType[] = [
    {
        type: "text",
        name: "userName",
        id: "userName",
        placeholder: "Enter your user name.",
        icon: StreetviewIcon,
        required: true,
        actualType: "userName"
    },
    {
        type: "text",
        name: "name",
        id: "name",
        placeholder: "Enter your name.",
        icon: StreetviewIcon,
        required: true,
        actualType: "rexr"
    },
    {
        type: "text",
        name: "email",
        id: "email",
        placeholder: "Enter your email.",
        icon: StreetviewIcon,
        required: false,
        actualType: "email"
    },
    {
        type: "text",
        name: "phone",
        id: "phone",
        placeholder: "Enter your phone.",
        icon: StreetviewIcon,
        required: false,
        actualType: "phone"
    },
    {
        type: "password",
        name: "password",
        id: "password",
        placeholder: "Enter your password.",
        icon: StreetviewIcon,
        required: true,
        actualType: "password"
    },
]
export const notificationFormData: formType[] = [
    {
        type: "text",
        name: "title",
        id: "title",
        placeholder: "Enter your title of notification.",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    },
    {
        type: "text",
        name: "text",
        id: "text",
        placeholder: "Enter message of notification.",
        icon: StreetviewIcon,
        required: true,
        actualType: "rexr"
    },
    {
        type: "text",
        name: "name",
        id: "name",
        placeholder: "Enter name of notification (optional).",
        icon: StreetviewIcon,
        required: false,
        actualType: "phone"
    },
    {
        type: "select",
        name: "role",
        id: "role",
        placeholder: "Select role of reciever.",
        icon: StreetviewIcon,
        required: false,
        actualType: "option",
        options: ["All", "User", "ShopOwner", "Admin"]
    },
    {
        type: "select",
        name: "recievers",
        id: "recievers",
        placeholder: "Select recievers of notficattion.",
        icon: StreetviewIcon,
        required: true,
        actualType: "option",
        options: ["All"]
    },
]
export const statusForm: formType[] = [
    {
        type: "select",
        name: "status",
        id: "status",
        placeholder: "Update status.",
        icon: StreetviewIcon,
        required: true,
        actualType: "option",
        options: ["Processing",
            "Accepted",
            "Cooking",
            "Prepared",
            "Out",
            "Delievered",
            "Completed",
            "Cancelled",
            "Failed"],
    },
]
export const reviewForm: formType[] = [
    {
        type: "number",
        name: "rating",
        id: "rating",
        placeholder: "Select rating",
        icon: StreetviewIcon,
        required: true,
        actualType: "rating",
    },
    {
        type: "text",
        name: "comment",
        id: "comment",
        placeholder: "Enter comment.",
        icon: StreetviewIcon,
        required: true,
        actualType: "comment",
    }
]


export const predictFoodFormData:formType[]=[
    {
        type: "select",
        name: "meal_type",
        id: "meal_type",
        placeholder: "Select your meal type. *",
        icon: StreetviewIcon,
        required: true,
        actualType: "option",
        options:["Breakfast","Lunch","Dinner","Snacks","Dessert","Beverages","Others" ]
    },
    {
        type: "select",
        name: "dietary_preference",
        id: "dietary_preference",
        placeholder: "Select your dietary preference. *",
        icon: StreetviewIcon,
        required: true,
        actualType: "option",
        options:["Veg","Non-Veg","Vegan","Gluten Free","Dairy Free","Keto","Paleo","Low-Carb","Low-Fat","Balanced","High-Protein","Low-Sodium","Low-Sugar","Organic","Raw","Halal","Kosher","Pescetarian"]
    },
    {
        type: "select",
        name: "cusiene_preference",
        id: "cusiene_preference",
        placeholder: "Select your cusiene preference. *",
        icon: StreetviewIcon,
        required: true,
        actualType: "option",
        options:["Indian","Chinese","Italian","Mexican","Thai","Japanese","American","French","Spanish"]
    },
    {
        type: "select",
        name: "taste_preference",
        id: "taste_preference",
        placeholder: "Select your taste preference. *",
        icon: StreetviewIcon,
        required: true,
        actualType: "option",
        options:["spicy", "sweet", "savory" ]
    },
    {
        type: "text",
        name: "allergies",
        id: "allergies",
        placeholder: "Enter your allergies",
        icon: StreetviewIcon,
        required: false,
        actualType: "textWithComma",
    },
    {
        type: "text",
        name: "budget",
        id: "budget",
        placeholder: "Enter amount of money you want to spend",
        icon: StreetviewIcon,
        required: false,
        actualType: "number",
    },
    {
        type: "select",
        name: "health_goals",
        id: "health_goals",
        placeholder: "Select your health goals",
        icon: StreetviewIcon,
        required: false,
        actualType: "option",
        options:["Weight Loss","Weight Gain","Muscle Gain","Maintainance","Immunity","Sports Nutrition","Kids Nutrition","Senior Nutrition"]
    },
    {
        type: "select",
        name: "food_avoid",
        id: "food_avoid",
        placeholder: "Select food you want to avoid",
        icon: StreetviewIcon,
        required: false,
        actualType: "option",
        options:["Sugar","Salt","Oil","Spices","Gluten","Dairy","Nuts","Seafood","Eggs","Meat","Poultry","Soy","Processed Food","Junk Food","Fast Food","Alcohol","Caffeine","Carbonated Drinks"]
    }

]
export const predictFoodRecipieFormData:formType[]=[
    {
        type: "select",
        name: "meal_type",
        id: "meal_type",
        placeholder: "Select your meal type. *",
        icon: StreetviewIcon,
        required: true,
        actualType: "option",
        options:["Breakfast","Lunch","Dinner","Snacks","Dessert","Beverages","Others" ]
    },
    {
        type: "select",
        name: "dietary_preference",
        id: "dietary_preference",
        placeholder: "Select your dietary preference. *",
        icon: StreetviewIcon,
        required: true,
        actualType: "option",
        options:["Veg","Non-Veg","Vegan","Gluten Free","Dairy Free","Keto","Paleo","Low-Carb","Low-Fat","Balanced","High-Protein","Low-Sodium","Low-Sugar","Organic","Raw","Halal","Kosher","Pescetarian"]
    },
    {
        type: "select",
        name: "cusiene_preference",
        id: "cusiene_preference",
        placeholder: "Select your cusiene preference. *",
        icon: StreetviewIcon,
        required: true,
        actualType: "option",
        options:["Indian","Chinese","Italian","Mexican","Thai","Japanese","American","French","Spanish"]
    },
    {
        type: "select",
        name: "taste_preference",
        id: "taste_preference",
        placeholder: "Select your taste preference. *",
        icon: StreetviewIcon,
        required: true,
        actualType: "option",
        options:["spicy", "sweet", "savory" ]
    },
    {
        type: "text",
        name: "ingredients_availability",
        id: "ingredients_availability",
        placeholder: "Enter availability of ingredients.",
        icon: StreetviewIcon,
        required: false,
        actualType: "textWithComma",
    },
    {
        type: "select",
        name: "cooking_skills",
        id: "cooking_skills",
        placeholder: "Select cooking skills *",
        icon: StreetviewIcon,
        required: false,
        actualType: "option",
        options:["Beginner","Intermediate","Advanced","Expert","Chef"]
    },
    {
        type: "text",
        name: "allergies",
        id: "allergies",
        placeholder: "Enter your allergies *",
        icon: StreetviewIcon,
        required: false,
        actualType: "textWithComma",
    },
    {
        type: "text",
        name: "budget",
        id: "budget",
        placeholder: "Enter amount of money you want to spend *",
        icon: StreetviewIcon,
        required: false,
        actualType: "number",
    },
    {
        type: "text",
        name: "time",
        id: "time",
        placeholder: "Enter time you want to spent*",
        icon: StreetviewIcon,
        required: false,
        actualType: "text",
    },
    {
        type: "select",
        name: "health_goals",
        id: "health_goals",
        placeholder: "Select your health goals *",
        icon: StreetviewIcon,
        required: false,
        actualType: "option",
        options:["Weight Loss","Weight Gain","Muscle Gain","Maintainance","Immunity","Sports Nutrition","Kids Nutrition","Senior Nutrition"]
    },
    {
        type: "select",
        name: "food_avoid",
        id: "food_avoid",
        placeholder: "Select food you want to avoid",
        icon: StreetviewIcon,
        required: false,
        actualType: "option",
        options:["Sugar","Salt","Oil","Spices","Gluten","Dairy","Nuts","Seafood","Eggs","Meat","Poultry","Soy","Processed Food","Junk Food","Fast Food","Alcohol","Caffeine","Carbonated Drinks"]
    },
    {
        type:"text",
        name:"extra_requirements",
        id:"extra_requirements",
        placeholder:"Enter any extra requirements",
        icon:StreetviewIcon,
        required:false,
        actualType:"textWithComma"
    }
]

export const offerFormData:formType[]=[
    {
        type: "text",
        name: "title",
        id: "title",
        placeholder: "Enter title of offer.",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    },
    {
        type: "text",
        name: "desc",
        id: "desc",
        placeholder: "Enter description of offer.",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    },
    {
        type: "select",
        name: "shopId",
        id: "shopId",
        placeholder: "Select shop for offer.",
        icon: StreetviewIcon,
        required: true,
        actualType: "options"
    },
    {
        type: "select",
        name: "productId",
        id: "productId",
        placeholder: "Select item for offer.",
        icon: StreetviewIcon,
        required: true,
        actualType: "options"
    },
    {
        type: "select",
        name: "discountedOption",
        id: "discountedOption",
        placeholder: "Select option of discount",
        icon: StreetviewIcon,
        required: true,
        actualType: "options"
    },
    {
        type: "text",
        name: "discountedPrice",
        id: "discountedPrice",
        placeholder: "Enter discounted price",
        icon: StreetviewIcon,
        required: false,
        actualType: "number"
    },
    {
        type: "text",
        name: "discountedOption",
        id: "discountedOption",
        placeholder: "Enter discounted percentage",
        icon: StreetviewIcon,
        required: false,
        actualType: "number"
    },

    {
        type: "text",
        name: "time",
        id: "time",
        placeholder: "Enter validity of offer.",
        icon: StreetviewIcon,
        required: true,
        actualType: "text"
    },
]