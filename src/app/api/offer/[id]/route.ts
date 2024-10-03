import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../../utils/action";

// export const PUT = async (req: NextRequest,{ params }: { params: { id: string } }) => {
//     try {
//         const {title,desc,img,discountedPrice,discountedPercentage,discountedOption,originalPrice,time}:any=await req.json();
//         const {id}=params;
//         const user=await getUserDetails(req);
//         if (!user) {
//             return NextResponse.json({
//                 error: true,
//                 message: "Login to update offer",
//                 status: 403
//             }, { status: 403 });
//         }
//         if (user.role==="User") {
//             return NextResponse.json({
//                 error: true,
//                 message: "Only shop owner can update offer",
//                 status: 403
//             }, { status: 403 });
//         }
//         const shop=await prisma.shop.findMany({where:{userId:user.id}});
//         const isShop = shop.find((shop) => shop.slug === offer?.shopSlug);
//         if(!isShop){
//             return NextResponse.json({
//                 error: true,
//                 message: "You can update offers of your shop only",
//                 status: 403
//             }, { status: 403 });
//         }
//         const offer=await prisma.offer.findUnique({where:{id,softDelete:false}});
//         if(!offer){
//             return NextResponse.json({
//                 error: true,
//                 message: "Offer not found",
//                 status: 404,
//             }, { status: 404 });
//         }
//         const updatedOffer=await prisma.offer.update({
//             where:{
//                 id
//             },
//             data:{
//                 title,
//                 desc,
//                 img,
//                 discountedPrice,
//                 discountedPercentage,
//                 discountedOption,
//                 originalPrice,
//                 time,
//             }
//         });
//         return NextResponse.json({
//             error: false,
//             message: "Offer updated successfully",
//             status: 200,
//             data:updatedOffer
//         }, { status: 200 });
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({
//             error: true,
//             message: "Something went wrong",
//             status: 500,
//         }, { status: 500 });
//     }
// }
// export const GET = async (req: NextRequest,{ params }: { params: { id: string } }) => {
//     try {
//         const {id}=params;
//         const user=await getUserDetails(req);
//         let offers;
//         if(user===null || user.role==="User" || user.role==="Admin"){
//             offers=await prisma.offer.findMany({where:{id,softDelete:false}});
//         }
//         else{
//             const shops=await prisma.shop.findMany({where:{userId:user.id}});
//             offers=await prisma.offer.findMany({where:{id,softDelete:false,shopSlug:{in:shops.map((shop)=>shop.slug)}}});
//         }
//         return NextResponse.json({
//             error: false,
//             message: "Offer updated successfully",
//             status: 200,
//             data:offers
//         }, { status: 200 });
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({
//             error: true,
//             message: "Something went wrong",
//             status: 500,
//         }, { status: 500 });
//     }
// }
// export const DELETE = async (req: NextRequest,{ params }: { params: { id: string } }) => {
//     try {
//         const {id}=params;
//         const user=await getUserDetails(req);
//         if (!user) {
//             return NextResponse.json({
//                 error: true,
//                 message: "Login to delete offer",
//                 status: 403
//             }, { status: 403 });
//         }
//         if (user.role==="User") {
//             return NextResponse.json({
//                 error: true,
//                 message: "Only shop owner can delete offer",
//                 status: 403
//             }, { status: 403 });
//         }
//         const shop=await prisma.shop.findMany({where:{userId:user.id}});
//         const isShop = shop.find((shop) => shop.slug === offer?.shopSlug);
//         if(!isShop){
//             return NextResponse.json({
//                 error: true,
//                 message: "You can delete offers of your shop only",
//                 status: 403
//             }, { status: 403 });
//         }
//         const offer=await prisma.offer.findUnique({where:{id,softDelete:false}});
//         if(!offer){
//             return NextResponse.json({
//                 error: true,
//                 message: "Offer not found",
//                 status: 404,
//             }, { status: 404 });
//         }
//         const deletedOffer=await prisma.offer.update({
//             where:{
//                 id
//             },
//             data:{
//                 softDelete:true
//             }
//         });
//         return NextResponse.json({
//             error: false,
//             message: "Offer deleted successfully",
//             status: 200,
//         }, { status: 200 });
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({
//             error: true,
//             message: "Something went wrong",
//             status: 500,
//         }, { status: 500 });
//     }
// }