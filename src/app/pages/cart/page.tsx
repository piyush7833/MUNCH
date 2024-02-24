"use client"
import { userCartStore } from '@/utils/cartStore'
import { httpservice } from '@/utils/httpService'
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { userAuthStore } from '@/utils/userStore'
import { baseUrl } from '@/baseUrl'
import Button from '@/components/partials/Button'
import FormDialog from '@/components/common/FormDialog'
import { editAddressFormData } from '@/utils/formData'
import { addressType } from '@/types/types'
import { useRouter } from 'next/navigation'
const Cart = () => {
  const {name, email, phone, address } = userAuthStore()
  const { products, totalItems, totalPrice, removeFromCart, removeAllFromcart } = userCartStore()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const serviceCharge = totalPrice > 100 ? 1 : totalPrice * 0.01;
  useEffect(() => {
    userCartStore.persist.rehydrate()
  }, [])
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const checkOutHandler = async (addressData: addressType) => {
    try {
      setOpen(false)
      const response = await httpservice.put('/api/payment', { name: "test", amount: totalPrice + serviceCharge })
      const order = response.data.data
      const options = {
        key: 'rzp_test_XHRQnmYoYqPxcT', // Replace with your Razorpay API key
        amount: order.amount_due * 100, // Amount is expected in paise
        currency: 'INR',
        name: 'MUNCH',
        description: 'Payment for Order',
        image: 'https://firebasestorage.googleapis.com/v0/b/munch-396608.appspot.com/o/utils%2Flogo.png?alt=media&token=6e5eec03-1f03-4f60-8e9d-6bb933ee710a',
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const payment = await httpservice.post(`${baseUrl}/payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
            toast.success(payment.data.message);
            const order = await httpservice.post(`${baseUrl}/orders`, {
              totalPrice: totalPrice + serviceCharge,
              productDetails: products,
              couponPrice: 0,
              taxes: 0,
              delieveryFee: 0,
              platformFee: serviceCharge,
              shopId: products[0].shopId,
              address: addressData,
              payMode: "Online",
              paymentId: payment.data.data.id
            });
            toast.success(order.data.message);
            removeAllFromcart()
            router.push(`/pages/orders/${order.data.newOrder.id}`)
          } catch (error: any) {
            setLoading(false)
            toast.error(error.response.data.message);
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phone
        },
        notes: {
          address: address,
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    } catch (error: any) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }
  return (
    <div className='h-[calc(100vh-9rem)] md:h-[calc(100vh-5.5rem)] flex flex-col text-main lg:flex-row'>

      {/* product container*/}
      <div className="h-1/2 p-4 flex flex-col items-center  overflow-y-auto lg:h-full lg:w-2/3 xl:w-1/2 lg:px-20 xl:px-40 hideScrollBar">
        {/* single item container */}

        {products.map((item) => (
          <div className="w-[150%] h-36 flex items-center justify-around mb-4 shadow-xl" key={item.id}>
            <div className="h-32 w-32 relative">
              {item.img && <Image src={item.img} fill alt='cart' />}
            </div>
            <div className="">
              <h1 className='uppercase font-bold text-xl'>{item.title} x {item.quantity}</h1>
              <span>{item?.optionTitle}</span>
            </div>
            <div className="">
              <h2 className='font-bold'>Rs {item.price}</h2>
            </div>
            <span className='text-red text-2xl cursor-pointer' onClick={() => removeFromCart(item)} >X</span>
          </div>))}


      </div>

      {/* payment container*/}
      <div className={`h-1/2 p-4 bg-gray-600 flex flex-col gap-4 lg:h-full lg:w-1/3 xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6 lg:justify-center`}>
        <div className="flex justify-between">
          <span>Subtotal {totalItems} items </span>
          <span>Rs {totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Service cost</span>
          <span>{serviceCharge}</span>
        </div>
        <div className="flex justify-between text-green-300">
          <span>Delievery cost</span>
          <span>free</span>
        </div>
        <hr className='my-2' />
        <div className="flex justify-between font-bold text-xl">
          <span className=''>Total</span>
          <span>{totalPrice + serviceCharge} </span>
        </div>
        <Button text='CheckOut' loading={loading} onClick={() => {setOpen(true); setLoading(true)}} />
        {open && <FormDialog onClose={() => setOpen(false)} onSave={checkOutHandler} data={editAddressFormData} image='/images/address.png' title="Add Delievery address if it's a delivery" />}
      </div>
    </div>
  )
}

export default Cart
