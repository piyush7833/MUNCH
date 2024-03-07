"use client"
import { baseUrl } from '@/baseUrl';
import { httpservice } from '@/utils/httpService';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { formatStats } from '@/utils/action';
import LineBarGraph from '../common/Graphs/LineBarGraph';
import { userAuthStore } from '@/utils/userStore';

const fetcher = async (url: string) => {
  try {
    const response = await httpservice.get(url);
    console.log(response.data,"response.data")
    return response.data;
  } catch (error: any) {
    console.log(error)
    toast.error(error.response.data);
  }
}
const Stats = () => {
  useEffect(() => {
    userAuthStore.persist.rehydrate()
  }, [])
  const {role}=userAuthStore();
  const { data, error, isLoading } = useSWR(`${baseUrl}/stats`, fetcher);
  const [selectedShopOwner, setSelectedShopOwner] = useState<any | null>(null);
  const [selectedShop, setSelectedShop] = useState<any | null>(null);
  const [adminGraphData,setAdminGraphData]=useState<any | null>({});
  const actualData = data?.data?.finalData;
  const combinedData=data?.data?.combinedStatsData;
  const adminData=data?.data?.adminData;
  useEffect(() => {
    if (actualData && !selectedShopOwner) {
      setSelectedShopOwner(Object.values(actualData)[0]);
      const owner = Object.values(actualData)[0];
      owner && setSelectedShop(Object.values((owner as any).shopStats)[0]);
    }
    if(adminData){
      setAdminGraphData({
        earning:adminData?.Earning?.dataSet,
        shops:adminData?.Shop?.dataSet,
        users:adminData?.User?.dataSet,
        shopOwners:adminData?.ShopOwner?.dataSet,
      })
    }
  }, [actualData, selectedShopOwner,adminData]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const handleShopOwnerChange = (event: any) => {
    event.preventDefault();
    setSelectedShopOwner(actualData[event.target.value]);
    setSelectedShop(Object.values(actualData[event.target.value]?.shopStats)[0]);
  }
  const handleShopChange = (event: any) => {
    event.preventDefault();
    setSelectedShop(selectedShopOwner?.shopStats[event.target.value]);
  }
  console.log(adminGraphData,"adminGraphData")
  console.log(Object.keys(adminGraphData),"Object.keys(adminGraphData)")
  return (
    <div>
      <h1>Stats</h1>
      <div>
        <select
          name="shopOwner"
          id={"shopOwner"}
          onChange={(event)=>handleShopOwnerChange(event)}
          className="input"
        >
          <option value="" disabled selected>
            {actualData && Object.keys(actualData)?.length > 0 ? (selectedShopOwner?.shopOwnerName || "Select Shop Owner") : "ShopOwner"}
          </option>
          { actualData && Object.keys(actualData)?.map((key:any) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          name="shop"
          id={"shop"}
          onChange={(event)=>handleShopChange(event)}
          className="input"
        >
          <option value="" disabled selected>
            {selectedShopOwner && Object.keys(selectedShopOwner.shopStats)?.length > 0 ?(selectedShop?.slug || "Select Shop" ): "Shop"}
          </option>
          {selectedShopOwner && Object.keys(selectedShopOwner?.shopStats)?.map((key:string) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Total Transaction from platform:</h2>
        <h2>Total Earnings: {combinedData?.totalEarnings}</h2>
        <h2>Best Seller Product: {combinedData?.bestSellerProduct?.title}</h2>
        <h2>Best Seller Total Sales: {combinedData?.bestSellerProduct?.price}</h2>
        <h2>Best Seller Total Quantity: {combinedData?.bestSellerProduct?.quantity}</h2>
        {role==="Admin"  && <div className="graph">
          {adminGraphData?.earning && <LineBarGraph graphData={adminGraphData?.earning} title='Earning' subTitle="Track Your Earnings"/>
          }
          {adminGraphData?.shops && <LineBarGraph graphData={adminGraphData?.shops} title='Shops' subTitle='All shops' />
          }
          {adminGraphData?.users && <LineBarGraph graphData={adminGraphData?.users} title='Users' subTitle='All Users' />
          }
          {adminGraphData?.shopOwners && <LineBarGraph graphData={adminGraphData?.shopOwners} title='Shop Owners' subTitle='All ShopOwners' />
          }
        </div>}
      </div>
    </div>
  )
}

export default Stats
