import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../utils/action";
import { prisma } from "@/utils/connect";

const formatDateFilter = (date: Date | string) => {
  if(typeof date==="string"){
    date=date.split('T')[0];
  }
  else{
    date=date.toISOString().split('T')[0];
  }
  return date;
}

const formatDateSave = (date: string | Date) => {
  if(typeof date==="string"){
    date=date.split('T')[0];
    date=new Date(date);
  }
  else{
    date=date.toISOString().split('T')[0];
    date=new Date(date);
  }
  return new Date(date);
}

const calculateStats = (shops: any[]) => {
  let totalEarnings = 0;
  let bestSellerProductAllShops: any | null = null;
  const ShopQuantityGraphData: { [key: string]: { id: string, dataSet: { date: Date, value: number }[] } } = {};
  const ShopValueGraphData: { [key: string]: { id: string, dataSet: { date: Date, value: number }[] } } = {};
  //it will be handle on frontend as shop quantity and value graph data is already provided and we have to create date filters their
  // const ShopComparisonValueGraphData: { [key: string]: { id: string, dataSet: { date: Date, value: number }[] } } = {};
  // const ShopComparisonQuantityGraphData: { [key: string]: { id: string, dataSet: { date: Date, value: number }[] } } = {};
  //product comparison chart data can be handled on frontend as product graph data is already provided
  const shopStats: { [key: string]: { slug: string, bestSellerProduct: any | null; singleProductQuantityGraphData: { [key: string]: { id: string, dataSet: { date: Date, value: number }[] } }; singleProductValueGraphData: { [key: string]: { id: string, dataSet: { date: Date, value: number }[] } } } } = {};

  shops?.forEach((shop: any) => {
    let bestSellerProductShop: any | null = null;
    const singleProductQuantityGraphData: { [key: string]: { id: string, dataSet: { date: Date, value: number }[] } } = {};
    const singleProductValueGraphData: { [key: string]: { id: string, dataSet: { date: Date, value: number }[] } } = {};
    let totalEarningsShop = 0;

    shop?.orders.forEach((order: any) => {
      totalEarningsShop += order.totalPrice.toNumber();

      order.products.forEach((product: any) => {
        // Update best seller product for the shop
        if (!bestSellerProductShop || product.quantity.toNumber() > bestSellerProductShop.quantity.toNumber() || product.price.toNumber() > bestSellerProductShop.price.toNumber()) {
          bestSellerProductShop = {
            id: product.id,
            title: product.product.title,
            price: product.price,
            quantity: product.quantity,
          };
        }
        //product data as per dates
        singleProductQuantityGraphData[product.id] = singleProductQuantityGraphData[product.id] || { id: product.id, dataSet: [] };
        singleProductValueGraphData[product.id] = singleProductValueGraphData[product.id] || { id: product.id, dataSet: [] };
        const existingProductQuantity = singleProductQuantityGraphData[product.id].dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(order.createdAt));
        const existingProductValue = singleProductValueGraphData[product.id].dataSet.find((existing) => formatDateFilter(existing.date)=== formatDateFilter(order.createdAt));
        
        if (existingProductQuantity === undefined) {
          singleProductQuantityGraphData[product.id].dataSet.push({ date: formatDateSave(order.createdAt), value: product.quantity.toNumber() });
        } else {
          existingProductQuantity.value += product.quantity.toNumber();
        }
        if (existingProductValue === undefined) {
          singleProductValueGraphData[product.id].dataSet.push({ date: formatDateSave(order.createdAt), value: product.price.toNumber() });
        }
        else {
          existingProductValue.value += product.price.toNumber();
        }
      });


      //shop graph data as per dates
      ShopValueGraphData[shop.slug] = ShopValueGraphData[shop.slug] || { id: shop.slug, dataSet: [] };
      ShopQuantityGraphData[shop.slug] = ShopQuantityGraphData[shop.slug] || { id: shop.slug, dataSet: [] };
      const existingShopByQuantity = ShopQuantityGraphData[shop.slug]?.dataSet.find((existing) => formatDateFilter(existing.date)=== formatDateFilter(order.createdAt));
      const existingShopByValue = ShopValueGraphData[shop.slug]?.dataSet.find((existing) => formatDateFilter(existing.date)=== formatDateFilter(order.createdAt));
      const quantity=order.products.reduce((acc:any,product:any)=>acc+product.quantity.toNumber(),0)
      if (existingShopByQuantity === undefined) {
        ShopQuantityGraphData[shop.slug].dataSet.push({ date:formatDateSave(order.createdAt), value: quantity });
      }
      else {
        existingShopByQuantity.value += quantity;
      }
      if (existingShopByValue === undefined) {
        ShopValueGraphData[shop.slug].dataSet.push({ date: formatDateSave(order.createdAt), value: order.totalPrice.toNumber() });
      }
      else {
        existingShopByValue.value += order.totalPrice.toNumber();
      }


    });


    // Update total earnings for all shops combined
    totalEarnings += totalEarningsShop;

    // Store shop-specific stats
    shopStats[shop.slug] = {
      slug: shop.slug,
      bestSellerProduct: bestSellerProductShop,
      // productGraphData: productGraphDataShop,
      singleProductQuantityGraphData,
      singleProductValueGraphData,
    };
  });

  // Calculate best seller product for all shops combined
  shops && shops.forEach((shop: any) => {
    const shopBestSeller = shopStats[shop.slug].bestSellerProduct;
    if (!bestSellerProductAllShops || (shopBestSeller && (shopBestSeller.quantity.toNumber() > bestSellerProductAllShops.quantity.toNumber() || shopBestSeller.price.toNumber() > bestSellerProductAllShops.price.toNumber()))) {
      bestSellerProductAllShops = shopBestSeller;
    }
  });



  return {
    totalEarnings,
    bestSellerProductAllShops,
    shopStats,
    ShopQuantityGraphData,
    ShopValueGraphData
  };
};

