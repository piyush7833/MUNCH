import { NextRequest, NextResponse } from "next/server";
import { addReview } from "./type";
import { prisma } from "@/utils/connect";
import { getUserDetails } from "../utils/action";

export const PUT = async (req: NextRequest) => {  //get all reviews of product
    try {
        const { productId } = await req.json();
        const product =await prisma.product.findUnique({where:{id:productId,softDelete:false}})
        if(!product){
            return NextResponse.json({
                error: true,
                message: "Product not found",
                status: 404
            }, { status: 404 })
        }
        const reviews=await prisma.review.findMany({where:{productId}})
        return NextResponse.json({
            error: true,
            message: "Reviews fetched successfully",
            status: 200,
            reviews
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 500
        }, { status: 500 })
    }
}
export const POST = async (req: NextRequest) => {  //add reviews of product
    try {
        const { productId, rating, comment, orderId }: addReview = await req.json();
        const product = await prisma.product.findUnique({ where: { id: productId,softDelete:false } })
        const order=await prisma.order.findUnique({where:{id:orderId,status:"Delievered", softDelete:false}})
        const user = await getUserDetails(req);
        if (!user) {
            return NextResponse.json({
                error: true,
                message: "Login first to add review",
                status: 403
            }, { status: 403})
        }
        if (!product) {
            return NextResponse.json({
                error: true,
                message: "Product not found",
                status: 404
            }, { status: 404 })
        }
        if (!order) {
            return NextResponse.json({
                error: true,
                message: "Order not found",
                status: 404
            }, { status: 404 })
        }
        if(user?.id!==order.userId){
            return NextResponse.json({
                error: true,
                message: "You can add review for your order only",
                status: 403
            }, { status: 403 })
        }
        if ((!comment && !rating) || !rating) {  //if there is comment then rating is must
            return NextResponse.json({
                error: true,
                message: "Enter rating to submit review.",
                status: 404
            }, { status: 404 })
        }
        let updatedReview;
        if(comment && user){
            updatedReview=await prisma.review.create({data:{productId, userId:user?.id,comment,rating, orderId: orderId}})
        }
        return NextResponse.json({
            error: false,
            message: "Review added successfully",
            status: 201,
            updatedReview
        }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 500
        }, { status: 500 })
    }
}