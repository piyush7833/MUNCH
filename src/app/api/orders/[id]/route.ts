import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../../utils/action";
import { prisma } from "@/utils/connect";

export const GET = async (req: NextRequest,{ params }: { params: { id: string } }) => {  //get particular order
    try {
      const user=await getUserDetails(req);
      const {id}=params
      if (!user) {
        return NextResponse.json({
          error: true,
          message: "Login to see order",
          status: 403
        }, { status: 403 })
      }
      const order=await prisma.order.findUnique({where:{id,softDelete:false}, include:{products: { include: { product: true } }, user:true, payment:true, reviews:true}})
      return NextResponse.json({
        error: false,
        message: "Order fetched successfully",
        status: 200,
        order
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

export const PUT = async (req: NextRequest,{ params }: { params: { id: string } }) => {  //update particular order
    try {
    const {status}=await req.json()
      const user=await getUserDetails(req);
      const {id}=params
      if (!user) {
        return NextResponse.json({
          error: true,
          message: "Login to see order",
          status: 403
        }, { status: 403 })
      }
      const order=await prisma.order.findUnique({where:{id,softDelete:false}})
      if(!order){
        return NextResponse.json({
          error: true,
          message: "Order not found",
          status: 404
        }, { status: 404 })
      }
      const updatedOrder=await prisma.order.update({where:{id},data:{ status: status}})
      return NextResponse.json({
        error: false,
        message: "Order status updated successfully",
        status: 200,
        updatedOrder
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
export const DELETE = async (req: NextRequest,{ params }: { params: { id: string } }) => {  //get particular order
    try {
    const {status}=await req.json()
      const user=await getUserDetails(req);
      const {id}=params
      if (!user) {
        return NextResponse.json({
          error: true,
          message: "Login to see order",
          status: 403
        }, { status: 403 })
      }
      const updatedOrder=await prisma.order.update({where:{id},data:{softDelete:true}})
      return NextResponse.json({
        error: false,
        message: "Order fetched successfully",
        status: 200,
        updatedOrder
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