// "use server"

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const { id } = params;
        const user = await prisma.user.findUnique({ where: { id: id, softDelete:false } })
        if (user == null) {
            return NextResponse.json({
                error: true,
                message: "User not found",
                status: 404
            }, { status: 404 })
        }
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

