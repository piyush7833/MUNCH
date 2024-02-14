import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import {sendNotifications} from "../utils/notification";
export const POST = async (req: NextRequest) => {
    try {
        let {title,text,image,name,role,recievers,link}=await req.json();
        if(recievers==="All"){
            let allUsers:any[]=[];

            if(role==="Admin"){
                allUsers=await prisma.user.findMany({where:{role:"Admin"}});
            }
            else if(role==="User"){
                allUsers=await prisma.user.findMany({where:{role:"User"}});
            }
            else if(role==="ShopOwner"){
                allUsers=await prisma.user.findMany({where:{role:"ShopOwner"}});
            }
            else {
                allUsers=await prisma.user.findMany({});
            }
            recievers = allUsers.map(user => user.notificationIds).flat();
        } else{
            recievers= await prisma.user.findUnique({where:{userName:recievers}});
            recievers=recievers.notificationIds;
        }
        return await sendNotifications({tokens:recievers,title,text,name,image,link});
    } catch (error) {
        console.log(error,"error2");
        return NextResponse.json({
        error: true,
        message: "Something went wrong",
        status: 500,
        }, { status: 200 });
    }
    }