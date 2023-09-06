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
    price: number;
    options?: { title: string; additionalPrice: number }[];
  };
  export type OrderType = {
    id: string;
    userEmail: string;
    shopperEmail:string;
    price: number;
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
    title: string;
    img?: string;
    price: number;
    quantity:number;
    options?: { title: string; additionalPrice: number }[];
  };

  export type ProductsType = ProductType[];