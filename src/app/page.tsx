/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
// 'use client';
// import { useRouter } from 'next/navigation';
"use client"
import NavbarOne from '@/Components/NavbarOne';
import Footer from '@/Components/Footer';
import Page from './landing/page'
import { useState } from 'react';

export default function Home() {
  const [Theme,setTheme]=useState(true)
  return (
    <>
    <NavbarOne  Theme={Theme} setTheme={setTheme}/>
    <div className='main text-gray-950 bg-slate-100 dark:text-gray-200 dark:bg-gray-950 my-2'>
      <Page Theme={Theme}/>
      <Footer Theme={Theme} />
    </div>
    </>
  )
}
