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
        return 
      case "img":
        return <div className=" flex items-center w-full justify-center ">
          <ImgContainer imgUrl={value} alt="product" type="product" />
        </div>
      case "user":
        return <Link href={url!} className="">{value.name}</Link>
      case "createdAt":
        return <p className="">{formatDate(value.split('T')[0])}</p>
      case "userId":
        return 
      case "verified":
        return <p className="">{value ?formatDate(value.split('T')[0]):"NaN"}</p>
      default:
        return <p className="">{value ? value:"NaN"}</p>;
    }
  };
  return <>{renderCellContent()}</>;
};

export default ColCell;
