// "use server"

import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../utils/action";
import { prisma } from "@/utils/connect";
import { cookies } from 'next/headers'

export const verifyEmail=async()=>{

}

export const verifyPhone=async()=>{
    
}

export const PUT=async(req:NextRequest)=>{
    try {
        // let {name,email,phone,image}:updateForm=await req.json();
        var {name,phone,email,image,address}:updateForm=await req.json();
        const user=await getUserDetails(req);
        if(user==null){
            return NextResponse.json({
                error:true,
                message:"Login first to update user",
                status:403
            }, { status: 403 })
        }

        const updatedUser=await prisma.user.update({
            where:{
                id:user.id
            },
            data:{
                name,phone,email,image,address
            }
        })
        return NextResponse.json({
            error:true,
            message:"User updated successfully",
            status:200,
            updatedUser
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error:true,
            message:"Something went wrong",
            status:404
        }, { status: 404 })
    }
}

export const GET=async(req:NextRequest)=>{
    try {
        const user=await getUserDetails(req);
        if(user==null){
            return NextResponse.json({
                error:true,
                message:"Login to view your profile.",
                status:403
            }, { status: 403 })
        }
        cookies().delete('name');
        return NextResponse.json({
            error:true,
            message:"User found successfully",
            status:200,
            user
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error:true,
            message:"Something went wrong",
            status:404
        }, { status: 404 })
    }
}
export const DELETE=async(req:NextRequest)=>{
    try {
        const user=await getUserDetails(req);
        if(user==null){
            return NextResponse.json({
                error:true,
                message:"Login first to delete user",
                status:403
            }, { status: 403 })
        }

        await prisma.user.update({
            where:{
                id:user.id
            },
            data:{
                softDelete:true
            }
        })
        return NextResponse.json({
            error:true,
            message:"User deleted successfully",
            status:200,
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error:true,
            message:"Something went wrong",
            status:404
        }, { status: 404 })
    }
    }

