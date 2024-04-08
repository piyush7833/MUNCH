
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserType, registerType } from "../types";
import { cookies } from 'next/headers'

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { name, userName, password, email, phone, image }: registerType = await req.json();

    try {
        const userN = await prisma.user.findUnique({ where: { userName }, });
        let userE = email && await prisma.user.findFirst({ where: { email } });
        let userP = phone && await prisma.user.findFirst({ where: { phone: phone ?? undefined }, });
        if (userE) {
            return NextResponse.json({
                error: true,
                status: 403,  // Internal Server Error
                message: "Email already exist",
            }, { status: 403 });
        }
        if (userP) {
            return NextResponse.json({
                error: true,
                status: 403,  // Internal Server Error
                message: "Phone Number already exist",
            }, { status: 403 });
        }
        if (userN) {
            return NextResponse.json({
                error: true,
                status: 403,  // Internal Server Error
                message: "user name already exist",
            }, { status: 403 });
        }
        // if (user) {
        //     return NextResponse.json({
        //         error: true,
        //         status: 403,  // Forbidden
        //         message: "User already exists",
        //     }, { status: 403 });
        // }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                name,
                userName,
                email,
                phone,
                image,
                password: hashedPassword,
            },
        });

        var token = jwt.sign({ id: newUser.id }, process.env.JWT!);
        cookies().set('token', token,{expires: new Date(Date.now() + 1000*60*60*24*7)});
        cookies().set({
            name: 'role',
            value: "User",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            // httpOnly: true,
          })
        return NextResponse.json({
            error: false,
            status: 201,  // Created
            message: "User created successfully",
            newUser,
            token,
        }, { status: 201 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: true,
            status: 500,  // Internal Server Error
            message: "Something went wrong",
        }, { status: 500 });
    }
}

export const PUT = async (req: NextRequest) => {  //get user for validation
    try {
        // Perform GET logic here
        const { userName, email, phone }: getUserType = await req.json()
        const userN = await prisma.user.findUnique({ where: { userName }, });
        let userE = email && await prisma.user.findFirst({ where: { email } });
        let userP = phone && await prisma.user.findFirst({ where: { phone: phone ?? undefined }, });
        if (userE) {
            return NextResponse.json({
                error: true,
                status: 200,  // Internal Server Error
                message: "Email already exist",
            }, { status: 200 });
        }
        if (userP) {
            return NextResponse.json({
                error: true,
                status: 200,  // Internal Server Error
                message: "Phone Number already exist",
            }, { status: 200 });
        }
        if (userN) {
            return NextResponse.json({
                error: true,
                status: 200,  // Internal Server Error
                message: "user name already exist",
            }, { status: 200 });
        }
        else {
            return NextResponse.json({
                error: false,
                status: 200,  // Internal Server Error
                message: "Its unique",
            }), { status: 200 };
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: true,
            status: 500,  // Internal Server Error
            message: "Something went wrong",
        }, { status: 500 });
    }
}
