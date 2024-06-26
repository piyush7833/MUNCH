"use client";
import { ProductType } from "@/types/types";
import { userCartStore } from "@/utils/cartStore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmDialog from "../common/ConfirmDialog";
import { userAuthStore } from "@/utils/userStore";

const Price = ({ product, type }: { product: ProductType; type?: string }) => {
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const { addToCart, removeAllFromcart, shopId } = userCartStore();
  const { role } = userAuthStore();

  const handleCart = () => {
    if (shopId !== "" && shopId !== product.shopId) {
      setConfirmOpen(true);
      return;
    }
    addToCart({
      id: product.id.toString(),
      title: product.title,
      img: product.img,
      price: totalPrice,
      shopId: product.shopId,
      ...(product.options?.length && {
        optionTitle: product.options[selected].title!,
      }),
      quantity: quantity,
    });
    if (product.options?.length! > 0) {
      toast.success(
        `${quantity} ${product.title} ${
          product.options![selected].title
        } added to cart`
      );
    } else {
      toast.success(`${quantity} ${product.title} added to cart`);
    }
  };

  useEffect(() => {
    userCartStore.persist.rehydrate();
  }, []);
  useEffect(() => {
    if (product.options?.length) {
      setTotalPrice(
        quantity * product.price +
          quantity * product.options[selected].additionalPrice!
      );
    } else {
      setTotalPrice(quantity * product.price);
    }
  }, [product, quantity, selected]);
  const handleSubmit = () => {
    removeAllFromcart();
    addToCart({
      id: product.id.toString(),
      title: product.title,
      img: product.img,
      price: totalPrice,
      shopId: product.shopId,
      ...(product.options?.length && {
        optionTitle: product.options[selected].title!,
      }),
      quantity: quantity,
    });
    if (product.options?.length! > 0) {
      toast.success(
        `${quantity} ${product.title} ${
          product.options![selected].title
        } added to cart`
      );
    } else {
      toast.success(`${quantity} ${product.title} added to cart`);
    }
  };
  if(role!=="User" && type==="items"){return null;}
  if (type === "items" && role === "User") {
    return (
      <div className="flex flex-col gap-4">
        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleSubmit}
          title="Remove all products from cart"
          message="You can not add products from different shop. Do you want to remove all products from cart and this product?"
        />
        <button className="btn" onClick={() => handleCart()}>
          Add to cart
        </button>
      </div>  
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSubmit}
        title="Remove all products from cart"
        message="You can not add products from different shop. Do you want to remove all products from cart and this product?"
      />
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
      {role === "User" && (
        <div className="flex  flex-wrap">
          {/* Quantity */}
          <div className="flex justify-between w-auto px-4 py-2 ring-1 ring-main items-center">
            <span>Quantity</span>
            <div className="flex gap-4 items-center">
              <button
                className="btn"
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              >
                {"-"}
              </button>
              <span className="">{quantity}</span>
              <button
                className="btn"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                {"+"}
              </button>
            </div>
          </div>
          {/* cart btn */}
          <button className="btn" onClick={() => handleCart()}>
            Add to cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Price;
