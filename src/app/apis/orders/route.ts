import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";


//get all orders
export const GET=async(req:NextRequest)=>{
    const session=await getAuthSession()
    if(session){
    try {
        if(session.user.isShopOwner){
            const orders=await prisma.order.findMany({where:{
                shopId:session.user.id!
            }})
            return new NextResponse(JSON.stringify(orders),{status:200})
        }
        else {
            const orders=await prisma.order.findMany({where:{
                userId:session.user.id!
            }})
            return new NextResponse(JSON.stringify(orders),{status:200})
        }
    } catch (err) {
        console.log("err"+err)
        return new NextResponse(JSON.stringify({
            message:"something went wrong",
        }),{status:500})
    }
}else{
    return new NextResponse(JSON.stringify({
        message:"Login to see orders",
    }),{status:401})
}
}