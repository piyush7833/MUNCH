import { useRouter } from 'next/navigation'
import React from 'react'
import ImgContainer from './ImgContainer'
import Link from 'next/link'
type propsType = {
    data: any
    onClose: () => void
}
const SearchDialog = ({ data, onClose }: propsType) => {
    console.log(data)
    const router = useRouter()
    return (
        <div className='dialog-container main fixed inset-0 bg-opacity-80 bg-white p-4 rounded-2xl shadow-2xl flex items-center justify-center z-10'>
            <div className="dialog p-4 w-full max-w-[60%] md:h-3/4 lg:w-full flex flex-col items-center justify-center bg-white shadow-2xl rounded-xl">
                <div className="height-[90%] w-full overflow-y-auto hideScrollBar p-2">
                    {data.products.length > 0 &&
                        <div className="flex-col h-fit w-full">
                            <p>Products</p>
                            <div className='flex flex-row gap-4 flex-wrap justify-between w-full'>
                                {data.products.map((product: any) => (
                                    <div onClick={()=>{onClose();router.push(`/pages/product/${product.id}`)}} key={product.id} className="flex items-center justify-around hover:ring-1 rounded-lg hover:ring-main w-[48%] p-2 cursor-pointer">
                                        <ImgContainer alt={product.title} type='product' imgUrl={product.img} />
                                        <div>
                                            <p>{product.title}</p>
                                            <p>{product.desc}</p>
                                        </div>
                                    </div>))}
                            </div>
                        </div>
                    }
                    {data.shops.length > 0 &&
                        <div className="flex-col h-full w-full">
                            <p>Shops</p>
                            <div className='flex flex-row gap-4 flex-wrap justify-between w-full'>
                                {data.shops.map((shop: any) => (
                                    <div onClick={()=>{onClose();router.push(`/pages/shops/${shop.slug}`)}} key={shop.slug} className="flex items-center justify-around hover:ring-1 rounded-lg hover:ring-main w-[48%] p-2 cursor-pointer">
                                        <ImgContainer alt={shop.title} type='product' imgUrl={shop.img} />
                                        <div>
                                            <p>{shop.title}</p>
                                            <p>{shop.desc}</p>
                                        </div>
                                    </div>))}
                            </div>
                        </div>
                    }
                    {data.owners.length > 0 &&
                        <div className="flex-col h-full w-full">
                            <p>Shop Owners</p>
                            <div className='flex flex-row gap-4 flex-wrap justify-between w-full'>
                                {data.owners.map((owner: any) => (
                                    <div onClick={()=>{onClose();router.push(`/pages/profile/${owner.id}`)}} key={owner.id} className="flex items-center justify-around hover:ring-1 rounded-lg hover:ring-main w-[48%] p-2 cursor-pointer">
                                        <ImgContainer alt={owner.name} type='product' imgUrl={owner.image} />
                                        <div>
                                            <p>{owner.name}</p>
                                            <p>{owner.userName}</p>
                                        </div>
                                    </div>))}
                            </div>
                        </div>
                    }
                    {data.shops.length === 0 && data.products.length === 0 && data.owners.length === 0 && <p className='text-center text-main'>No results found</p>}
                </div>

                <div className="mt-4 flex justify-end">
                    <button className="btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchDialog
