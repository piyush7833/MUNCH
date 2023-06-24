/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
// 'use client';
// import { useRouter } from 'next/navigation';
"use client"
import NavbarOne from '@/Components/NavbarOne';
import Footer from '@/Components/Footer';
import Page from './landing/page'
import { useState,useEffect } from 'react';

export default function Home() {
  const [Theme,setTheme]=useState<boolean | undefined>(undefined);
  useEffect(()=>{
    if(Theme){
      localStorage.setItem("Theme","true");
      window.document.documentElement.classList.add("dark");
      window.document.documentElement.classList.remove("light");
    }
    else if(Theme===false){
      localStorage.setItem("Theme","false")
      window.document.documentElement.classList.remove("dark");
    }
    else{
      setTheme(localStorage.getItem("Theme")==="true")
    }
  },[Theme])
  return (
    <>
    <NavbarOne  theme={Theme} setTheme={setTheme}/>
      <Page theme={Theme}/>
      <Footer theme={Theme} />
    </>
  )
}
