import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../utils/action";
import { prisma } from "@/utils/connect";
import crypto from "crypto";
import Razorpay from "razorpay";
import { PaymentType } from "./types";

var razorpay= new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
  })
export const PUT=async(req:NextRequest)=>{  //for creating a bill
try {
    const {name,amount}:{name:string,amount:number}=await req.json();
    const user=await getUserDetails(req);
    if(user===null){
        return NextResponse.json({
            error:true,
            message:"Login first to change password",
            status:403
        },{status:403})
    }
    const order= await razorpay.orders.create({
        amount:amount*100,
        currency:"INR",
        receipt:`receipt_${name}`,
        payment_capture:true
    })
    await prisma.paymentDetails.create({
        data:{
            orderId:order.id,
            amount:amount,
            name:name,
            razorpay_order_id:order.id,
        }
    })
    return NextResponse.json({
        error:false,
        message:"Order created successfully",
        status:200,
        data:order
    },{status:200})
} catch (error) {
    console.log(error)
    return NextResponse.json({
        error:true,
        message:"Something went wrong",
        status:404
    })
}
}

export const POST=async(req:NextRequest)=>{  //for creating a bill
try {
    const {razorpay_order_id,razorpay_payment_id, razorpay_signature }:PaymentType=await req.json();
    const user=await getUserDetails(req);
    if(user===null){
        return NextResponse.json({
            error:true,
            message:"Login first to complete order",
            status:403
        },{status:403})
    }
    const bodyData=razorpay_order_id+"|"+razorpay_payment_id;
    const expect= crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!).update(bodyData).digest('hex');
    const isValid= expect===razorpay_signature;
    if(!isValid){
        return NextResponse.json({
            error:true,
            message:"Payment failed due to invalid signature",
            status:403
        },{status:403})
    }
    const updatedPaymentDetails=await prisma.paymentDetails.update({
        where:{
            orderId:razorpay_order_id
        },
        data:{
            razorpay_payment_id:razorpay_payment_id,
            razorpay_signature:razorpay_signature,
            razorpay_order_id:razorpay_order_id,
        }
    })
    return NextResponse.json({
        error:false,
        message:"Payment successful",
        status:200,
        data:updatedPaymentDetails
    },{status:200})
} catch (error) {
    console.log(error)
    return NextResponse.json({
        error:true,
        message:"Something went wrong",
        status:404
    })
}
}