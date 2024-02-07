// "use server"
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import dotenv from "dotenv"
import { getUserDetails } from "../utils/action";
dotenv.config();
export const POST=async(req:NextRequest)=>{
    const {img, subject,message,shopId}:{img?:string,subject:string,message:string,shopId?:string} = await req.json();
    try {
        const user = await getUserDetails(req);
        if(!user){
            return NextResponse.json({
                error:true,
                status:404,
                message:"User not found."
            }, { status: 404 })
        }
        const contact=await prisma.contact.create({ data: { img, subject, message,shopId,  userId: user.id } });
        return NextResponse.json({
            error:false,
            status:200,
            message:"Message Sent successfully",
            contact
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
export const GET=async(req:NextRequest)=>{
    try {
        const user = await getUserDetails(req);
        if(!user){
            return NextResponse.json({
                error:false,
                status:404,
                message:"User not found."
            }, { status: 404 })
        }
        if(user.role==="Admin"){
            const contacts=await prisma.contact.findMany({include:{shop:true ,user:true}});
            return NextResponse.json({
                error:false,
                status:200,
                contacts,
                message:"Messages fetched successfully",
            }, { status: 200 })
        }
        if(user.role==="ShopOwner"){
            const contacts=await prisma.contact.findMany({where:{userId:user.id}});
            const shops=await prisma.shop.findMany({where:{userId:user.id}});
            const shopIds=shops.map(shop=>shop.id);
            const shopContacts=await prisma.contact.findMany({where:{shopId:{in:shopIds}}});
            return NextResponse.json({
                error:false,
                status:200,
                contacts,
                message:"Messages fetched successfully",
                shopContacts
            }, { status: 200 })
        }
        const contacts=await prisma.contact.findMany({where:{userId:user.id}});
        return NextResponse.json({
            error:false,
            status:200,
            message:"Messages fetched successfully",
            contacts
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