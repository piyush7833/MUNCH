import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../utils/action";
import { prisma } from "@/utils/connect";

const formatDateFilter = (date: Date | string) => {
  if (typeof date === "string") {
    date = date.split('T')[0];
  }
  else {
    date = date.toISOString().split('T')[0];
  }
  return date;
}

const formatDateSave = (date: string | Date) => {
  if (typeof date === "string") {
    date = date.split('T')[0];
    date = new Date(date);
  }
  else {
    date = date.toISOString().split('T')[0];
    date = new Date(date);
  }
  return new Date(date);
}

//it will be handle on frontend as shop quantity and value graph data is already provided and we have to create date filters their
// const ShopComparisonValueGraphData: { [key: string]: { id: string, dataSet: { date: Date, value: number }[] } } = {};
// const ShopComparisonQuantityGraphData: { [key: string]: { id: string, dataSet: { date: Date, value: number }[] } } = {};
//product comparison chart data can be handled on frontend as product graph data is already provided
const calculateStats = (shops: any[]) => {
  let totalEarnings = 0;
  let bestSellerProductAllShops: any | null = null;

  const ShopQuantityGraphData: { [key: string]: { id: string, title?: string, subTitle?: string, xLabel?: string, yLabel?: string, valueKey?: string, dataSet: { date: Date, quantity: number }[] } } = {};

  const ShopValueGraphData: { [key: string]: { id: string, title?: string, subTitle?: string, xLabel?: string, yLabel?: string, valueKey?: string, dataSet: { date: Date, price: number }[] } } = {};

  const shopStats: { [key: string]: { slug: string, bestSellerProduct: any | null; singleProductQuantityGraphData: { [key: string]: { id: string, title?: string, subTitle?: string, xLabel?: string, yLabel?: string, valueKey?: string, dataSet: { date: Date, quantity: number }[] } }; singleProductValueGraphData: { [key: string]: { id: string, title?: string, subTitle?: string, xLabel?: string, yLabel?: string, valueKey?: string, dataSet: { date: Date, price: number }[] } } } } = {};

  shops?.forEach((shop: any) => {
    let bestSellerProductShop: any | null = null;

    const singleProductQuantityGraphData: { [key: string]: { id: string, title?: string, subTitle?: string, xLabel?: string, yLabel?: string, valueKey?: string, dataSet: { date: Date, quantity: number }[] } } = {};

    const singleProductValueGraphData: { [key: string]: { id: string, title?: string, subTitle?: string, xLabel?: string, yLabel?: string, valueKey?: string, dataSet: { date: Date, price: number }[] } } = {};
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
        // console.log(product.product.id,"product.product.id")
        singleProductQuantityGraphData[product.product.id] = singleProductQuantityGraphData[product.product.id] || { id: product.product.title,title:`Quantity sold for ${product.product.title}`, subTitle:"Track the Number of Units Sold Over Time", xLabel:"Date",yLabel:"Quantity",valueKey:"quantity", dataSet: []};
        singleProductValueGraphData[product.product.id] = singleProductValueGraphData[product.product.id] || { id: product.product.title,title:`Total Revenue for ${product.product.title}`, subTitle:"Monitor Revenue Generated Over Time", xLabel:"Date",yLabel:"Revenue",valueKey:"price", dataSet: [] };
        
        const existingProductQuantity = singleProductQuantityGraphData[product.product.id].dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(order.createdAt));
        const existingProductValue = singleProductValueGraphData[product.product.id].dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(order.createdAt));

        if (existingProductQuantity === undefined) {
          singleProductQuantityGraphData[product.product.id].dataSet.push({ date: formatDateSave(order.createdAt), quantity: product.quantity.toNumber() });
        } else {
          existingProductQuantity.quantity += product.quantity.toNumber();
        }
        if (existingProductValue === undefined) {
          singleProductValueGraphData[product.product.id].dataSet.push({ date: formatDateSave(order.createdAt), price: product.price.toNumber() });
        }
        else {
          existingProductValue.price += product.price.toNumber();
        }
      });


      //shop graph data as per dates
      ShopValueGraphData[shop.slug] = ShopValueGraphData[shop.slug] || { id: shop.slug, title:`Total Revenue for ${shop.title}`, subTitle:"Monitor Revenue Generated Over Time", xLabel:"Date",yLabel:"Revenue",valueKey:"price", dataSet: [] };
      ShopQuantityGraphData[shop.slug] = ShopQuantityGraphData[shop.slug] || { id: shop.slug,title:`Quantity sold for ${shop.title}`, subTitle:"Track the Number of Units Sold Over Time", xLabel:"Date",yLabel:"Quantity",valueKey:"quantity", dataSet: [] };
      const existingShopByQuantity = ShopQuantityGraphData[shop.slug]?.dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(order.createdAt));
      const existingShopByValue = ShopValueGraphData[shop.slug]?.dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(order.createdAt));
      const quantity = order.products.reduce((acc: any, product: any) => acc + product.quantity.toNumber(), 0)
      if (existingShopByQuantity === undefined) {
        ShopQuantityGraphData[shop.slug].dataSet.push({ date: formatDateSave(order.createdAt), quantity: quantity });
      }
      else {
        existingShopByQuantity.quantity += quantity;
      }
      if (existingShopByValue === undefined) {
        ShopValueGraphData[shop.slug].dataSet.push({ date: formatDateSave(order.createdAt), price: order.totalPrice.toNumber() });
      }
      else {
        existingShopByValue.price += order.totalPrice.toNumber();
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
  const ShopOwnerQuantityGraphData: { [key: string]: { id: string, title?: string, subTitle?: string, xLabel?: string, yLabel?: string, valueKey?: string, dataSet: { date: Date, quantity: number }[] } } = {};
  const ShopOwnerValueGraphData: { [key: string]: { id: string, title?: string, subTitle?: string, xLabel?: string, yLabel?: string, valueKey?: string, dataSet: { date: Date, price: number }[] } } = {};
  data.forEach((stats: any) => {
    totalEarnings += stats.totalEarnings;
    // Update best seller product
    if (!bestSellerProduct || (stats.bestSellerProduct && (stats.bestSellerProduct.quantity > bestSellerProduct.quantity || stats.bestSellerProduct.price > bestSellerProduct.price))) {
      bestSellerProduct = stats.bestSellerProduct;
    }
    // Update shop graph data for all shops
    Object.keys(stats.shopQuantityGraphData).forEach((key) => {
      ShopOwnerQuantityGraphData[stats?.shopOwnerName] = ShopOwnerQuantityGraphData[stats?.shopOwnerName] || { id: stats.shopOwnerName, title:`Quantity sold for ${stats.shopOwnerName}`, subTitle:"Track the Number of Units Sold Over Time", xLabel:"Date",yLabel:"Quantity",valueKey:"quantity",dataSet: [] };
      stats.shopQuantityGraphData[key].dataSet.forEach((data: { date: Date, quantity: number }) => {
        const existingData = ShopOwnerQuantityGraphData[stats.shopOwnerName].dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(data.date));
        if (existingData) {
          existingData.quantity += data.quantity;
        } else {
          ShopOwnerQuantityGraphData[stats.shopOwnerName].dataSet.push(data);
        }
      });
    });
    Object.keys(stats.shopValueGraphData).forEach((key) => {
      ShopOwnerValueGraphData[stats?.shopOwnerName] = ShopOwnerValueGraphData[stats?.shopOwnerName] || { id: stats.shopOwnerName, title:`Total Revenue for ${stats.shopOwnerName}`, subTitle:"Monitor Revenue Generated Over Time", xLabel:"Date",yLabel:"Revenue",valueKey:"price",dataSet: [] };
      stats.shopValueGraphData[key].dataSet.forEach((data: { date: Date, price: number }) => {
        const existingData = ShopOwnerValueGraphData[stats.shopOwnerName].dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(data.date));
        if (existingData) {
          existingData.price += data.price;
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
  const adminGraphData: { [key: string]: { id: string, title?: string, subTitle?: string, xLabel?: string, yLabel?: string, valueKey?: string, dataSet: { date: Date, total: number, verified?: number, active?: number, deleted?: number }[] } } = {};
  data.user.forEach((user: any) => {
    adminGraphData["User"] = adminGraphData["User"] || { id: "User",title:`Total user onboarded`, subTitle:"Monitor user growth over time", xLabel:"Date",yLabel:"User",valueKey:"total", dataSet: [] };
    const existingUser = adminGraphData["User"].dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(user.createdAt));
    if (existingUser) {
      existingUser.total += 1;
      existingUser.verified! += user.verified ? 1 : 0;
      existingUser.active! += user.softDelete ? 0 : 1;
      existingUser.deleted! += user.softDelete ? 1 : 0;
    }
    else {
      adminGraphData["User"].dataSet.push({ date: formatDateSave(user.createdAt), total: 1, verified: user.verified ? 1 : 0, active: user.softDelete ? 0 : 1, deleted: user.softDelete ? 1 : 0 });
    }
  });

  data.shopOwner.forEach((shopOwner: any) => {
    adminGraphData["ShopOwner"] = adminGraphData["ShopOwner"] || { id: "ShopOwner",title:`Total shop owner onboarded`, subTitle:"Monitor shop owner growth over time", xLabel:"Date",yLabel:"Shop Owner",valueKey:"total", dataSet: [] };
    const existingShopOwner = adminGraphData["ShopOwner"].dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(shopOwner.createdAt));
    if (existingShopOwner) {
      existingShopOwner.total += 1;
      existingShopOwner.verified! += shopOwner.verified ? 1 : 0;
      existingShopOwner.active! += shopOwner.softDelete ? 0 : 1;
      existingShopOwner.deleted! += shopOwner.softDelete ? 1 : 0;
    }
    else {
      adminGraphData["ShopOwner"].dataSet.push({ date: formatDateSave(shopOwner.createdAt), total: 1, verified: shopOwner.verified ? 1 : 0, active: shopOwner.softDelete ? 0 : 1, deleted: shopOwner.softDelete ? 1 : 0 });
    }
  });
  data.shop.forEach((shop: any) => {
    adminGraphData["Shop"] = adminGraphData["Shop"] || { id: "Shop",title:`Total shop onboarded`, subTitle:"Monitor shop growth over time", xLabel:"Date",yLabel:"User",valueKey:"total", dataSet: [] };
    const existingShop = adminGraphData["Shop"].dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(shop.createdAt));
    if (existingShop) {
      existingShop.total += 1;
      existingShop.verified! += shop.verified ? 1 : 0;
      existingShop.active! += shop.softDelete ? 0 : 1;
      existingShop.deleted! += shop.softDelete ? 1 : 0;
    }
    else {
      adminGraphData["Shop"].dataSet.push({ date: formatDateSave(shop.createdAt), total: 1, verified: shop.verified ? 1 : 0, active: shop.softDelete ? 0 : 1, deleted: shop.softDelete ? 1 : 0 });
    }
  });

  data.order.forEach((order: any) => {
    adminGraphData["Earning"] = adminGraphData["Earning"] || { id: "Earning",title:`Total earning via platform fee`, subTitle:"Monitor revenue growth over time", xLabel:"Date", yLabel:"Revenue", valueKey:"total", dataSet: [] };
    const existingOrder = adminGraphData["Earning"].dataSet.find((existing) => formatDateFilter(existing.date) === formatDateFilter(order.createdAt));
    if (existingOrder) {
      existingOrder.total += order.platformFee.toNumber();
    }
    else {
      adminGraphData["Earning"].dataSet.push({ date: formatDateSave(order.createdAt), total: 1 });
    }
  });
  return adminGraphData;
}

export const GET = async (req: NextRequest) => {
  try {
    const user = await getUserDetails(req);
    if (!user) {
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
          shops: {
            include: {
              orders: {
                where: {
                  status: "Delievered" // Filter orders by status
                }, include: { products: { include: { product: true } } }
              }
            }
          },
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
          shops: {
            include: {
              orders: {
                where: {
                  status: "Delievered" // Filter orders by status
                }, include: { products: { include: { product: true } } }
              }
            }
          },
        },
      });
      const user = await prisma.user.findMany({});
      const shopOwner = await prisma.shopOwner.findMany({});
      const shop = await prisma.shop.findMany({});
      const order = await prisma.order.findMany({ where: { status: "Delievered" } });
      adminData = adminStats({ user, shopOwner, shop, order });
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
    if (user.role === "User") {

    }
    return NextResponse.json({
      error: false,
      data: { finalData, combinedStatsData: combineStats(Object.values(finalData)), adminData: adminData },
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