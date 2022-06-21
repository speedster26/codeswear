import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Order = () => {
  return (
    <div className='flex flex-col md:flex-row mx-auto justify-center mb-9 md:space-x-1'>
      <div className="flex flex-col mx-5">
        <h1 className='my-5 font-bold text-left text-xl '>Thank you for your order</h1>
        <div className="flex space-x-3">
          <div className="flex flex-col">
            <h2 className='my-5 font-medium text-lg '>Order No.</h2>
            <div className='w-2/3 text-gray-600'>12345</div>
            <h2 className='my-5 font-medium text-lg '>Billing Address</h2>
            <div className='w-2/3 text-gray-600'>B-355 Sector-13 Avas Vikas Colony Sikandra Agra</div>
            <h2 className='my-5 font-medium text-lg'>Email</h2>
            <div className=' text-gray-600'>harshitverma@harshit.com</div>
          </div>
          <div className="flex flex-col">
            <h2 className='my-5 font-medium text-lg'>Payment</h2>
            <div className='w-2/3 text-gray-600'>Paytm</div>
            <h2 className='my-5 font-medium text-lg'>Delivery Address</h2>
            <div className='w-2/3 text-gray-600'>B-355 Sector-13 Avas Vikas Colony Sikandra Agra</div>
            <h2 className='my-5 font-medium text-lg'>Phone No.</h2>
            <div className='w-2/3 text-gray-600'>7060321220</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-5 my-4 md:mt-0 space-y-5">
        <h1 className='py-5 font-bold text-left text-xl '>Order Summary</h1>
        <div className="flex justify-start space-x-7 ">
          <div>
            <Image alt="ecommerce" width={120} height={120} className="lg:w-1/2 -z-10 w-full lg:h-auto h-64 object-contain object-center rounded" src="https://m.media-amazon.com/images/I/61Jns+r+FhL._UY741_.jpg" />
          </div>
          <div className="flex flex-col">
            <h3 className='text-gray-600'>Womens Tshirt</h3>
            <p className='text-gray-600'>Size: XL</p>
            <p className='text-gray-600'>Color: Pink</p>
            <p className='text-gray-600'>&#120273;1</p>
          </div>
          <div>
            <p className='text-gray-600'>&#8377;499</p>
          </div>
        </div>
        <div className="flex border-b-2 pb-2 justify-between">
          <div className="flex flex-col mx-5">
            <div className='text-gray-600'>Subtotal</div>
            <div className='text-gray-600'>Shipping</div>
          </div>
          <div className="flex flex-col mx-5">
            <div className='text-gray-600'>&#8377;499</div>
            <div className='text-gray-600'>Free</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col mx-5">
            <div className='font-semibold text-xl'>Total</div>
            <div className='text-gray-600 text-sm'>Including Tax</div>
          </div>
          <div className="flex flex-col mx-5">
            <div className='font-semibold text-2xl'>&#8377;499</div>
          </div>
        </div>
        <div className="flex justify-between my-7">
          <Link href={'/'}><button className="mx-auto text-white bg-[#f47ed8] border-0 py-2 px-20 focus:outline-none hover:bg-pink-500 rounded text-lg">Continue Shopping</button></Link>
        </div>
      </div>

    </div>
  )
}

export default Order