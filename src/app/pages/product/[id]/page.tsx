"use client"
import { baseUrl } from '@/baseUrl';
import Error from '@/components/common/Error';
import ImgContainer from '@/components/common/ImgContainer';
import Loader from '@/components/common/Loader';
import Price from '@/components/product/Price'
import { httpservice } from '@/utils/httpService';
import useSWR from 'swr';



const Product =  ({ params }: { params: { id: string } }) => {
  const fetcher = async (url: string) => {
    const response = await httpservice.get(url);
    return response.data.product;
  };
    const { data, error, isLoading } = useSWR(`${baseUrl}/product/${params.id}`, fetcher);
  
    if (error) {
      return <div className="main flex items-center justify-center">
        <Error message={error.response.data.message}/>;
      </div>
  }
  
    if (isLoading) {
      return <Loader message='Delicious Food Coming Through' />;
    }
  return (
    <div className="main text-main relative">
      <div className='main flex items-center justify-center hideScrollBar'>
        <div className="w-1/2 flex items-center justify-center">
          <ImgContainer imgUrl={data.img} type='singleProduct' alt={data.title}/>
        </div>
        <div className="single-product-textContainer">
          <h1 className='text-3xl uppercase font-bold'>{data.title}</h1>
          {data.rating && <h1 className='text-xl first-letter:uppercase font-bold'>Rating {data.rating}</h1>}
          <p className='text-base'>{data.desc}</p>
          <Price product={data} />
        </div>
      </div>


      <div className="review px-4 md:px-10">
        <p className='text-lg'>Reviews</p>
        {data.review && <div className='text-xl first-letter:uppercase font-bold'>
          {data.review.length && data.review?.map((r: any, index: number) => (
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
      </div>
    </div>
  )
}

export default Product
