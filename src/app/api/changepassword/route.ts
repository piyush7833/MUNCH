import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../utils/action";
import { prisma } from "@/utils/connect";
import bcrypt from "bcryptjs";

export const PUT=async(req:NextRequest)=>{
try {
    const {password}:{password:string}=await req.json();
    const user=await getUserDetails(req);
    if(user==null){
        return NextResponse.json({
            error:true,
            message:"User not found",
            status:404
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedUser=await prisma.user.update({
        where:{
            id:user.id
        },
        data:{
            password:hashedPassword
        }
    })
    return NextResponse.json({
        error:true,
        message:"User password updated successfully",
        status:200
    })
} catch (error) {
    return NextResponse.json({
        error:true,
        message:"Something went wrong",
        status:404
    })
}
}