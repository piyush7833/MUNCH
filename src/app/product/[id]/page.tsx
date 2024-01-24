import DeleteButton from '@/components/partials/DeleteButton';
import Price from '@/components/product/Price'
import { singleProduct } from '@/data'
import { ProductType } from '@/types/types';
import Image from 'next/image'
import React from 'react'

const apiUrl = process.env.BASEURL;
const getData = async (id: string) => {
  const res = await fetch(`${apiUrl}/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};


const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const singleProduct: ProductType = await getData(params.id);

  return (
    <div className="main text-main relative">
      <div className='single-productContainer hideScrollBar'>
        <div className="single-product-imgContainer">
          {singleProduct.img && <Image src={singleProduct.img} fill alt={singleProduct.title} className='object-contain' />}
        </div>
        <div className="single-product-textContainer">
          <h1 className='text-3xl uppercase font-bold'>{singleProduct.title}</h1>
          {singleProduct.rating && <h1 className='text-xl first-letter:uppercase font-bold'>Rating {singleProduct.rating}</h1>}
          <p className='text-base'>{singleProduct.desc}</p>
          <Price product={singleProduct} />
        </div>
      </div>
      <DeleteButton id={params.id}/>
      {/* <div className="review">Reviews
        {singleProduct.review && <div className='text-xl first-letter:uppercase font-bold'>
          {singleProduct.review.length && singleProduct.review?.map((r, index) => (
            <div className="singleReview" key={index}>
              <div className="userName">
                {r.userName}
              </div>
              <div className="userName">
                {r.comment}
              </div>
            </div>
          ))}
        </div>}
      </div> */}
    </div>
  )
}

export default SingleProductPage
