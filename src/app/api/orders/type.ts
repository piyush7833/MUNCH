import { PayMode } from "@prisma/client";

export type OrderType ={
    totalPrice: number,
    productDetails:ProductDetails[],
    couponPrice: number,
    taxes: number,
    delieveryFee: number,
    platformFee: number,
    shopId: string,
    address: string,
    payMode: PayMode,
  }
export type ProductDetails={
    productId: string,
    price: number,
    option: string,
    quantity: number,
    orderId: string,
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
    productId: string,
    price: number,
    option: string,
    quantity: number,
    orderId: string,
  }  