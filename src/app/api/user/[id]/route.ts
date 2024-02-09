// "use server"

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const { id } = params;
        const userFound = await prisma.user.findUnique({ where: { id: id, softDelete:false } })
        if (userFound == null) {
            return NextResponse.json({
                error: true,
                message: "User not found",
                status: 404
            }, { status: 404 })
        }
        if (userFound.role === "ShopOwner") {
            const user = await prisma.user.findUnique({
                where: {
                    id: userFound.id
                },
                include: {
                    shops: true,
                    shopOwner: true
                }
            })
            const { password, ...rest } = user as { password: string, [key: string]: any };
            return NextResponse.json({
                error: false,
                message: "ShopOwner found successfully",
                status: 200,
                user: rest
            }, { status: 200 })
        }
        else {
            const { password, ...rest } = userFound as { password: string, [key: string]: any };
            return NextResponse.json({
                error: false,
                message: "User found successfully",
                status: 200,
                user: rest
            }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            status: 404
        }, { status: 404 })
    }
}

