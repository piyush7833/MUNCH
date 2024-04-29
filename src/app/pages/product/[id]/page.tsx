// import { baseUrl } from '@/baseUrl';
import Error from '@/components/common/Error';
import ImgContainer from '@/components/common/ImgContainer';
import Loader from '@/components/common/Loader';
import DeleteButton from '@/components/partials/DeleteButton';
import EditButton from '@/components/partials/EditButton';
import Price from '@/components/product/Price'
// import { httpservice } from '@/utils/httpService';
import { httpServiceServer } from '@/utils/httpServiceServer';
import { getUserIdFromToken } from '@/utils/server_action';
import { Metadata, ResolvingMetadata } from 'next';
// import useSWR from 'swr';


export async function generateMetadata(
  { params }: {params:{id:string}},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data=await httpServiceServer.get(`product/${params.id}`);
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: data?.product?.title,
    description: data?.product?.desc,
    openGraph: {
      images: [data?.product?.img, ...previousImages]
    },
  }
}
const Product = async ({ params }: { params: { id: string } }) => {
  // const fetcher = async (url: string) => {
    //   const response = await httpservice.get(url);
    //   return response.data.product;
    // };
    // const { data, error, isLoading } = useSWR(`${baseUrl}/product/${params.id}`, fetcher);
    const data=await httpServiceServer.get(`product/${params.id}`);
    // console.log(data,"product")
    if (data.error) {
      return <div className="main flex items-center justify-center">
        <Error message={data.message}/>;
      </div>
  }
  
    if (!data) {
      return <Loader message='Delicious Food Coming Through' />;
    }
    const product = data.product;
  return (
    <div className="main text-main relative">
      <div className='main flex items-center justify-center hideScrollBar'>
        <div className="w-1/2 flex items-center justify-center">
          <ImgContainer imgUrl={product.img} type='singleProduct' alt={product.title}/>
        </div>
        <div className="single-product-textContainer">
          <h1 className='text-3xl uppercase font-bold'>{product.title}</h1>
          {product.rating && <h1 className='text-xl first-letter:uppercase font-bold'>Rating {product.rating}</h1>}
          <p className='text-base'>{product.desc}</p>
          <Price product={product} />
        </div>
        <div className="flex flex-col gap-4 top-2 right-2 absolute">
        <DeleteButton url={`${process.env.BASEURL}/product/${params.id}`} userId={product.shop.userId}/>
        <EditButton url={`/pages/edit/product/${params.id}`} userId={product.shop.userId}/>
        </div>
      </div>


      <div className="review px-4 md:px-10">
        <p className='text-lg'>Reviews</p>
        {product.review && <div className='text-xl first-letter:uppercase font-bold'>
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
