"use server"
import { NextRequest, NextResponse } from "next/server";
import { signinType } from "../types";
import { prisma } from "@/utils/connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
export const POST=async(req:NextRequest,res:NextResponse)=>{
    const { userName, password }:signinType = await res.json();
    try {
        const user=await prisma.user.findUnique({
            where:{
                userName
            }
        })
        if(!user){
            return NextResponse.json({
                error:false,
                status:404,
                message:"User not found."
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password!);
        if(!isCorrect){
            return NextResponse.json({
                error:false,
                status:403,
                message:"Incorrect password"
            })
        }
        var token = jwt.sign({ id: user.id }, process.env.JWT!);
        return NextResponse.json({
            error:false,
            status:200,
            message:"User logged in successfully",
            token,
            user
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