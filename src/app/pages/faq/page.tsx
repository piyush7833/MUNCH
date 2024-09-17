// pages/faqs.tsx
"use client"
import { faqData } from '@/data';
import { faqType } from '@/types/types';
import generateMetaTags from '@/utils/meta';
import Head from 'next/head';
import { useState } from 'react';

const Page = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const faqs:faqType[] = faqData;

  
  return (
    <div className="main mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-4">Frequently Asked Questions (FAQs)</h1>
      <div className="accordion">
        {faqs.map((faq:faqType, index) => (
          <div key={index} className="mb-4">
            <button
              className="flex justify-between w-full bg-gray-200 p-4 rounded-md focus:outline-none"
              onClick={() => handleToggle(index)}
            >
              <span className="text-lg font-semibold">{faq.question}</span>
              <span className="text-gray-500m font-bold">{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-2 border-l border-r border-b rounded-b-md bg-white">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
