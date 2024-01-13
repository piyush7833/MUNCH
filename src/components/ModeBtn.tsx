"use client"

import React, { useState } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from "@/context/themeContext/ThemeContext";
const ModeBtn = () => {
    const [dark,setDark]=useState(true)
    const handleMode=()=>{
        setDark(!dark);
    }
  const { toggleTheme, themeMode } = useTheme();
  return (
    <div className="cursor-pointer text-white">
    {themeMode==="dark"?<LightModeIcon onClick={toggleTheme}/>:<DarkModeIcon onClick={toggleTheme}/>}
    </div>
  );
};

export default ModeBtn;