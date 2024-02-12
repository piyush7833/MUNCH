import { ProductType } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"

export type productType={
    id?:string,
    title:string,
    desc:string,
    img:string,
    price:Decimal,
    options:optionType[],
    slug?:string,
    type:ProductType,
    status?:string
}
export type productEditAdminType={
    title:string,
    desc:string,
    img:string,
    price:Decimal,
    options:optionType[],
    productId:string,
    type:ProductType
}
export type productEditType={
    title:string,
    desc:string,
    img:string,
    price:Decimal,
    options:optionType[],
    type:ProductType
}

type optionType={
    title:string,
    additionalPrice:Decimal
}

