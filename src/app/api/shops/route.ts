import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const GET=async()=>{
    try {
        const shop=await prisma.shop.findMany();
        return new NextResponse(JSON.stringify(shop),{status:200})
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({
            message:"something went wrong",
        }),{status:500})
    }
}