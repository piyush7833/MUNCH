"use client"
import { useMediaQuery } from '@mui/material';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCookies } from 'react-cookie';
export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  toggleTheme: () => void;
  themeMode: ThemeMode;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

// export let themeClass:string;
function getActiveTheme(themeMode: 'light' | 'dark') {
  return themeMode === 'light' ? 'light' : 'dark';
}
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const userSystemThemePreferenceDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [cookieTheme, setCookieTheme] = useCookies(["theme-preference"]);
  const defaultInitialTheme = userSystemThemePreferenceDark ? 'dark' : 'light';

  const [activeTheme, setActiveTheme] = useState(defaultInitialTheme);
  const preferredTheme = cookieTheme && cookieTheme["theme-preference"] ? cookieTheme["theme-preference"] : defaultInitialTheme;
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>(preferredTheme);

  const toggleTheme: React.MouseEventHandler<HTMLAnchorElement> = () => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light';
    setSelectedTheme(desiredTheme);
    setCookieTheme("theme-preference", desiredTheme);
  };

  useEffect(() => {
    setSelectedTheme(preferredTheme);
  }, [preferredTheme]);

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme))
  }, [selectedTheme]);
  
  const contextValue: ThemeContextType = {
    toggleTheme: toggleTheme as () => void,
    themeMode: activeTheme === 'light' ? 'light' : 'dark',
  };

  // Create the Provider using React.createElement  //as using provider we are facing error
  return React.createElement('div', { className: activeTheme }, [
    React.createElement(ThemeContext.Provider, { value: contextValue }, children)
  ]);
};
