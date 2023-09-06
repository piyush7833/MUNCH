"use client"
import OrderInput from '@/components/OrderInput'
import { OrderProductType, OrderType, ProductType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const OrdersPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  const queryClient = useQueryClient();


  if (isLoading || status === "loading") return "Loading...";

  return (
    <div className='h-[calc(100vh-6rem)] md:h-[calc(100vh-5.5rem)] flex flex-col items-center p-4 overflow-y-auto gap-8 hideScrollBar'>
          {data.map((item: OrderType) => (
            // <div className='text-main text-9xl'>hello</div>
            <div className="h-fit  sm:h-1/2  md:h-2/5 w-full shadow-xl p-4 rounded-3xl flex flex-col justify-center sm:justify-start sm:gap-8 sm:flex-row hover:border-2" key={item.id}>

{item.products.map((product:OrderProductType)=>(
                    <div className="h-fit  sm:h-1/2  md:h-2/5 w-full shadow-xl p-4 rounded-3xl flex flex-col justify-center sm:justify-start sm:gap-8 sm:flex-row hover:border-2 " key={product.title}>
                      {/* imgContainer */}
                      <div className="relative hidden w-full h-1/3 sm:h-full sm:w-1/3 sm:block lg:w-1/4">
                        <Image src={product.img!} fill alt={product.title}/>
                      </div>
                      {/* order details */}
                      <div className="flex gap-4 mt-2 sm:w-2/3 sm:h-full justify-center items-center">
                      <div className="flex flex-col justify-center text-main w-2/3 gap-2">
                        <div className="flex justify-between">
                        <h1 className=" font-bold hidden sm:block">Item</h1>
                        <h1 className=" font-bold">{product.title}</h1>
                        </div>
                        <div className="flex justify-between">
                        <h1 className="  hidden sm:block">{session?.user.isShopOwner===true?"customer":"shop"}</h1>
                        <h1 className="">{session?.user.isShopOwner===true?item.shopperEmail:item.userEmail}</h1>
                        </div>
                        <div className="flex justify-between">
                        <h1 className="  hidden sm:block">Quantity</h1>
                        <h1 className=" ">{item.products[0].quantity}</h1>
                        </div>
                        <div className="flex justify-between">
                        <h1 className= "font-bold hidden sm:block ">Price</h1>
                        <h1 className=" font-bold">{item.price}</h1>
                        </div>
                        <div className="flex justify-between">
                        <h1 className=" font-bold hidden sm:block">Status</h1>
                        <h1 className=" font-bold">{item.status}</h1>
                        </div>
                      </div>
                      <div className="w-1/2">
                      <OrderInput/>
                      </div>
                      </div>
                    </div>
                    ))}
          </div>
          ))}
          </div>
  );
};

export default OrdersPage;
