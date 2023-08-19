"use client"
import React,{ createContext, useContext, useState, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';

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

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };


  const themeClass = themeMode === 'dark' ? 'dark ' : 'light';
  const theme="theme"
  const contextValue = {
    toggleTheme,
    themeMode,
  };

  // Create the Provider using React.createElement  //as using provider we are facing error
  return React.createElement('div', { className: themeClass,theme }, [
    React.createElement(ThemeContext.Provider, { value: contextValue }, children)
  ]);
};
