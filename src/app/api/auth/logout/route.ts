// "use server"
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import dotenv from "dotenv"
import { cookies } from 'next/headers'
import { getUserDetails } from "../../utils/action";
dotenv.config();
export const POST=async(req:NextRequest)=>{
    try {
        const user = await getUserDetails(req)
        if(!user){
            return NextResponse.json({
                error:false,
                status:404,
                message:"User not found."
            }, { status: 404 })
        }
        cookies().delete('token');
        await prisma.user.update({
            where:{
                id:user.id
            },
            data:{
                activeSession:false
            }
        })
        cookies().delete('token')
        return NextResponse.json({
            error:false,
            status:200,
            message:"User logged out successfully",
        }, { status: 200 });
    } catch (error) {   
        console.log(error)
        return NextResponse.json({
            error:true,
            status:500,
            message:"Something went wrong"
        }, { status: 500 })
    }
}