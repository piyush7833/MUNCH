export type resDataType = {
  error: boolean;
  message: string;
  status: number;
  data: any
}




export type OrderType = {
  id: string;
  userEmail: string;
  shopperEmail: string;
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
  shopId?: string;
};

export type OrderProductType = {
  id: string;
  title: string;
  img?: string;
  price: number;
  quantity: number;
  shopName?: string;
  optionTitle?: string;
};

export type ProductsType = ProductType[];

export type CartType = {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
  shopId: string;
};




export type ActionTypes = {
  addToCart: (item: CartItemType) => void,
  removeFromCart: (item: CartItemType) => void,
  removeAllFromcart: () => void
}
export type userActionTypes = {
  logIn: (user: fullUserType) => void,
  logOut: (user: null) => void
}

export type fullUserType = {
  name: string | null,
  userName: string | null,
  email?: string | null,
  phone?: string | null,
  role: string | null,
  id: string | null,
  address: addressType,
  emailVerified: Date | null,
  phoneVerified: Date | null,
  activeSession: boolean,
  image: string | null,
  ShopOwner?: JSON | null
}
export type responseUserType = {
  name: string | null,
  userName: string | null,
  createdAt: string | null,
  email?: string | null,
  phone?: string | null,
  role: string | null,
  id: string | null,
  address: addressType,
  emailVerified: Date | null,
  phoneVerified: Date | null,
  activeSession: boolean,
  image: string | null,
  shopOwner?: responseShopOwnerType[] | null
  shops?: ResponseShopType[]
}
export type editUserType = {
  name?: string | null,
  email?: string | null,
  phone?: string | null,
}

export type addressType = {
  pincode?: number,
  street?: string,
  landmark?: string,
  city?: string,
  state?: string
}
export type passwordChangeType = {
  password: string,
  current_password: string,
  confirm_password: string
}
export type shopOwnerType = {
  panCard?: string,
  bankAccount?: string,
  GSTIN?: string,
  aadhar?: string,
  IFSC?: string,
}
export type responseShopOwnerType = {
  panCard: string,
  bankAccount: string,
  GSTIN?: string,
  aadhar: string,
  IFSC: string,
  id: string,
  createdAt: Date,
  verified: Date | null,
  notVerified: string | null,
  user?: JSON
  userId: string
}

export type shopType = {
  slug: string,
  title: string,
  desc: string,
}

export type ResponseShopType = {
  id: string;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  address: string;
  createdAt: string;
  status: string;
  user: JSON;
  verified: Date | null;
  notVerified: string | null;
}[];
export type ProductType = {
  type: string;
  id: string;
  title: string;
  desc?: string;
  img?: string;
  rating?: number;
  review?: { userName: string, comment: string }[];
  price: number;
  options?: productOptionType[];
  shopId: string;
};

export type productOptionType = {
  title: string | null,
  additionalPrice: number | null
}

export type ContactType = {
  subject: string;
  message: string;
  shopId?: string;
};
export type ContactResponseType = {
  subject: string;
  message: string;
  shopId?: string;
  userId?: string;
  id: string;
  img: string;
  createdAt: Date;
  user?: JSON;
  shop?: JSON;
};

export type NotificationType = {
  title: string;
  text: string;
  name?: string;
  role?: string;
  recievers?: string[];
  link?: string;
};

export type OrderResponseType = {
  id: string;
  createdAt: string;
  totalPrice: string;
  couponPrice: string;
  taxes: string;
  delieveryFee: string;
  platformFee: string;
  paymentId: string;
  status: string;
  userId: string;
  shopId: string;
  user: JSON;
  shop: JSON;
  address ?: null | addressType; // Assuming address can be null or any other type
  payMode: string;
  softDelete: boolean;
  products :JSON[]
}