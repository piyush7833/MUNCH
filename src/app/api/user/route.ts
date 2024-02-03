// "use server"

import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../utils/action";
import { prisma } from "@/utils/connect";
import { cookies } from 'next/headers'

export const PUT = async (req: NextRequest) => {
    try {
        // let {name,email,phone,image}:updateForm=await req.json();
        var { name, phone, email, image, address }: updateForm = await req.json();
        const user = await getUserDetails(req);
        if (user == null) {
            return NextResponse.json({
                error: true,
                message: "Login first to update user",
                status: 403
            }, { status: 403 })
        }
        if (phone) {
            await prisma.user.update({ where: { id: user.id }, data: { phoneVerified: null } })
        }
        if (email) {
            await prisma.user.update({ where: { id: user.id }, data: { emailVerified: null } })
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name, phone, email, image, address
            }
        })
        return NextResponse.json({
            error: false,
            message: "User updated successfully",
            status: 200,
            updatedUser
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 404
        }, { status: 404 })
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const user = await getUserDetails(req);
        if (user == null) {
            return NextResponse.json({
                error: true,
                message: "Login to view your profile.",
                status: 403
            }, { status: 403 })
        }
        cookies().delete('name');
        return NextResponse.json({
            error: false,
            message: "User found successfully",
            status: 200,
            user
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 404
        }, { status: 404 })
    }
}
export const DELETE = async (req: NextRequest) => {
    try {
        const user = await getUserDetails(req);
        if (user == null) {
            return NextResponse.json({
                error: true,
                message: "Login first to delete user",
                status: 403
            }, { status: 403 })
        }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                softDelete: true
            }
        })
        return NextResponse.json({
            error: false,
            message: "User deleted successfully",
            status: 200,
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 500
        }, { status: 500 })
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const {panCard,bankAccount,IFSC,aadhar,GSTIN}:shopOwnerForm=await req.json();
        const user = await getUserDetails(req);
        if (user == null) {
            return NextResponse.json({
                error: true,
                message: "Login to change your role.",
                status: 403
            }, { status: 403 })
        }
        const userId=user.id;
        const newShopOwner=await prisma.shopOwner.create({
            data:{
                userId,panCard,aadhar,bankAccount,IFSC,GSTIN
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