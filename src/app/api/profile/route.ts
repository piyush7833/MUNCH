import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";


//get all orders
export const GET=async(req:NextRequest)=>{
    const session=await getAuthSession()
    console.log("session ",session)
    if(session!=null){
    try {
            const user=await prisma.user.findUnique({where:{
                email:session.user.email!
            }})
            return new NextResponse(JSON.stringify(user),{status:200})

    } catch (err) {
        console.log("err"+err)
        return new NextResponse(JSON.stringify({
            message:"something went wrong",
        }),{status:500})
    }
}else{
    return new NextResponse(JSON.stringify({
        message:"Login to see profile",
    }),{status:401})
}
}