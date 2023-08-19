"use client";
import React, { useEffect, useState } from "react";

type Props = {
  price: number;
  id: number;
  options?: { title: string; additionalPrice: number }[];
};



const Price = ({ price, id, options }: Props) => {
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);

  useEffect(()=>{
    setTotalPrice(quantity*(options ? price+options[selected].additionalPrice : price))
  },[quantity,selected,options,price])
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl">Rs {totalPrice.toFixed(2)}</h2>
      {/* options container */}
      <div className="flex gap-4 flex-wrap">
        {options?.map((option, index) => (
          <button
            key={option.title}
            className="min-w-[6rem] p-2 ring-1 ring-main rounded-md"
            style={{
              background: selected === index ? "#ff735e" : "white",
              color: selected === index ? "white" : "red",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* Qunatity and add btn container */}
      <div className="flex justify-between items-center">
        {/* Quantity */}
        <div className="flex justify-between w-full px-4 py-2 ring-1 ring-main items-center">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button className="btn" onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >{'-'}</button>
            <span className="">{quantity}</span>
            <button className="btn" onClick={() => setQuantity((prev) => prev+1)}
            >{'+'}</button>
          </div>
        </div>
        {/* cart btn */}
        <button className="btn">Add to cart</button>
      </div>
    </div>
  )
}

export default Price
