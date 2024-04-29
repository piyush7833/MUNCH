import { PayMode } from "@prisma/client"

export type PaymentType ={
    order_id:string,
    razorpay_order_id?:string,
    razorpay_payment_id?:string,
    razorpay_signature?:string,
    payMode:PayMode
}
export type ProductDetails={
    productId: string,
    price: number,
    option: string,
    quantity: number,
}

export type newPaymentType={
    name: string,
    amount: number,
    payMode: PayMode
}
