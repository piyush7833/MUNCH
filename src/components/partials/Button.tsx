import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";

type propsType = {
  text?: string;
  type?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  position?: "right" | "left";
};
const Button = ({
  text,
  type,
  loading,
  onClick,
  disabled,
  icon,
  position,
}: propsType) => {
  return (
      <button
        className={`${
          type === "cancel" ? "cancelBtn" : "btn"
        } disabled:bg-white disabled:text-black disabled:cursor-not-allowed flex justify-between`}
        onClick={onClick}
        disabled={loading || disabled}
      >
        <div className="left-2">{icon && position === "left" && icon}</div>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          text
        )}
        <div className="right-2">{icon && position === "right" && icon}</div>
      </button>
  );
};

export default Button;
