import { capitalizeAndSplit } from "@/utils/action";
import React from "react";

type propsType = {
  btnText: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  loading: boolean;
  disabled?: boolean;
};
const DropdownButton = ({
  btnText,
  options,
  onChange,
  loading,
  disabled,
}: propsType) => {
  return (
    <select
      placeholder={btnText || "Select"}
      onChange={(e) => onChange(e)}
      className="btn group group-hover:bg-green-400"
      name={btnText}
      id={btnText}
      disabled={options.length === 0 || loading || disabled}
    >
      <option value="" className="group" disabled selected>
        {btnText}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {capitalizeAndSplit(option)}
        </option>
      ))}
    </select>
  );
};

export default DropdownButton;
