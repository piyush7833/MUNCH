"use client"
import React, { useState } from "react";
import ColCell from "./ColCell";
import PreviewIcon from '@mui/icons-material/Preview';
import DataDialog from "../DataDialog";

type propsType = {
  data: any[];
  keys: string[];
  originalData?: any[];
  type?: string;
  handleUpdate?: () => void;
};

const CustomTable = ({ data, keys, originalData, type,handleUpdate }: propsType) => {
  const [selectedData, setSelectedData] = useState<any>(null);

  const handlePreviewIconClick = (shopData: any) => {
    setSelectedData(shopData);
  };

  const handleCloseDialog = () => {
    setSelectedData(null);
  };

  return (
    <div className="overflow-x-auto w-full lg:w-9/10 mx-auto text-main">
      <table className="w-full table-auto border-collapse">
        <thead className="text-lg font-bold">
          <tr>
            {keys.map((item) => (
              <th
                key={item}
                className="pb-4 border-b border-gray-400  pl-0"
              >
                <span className="inline-block py-4 px-4 w-full capitalize text-center">
                  {item === "createdAt" ? "Joined On" : item}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((values, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key} className="text-center">
                  <ColCell
                    value={values[key] as any}
                    variant={key}
                    url={`${key === "user" && `/pages/profile/${values["user"]?.id}` || (key === "id" && type==="orders") && `/pages/${type}/${values["id"]}` || key==="shop" && `/pages/shops/${values["shop"]?.slug}` || null}`}
                  />
                </td>
              ))}
              <td className="cursor-pointer" onClick={() => handlePreviewIconClick(originalData?.[index] || null)}><PreviewIcon /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedData && (
        <DataDialog onClose={handleCloseDialog} handleUpdate={handleUpdate!} data={selectedData} type={type} />
      )}
    </div>
  );
};

export default CustomTable;
