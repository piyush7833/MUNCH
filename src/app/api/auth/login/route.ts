// "use server"
import { NextRequest, NextResponse } from "next/server";
import { signinType } from "../types";
import { prisma } from "@/utils/connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { cookies } from 'next/headers'
import { headers } from 'next/headers'
dotenv.config();
export const POST=async(req:NextRequest)=>{
    const { userName,email,phone, password }:signinType = await req.json();
    // console.log("object")
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { userName },
                    { email },
                    { phone },
                ],
            },
        });
        // console.log(user)
        if(!user){
            return NextResponse.json({
                error:false,
                status:404,
                message:"User not found."
            }, { status: 404 })
        }
        const isCorrect = await bcrypt.compare(password, user.password!);
        if(!isCorrect){
            return NextResponse.json({
                error:false,
                status:403,
                message:"Incorrect password"
            }, { status: 403 })
        }
        var token = jwt.sign({ id: user.id }, process.env.JWT!);
        cookies().set('token', token);
        cookies().set({
            name: 'role',
            value: user.role,
            // httpOnly: true,
          })
        await prisma.user.update({
            where:{
                id:user.id
            },
            data:{
                activeSession:true
            }
        })
        return NextResponse.json({
            error:false,
            status:200,
            message:"User logged in successfully",
            token,
            user
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