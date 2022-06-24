import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
var jwt = require('jsonwebtoken');

const Orders = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const fetchOrder = async () => {
            let data = {token}
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getorders`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            let res = await a.json();
            setOrders(res.orders)
        }
        let token = localStorage.getItem('token')
        if (token) {
            fetchOrder()
        }
        if(localStorage.getItem('cart')){
            localStorage.removeItem('cart')
        }

    }, [])
    return (
        <div className='flex flex-col space-y-4 my-3 mx-auto items-center min-h-screen'>
            {Object.keys(orders).length!==0 && <h1 className='font-semibold text-3xl'>Your Orders</h1>}
            {Object.keys(orders).length===0 && <h1 className='font-semibold text-3xl text-center'>No Orders Found</h1>}
            {Object.keys(orders).map((i) => {
                var d = new Date(orders[i].createdAt);
                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
                return <div key={orders[i]._id} className='flex flex-col my-2 bg-white w-full md:w-auto px-1 md:px-0'>
                    <div className='border-2 p-3 rounded-t-xl bg-gray-100'>
                        <div className='flex flex-col text-xs '>
                            <div className='flex'>
                                <div className='w-40'>ORDER PLACED</div>
                                <div className='w-20'>TOTAL</div>
                                <div className='w-40'>SHIP TO</div>
                                <div className='w-44'>ORDER #</div>
                            </div>
                            <div className='flex'>
                                <div className='w-40'>{d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear()}</div>
                                <div className='w-20'>&#8377;{orders[i].orderInfo.amount}</div>
                                <div className='w-40'>{orders[i].orderInfo.name}</div>
                                <div className='w-44'>{orders[i].orderId}</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col p-3 border-t-0 border-2 rounded-b-xl'>
                        <div className='text-lg'>Status: {orders[i].orderInfo.delivery}</div>
                        {Object.keys(orders[i].orderInfo.products).map((j) => {
                            return <div key={orders[i].orderInfo.products[j].itemCode} className='flex'>
                                <div className='my-2'>
                                    <Link href={`${process.env.NEXT_PUBLIC_HOST}/product/${orders[i].orderInfo.products[j].slug}`}><a>
                                        <Image alt="ecommerce" width={120} height={120} className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded " src={orders[i].orderInfo.products[j].imgUrl} /></a>
                                    </Link>
                                </div>
                                <div className="flex flex-col font-normal">
                                    <Link href={`${process.env.NEXT_PUBLIC_HOST}/product/${orders[i].orderInfo.products[j].slug}`}><a>
                                        <div>{orders[i].orderInfo.products[j].name}</div>
                                        <div>&#8377;{orders[i].orderInfo.products[j].price}</div>
                                        <div>Colour: {orders[i].orderInfo.products[j].variant}</div>
                                        <div>Size: {orders[i].orderInfo.products[j].size}</div></a>
                                    </Link>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            })}
        </div >
    )
}
export default Orders