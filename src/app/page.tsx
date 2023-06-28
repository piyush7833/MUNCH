/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
// 'use client';
// import { useRouter } from 'next/navigation';
"use client"
import NavbarOne from '@/Components/NavbarOne';
import Footer from '@/Components/Footer';
import LandingPage from './landing/page'
import FirstPage from './FirstPage/page'
import { useState, useEffect } from 'react';
import Auth from './auth/page';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
export default function Home() {
  const [Theme, setTheme] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (Theme) {
      localStorage.setItem("Theme", "true");
      window.document.documentElement.classList.add("dark");
      window.document.documentElement.classList.remove("light");
    }
    else if (Theme === false) {
      localStorage.setItem("Theme", "false")
      window.document.documentElement.classList.remove("dark");
    }
    else {
      setTheme(localStorage.getItem("Theme") === "true")
    }
  }, [Theme])
  const currentUser = null;
  // console.log(currentUser);

  return (
    <>
      <BrowserRouter>
        <NavbarOne theme={Theme} setTheme={setTheme} />
        <Routes>
          <Route path="/">
            <Route index element={currentUser ? (<FirstPage theme={Theme} />) : (<LandingPage theme={Theme} />)} />
            <Route path="auth" element={<Auth theme={Theme} />} />
          </Route>
        </Routes>
        <Footer theme={Theme} />
      </BrowserRouter>
    </>
  )
}
