

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import { getUserDetails } from "../../utils/action";
import { updateShopType } from "../types";

export const GET = async (req: NextRequest, { params }: { params: { slug: string } }) => {  //get particular shop
    try {
        const { slug } = params;
        const shop = await prisma.shop.findUnique({ where: { slug: slug, softDelete: false }, include: { products: { where: { softDelete: false } }, user: { select: { name: true, id: true } } }, })
        if (shop == null) {
            return NextResponse.json({
                error: true,
                message: "shop not found",
                status: 404
            }, { status: 404 })
        }
        return NextResponse.json({
            error: false,
            message: "shop found successfully",
            status: 200,
            shop
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 500
        }, { status: 500 })
    }
}
export const PUT = async (req: NextRequest, { params }: { params: { slug: string } }) => { //update shop
    try {
        const { slug } = params;
        const { title, desc, address, img, status, verified, notVerified }: updateShopType = await req.json()
        const shop = await prisma.shop.findUnique({ where: { slug: slug, softDelete: false } })
        const user = await getUserDetails(req)
        if (shop == null) {
            return NextResponse.json({
                error: true,
                message: "shop not found",
                status: 404
            }, { status: 404 })
        }
        if (user?.role !== "Admin" && shop.userId !== user?.id) {
            return NextResponse.json({
                error: true,
                message: "You can update only your shop",
                status: 403
            }, { status: 403 })
        }
        if (user?.role === "User") {
            return NextResponse.json({
                error: true,
                message: "Only shop owner can update shop",
                status: 403
            }, { status: 403 })
        }
        if (user.role === "Admin") {
            let shopOwner;
            if (verified) {
                shopOwner = await prisma.shop.update({
                    where: {
                        slug: slug
                    },
                    data: { verified: new Date(), title, desc, img, address, status, notVerified: null }
                })
            }
            else if (notVerified) {
                console.log("object")
                shopOwner = await prisma.shop.update({
                    where: {
                        slug: slug
                    },
                    data: { notVerified, title, desc, img, address, status, verified: null }
                })
            }
            else {
                shopOwner = await prisma.shop.update({
                    where: {
                        slug: slug
                    },
                    data: { title, desc, img, address, status, verified: null }
                })
            }
            return NextResponse.json({
                error: false,
                message: "Shop details updated successfully",
                status: 200,
                shopOwner
            }, { status: 200 })
        }
        let updatedShop;
        if (status) {
            updatedShop = await prisma.shop.update({ where: { slug: slug }, data: { softDelete: true } })
        }
        else {
            updatedShop = await prisma.shop.update({
                where: { slug: slug }, data: {
                    title, desc, img, address, verified: null
                }
            })
        }
        return NextResponse.json({
            error: false,
            message: "shop updated successfully",
            status: 200,
            updatedShop
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 404
        }, { status: 404 })
    }
}
export const DELETE = async (req: NextRequest, { params }: { params: { slug: string } }) => { //update shop
    try {
        const { slug } = params;
        const shop = await prisma.shop.findUnique({ where: { slug: slug } })
        const user = await getUserDetails(req)
        if (shop == null) {
            return NextResponse.json({
                error: true,
                message: "shop not found",
                status: 404
            }, { status: 404 })
        }
        if (shop.userId !== user?.id) {
            return NextResponse.json({
                error: true,
                message: "You can delete only your shop",
                status: 403
            }, { status: 403 })
        }
        const updatedShop = await prisma.shop.update({
            where: { slug: slug }, data: {
                softDelete: true
            }
        })
        return NextResponse.json({
            error: false,
            message: "shop deleted successfully",
            status: 200,
            updatedShop
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


