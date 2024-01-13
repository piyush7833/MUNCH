"use server"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerType, signinType } from "../types";


export const POST=async(req:NextRequest, res:NextResponse)=>{
    const { name,userName,password,email,phone,image}:registerType =await req.json();
    try {
        const user=await prisma.user.findUnique({
            where:{
                userName
            }
        })
        if(user){
            return NextResponse.json({
                error:true,
                status:403,
                message:"User already exist"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({
            data:{
                name,
                userName,
                email,
                phone,
                image,
                password:hashedPassword
            }
        })
        var token = jwt.sign({ id: newUser.id }, process.env.JWT!);
        return NextResponse.json({
            error:false,
            status:200,
            message:"User created successfully",
            newUser
        }).cookies.set("token",token,{
            httpOnly:true
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error:true,
            status:500,
            message:"Something went wrong"
        })
    }
}

