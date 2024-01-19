export type resDataType={
  error:boolean;
  message:string;
  status:number;
  data:any
}

export type MenuType = {
    id: number;
    slug: string;
    title: string;
    desc?: string;
    img?: string;
    color: string;
  }[];

  export type ProductType = {
    id: number;
    title: string;
    desc?: string;
    img?: string;
    rating?: number;
    review?: {userName:string,comment:string}[];
    price: number;
    options?: { title: string; additionalPrice: number }[];
  };
  export type OrderType = {
    id: string;
    userEmail: string;
    shopperEmail:string;
    price: number;
    // customerName:string
    products: CartItemType[];
    status: string;
    createdAt: Date;
    intent_id?: String;
  };
  export type CartItemType = {
    id: string;
    title: string;
    img?: string;
    price: number;
    optionTitle?: string;
    quantity: number;
  };
  
  export type OrderProductType = {
    id:string;
    title: string;
    img?: string;
    price: number;
    quantity:number;
    shopName?:string;
    optionTitle?: string;
  };

  export type ProductsType = ProductType[];

  export type CartType = {
    products: CartItemType[];
    totalItems: number;
    totalPrice: number;
  };
  

export type ActionTypes={
  addToCart:(item:CartItemType)=>void,
  removeFromCart:(item:CartItemType)=>void
}
export type userActionTypes={
  logIn:(user:userType)=>void,
  logOut:(user:null)=>void
}

export type userType={
  name:string | null,
  userName:string | null,
  email?:string| null,
  phone?:string| null,
  role:string| null,
  id:string| null,
}
export type fullUserType={
  name:string | null,
  userName:string | null,
  email?:string| null,
  phone?:string| null,
  role:string| null,
  id:string| null,
  address:object | null,
  emailVerified:Date | null,
  phoneVerified:Date | null,
  activeSession:boolean,
  image:boolean,
}

