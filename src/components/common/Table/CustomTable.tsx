"use client"
import React from "react";
import ColCell from "./ColCell";
import PreviewIcon from '@mui/icons-material/Preview';
import DataDialog from "../DataDialog";
type propsType = {
  data: any[];
  keys: string[];
};

const CustomTable = ({ data, keys }: propsType) => {
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
                  {(item==="id" || item==="softDelete" || item==="userId")?"":item==="userId"?"User Name":item==="verified"?"verified":item==="createdAt"?"Joined On":item}
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
                    url={`${key==="user"&& `/profile/${values["user"].id}`}`}
                    data={`${key==="verified"&& values}`}
                  />
                </td>
              ))}
              <td className="cursor-pointer"><PreviewIcon/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
