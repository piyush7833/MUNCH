"use client"

import React, { useState } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from "@/context/themeContext/ThemeContext";
const ModeBtn = () => {
  const { toggleTheme, themeMode } = useTheme();
  return (
    <div className="cursor-pointer text-white">
    {themeMode==="dark"?
    <span onClick={toggleTheme}><LightModeIcon /> Light</span> : <span onClick={toggleTheme}><DarkModeIcon /> Dark</span> }
    </div>
  );
};

export default ModeBtn;