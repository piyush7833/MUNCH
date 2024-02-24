// pages/faqs.tsx
"use client"
import Head from 'next/head';
import { useState } from 'react';

const Page = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = [
    {
      question: 'How can I place an order?',
      answer:
        "To place an order, simply browse through the available restaurants and food items on our website, select the items you'd like to order, and proceed to checkout. Follow the instructions to complete your order, and you're all set!",
    },
    {
      question: 'Can I schedule a delivery in advance?',
      answer:
        'Yes, you can schedule a delivery in advance for a specific date and time during checkout. This feature allows you to plan your orders ahead of time and ensures that your food is delivered when you need it.',
    },
    {
      question: 'How can I track my order?',
      answer:
        "Once your order is confirmed, you'll receive a confirmation email and/or SMS with a link to track your order in real-time. You can also track your order directly from your account on our website.",
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept a variety of payment methods, including credit/debit cards, digital wallets, and cash on delivery (COD). Choose the payment method that\'s most convenient for you during checkout.',
    },
    {
      question: 'Can I modify or cancel my order?',
      answer:
        "Once your order is placed, modifications or cancellations may not be possible, especially if the restaurant has already started preparing your food. However, you can contact our customer support team for assistance, and we'll do our best to accommodate your request.",
    },
  ];

  return (
    <div className="main mx-auto py-8 px-4">
      <Head>
        <title>FAQs - Food Aggregator</title>
        <meta name="description" content="Frequently Asked Questions for Food Aggregator" />
      </Head>
      <h1 className="text-3xl font-semibold mb-4">Frequently Asked Questions (FAQs)</h1>
      <div className="accordion">
        {faqs.map((faq, index) => (
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
