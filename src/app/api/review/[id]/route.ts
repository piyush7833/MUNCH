import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import { updateReview } from "../type";
import { getUserDetails } from "../../utils/action";

export const GET = async (req: NextRequest,{ params }: { params: { id: string } }) => {  //get particular reviews
    try {
        const { id } = params;
        const review=await prisma.review.findUnique({where:{id,softDelete:false}})
        const productId=review?.productId;
        if(!review){
            return NextResponse.json({
                error: true,
                message: "Review not found",
                status: 404
            }, { status: 404 })
        }
        const product =await prisma.product.findUnique({where:{id:productId,softDelete:false}})
        if(!product){
            return NextResponse.json({
                error: true,
                message: "Product not found",
                status: 404
            }, { status: 404 })
        }
        return NextResponse.json({
            error: true,
            message: "Review found successfully",
            status: 200,
            review
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
export const PUT = async (req: NextRequest,{ params }: { params: { id: string } }) => {  //add reviews of product
    try {
        const {  rating, comment }: updateReview = await req.json();
        const {id}=params
        const review = await prisma.review.findUnique({ where: { id,softDelete:false } })
        const user = await getUserDetails(req);
        if (!user) {
            return NextResponse.json({
                error: true,
                message: "Login first to add review",
                status: 403
            }, { status: 403})
        }
        if (!review) {
            return NextResponse.json({
                error: true,
                message: "Review not found",
                status: 404
            }, { status: 404 })
        }
        const product = await prisma.product.findUnique({ where: { id: review?.productId,softDelete:false } })
        if (!product) {
            return NextResponse.json({
                error: true,
                message: "Product not found",
                status: 404
            }, { status: 404 })
        }
        if ((!comment || !rating)) {  //if their is comment then rating is must
            return NextResponse.json({
                error: true,
                message: "Enter rating or comment to update",
                status: 404
            }, { status: 404 })
        }
        let updatedReview;
        if(comment && user){
            updatedReview=await prisma.review.update({where:{id:id},data:{comment,rating}})
        }
        return NextResponse.json({
            error: false,
            message: "Review updated successfully",
            status: 200,            updatedReview
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

export const DELETE = async (req: NextRequest,{ params }: { params: { id: string } }) => {  //add reviews of product
    try {
        const {id}=params
        const review = await prisma.review.findUnique({ where: { id,softDelete:false } })
        const user = await getUserDetails(req);
        if (!user) {
            return NextResponse.json({
                error: true,
                message: "Login first to add review",
                status: 403
            }, { status: 403})
        }
        if (!review) {
            return NextResponse.json({
                error: true,
                message: "Review not found",
                status: 404
            }, { status: 404 })
        }
        const product = await prisma.product.findUnique({ where: { id: review?.productId,softDelete:false } })
        if (!product) {
            return NextResponse.json({
                error: true,
                message: "Product not found",
                status: 404
            }, { status: 404 })
        }
        let updatedReview=await prisma.review.update({where:{id:id},data:{softDelete:true}})
        return NextResponse.json({
            error: false,
            message: "Review deleted successfully",
            status: 200,         
            updatedReview
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