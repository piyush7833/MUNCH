import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../utils/action";
import { prisma } from "@/utils/connect";

export const POST = async (req: NextRequest) => {
    try {
        const { panCard, bankAccount, IFSC, aadhar, GSTIN }: shopOwnerForm = await req.json();
        const user = await getUserDetails(req);
        if (user == null) {
            return NextResponse.json({
                error: true,
                message: "Login to change your role.",
                status: 403
            }, { status: 403 })
        }
        const userId = user.id;
        const newShopOwner = await prisma.shopOwner.create({
            data: {
                userId, panCard, aadhar, bankAccount, IFSC, GSTIN
            }
        })
        return NextResponse.json({
            error: false,
            message: "Form subitted successfully your details will be verified soon for updating your role and you will be able to add shops.",
            status: 200,
            newShopOwner,
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 500
        }, { status: 500 })
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const user = await getUserDetails(req);
        if (user == null) {
            return NextResponse.json({
                error: true,
                message: "Login to see your shopowner details",
                status: 403
            }, { status: 403 })
        }
        if (user.role === "ShopOwner") {
            const shopOwner = await prisma.shopOwner.findUnique({
                where: {
                    userId: user.id
                }
            })
            return NextResponse.json({
                error: false,
                message: "Shop owner details fetched successfully",
                status: 200,
                shopOwner
            }, { status: 200 })
        }
        if (user.role === "Admin") {
            const shopOwner = await prisma.shopOwner.findMany({ orderBy: { verified: "asc" || null }, include: { user: true } });
            return NextResponse.json({
                error: false,
                message: "Shop owner details fetched successfully",
                status: 200,
                shopOwner
            }, { status: 200 })
        }
        return NextResponse.json({
            error: false,
            message: "User have no access to shop owner details",
            status: 403,
        }, { status: 403 })
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 500
        }, { status: 500 })
    }
}

export const PUT = async (req: NextRequest) => {
    try {
        const { panCard, bankAccount, IFSC, aadhar, GSTIN, verified, notVerified,id }: shopOwnerEditForm = await req.json();
        const user = await getUserDetails(req);
        
        if (user == null) {
            return NextResponse.json({
                error: true,
                message: "Login to see your shopowner details",
                status: 403
            }, { status: 403 })
        }
        const shop_owner = await prisma.shopOwner.findUnique({
            where: {
                id: id
            }
        })
        if(shop_owner == null){
            return NextResponse.json({
                error: true,
                message: "Shop owner details not found",
                status: 404
            }, { status: 404 })
        }
        if ((verified || notVerified) && user.role !== "Admin") {
            return NextResponse.json({
                error: true,
                message: "Only admin can verify the shop owner details",
                status: 403
            }, { status: 403 })
        }
        if (user.role === "ShopOwner") {
            const shopOwner = await prisma.shopOwner.update({
                where: {
                    id: id
                },
                data: { panCard, bankAccount, IFSC, aadhar, GSTIN, verified: null }
            })
            return NextResponse.json({
                error: false,
                message: "Shop owner details updated successfully and needs to be verified again till then you can't add shops and perform transactions with the shop.",
                status: 200,
                shopOwner
            }, { status: 200 })
        }
        if (user.role === "Admin") {
            let shopOwner;
            if (verified) {
                await prisma.user.update({
                    where: {
                        id: shop_owner.userId
                    },
                    data: { role: "ShopOwner" }
                })
                shopOwner = await prisma.shopOwner.update({
                    where: {
                        id:id
                    },
                    data: { verified: new Date(),panCard, bankAccount, IFSC, aadhar, GSTIN,notVerified: null }
                })
            }
            else if (notVerified) {
                console.log(notVerified)
                await prisma.user.update({
                    where: {
                        id: shop_owner.userId
                    },
                    data: { role: "User" }
                })
                shopOwner = await prisma.shopOwner.update({
                    where: {
                       id:id
                    },
                    data: { notVerified,panCard, bankAccount, IFSC, aadhar, GSTIN,verified: null }
                })
            }
            else {
                console.log("object")
                shopOwner = await prisma.shopOwner.update({
                    where: {
                        id:id
                    },
                    data: { panCard, bankAccount, IFSC, aadhar, GSTIN,verified: null}
                })
            }
            return NextResponse.json({
                error: false,
                message: "Shop owner details updated successfully",
                status: 200,
                shopOwner
            }, { status: 200 })
        }
        return NextResponse.json({
            error: false,
            message: "User have no access to shop owner details",
            status: 403,
        }, { status: 403 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 500
        }, { status: 500 })
    }
}