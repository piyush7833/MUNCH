import { NextRequest, NextResponse } from "next/server";
import { genrateToken, getUserDetails, sendEmail } from "../utils/action";
import emailTemplate from "../utils/emailTemplate";

export const POST=async(req:NextRequest)=>{  //email verification
    try {
        // console.log("1")
        const user=await getUserDetails(req);
        if(!user){
            return NextResponse.json({
                error: true,
                message: "Login to verify email",
                status: 403
              }, { status: 403 })
        }
        const token=await genrateToken(user.id,"email");
        const url=`${process.env.BASE_URL}users/${user.id}/verify/${token?.token}`
        const mailResponse=await sendEmail(user.email!,"Verify your email for MUNCH",emailTemplate(url, "Verify Your Email Address",user.name,"Welcome to MUNCH! To get started, please click the button below to verify your email address","Verify Email","If you didn't sign up for MUNCH, you can safely ignore this email."))
        return mailResponse;
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: true,
            message: "Email sent to your registered mail",
            status: 500
          }, { status: 500 })
    }
}