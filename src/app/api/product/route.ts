// "use server"

import { NextRequest, NextResponse } from "next/server"
import { getUserDetails } from "../utils/action"
import { productEditAdminType, productType } from "./type"
import { prisma } from "@/utils/connect"

export const POST = async (req: NextRequest) => {  //add product
    try {
        const { title, desc, img, price, options, shopId,type }: productType = await req.json()
        const user = await getUserDetails(req);
        const shop = await prisma.shop.findUnique({ where: { id: shopId } });
        if (!user) {
            return NextResponse.json({
                error: true,
                message: "Login to add products",
                status: 401
            }, { status: 401 })
        }
        if (user.role !== "ShopOwner") {
            return NextResponse.json({
                error: true,
                message: "Only shopowner can add products",
                status: 403
            }, { status: 403 })
        }
        if (shop?.userId !== user.id) {
            return NextResponse.json({
                error: true,
                message: "You can add product in your shop only",
                status: 403
            }, { status: 403 })
        }
        const product = await prisma.product.create({
            data: {
                title,
                desc,
                img,
                price,
                options,
                shopId,
                type
            }
        })
        return NextResponse.json({
            error: false,
            message: "New product added succesfully",
            status: 201,
            product
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

export const PUT = async (req: NextRequest) => {  //edit product by admin
    try {
        const { title, desc, img, price, options, productId,type }: productEditAdminType = await req.json();
        const user = await getUserDetails(req);
        const product = await prisma.product.findUnique({ where: { id: productId, softDelete: false } })
        if (!user) {
            return NextResponse.json({
                error: true,
                message: "Login to edit products.",
                status: 401
            }, { status: 401 })
        }
        if (user.role !== "Admin") {
            return NextResponse.json({
                error: true,
                message: "Only admin can edit products.",
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
        const updatedProduct = await prisma.product.update({ where: { id: productId }, data: { title, desc, img, price, options,type } })
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

export const DELETE = async (req: NextRequest) => {  //delete product by admin
    try {
        const { productId }: { productId: string } = await req.json()
        const product = await prisma.product.findUnique({ where: { id: productId } })
        const user = await getUserDetails(req);
        if (!user) {
            return NextResponse.json({
                error: true,
                message: "Login to add products",
                status: 401
            }, { status: 401 })
        }
        if (user.role !== "Admin") {
            return NextResponse.json({
                error: true,
                message: "Only admin can edit products",
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
        const deletedProduct = await prisma.product.update({ where: { id: productId }, data: { softDelete: true } })
        return NextResponse.json({
            error: false,
            message: "Product deleted succesfully",
            status: 201,
            deletedProduct
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 500
        }, { status: 500 })
    }
}

export const GET = async (req: NextRequest) => {  //get random featured product OR get product of all of your shops
    try {
        const user = await getUserDetails(req);
        if (!user || user.role === "User") {
            let featuredroducts = await prisma.product.findMany({where:{softDelete:false,isFeatured:true}});
            const allProducts = await prisma.product.findMany({where:{softDelete:false}});
            const shuffledProducts = shuffleArray(allProducts);
            while (featuredroducts.length < 20 && shuffledProducts.length > 0) {
                featuredroducts.push(shuffledProducts.pop()!);
              }
        
            return NextResponse.json({
                error: true,
                message: "Product fetched successfully",
                status: 200,
                featuredroducts
            }, { status: 200 })
        }
        if (user?.role === "ShopOwner") {
            const shops = await prisma.shop.findMany({
                where: { userId: user.id },
            })
            const shopIds=getAllShopIds(shops)
            // console.log(shopIds)
            const products = await prisma.product.findMany({
                where: {
                  shopId: {
                    in: shopIds,
                  },
                  softDelete:false
                },
              });
            return NextResponse.json({
                error: true,
                message: "Product fetched successfully",
                status: 200,
                products
            }, { status: 200 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 500
        }, { status: 500 })
    }
}

// Function to shuffle an array in-place
function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function getAllShopIds(shops: any[]): string[] {
    return shops.map((shop) => shop.id);
  }