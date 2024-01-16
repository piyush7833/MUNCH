import { Decimal } from "@prisma/client/runtime/library"

export type addReview={
    userId:string,
    productId:string,
    orderId:string,
    rating:Decimal,
    comment:string
}
export type updateReview={
    reviewId:string,
    rating:Decimal,
    comment?:string
}