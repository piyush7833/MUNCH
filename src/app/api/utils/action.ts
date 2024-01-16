// "use server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';
import { headers } from 'next/headers'
dotenv.config();

export const sendEmail = async (
  email: string,
  subject: string,
  htmlContent: any
) => {
  try {
    const transporter = createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: htmlContent,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

export const sendMessage = async () => {};

export const getUserDetails = async (req:any) => {
  try {
    const headersList = headers()
    const token = headersList.get('authorization')
    console.log(token)
    const cookieStore = cookies()
    // const token = cookieStore.get('token')?.value || "";
    // let token = req?.headers;
    // console.log(token)
    if(!token){
      return null;
    }
    const decodedToken: any = jwt.verify(token!, process.env.JWT!);
    decodedToken.id;
    const user=await prisma.user.findUnique({
      where:{
        id:decodedToken.id,
        softDelete:false
      }
    })
    if(user){
      return user;
    }
    else{
      return null
    }
  } catch (error: any) {
    console.log(error)
    return null;
  }
};
