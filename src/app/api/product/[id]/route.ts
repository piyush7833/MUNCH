
import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../../utils/action";
import { prisma } from "@/utils/connect";
import { productEditType } from "../type";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {  //get particualr product
    try {
        const { id } = params;
        const product=await prisma.product.findUnique({where:{id:id,softDelete:false}})
        if(!product){
            return NextResponse.json({
                error: false,
                message: "Product not found",
                status: 404
            }, { status: 404 })
        }
        return NextResponse.json({
            error: false,
            message: "Product fetched succesfully",
            status: 200,
            product
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 500
        }, { status: 500 })
    }
}
export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {  //get all products of particular shop
    try {
        const { id } = params;  //shopId
        const shop=await prisma.shop.findUnique({where:{id:id}})
        if(!shop){
            return NextResponse.json({
                error: true,
                message: "Shop not found",
                status: 404
            }, { status: 404 })
        }
        const product=await prisma.product.findMany({where:{shopId:id,softDelete:false}})
        return NextResponse.json({
            error: false,
            message: "Products fetched succesfully",
            status: 200,
            product
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 500
        }, { status: 500 })
    }
}
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {  //update product
    try {
        const { id } = params;
        const { title, desc, img, price, options,type }: productEditType = await req.json();
        const user = await getUserDetails(req);
        const product = await prisma.product.findUnique({ where: { id: id, softDelete: false } })
        if (!user) {
            return NextResponse.json({
                error: true,
                message: "Login to edit products.",
                status: 401
            }, { status: 401 })
        }
        if (user.role !== "ShopOwner") {
            return NextResponse.json({
                error: true,
                message: "Only shopowner can update products",
                status: 403
            }, { status: 403 })
        }
        if (!product) {
            return NextResponse.json({
                error: true,
                message: "Product not found.",
                status: 404
            }, { status: 404 })
        }
        const shopId=product.shopId;
        const shop=await prisma.shop.findUnique({where:{id:shopId}});

        if (!shop) {
            return NextResponse.json({
                error: true,
                message: "Shop associated with product not found",
                status: 404
            }, { status: 404 })
        }
        if (shop?.userId!==user.id) {
            return NextResponse.json({
                error: true,
                message: "You can update your product only",
                status: 403
            }, { status: 403 })
        }
        const updatedProduct = await prisma.product.update({ where: { id: id }, data: { title, desc, img, price, options,type } })
        return NextResponse.json({
            error: false,
            message: "Product updated succesfully",
            status: 200,
            updatedProduct
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 500
        }, { status: 500 })
    }
}
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {  //delete product
    try {
        const { id } = params;
        const user = await getUserDetails(req);
        const product = await prisma.product.findUnique({ where: { id: id, softDelete: false } })
        if (!user) {
            return NextResponse.json({
                error: true,
                message: "Login to edit products.",
                status: 401
            }, { status: 401 })
        }
        if (user.role !== "ShopOwner") {
            return NextResponse.json({
                error: true,
                message: "Only shopowner can delete products",
                status: 403
            }, { status: 403 })
        }
        if (!product) {
            return NextResponse.json({
                error: true,
                message: "Product not found.",
                status: 404
            }, { status: 404 })
        }
        const shopId=product.shopId;
        const shop=await prisma.shop.findUnique({where:{id:shopId}});
        if (!shop) {
            return NextResponse.json({
                error: true,
                message: "Shop associated with product not found",
                status: 404
            }, { status: 404 })
        }
        if (shop?.userId!==user.id) {
            return NextResponse.json({
                error: true,
                message: "You can update your product only",
                status: 403
            }, { status: 403 })
        }
        const deletedProduct = await prisma.product.update({ where: { id: id }, data: { softDelete:true } })
        return NextResponse.json({
            error: false,
            message: "Product deleted succesfully",
            status: 200,
            deletedProduct
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
