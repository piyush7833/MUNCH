import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import nodemailer, { createTransport } from 'nodemailer';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { cookies, headers } from 'next/headers';
import crypto from 'crypto'
// import { error } from "console";
import firebase from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getMessaging, getToken } from "firebase/messaging";
import 'firebase/auth';
import app from './firebase'
import admin from 'firebase-admin';
import axios from "axios";
dotenv.config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.USER,
  },
});

export const sendEmail = async (email: string, subject: string, htmlContent: any) => {
  try {
    // console.log("2")
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
    return NextResponse.json({
      error: false,
      message: "Email sent to your registered mail",
      status: 200
    }, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({
      error: true,
      message: "Something went wrong",
      status: 500
    }, { status: 500 })
  }
}

export const genrateToken = async (id: string, type: any) => {
  try {
    const token = await prisma.verificationToken.create({
      data: {
        userId: id,
        token: crypto.randomBytes(32).toString("hex"),
        type: type// Add the missing 'type' property here
      }
    })
    return token;
  } catch (error) {
    return null;
  }
}
export const sendMessage = async (phoneNumber: string) => {
};

export const getUserDetails = async (req: any) => {
  try {
    const token = req.cookies.get("token")?.value || '';
    const token2 = req?.headers?.authorization
    console.log(token2)
    // console.log(token)
    if (!token) {
      return null;
    }
    const decodedToken: any = jwt.verify(token!, process.env.JWT!);
    decodedToken.id;
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
        softDelete: false
      }
    })
    if (user) {
      return user;
    }
    else {
      return null
    }
  } catch (error: any) {
    console.log(error)
    return null;
  }
};

export const getUserId=async(token:string)=>{
  try{
    const decodedToken: any = jwt.verify(token, process.env.JWT!);
    return decodedToken.id;
  }catch(error){
    console.log(error)
    return null;
  }
}


