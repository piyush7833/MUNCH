import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../utils/action";
import { prisma } from "@/utils/connect";
import { CreateOrderProductInput, OrderType, ProductDetails } from "./type";

export const POST = async (req: NextRequest) => {
  try {
    console.log("hello from order")
    const {totalPrice, couponPrice, taxes, delieveryFee, shopId, payMode, address, platformFee, productDetails, paymentId, dineType }: OrderType = await req.json();
    const shop = await prisma.shop.findUnique({ where: { id: shopId, softDelete: false } });
    const user = await getUserDetails(req);
    const productIds = getAllProductIds(productDetails);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
        softDelete: false
      },
    });

    const foundProductIds = products.map((product) => product.id);
    const notFoundProductIds = productIds.filter((productId: string) => !foundProductIds.includes(productId));

    if (notFoundProductIds.length > 0) {
      return NextResponse.json({
        error: true,
        status: 404,
        message: `Products not found with IDs: ${notFoundProductIds.join(', ')}`,
      }, { status: 404 });
    }

    if (!shop) {
      return NextResponse.json({
        error: true,
        message: "Shop not found",
        status: 404
      }, { status: 404 })
    }
    if (!user) {
      return NextResponse.json({
        error: true,
        message: "Login to create order",
        status: 403
      }, { status: 403 })
    }
    if (user.role !== "User") {
      return NextResponse.json({
        error: true,
        message: "Only user can create order",
        status: 403
      }, { status: 403 })
    }
    // console.log(totalPrice, couponPrice, taxes, delieveryFee, shopId, payMode, address, platformFee, productDetails, paymentId, user.id, shopId)
    const newOrder = await prisma.order.create({
      data: {
        totalPrice,
        couponPrice,
        taxes,
        delieveryFee,
        payMode,
        address,
        platformFee,
        userId:user.id,
        paymentId,
        shopId,
        dineType
      }
    })

    let orderProducts = [];
    console.log(productDetails)
    for (let i = 0; i < productDetails.length; i++) {
      const orderProduct = await createOrderProduct({ productDetails: productDetails[i], orderId: newOrder.id });
      if(orderProduct.success===false){
        return NextResponse.json({
          error: true,
          message: orderProduct.error,
          status: 500
        }, { status: 500 })
      }
      orderProducts.push(orderProduct.orderProduct)
    }

    return NextResponse.json({
      error: false,
      message: "Order created successfully",
      status: 201,
      newOrder,
      orderProducts
    }, { status: 201 })
  } catch (error) {
    console.log(error,"error from order")
    return NextResponse.json({
      error: true,
      message: "Something went wrong",
      status: 500
    }, { status: 500 })
  }
}

export const GET = async (req: NextRequest) => { //get all orders of shopOwner all shops or user
  try {
    const user = await getUserDetails(req);
    let orders;
    if (!user) {
      return NextResponse.json({
        error: true,
        message: "Login to see order",
        status: 403
      }, { status: 403 })
    }
    if (user.role === "ShopOwner") {
      const shops = await prisma.shop.findMany({ where: { userId: user.id,softDelete:false }, include: { products: true, user: true }})
      const shopIds = getShopIds(shops)
      orders = await prisma.order.findMany({
        where: {
          shopId: {
            in: shopIds,
          },
          softDelete:false
        },
        include: {products: {include:{product:true}}, user: true, reviews:true  },
      })
    }
    if (user.role === "User") {
      orders = await prisma.order.findMany({
        where: { userId: user.id, softDelete: false },
        include: { products: { include: { product: true } }, shop: true, reviews:true },
      });
    }
    if (user.role === "Admin") {
      orders = await prisma.order.findMany({
        include: { user: true, products: { include: { product: true } }, shop: true, reviews:true },
      });
    }
    return NextResponse.json({
      error: false,
      message: "Order fetched successfully",
      status: 200,
      orders
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
export const PUT = async (req: NextRequest) => {  //get all order of particular shop
  try {
    const user=await getUserDetails(req);
    const {shopId}=await req.json()
    if (!user) {
      return NextResponse.json({
        error: true,
        message: "Login to see order",
        status: 403
      }, { status: 403 })
    }
    if (user.role==="User") {
      return NextResponse.json({
        error: true,
        message: "Only admin and shop owner can see all orders of shop.",
        status: 403
      }, { status: 403 })
    }
    const orders=await prisma.order.findMany({where:{shopId,softDelete:false}})
    return NextResponse.json({
      error: false,
      message: "Order fetched successfully",
      status: 200,
      orders
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


const createOrderProduct = async ({productDetails,orderId}:{productDetails:any, orderId:string}) => {
  try {
    const { id, price, optionTitle, quantity }: CreateOrderProductInput=productDetails;
    const order=await prisma.order.findUnique({where:{id:orderId}})
    if(!order){
      return {
        success: false,
        error: 'Order not found',
      };
    }
    const orderProduct = await prisma.orderProduct.create({
      data: {
        productId:id,
        price,
        option: optionTitle || "NaN",
        quantity,
        orderId,
      },
    });

    return {
      success: true,
      orderProduct,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Error creating order product',
    };
  }
};


const getAllProductIds = (productDetailsArray: ProductDetails[]): string[] => {
  return productDetailsArray.map((productDetail) => productDetail.id);
};
const getShopIds = (shops: any[]): string[] => {
  return shops.map((shop) => shop.id);
};