import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../utils/action";
import { prisma } from "@/utils/connect";
import bcrypt from "bcryptjs";

export const PUT=async(req:NextRequest)=>{
try {
    // console.log(await req.json())
    const {current_password,password,confirm_password}:{current_password:string,password:string,confirm_password:string}=await req.json();
    const user=await getUserDetails(req);
    if(user===null){
        return NextResponse.json({
            error:true,
            message:"Login first to change password",
            status:403
        },{status:403})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userPassword=user.password;
    const isCorrect= await bcrypt.compare(current_password,userPassword!);
    if(!isCorrect){
        return NextResponse.json({
            error:true,
            message:"Current password provided is wrong.",
            status:403
        },{status:403})
    }
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
    },{status:200})
} catch (error) {
    console.log(error)
    return NextResponse.json({
        error:true,
        message:"Something went wrong",
        status:500
    })
}
}