const combineStats = (data: any[]): any => {
  let totalEarnings = 0;
  let bestSellerProduct: any | null = null;
  const ShopOwnerQuantityGraphData: { [key: string]: { id: string, dataSet: { date: Date, value: number }[] } } = {};
  const ShopOwnerValueGraphData: { [key: string]: { id: string, dataSet: { date: Date, value: number }[] } } = {};
  data.forEach((stats: any) => {
    totalEarnings += stats.totalEarnings;
    // Update best seller product
    if (!bestSellerProduct || (stats.bestSellerProduct && (stats.bestSellerProduct.quantity > bestSellerProduct.quantity || stats.bestSellerProduct.price > bestSellerProduct.price))) {
      bestSellerProduct = stats.bestSellerProduct;
    }
    // Update shop graph data for all shops
    Object.keys(stats.shopQuantityGraphData).forEach((key) => {
      ShopOwnerQuantityGraphData[stats?.shopOwnerName] = ShopOwnerQuantityGraphData[stats?.shopOwnerName] || { id: stats.shopOwnerName, dataSet: [] };
      stats.shopQuantityGraphData[key].dataSet.forEach((data: { date: Date, value: number }) => {
        const existingData = ShopOwnerQuantityGraphData[stats.shopOwnerName].dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(data.date));
        if (existingData) {
          existingData.value += data.value;
        } else {
          ShopOwnerQuantityGraphData[stats.shopOwnerName].dataSet.push(data);
        }
      });
    });
    Object.keys(stats.shopValueGraphData).forEach((key) => {
      ShopOwnerValueGraphData[stats?.shopOwnerName] = ShopOwnerValueGraphData[stats?.shopOwnerName] || { id: stats.shopOwnerName, dataSet: [] };
      stats.shopValueGraphData[key].dataSet.forEach((data: { date: Date, value: number }) => {
        const existingData = ShopOwnerValueGraphData[stats.shopOwnerName].dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(data.date));
        if (existingData) {
          existingData.value += data.value;
        } else {
          ShopOwnerValueGraphData[stats.shopOwnerName].dataSet.push(data);
        }
      });
    });

  });

  return {
    totalEarnings,
    bestSellerProduct,
    ShopOwnerQuantityGraphData,
    ShopOwnerValueGraphData
  };
};

