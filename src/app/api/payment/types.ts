import { PayMode } from "@prisma/client"

export type PaymentType ={
    razorpay_order_id:string,
    razorpay_payment_id:string,
    razorpay_signature:string
}
export type ProductDetails={
    productId: string,
    price: number,
    option: string,
    quantity: number,
}