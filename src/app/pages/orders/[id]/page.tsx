"use client";
import { baseUrl } from '@/baseUrl';
import Error from '@/components/common/Error';
import ImgContainer from '@/components/common/ImgContainer';
import Loader from '@/components/common/Loader';
import Button from '@/components/partials/Button';
import { formatDate } from '@/utils/action';
import { reviewForm } from '@/utils/formData';
import { httpservice } from '@/utils/httpService';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import useSWR from 'swr';

const Page = ({ params }: { params: { id: string } }) => {
  const fetcher = async (url: string) => {
    const response = await httpservice.get(url);
    return response.data.order;
  };
  const { data, error, isLoading } = useSWR(`${baseUrl}/orders/${params.id}`, fetcher);
  const [selectedStars, setSelectedStars] = useState(0);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, name: string) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
    console.log(formData)
  };
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setFormData({
      ...formData,
      ["rating"]: newRating,
    });
  };

  const handleStarClick = (starCount: number) => {
    setSelectedStars(starCount);
    if (handleRatingChange) {
      handleRatingChange(starCount);
    }
  };
  if (error) {
    return <div className="main flex items-center justify-center">
      <Error message={error.response.data.message} />;
    </div>
  }

  if (isLoading) {
    return <Loader message='Go through your order' />;
  }
  const handleReview = async (productId: string) => {
    try {
      setLoading(true)
      const response = await httpservice.post(`${baseUrl}/review`, { productId: productId, orderId: data?.id, rating: formData.rating, comment: formData.comment });
      toast.success(response.data.message);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error)
      toast.error(error.response.data.message);
    }
  }
  console.log(data)

  return (
    <div className='main'>
      <h1 className='text-center text-4xl'>Order Details</h1>
      <div className='flex flex-col gap-4'>
        <div className="flex w-full flex-col md:flex-row">
        <div className='flex flex-col w-full md:w-1/2'>
          <div className="flex flex-row">
            <h2 className="w-1/2">
              Order Id
            </h2>
            <h2 className="w-1/2">
              {data.id}
            </h2>
          </div>
          <div className="flex flex-row">
            <h2 className="w-1/2">
              Total Price
            </h2>
            <h2 className="w-1/2">
              Rs {data.totalPrice}
            </h2>
          </div>
          <div className="flex flex-row">
            <h2 className="w-1/2">
              Order Date
            </h2>
            <h2 className="w-1/2">
              {formatDate(data.createdAt)}
            </h2>
          </div>
          <div className="flex flex-row">
            <h2 className="w-1/2">
              Order Status
            </h2>
            <h2 className="w-1/3">
              {data.status}
            </h2>
          </div>
        </div>
        <div className='flex flex-col w-full md:w-1/2'>
          <div className="flex flex-row">
            <h2 className="w-1/2">
              Order Id
            </h2>
            <h2 className="w-1/2">
              {data.id}
            </h2>
          </div>
          <div className="flex flex-row">
            <h2 className="w-1/2">
              Order Date
            </h2>
            <h2 className="w-1/2">
              {formatDate(data.createdAt)}
            </h2>
          </div>
          <div className="flex flex-row">
            <h2 className="w-1/2">
              Order Status
            </h2>
            <h2 className="w-1/3">
              {data.status}
            </h2>
          </div>
        </div>
        </div>
        <div>
          <h2 className='text-xl'>Products</h2>
          <div className='flex flex-col gap-4'>
            {data.products.map((product: any, idx: number) => (
              <div key={product.productId} className='flex md:flex-row flex-col gap-4'>
                <div className="imgContainer w-full md:w-1/3">
                  <ImgContainer imgUrl={product?.product?.img} alt='product' type='heading' />
                </div>
                <div className="details flex flex-col w-full md:w-1/3">
                  <div className="flex flex-row">
                    <h2 className="w-1/2">
                      Product Name
                    </h2>
                    <h2 className="w-1/2">
                      {product?.product?.title}
                    </h2>
                  </div>
                  <div className="flex flex-row">
                    <h2 className="w-1/2">
                      Product Type
                    </h2>
                    <h2 className="w-1/2">
                      {product?.product?.type}
                    </h2>
                  </div>
                  <div className="flex flex-row">
                    <h2 className="w-1/2">
                      Product Option
                    </h2>
                    <h2 className="w-1/2">
                      {product?.option}
                    </h2>
                  </div>
                  <div className="flex flex-row">
                    <h2 className="w-1/2">
                      Product Quantity
                    </h2>
                    <h2 className="w-1/2">
                      {product?.quantity}
                    </h2>
                  </div>
                </div>
                <div className="review w-full md:w-1/3 items-center">
                  {reviewForm.map((field) => (
                    <div key={field.name} className="inputContainer">
                      <field.icon />
                      {field.id === "rating" ?
                        <div className='flex w-full justify-around'>
                          {[...Array(5)].map((_, index) => (
                            <span
                              key={index}
                              onClick={() => handleStarClick(index + 1)}
                              className={`cursor-pointer text-2xl sm:text-3xl ${index < data.reviews[idx]?.rating || selectedStars ? 'text-main' : 'text-gray-400'
                                }`}
                            >
                              &#9733;
                            </span>
                          ))}
                        </div>
                        :
                        (
                          <input
                            type={field.type}
                            name={field.name}
                            id={field.name}
                            onChange={(e) => handleChange(e, field.name)}
                            placeholder={data.reviews[idx]?.comment || field.placeholder}
                            required={field.required}
                            className="input"
                            disabled={field.editable === false || loading}
                          />
                        )}
                    </div>
                  ))}
                  <Button text="Save" type="submit" disabled={formData === null} loading={loading} onClick={() => handleReview(product.productId)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
