import { ShopStatus } from "@prisma/client"

export type shopType={
    title:string,
    desc:string,
    img:string,
    address:string,
    slug:string
}
export type updateShopType={
    title?:string,
    desc?:string,
    img?:string,
    address?:string,
    status?:ShopStatus,
    verified?:boolean,
    notVerified?:string
}