import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const GET=async(req:NextRequest)=>{
    const {searchParams}=new URL(req.url);
    const shop=searchParams.get("shops")
    
    try {
        const product=await prisma.product.findMany({
            where:{
                ...(shop?{shopSlug:shop}:{isFeatured:true}),
            }
        });
        return new NextResponse(JSON.stringify(product),{status:200})
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({
            message:"something went wrong",
        }),{status:500})
    }
}

export const POST = async (req: NextRequest) => {
    try {
      const body = await req.json();
      const newProduct = await prisma.product.create({
        data: body,
      });
      console.log(newProduct)
      return new NextResponse(JSON.stringify(newProduct), { status: 201 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  };