"use server"

import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../utils/action";
import { prisma } from "@/utils/connect";
import bcrypt from "bcryptjs";


export const verifyEmail=async()=>{

}

export const verifyPhone=async()=>{
    
}

export const PUT=async(req:NextRequest)=>{
    try {
        // let {name,email,phone,image}:updateForm=await req.json();
        var {name,phone,email,image}:updateForm=await req.json();
        const user=await getUserDetails(req);
        if(user==null){
            return NextResponse.json({
                error:true,
                message:"User not found",
                status:404
            })
        }

        const updatedUser=await prisma.user.update({
            where:{
                id:user.id
            },
            data:{
                name,phone,email,image
            }
        })
        return NextResponse.json({
            error:true,
            message:"User updated successfully",
            status:200,
            updatedUser
        })
    } catch (error) {
        return NextResponse.json({
            error:true,
            message:"Something went wrong",
            status:404
        })
    }
    }

export const deleteUser=async()=>{

}