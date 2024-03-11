"use client"
import { baseUrl } from '@/baseUrl';
import { httpservice } from '@/utils/httpService';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import useSWR from 'swr';
import LineBarGraph from '../common/Graphs/LineBarGraph';
import { userAuthStore } from '@/utils/userStore';


const fetcher = async (url: string) => {
  try {
    const response = await httpservice.get(url);
    return response.data;
  } catch (error: any) {
    console.log(error)
    return toast.error(error.response.data.message);
  }
}
const Stats = () => {
  useEffect(() => {
    userAuthStore.persist.rehydrate()
  }, [])
  const { userName, role } = userAuthStore();
  const { data, error, isLoading } = useSWR(`${baseUrl}/stats`, fetcher);
  const [adminGraphData, setAdminGraphData] = useState<any | null>({});
  const [combinedGraphData, setCombinedGraphData] = useState<any | null>({});
  const [ownerGraphData, setOwnerGraphData] = useState<any | null>({});
  const [ownerStats, setOwnerStats] = useState<any | null>({});//[earning,shops,users,shopOwners
  const [shopStats, setShopStats] = useState<any | null>({});//[earning,shops,users,shopOwners
  const ownerData = data?.data?.finalData;
  const combinedData = data?.data?.combinedStatsData;
  const adminData = data?.data?.adminData;


  useEffect(() => {
    if (adminData) {
      setAdminGraphData({
        earning: adminData?.Earning,
        shops: adminData?.Shop,
        users: adminData?.User,
        shopOwners: adminData?.ShopOwner,
      })
    }
    if (combinedData) {
      setCombinedGraphData({
        ShopOwnerQuantityGraphData: (Object.values(combinedData?.ShopOwnerQuantityGraphData) as any)[0],
        ShopOwnerValueGraphData: (Object.values(combinedData?.ShopOwnerValueGraphData) as any)[0],
      })
    }
    if (ownerData) {
      const firstSinglProductGraphData = (Object?.values((Object.values(ownerData) as any)[0].shopStats) as any)[0];
      setOwnerGraphData({
        shopQuantityGraphData: (Object?.values((Object.values(ownerData) as any)[0].shopQuantityGraphData) as any)[0],
        shopValueGraphData: (Object?.values((Object.values(ownerData) as any)[0].shopValueGraphData) as any)[0],
        SingleProductQuantityGraphData : (Object.values(firstSinglProductGraphData?.singleProductQuantityGraphData)as any)[0],
        SingleProductValueGraphData : (Object.values(firstSinglProductGraphData?.singleProductValueGraphData)as any)[0],
      })
    }
    if (ownerData) {
      setOwnerStats({
        totalEarnings: (Object.values(ownerData) as any)[0].totalEarnings,
        bestSeller: (Object.values(ownerData) as any)[0].bestSellerProduct,
      })
    }
    if(ownerData){
      setShopStats({
        totalEarnings: (Object?.values((Object.values(ownerData) as any)[0].shopStats) as any)[0]?.totalEarnings,
        bestSeller: (Object?.values((Object.values(ownerData) as any)[0].shopStats) as any)[0]?.bestSellerProduct,
      })
    }
  }, [adminData, combinedData, ownerData]);
  if(!userName){
    return null;
  }
  if (isLoading) return <p>Loading...</p>;
  if (error)  {
    console.log("object",error)
    return <p>Error</p>;}
  // if (!userName) {
  //   return null;
  // }
  return (
    <div>
      <h1>Stats</h1>
      <div>
        <h1>Admin Stats</h1>
        <h2>Total Transaction from platform:</h2>
        <h2>Total Earnings: {combinedData?.totalEarnings}</h2>
        <h2>Best Seller Product: {combinedData?.bestSellerProduct?.title}</h2>
        <h2>Best Seller Total Sales: {combinedData?.bestSellerProduct?.price}</h2>
        <h2>Best Seller Total Quantity: {combinedData?.bestSellerProduct?.quantity}</h2>
        <h2>Owner stats</h2>
        <h2>Total Earnings: {ownerStats?.totalEarnings}</h2>
        <h2>Best Seller Product: {ownerStats?.bestSeller?.title}</h2>
        <h2>Best Seller Total Sales: {ownerStats?.bestSeller?.price}</h2>
        <h2>Best Seller Total Quantity: {ownerStats?.bestSeller?.quantity}</h2>
        <h2>Shop stats</h2>
        <h2>Total Earnings: {shopStats?.totalEarnings}</h2>
        <h2>Best Seller Product: {shopStats?.bestSeller?.title}</h2>
        <h2>Best Seller Total Sales: {shopStats?.bestSeller?.price}</h2>
        <h2>Best Seller Total Quantity: {shopStats?.bestSeller?.quantity}</h2>
        <div className="graphs flex flex-wrap justify-around gap-10 text-main">

        {adminData && Object?.keys(adminData).length > 0 && Object?.entries(adminGraphData).map(([key, value]) => (
          <LineBarGraph graphData={(value as any).dataSet} key={key} title={(value as any).title} subTitle={(value as any).subTitle} XLabel={(value as any).xLabel} YLabel={(value as any).yLabel} valueKey={(value as any).valueKey} />
        ))}
        {combinedData && Object?.keys(combinedData).length > 0 &&  Object?.keys(combinedGraphData).length > 0 && Object.entries(combinedGraphData).map(([key, value]) => (
          <LineBarGraph graphData={(value as any).dataSet}key={key} title={(value as any).title} subTitle={(value as any).subTitle} XLabel={(value as any).xLabel} YLabel={(value as any).yLabel} valueKey={(value as any).valueKey}/>
        ))}

        {ownerData && Object?.keys(ownerData).length > 0 && Object?.entries(ownerGraphData).map(([key, value]) => (
          <LineBarGraph graphData={(value as any).dataSet} key={key} title={(value as any).title} subTitle={(value as any).subTitle} XLabel={(value as any).xLabel} YLabel={(value as any).yLabel} valueKey={(value as any).valueKey}/>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Stats
