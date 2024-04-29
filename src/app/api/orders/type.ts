import { PayMode } from "@prisma/client";

export type OrderType ={
    userId: string,
    totalPrice: number,
    productDetails:ProductDetails[],
    couponPrice: number,
    taxes: number,
    delieveryFee: number,
    platformFee: number,
    shopId: string,
    address: string,
    payMode: PayMode,
    dineType: "Dine_In" | "Take_Away" | "Delivery",
    paymentId: string,
  }
export type ProductDetails={
    id: string,
    price: number,
    optionTitle: string,
    quantity: number,
}
export type OrderProduct= {
    id: string,
    productId: string,
    price: number,
    quantity:number,
    option:string,
    orderId: string,
  } 
export type CreateOrderProductInput ={
    id: string,
    price: number,
    optionTitle: string,
    quantity: number,
    orderId: string,
  }  