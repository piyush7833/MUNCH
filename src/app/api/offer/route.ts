import { NextRequest, NextResponse } from "next/server";
import { addOfferType } from "./type";
import { prisma } from "@/utils/connect";

export const POST=async(req:NextRequest)=>{
    try {
        const {title,desc,img,discountedPrice,discountedPercentage,discountedOption,time,productId,shopSlug}:addOfferType=await req.json();
        const product=await prisma.product.findUnique({where:{id:productId}});
        const shop=await prisma.shop.findUnique({where:{slug:shopSlug}});
        if(!product){
            return NextResponse.json({
                error: true,
                message: "Product not found",
                status: 404,
            }, { status: 404 });
        }
        if(!shop){
            return NextResponse.json({
                error: true,
                message: "Shop not found",
                status: 404,
            }, { status: 404 });
        }
        let imgUrl=img || product.img || shop.img;
        const originalPrice=product.price;
        const offer=await prisma.offer.create({
            data:{
                title,
                desc,
                img:imgUrl,
                discountedPrice,
                discountedPercentage,
                discountedOption,
                originalPrice,
                time,
                product:{
                    connect:{
                        id:productId
                    }
                },
                shop:{
                    connect:{
                        slug:shopSlug
                    }
                }
            }
        });
        return NextResponse.json({
            error: false,
            message: "Offer added successfully",
            status: 200,
            data:offer
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 500,
        }, { status: 500 });
    }
}

