"use client";
import { ProductType } from "@/types/types";
import { userCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";





const Price = ({ product }: { product: ProductType }) => {
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const { addToCart } = userCartStore();
  const handleCart=()=>{
    addToCart({
      id: product.id.toString(),
      title: product.title,
      img: product.img,
      price: totalPrice,
      ...(product.options?.length && { optionTitle: product.options[selected].title }),
      quantity: quantity,
    })
    toast.success(`${product.options?.length && product.options[selected].title} ${product.title} added to cart successfully`)
  }

  useEffect(()=>{
    userCartStore.persist.rehydrate()
  },[])
  useEffect(() => {
    if (product.options?.length) {
      setTotalPrice(
        quantity * product.price + quantity * product.options[selected].additionalPrice
      );
    }
    else {
      setTotalPrice(
        quantity * product.price
      );
    }
  }, [product, quantity, selected])

  return (
    <div className="flex flex-col gap-4">
      {totalPrice && <h2 className="font-bold text-xl">Rs {totalPrice}</h2>}
      <div className="flex gap-4 flex-wrap text-black">
        {product.options?.map((option, index) => (
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
            <button className="btn" onClick={() => setQuantity((prev) => prev + 1)}
            >{'+'}</button>
          </div>
        </div>
        {/* cart btn */}
        <button className="btn" onClick={()=>handleCart()}>Add to cart</button>
      </div>
    </div>
  )
}

export default Price
