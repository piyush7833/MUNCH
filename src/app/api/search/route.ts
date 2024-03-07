import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT =async(req:NextRequest)=>{
    try {
        let {query} = await req.json();
        query = query.toString().toLowerCase();
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { title: { contains: query } },
                    { desc: { contains: query } }
                ]
            }
        });

        const shops = await prisma.shop.findMany({
            where: {
                OR: [
                    { title: { contains: query } },
                    { desc: { contains: query } },
                    { slug: { contains: query } }
                ]
            }
        });

        const shopOwners = await prisma.user.findMany({
            where: {
                role:"ShopOwner",
                OR: [
                    { name: { contains: query } },
                    { userName: { contains: query } },
                ]
            }
        });
        return NextResponse.json({
            error: false,
            status: 200,
            products,
            shops,
            shopOwners
        },{status:200})

    } catch (error) {
        return NextResponse.json({
            error: true,
            status: 500,
            message: "Internal Server Error",
        },{status:500})
    }
}