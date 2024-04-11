"use client";
import { baseUrl } from "@/baseUrl";
import { httpservice } from "@/utils/httpService";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import LineBarGraph from "../common/Graphs/LineBarGraph";
import { userAuthStore } from "@/utils/userStore";
import ContainerLoader from "../common/ContainerLoader";
import StatsCard from "../common/StatsCard";
import Error from "../common/Error";

const fetcher = async (url: string) => {
  const response = await httpservice.get(url);
  return response.data;
};
const Stats = () => {
  useEffect(() => {
    userAuthStore.persist.rehydrate();
  }, []);
  const { role } = userAuthStore();
  const { data, error, isLoading } = useSWR(`${baseUrl}/stats`, fetcher);

  const [adminGraphData, setAdminGraphData] = useState<any | null>({}); //for admin
  const [combinedGraphData, setCombinedGraphData] = useState<any | null>({}); //for owner
  const [shopGraphData, setShopGraphData] = useState<any | null>({}); //for shops
  const [productGraphData, setProductGraphData] = useState<any | null>({}); //for shops
  const [ownerStats, setOwnerStats] = useState<any | null>({});
  const [shopStats, setShopStats] = useState<any | null>({});
  const [owner, setOwner] = useState<string | null>();
  const [shop, setShop] = useState<string | null>();
  const [product, setProduct] = useState<string | null>();
  const [valueChange, setValueChange] = useState<string | null>();
  const ownerData = data?.data?.finalData;
  const combinedData = data?.data?.combinedStatsData;
  const adminData = data?.data?.adminData;
  useEffect(() => {
    if (
      adminData &&
      Object.keys(adminData).length > 0 &&
      Object.values(adminData).length > 0
    ) {
      const { Earning, Shop, User, ShopOwner } = adminData;
      setAdminGraphData({
        earning: Earning,
        shops: Shop,
        users: User,
        shopOwners: ShopOwner,
      });
    }
    if (
      combinedData &&
      Object?.keys(combinedData).length > 0 &&
      Object?.values(combinedData).length > 0 &&
      !owner
    ) {
      const { ShopOwnerQuantityGraphData, ShopOwnerValueGraphData } =
        combinedData;
      setOwner(Object.keys(ShopOwnerQuantityGraphData)[0]);
      setCombinedGraphData({
        ShopOwnerQuantityGraphData,
        ShopOwnerValueGraphData,
      });
    }
    if (
      ownerData &&
      Object?.keys(ownerData).length > 0 &&
      Object?.values(ownerData).length > 0
    ) {
      owner &&
        (valueChange === "owner" || !valueChange) &&
        setShop(Object.keys(ownerData[owner as string].shopStats)[0]);
      owner &&
        shop &&
        (valueChange === "owner" || valueChange === "shop" || !valueChange) &&
        ownerData[owner as string].shopStats[shop as string] &&
        Object.keys(ownerData[owner as string]).length > 0 &&
        Object.keys(ownerData[owner as string].shopStats[shop as string])
          .length > 0 &&
        setProduct(
          Object.keys(
            ownerData[owner as string].shopStats[shop as string]
              .singleProductQuantityGraphData
          )[0]
        );
      owner;

      setShopGraphData({
        shopQuantityGraphData:
          ownerData[owner as string]?.shopQuantityGraphData ?? null,
        shopValueGraphData:
          ownerData[owner as string]?.shopValueGraphData ?? null,
      });
      owner &&
        shop &&
        ownerData[owner as string] &&
        ownerData[owner as string].shopStats[shop as string] &&
        setProductGraphData({
          SingleProductQuantityGraphData:
            ownerData[owner as string].shopStats[shop as string]
              .singleProductQuantityGraphData ?? null,
          SingleProductValueGraphData:
            ownerData[owner as string].shopStats[shop as string]
              .singleProductValueGraphData ?? null,
        });
    }

    if (
      ownerData &&
      Object?.keys(ownerData).length > 0 &&
      Object?.values(ownerData).length > 0
    ) {
      setOwnerStats({
        totalEarnings: (Object.values(ownerData) as any)[0]?.totalEarnings,
        bestSeller: (Object.values(ownerData) as any)[0]?.bestSellerProduct,
      });
    }
    if (
      ownerData &&
      Object?.keys(ownerData).length > 0 &&
      Object?.values(ownerData).length > 0 &&
      Object?.values((Object.values(ownerData) as any)[0].shopStats).length > 0
    ) {
      setShopStats({
        totalEarnings: (
          Object?.values((Object.values(ownerData) as any)[0].shopStats) as any
        )[0]?.totalEarnings,
        bestSeller: (
          Object?.values((Object.values(ownerData) as any)[0].shopStats) as any
        )[0]?.bestSellerProduct,
      });
    }
  }, [adminData, combinedData, ownerData, owner, shop]);
  if (isLoading)
    return (
      <div className=" w-screen lg:h-[90vh] h-[60vh] flex">
        <ContainerLoader message="MUNCH stats are loading" />
      </div>
    );
  if (error) {
    return (
      <div className=" w-screen lg:h-[90vh] h-[60vh] flex">
        <Error message={error.response.data.message} />
      </div>
    );
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    name: string
  ) => {
    console.log(e.target.value, name);
    e.preventDefault();
    if (name === "owner") {
      setOwner(e.target.value);
      setValueChange("owner");
    }
    if (name === "shop") {
      setShop(e.target.value);
      setValueChange("shop");
    }
    if (name === "product") {
      setProduct(e.target.value);
      setValueChange("product");
    }
  };
  console.log(productGraphData, "productGraphData");
  return (
    <div className="main">
      <h1>Stats</h1>
      <div className="flex gap-16 flex-col">
        {role === "Admin" && (
          <div className="stats flex flex-col gap-4">
            <h1>Admin Stats</h1>
            <div className="stats flex flex-row flex-wrap gap-4 justify-between">
              <StatsCard title="Admin Earning" value={"Nan"} />
              <StatsCard
                title="Total Earnings"
                value={combinedData && combinedData?.totalEarnings}
              />
              <StatsCard
                title="Best Seller Product"
                value={combinedData && combinedData?.bestSellerProduct?.title}
              />
              <StatsCard
                title="Best Seller Total Revenue"
                value={combinedData && combinedData?.bestSellerProduct?.price}
              />
              <StatsCard
                title="Best Seller Total Quantity"
                value={
                  combinedData && combinedData?.bestSellerProduct?.quantity
                }
              />
            </div>
            <div className="graphs flex flex-wrap justify-between gap-10 text-main">
              <div className="w-full">
                <select
                  name={"admin"}
                  id={"admin"}
                  onChange={(e) => handleChange(e, "admin")}
                  className="input w-1/2"
                >
                  {/* <option value="" disabled selected>
                    {"Total"}
                  </option> */}
                  {["Total", "Verified", "Active", "Deleted"]?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {adminData &&
                Object?.keys(adminData).length > 0 &&
                Object?.entries(adminGraphData).map(([key, value]) => (
                  <LineBarGraph
                    graphData={(value as any).dataSet}
                    key={key}
                    title={(value as any).title}
                    subTitle={(value as any).subTitle}
                    XLabel={(value as any).xLabel}
                    YLabel={(value as any).yLabel}
                    valueKey={(value as any).valueKey}
                  />
                ))}
            </div>
          </div>
        )}



        <div className="stats flex flex-col gap-4">
          <h2>Owner stats</h2>
          <div className="stats flex flex-row flex-wrap gap-4 justify-between">
            <StatsCard
              title="Total Sales"
              value={ownerStats && ownerStats?.totalEarnings}
            />
            <StatsCard
              title="Best Seller Product"
              value={ownerStats && ownerStats?.bestSeller?.title}
            />
            <StatsCard
              title="Best Seller Total Revenue"
              value={ownerStats && ownerStats?.bestSeller?.price}
            />
            <StatsCard
              title="Best Seller Total Quantity"
              value={ownerStats && ownerStats?.bestSeller?.quantity}
            />
          </div>
          {role==="Admin" && <div className="w-full">
            <select
              name={"owner"}
              id={"owner"}
              onChange={(e) => handleChange(e, "owner")}
              className="input w-1/2"
            >
              {/* <option value="" disabled selected>
                {owner || "select owner"}
              </option> */}
              {combinedData &&
                combinedGraphData &&
                Object.keys(combinedGraphData).length > 0 &&
                Object?.keys(combinedGraphData.ShopOwnerQuantityGraphData).map(
                  (option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  )
                )}
            </select>
          </div>}
          <div className="graphs flex flex-wrap justify-between gap-10 text-main">
            {combinedData &&
              owner &&
              combinedGraphData &&
              Object?.keys(combinedData).length > 0 &&
              Object?.keys(combinedGraphData).length > 0 &&
              owner &&
              Object.entries(combinedGraphData).map(([key, value]) => (
                <LineBarGraph
                  graphData={(value as any)[owner as string].dataSet}
                  key={key}
                  title={(value as any)[owner as string].title}
                  subTitle={(value as any)[owner as string].subTitle}
                  XLabel={(value as any)[owner as string].xLabel}
                  YLabel={(value as any)[owner as string].yLabel}
                  valueKey={(value as any)[owner as string].valueKey}
                />
              ))}
          </div>
        </div>




        <div className="stats flex flex-col gap-4">
          <h2>Shop stats</h2>
          <div className="stats flex flex-row flex-wrap gap-4 justify-between">
            <StatsCard
              title="Total Sales"
              value={shopStats && shopStats?.totalEarnings}
            />
            <StatsCard
              title="Best Seller Product"
              value={shopStats && shopStats?.bestSeller?.title}
            />
            <StatsCard
              title="Best Seller Total Revenue"
              value={shopStats && shopStats?.bestSeller?.price}
            />
            <StatsCard
              title="Best Seller Total Quantity"
              value={shopStats && shopStats?.bestSeller?.quantity}
            />
          </div>
          <div className="w-full">
            <select
              name={"shop"}
              id={"shop"}
              onChange={(e) => handleChange(e, "shop")}
              className="input w-1/2"
            >
              {/* <option value="" disabled selected>
                {shop || "Select shop"}
              </option> */}
              {ownerData &&
                shopGraphData &&
                shopGraphData.shopQuantityGraphData &&
                Object.keys(shopGraphData).length > 0 &&
                Object.keys(shopGraphData.shopQuantityGraphData).length > 0 &&
                Object.keys(shopGraphData.shopQuantityGraphData)?.map(
                  (option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  )
                )}
            </select>
          </div>
          <div className="graphs flex flex-wrap justify-between gap-10 text-main">
            {ownerData &&
              Object?.keys(ownerData).length > 0 &&
              shop &&
              Object?.entries(shopGraphData).map(([key, value]) => (
                <LineBarGraph
                  graphData={(value as any)[shop as string].dataSet}
                  key={key}
                  title={(value as any)[shop as string].title}
                  subTitle={(value as any)[shop as string].subTitle}
                  XLabel={(value as any)[shop as string].xLabel}
                  YLabel={(value as any)[shop as string].yLabel}
                  valueKey={(value as any)[shop as string].valueKey}
                />
              ))}



            <h2>Product Stats</h2>
            <div className="w-full">
              <select
                name={"product"}
                id={"product"}
                onChange={(e) => handleChange(e, "product")}
                className="input w-1/2"
              >
                {/* <option value="" disabled selected>
                  {productGraphData.SingleProductQuantityGraphData[product as string].id || "Select food item"}
                </option> */}
                {ownerData &&
                  shopGraphData &&
                  shopGraphData.shopQuantityGraphData &&
                  Object.keys(productGraphData).length > 0 &&
                  Object.keys(productGraphData.SingleProductQuantityGraphData).length > 0 &&
                  Object.keys(productGraphData.SingleProductQuantityGraphData)?.map(
                    (option) => (
                      <option key={option} value={option}>
                        {productGraphData.SingleProductQuantityGraphData[option].id}
                      </option>
                    )
                  )}
              </select>
            </div>
            {ownerData &&
              Object?.keys(ownerData).length > 0 &&
              product &&
              Object?.entries(productGraphData).map(([key, value]) => (
                <LineBarGraph
                  graphData={(value as any)[product as string].dataSet}
                  key={key}
                  title={(value as any)[product as string].title}
                  subTitle={(value as any)[product as string].subTitle}
                  XLabel={(value as any)[product as string].xLabel}
                  YLabel={(value as any)[product as string].yLabel}
                  valueKey={(value as any)[product as string].valueKey}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
