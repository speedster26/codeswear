import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import mongoose from 'mongoose'
import Order from '../models/Order'

const MyOrder = (props) => {
  const { order } = props;
  const { orderInfo } = order
  const { products } = orderInfo
  return (
    <div className='flex flex-col md:flex-row mx-auto justify-center my-9 md:space-x-1'>
      <div className="flex flex-col mx-5 md:w-1/3">
        <h1 className='my-5 font-bold text-left text-2xl'>Thank you for your order</h1>
        <div className="flex space-x-3 md:text-xl text-lg">
          <div className="flex flex-col ">
            <h2 className='my-5 font-medium'>Order #</h2>
            <div className='w-2/3 text-gray-600 text-sm md:text-lg'>{order.orderId}</div>
            <h2 className='my-5 font-medium'>Billing Address</h2>
            <div className='w-full text-gray-600 text-sm md:text-lg'>{orderInfo.address}</div>
            <h2 className='my-5 font-medium'>Email</h2>
            <div className=' text-gray-600 text-sm md:text-lg'>{orderInfo.email}</div>
          </div>
          <div className="flex flex-col">
            <h2 className='my-5 font-medium'>Payment</h2>
            <div className='text-gray-600 text-sm md:text-lg'>{orderInfo.status}</div>
            <h2 className='my-5 font-medium'>Delivery Address</h2>
            <div className='text-gray-600 text-sm md:text-lg'>{orderInfo.address}</div>
            <h2 className='my-5 font-medium'>Phone No.</h2>
            <div className='text-gray-600 text-sm md:text-lg'>+{orderInfo.phone}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-5 my-4 md:mt-0 space-y-5">
        <h1 className='py-5 font-bold text-left text-2xl '>Order Summary</h1>
        {Object.keys(products).map((or)=>{
          return <div key={products[or].itemCode} className="flex justify-start space-x-7 ">
          <div className='w-32 h-32'>
            <Image alt="ecommerce" width={120} height={120} className="lg:w-1/2 -z-10 w-full lg:h-auto h-64 object-contain object-center rounded" src={products[or].imgUrl} />
          </div>
          <div className="flex flex-col">
            <h3 className='text-gray-600'>{products[or].name}</h3>
            <p className='text-gray-600'>Size: {products[or].size}</p>
            <p className='text-gray-600'>Color: {products[or].variant}</p>
            <p className='text-gray-600'>&#120273;{products[or].qty}</p>
          </div>
          <div>
            <p className='text-gray-600'>&#8377;{products[or].price}</p>
          </div>
        </div>
        }) }
        <div className="flex border-b-2 pb-2 justify-between">
          <div className="flex flex-col mx-5">
            <div className='text-gray-600'>Subtotal</div>
            <div className='text-gray-600'>Shipping</div>
          </div>
          <div className="flex flex-col mx-5">
            <div className='text-gray-600'>&#8377;{orderInfo.amount}</div>
            <div className='text-gray-600'>Free</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col mx-5">
            <div className='font-semibold text-xl'>Total</div>
            <div className='text-gray-600 text-sm'>Including Tax</div>
          </div>
          <div className="flex flex-col mx-5">
            <div className='font-semibold text-2xl'>&#8377;{orderInfo.amount}</div>
          </div>
        </div>
        <div className="flex justify-between my-7">
          <Link href={'/'}><button className="mx-auto text-white bg-[#f47ed8] border-0 py-2 px-20 focus:outline-none hover:bg-pink-500 rounded text-lg">Continue Shopping</button></Link>
        </div>
      </div>

    </div>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI)
  }
  let order = await Order.findById(context.query.id)
  return {
    props: { order: JSON.parse(JSON.stringify(order))}, // will be passed to the page component as props
  }
}

export default MyOrder