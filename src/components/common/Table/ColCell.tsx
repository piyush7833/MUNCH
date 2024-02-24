"use client"
import React from "react";
import ImgContainer from "../ImgContainer";
import { formatDate } from "@/utils/action";
import Link from "next/link";
type CustomTableCellProps = {
  value: any;
  variant?: string;
  url?: string;
};

const handleVerify = () => {
  console.log("Verify");
}

const handleStatusChange=()=>{
  console.log("Status Change")
}

const ColCell = ({ value, variant,url }: CustomTableCellProps) => {
  const renderCellContent = () => {
    switch (variant) {
      case "address":
        return (
          <div className="flex gap-2 justify-center">
            <span>{value.street},</span>
            <span>{value.landmark},</span>
            <span>{value.city},</span>
            <span>{value.pincode},</span>
            <span>{value.state}</span>
          </div>
        );
      case "id":
        return <Link href={url!} className="">{value}</Link>
      case "img":
        return <div className=" flex items-center w-full justify-center ">
          <ImgContainer imgUrl={value} alt="product" type="product" />
        </div>
      case "user":
        return <Link href={url!} className="">{value?.name}</Link>
      case "shop":
        return <Link href={url!} className="">{value?.title}</Link>
      case "createdAt":
        return <p className="">{formatDate(value?.split('T')[0])}</p>
      case "products":
        return (value as JSON[]).map((item: any) => ( // Explicitly type 'item' as 'any'
        <div key={item.id} className="flex gap-2 flex-wrap items-center justify-center">
          <span>{item.product.title}</span>
          <span>{item.option}</span>
        </div>
      ))
      case "verified":
        return <p className="">{value ?formatDate(value?.split('T')[0]):"NaN"}</p>
      default:
        return <p className="">{value ? value:"NaN"}</p>;
    }
  };
  return <>{renderCellContent()}</>;
};

export default ColCell;