const adminStats = (data: any): any => {
  const adminGraphData: { [key: string]: { id: string, dataSet: { date: Date, value: number, verified?:number , active?:number, deleted?:number }[] } } = {};
  data.user.forEach((user: any) => {
    adminGraphData["User"] = adminGraphData["User"] || { id: "User", dataSet: [] };
    const existingUser = adminGraphData["User"].dataSet.find((existing) => formatDateFilter(existing.date)=== formatDateFilter(user.createdAt));
    if(existingUser){
      existingUser.value+=1;
      existingUser.verified!+=user.verified?1:0;
      existingUser.active!+=user.softDelete?0:1;
      existingUser.deleted!+=user.softDelete?1:0;
    }
    else{
      adminGraphData["User"].dataSet.push({ date: formatDateSave(user.createdAt), value: 1, verified:user.verified?1:0, active:user.softDelete?0:1, deleted:user.softDelete?1:0});
    }
  });

  data.shopOwner.forEach((shopOwner: any) => {
    adminGraphData["ShopOwner"] = adminGraphData["ShopOwner"] || { id: "ShopOwner", dataSet: [] };
    const existingShopOwner = adminGraphData["ShopOwner"].dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(shopOwner.createdAt));
    if(existingShopOwner){
      existingShopOwner.value+=1;
      existingShopOwner.verified!+=shopOwner.verified?1:0;
      existingShopOwner.active!+=shopOwner.softDelete?0:1;
      existingShopOwner.deleted!+=shopOwner.softDelete?1:0;
    }
    else{
      adminGraphData["ShopOwner"].dataSet.push({ date: formatDateSave(shopOwner.createdAt), value: 1, verified:shopOwner.verified?1:0, active:shopOwner.softDelete?0:1, deleted:shopOwner.softDelete?1:0});
    }
  });
  data.shop.forEach((shop: any) => {
    adminGraphData["Shop"] = adminGraphData["Shop"] || { id: "Shop", dataSet: [] };
    const existingShop = adminGraphData["Shop"].dataSet.find((existing) => formatDateFilter(existing.date)=== formatDateFilter(shop.createdAt));
    if(existingShop){
      existingShop.value+=1;
      existingShop.verified!+=shop.verified?1:0;
      existingShop.active!+=shop.softDelete?0:1;
      existingShop.deleted!+=shop.softDelete?1:0;
    }
    else{
      adminGraphData["Shop"].dataSet.push({ date: formatDateSave(shop.createdAt), value: 1, verified:shop.verified?1:0, active:shop.softDelete?0:1, deleted:shop.softDelete?1:0});
    }
  });
  data.order.forEach((order: any) => {
    adminGraphData["Earning"] = adminGraphData["Earning"] || { id: "Earning", dataSet: [] };
    const existingOrder = adminGraphData["Earning"].dataSet.find((existing) => formatDateFilter(existing.date)=== formatDateFilter(order.createdAt));
    if(existingOrder){
      existingOrder.value+=order.platformFee.toNumber();
    }
    else{
      adminGraphData["Earning"].dataSet.push({ date: formatDateSave(order.createdAt), value: 1});
    }
  });
  return adminGraphData;
}

export const GET = async (req: NextRequest) => {
  try {
    const user = await getUserDetails(req);
    if (user == null) {
      return NextResponse.json({
        error: true,
        message: "Login to see your stats",
        status: 403
      }, { status: 403 })
    }
    const finalData: { [key: string]: {} } = {};
    let adminData: any = {};
    if (user.role === "ShopOwner") {
      const data = await prisma.user.findUnique({
        where: {
          id: user.id
        },
        include: {
          shopOwner: true,
          shops: { include: { orders: { include: { products: { include: { product: true } } } } } },
        }
      })
      const stats = calculateStats((data?.shops as any));
      finalData[user.userName] = ({
        totalEarnings: stats.totalEarnings,
        bestSellerProduct: stats.bestSellerProductAllShops,
        shopStats: stats.shopStats,
        shopQuantityGraphData: stats.ShopQuantityGraphData,
        shopValueGraphData: stats.ShopValueGraphData,
        shopOwnerName: user.userName
      });
    }
    if (user.role === "Admin") {
      const data = await prisma.user.findMany({
        where: { role: "ShopOwner" },
        include: {
          shopOwner: true,
          shops: { include: { orders: {where: {
            status: "Delievered" // Filter orders by status
          }, include: { products: { include: { product: true } } } } } },
        },
      });
      const user = await prisma.user.findMany({});
      const shopOwner=await prisma.shopOwner.findMany({});
      const shop=await prisma.shop.findMany({});
      const order=await prisma.order.findMany({where: {status: "Delievered"}});
      adminData = adminStats({user,shopOwner,shop,order});
      (data as any[])?.forEach(element => {
        const stats = calculateStats((element?.shops as any));
        finalData[element.userName] = ({
          totalEarnings: stats.totalEarnings,
          bestSellerProduct: stats.bestSellerProductAllShops,
          shopStats: stats.shopStats,
          shopQuantityGraphData: stats.ShopQuantityGraphData,
          shopValueGraphData: stats.ShopValueGraphData,
          userId: element.id,
          shopOwnerName: element.userName
        });
      });
    }
    return NextResponse.json({
      error: false,
      data: { finalData, combinedStatsData: combineStats(Object.values(finalData)),adminData: adminData },
      message: "Stats fetched successfully",
      status: 200
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