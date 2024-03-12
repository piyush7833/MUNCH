"use client"
import { baseUrl } from '@/baseUrl';
import { httpservice } from '@/utils/httpService';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import useSWR from 'swr';
import LineBarGraph from '../common/Graphs/LineBarGraph';
import { userAuthStore } from '@/utils/userStore';
import ContainerLoader from '../common/ContainerLoader';
import StatsCard from '../common/StatsCard';


const fetcher = async (url: string) => {
  try {
    const response = await httpservice.get(url);
    console.log(response.data)
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
  const { userName } = userAuthStore();
  const { data, error, isLoading } = useSWR(`${baseUrl}/stats`, fetcher);
  const [adminGraphData, setAdminGraphData] = useState<any | null>({});
  const [combinedGraphData, setCombinedGraphData] = useState<any | null>({});
  const [ownerGraphData, setOwnerGraphData] = useState<any | null>({});
  const [ownerStats, setOwnerStats] = useState<any | null>({});
  const [shopStats, setShopStats] = useState<any | null>({});
  const [options,setOptions]= useState<any |null>({});
  const ownerData = data?.data?.finalData;
  const combinedData = data?.data?.combinedStatsData;
  const adminData = data?.data?.adminData;


  useEffect(() => {
    if (adminData && Object.keys(adminData).length > 0 && Object.values(adminData).length > 0) {
      setAdminGraphData({
        earning: adminData?.Earning,
        shops: adminData?.Shop,
        users: adminData?.User,
        shopOwners: adminData?.ShopOwner,
      })
      setOptions({
        admin:["total","verified","active","deleted"],
      })
    }
    if (combinedData && Object?.keys(combinedData).length > 0 && Object?.values(combinedData).length > 0) {
      setCombinedGraphData({
        ShopOwnerQuantityGraphData: (Object.values(combinedData?.ShopOwnerQuantityGraphData) as any)[0],
        ShopOwnerValueGraphData: (Object.values(combinedData?.ShopOwnerValueGraphData) as any)[0],
      })
      setOptions({
        owner:(Object.keys(combinedData?.ShopOwnerQuantityGraphData) as any)      })
      }
    if (ownerData && Object?.keys(ownerData).length > 0 && Object?.values(ownerData).length > 0) {
      const firstSinglProductGraphData = (Object?.values((Object.values(ownerData) as any)[0].shopStats) as any)[0];
      setOwnerGraphData({
        shopQuantityGraphData: (Object?.values((Object.values(ownerData) as any)[0].shopQuantityGraphData) as any)[0],
        shopValueGraphData: (Object?.values((Object.values(ownerData) as any)[0].shopValueGraphData) as any)[0],
        SingleProductQuantityGraphData: (Object.values(firstSinglProductGraphData?.singleProductQuantityGraphData) as any)[0],
        SingleProductValueGraphData: (Object.values(firstSinglProductGraphData?.singleProductValueGraphData) as any)[0],
      })
      setOptions({
        shop:(Object?.keys((Object.values(ownerData) as any)[0].shopQuantityGraphData) as any),
        products:(Object.keys(firstSinglProductGraphData?.singleProductValueGraphData) as any)
      })
    }
    if (ownerData && Object?.keys(ownerData).length > 0 && Object?.values(ownerData).length > 0) {
      setOwnerStats({
        totalEarnings: (Object.values(ownerData) as any)[0].totalEarnings,
        bestSeller: (Object.values(ownerData) as any)[0].bestSellerProduct,
      })
    }
    if (ownerData && Object?.keys(ownerData).length > 0 && Object?.values(ownerData).length > 0 && Object?.values((Object.values(ownerData) as any)[0].shopStats).length > 0) {
      setShopStats({
        totalEarnings: (Object?.values((Object.values(ownerData) as any)[0].shopStats) as any)[0]?.totalEarnings,
        bestSeller: (Object?.values((Object.values(ownerData) as any)[0].shopStats) as any)[0]?.bestSellerProduct,
      })
    }
  }, [adminData, combinedData, ownerData]);
  if (!userName || !data) {
    return null;
  }
  if (isLoading) return <div className=" w-screen lg:h-[90vh] h-[60vh] flex">
    <ContainerLoader message='MUNCH stats are loading' />
  </div>;
  if (error) {
    return <p>Error</p>;
  }
  // console.log(options)
  return (
    <div className='p-8'>
      <h1>Stats</h1>
      <div className='flex gap-16 flex-col'>

        <div className="stats flex flex-col gap-4">
          <h1>Admin Stats</h1>
          <div className="stats flex flex-row flex-wrap gap-4 justify-between">
            <StatsCard title='Admin Earning' value={"Nan"} />
            <StatsCard title='Total Earnings' value={combinedData && combinedData?.totalEarnings} />
            <StatsCard title="Best Seller Product" value={combinedData && combinedData?.bestSellerProduct?.title} />
            <StatsCard title="Best Seller Total Revenue" value={combinedData && combinedData?.bestSellerProduct?.price} />
            <StatsCard title="Best Seller Total Quantity" value={combinedData && combinedData?.bestSellerProduct?.quantity} />
          </div>
          <div className="graphs flex flex-wrap justify-between gap-10 text-main">
            {adminData && Object?.keys(adminData).length > 0 && Object?.entries(adminGraphData).map(([key, value]) => (
              <LineBarGraph graphData={(value as any).dataSet} key={key} title={(value as any).title} subTitle={(value as any).subTitle} XLabel={(value as any).xLabel} YLabel={(value as any).yLabel} valueKey={(value as any).valueKey} />
            ))}
          </div>
        </div>


        <div className="stats flex flex-col gap-4">
          <h2>Owner stats</h2>
          <div className="stats flex flex-row flex-wrap gap-4 justify-between">
            <StatsCard title="Total Sales" value={ownerStats && ownerStats?.totalEarnings} />
            <StatsCard title="Best Seller Product" value={ownerStats && ownerStats?.bestSeller?.title} />
            <StatsCard title="Best Seller Total Revenue" value={ownerStats && ownerStats?.bestSeller?.price} />
            <StatsCard title="Best Seller Total Quantity" value={ownerStats && ownerStats?.bestSeller?.quantity} />
          </div>
          <div className="graphs flex flex-wrap justify-between gap-10 text-main">
            {combinedData && Object?.keys(combinedData).length > 0 && Object?.keys(combinedGraphData).length > 0 && Object.entries(combinedGraphData).map(([key, value]) => (
              <LineBarGraph graphData={(value as any).dataSet} key={key} title={(value as any).title} subTitle={(value as any).subTitle} XLabel={(value as any).xLabel} YLabel={(value as any).yLabel} valueKey={(value as any).valueKey} />
            ))}
          </div>
        </div>

        <div className="stats flex flex-col gap-4">
          <h2>Shop stats</h2>
          <div className="stats flex flex-row flex-wrap gap-4 justify-between">
            <StatsCard title="Total Sales" value={shopStats && shopStats?.totalEarnings} />
            <StatsCard title="Best Seller Product" value={shopStats && shopStats?.bestSeller?.title} />
            <StatsCard title="Best Seller Total Revenue" value={shopStats && shopStats?.bestSeller?.price} />
            <StatsCard title="Best Seller Total Quantity" value={shopStats && shopStats?.bestSeller?.quantity} />
          </div>
          <div className="graphs flex flex-wrap justify-between gap-10 text-main">
            {ownerData && Object?.keys(ownerData).length > 0 && Object?.entries(ownerGraphData).map(([key, value]) => (
              <LineBarGraph graphData={(value as any).dataSet} key={key} title={(value as any).title} subTitle={(value as any).subTitle} XLabel={(value as any).xLabel} YLabel={(value as any).yLabel} valueKey={(value as any).valueKey} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
