"use client"
import { OrderProductType, OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";
import { userAuthStore } from "@/utils/userStore";
import { baseUrl } from "@/baseUrl";

const Page = () => {

  const { userName,role} = userAuthStore();
  const router = useRouter();

  const [selectedStars, setSelectedStars] = useState(0);
  const [rating, setRating] = useState(0);

  const [selectedOption, setSelectedOption] = useState('');

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleStarClick = (starCount: number) => {
    setSelectedStars(starCount);
    if (handleRatingChange) {
      handleRatingChange(starCount);
    }
  };

  if (!userName) {
    router.push("/auth");
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`${baseUrl}/order`).then((res) => res.json()),
  });

  const queryClient=useQueryClient()

  const mutation=useMutation({
    mutationFn:({id,status}:{id:String, status:String})=>{
      return fetch(`http://localhost:3000/api/orders/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({queryKey:["orders"]})
    },
  })

    // // Define a function to handle changes to the dropdown
    // const handleDropdownChange = (event:any) => {
    //   setSelectedOption(event.target.value);
    // };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement;  //we can do the same by creating useState variables tooo 
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;
    mutation.mutate({id,status})
    toast.success("The order status has been changed")
  }



  // if (isLoading) return "Loading...";

  return (
    <div className="h-[calc(100vh-9rem)] md:h-[calc(100vh-5.5rem)] flex flex-col text-main items-center overflow-x-hidden overflow-y-auto hideScrollBar gap-9 p-4">

      {data && data.map((item: OrderType) => (


        <div className={`orderContainer h-fit w-[98%] justify-center flex flex-col items-center shadow-lg gap-4 rounded-lg px-4 py-4 `} key={item.id}>

          <div className="details w-[98%] flex flex-col items-stretch px-2 sm:px-9">
            <div className="orderDetails">
              <h1>Order Id</h1>
              <h1>{item.id}</h1>
            </div>
            <div className="orderDetails">
              <h1>Date</h1>
              <h1>{item.createdAt.toString().slice(0, 10)}</h1>
            </div>
            <div className="orderDetails">
              <h1>Price</h1>
              <h1>Rs {item.price}</h1>
            </div>
          </div>

          {item.products.map((product: OrderProductType) => (
            <div className="itemContainer flex flex-col justify-between w-[100%] shadow-lg px-2 sm:px-9 py-4 sm:flex-row rounded-lg" key={product.id}>

              <div className="orderImgContainer w-full h-[25%] sm:h-full sm:w-[25%] relative">
                <Image src={product.img!} alt={product.title} fill />
              </div>
              <div className={`details w-full sm:w-[50%] flex flex-col items-stretch sm:px-4 gap-3 ${item.status != "Delievered" ? "sm:w-[75%]" : "sm:w-[50%] "} ${role === "User" ? "sm:w-[75%]" : "sm:w-[50%]"}`}>
                <div className="orderDetails">
                  <h1>product</h1>
                  <h1>{product.title}</h1>
                </div>
                <div className="orderDetails">
                  <h1>{role === "User" ? "Customer" : "Shop"}</h1>
                  <h1>{role === "User" ? item.userEmail : product.shopName}</h1>
                </div>
                {product.optionTitle && <div className="orderDetails">
                  <h1>option</h1>
                  <h1>{product.optionTitle}</h1>
                </div>}
                <div className="orderDetails">
                  <h1>quantity</h1>
                  <h1>{product.quantity}</h1>
                </div>
                <div className="orderDetails">
                  <h1>Price</h1>
                  <h1>Rs {product.price}</h1>
                </div>
              </div>
              <div className={`orderInputs w-full sm:w-1/4 ${item.status != "Delievered" ? "hidden" : "block"} ${role === "User" ? "hidden" : "block"}`}>
                <div className='flex flex-col justify-center items-center lg:items-start'>
                  <p className='text-sm text-main font-bold md:text-base'>Feedback</p>
                  <div>
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        onClick={() => handleStarClick(index + 1)}
                        className={`cursor-pointer text-2xl sm:text-3xl ${index < selectedStars ? 'text-main' : 'text-gray-400'
                          }`}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>

                  {role === "User" ? <textarea rows={3} cols={5} placeholder='Enter status' className=' w-full sm:w-[80%] text-sm input  ' /> : <textarea rows={3} cols={5} placeholder='Enter Message' className=' w-80% text-sm input  ' />}

                  <button className='btn'>Submit</button>
                </div>
              </div>
            </div>
          ))}
          <div className="details w-[98%] flex flex-col items-stretch px-2 sm:px-9">
            {role === "User" ?
              <div className="orderDetails">
                <h1>Status</h1>
                <form
                  className="flex items-center justify-center gap-4"
                  onSubmit={(e) => handleUpdate(e, item.id)}
                >
                  <input
                      placeholder={item.status}
                      className={`p-2 ring-1 ring-red-100 rounded-md bg-transparent border-none ${item.status != "Delievered" ? "" : "text-green-300 "}`}
                    />
                  <button className="bg-red-400 p-2 rounded-full text-white">
                    <EditIcon />
                  </button>
                </form>
              </div>
              :
              <div className="orderDetails">
                <h1>Status</h1>
                <h1>{item.status}</h1>
              </div>}
          </div>
        </div>
      ))}
    </div>
  );
};


// function Dropdown({status}:{status:string}) {
//   // Define a state variable to hold the selected option for this dropdown
//   const [selectedOption, setSelectedOption] = useState('');

//   // Define a function to handle changes to this dropdown
//   const handleDropdownChange = (event:any) => {
//     setSelectedOption(event.target.value);
//   };

//   // An array of options for this dropdown
//   const options = [
//     'Accepted',
//     'Declined',
//     'Being prepared',
//     'On the way',
//     'Delievered',
//   ];

//   return (
//     <div>
//       <select
//         id="dropdown"
//         value={selectedOption}
//         onChange={handleDropdownChange}
//       >
//         <option value="">{status}</option>
//         {options.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

export default Page;
