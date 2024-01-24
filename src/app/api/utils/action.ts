// "use server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import nodemailer, { createTransport } from 'nodemailer';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';
import crypto from 'crypto'
import { error } from "console";
import firebase from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getMessaging, getToken } from "firebase/messaging";

import 'firebase/auth';
import app from './firebase'
dotenv.config();

const auth = getAuth(app);
// const messaging = getMessaging(app);

// getToken(messaging, {vapidKey: "BOeFzYK5Z2sjxRK8NkVR4NZv_RAz4-HdcKSi2PiPpfrB7Y8MA5euE9JtMbz4sIaiY_W64RLx5RLMHroothJlBxA"});

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
  } catch {
    console.log(error)
    return NextResponse.json({
      error: true,
      message: "Something went wrong",
      status: 500
    }, { status: 500 })
  }
}

export const genrateToken = async (id: string) => {
  try {
    const token = await prisma.verificationToken.create({
      data: {
        userId: id,
        token: crypto.randomBytes(32).toString("hex")
      }
    })
    return token;
  } catch (error) {
    return null;
  }
}
export const sendMessage = async (phoneNumber:string) => {
};

export const getUserDetails = async (req: any) => {
  try {
    const token = req.cookies.get("token")?.value || '';
    const cookieStore = cookies()

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


export const sendNotifications=async()=>{

}
