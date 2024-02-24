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
    paymentId: string,
  }
export type ProductDetails={
    id: string,
    price: number,
    option: string,
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
    option: string,
    quantity: number,
    orderId: string,
  }  