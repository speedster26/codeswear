import React , { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Products from '../models/Products'
import mongoose from 'mongoose'


const Tshirt = (props) => {
  const { products } = props;
  const [size, setSize] = useState()
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 md:px-2 mx-auto ">
          <div className="flex flex-wrap ">
            {Object.keys(products).length===0 && <p>Currently all the Tshirts are out of stock. Please stay tuned to get further updates!</p>}
            {Object.keys(products).map((item) => {
              return <Link key={products[item]._id} href={`/product/${products[item].slug}`}>
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md border-1 hover:shadow-[#f47ed8] hover:cursor-pointer">
                  <a className="block relative h-[33vh] rounded overflow-hidden">
                    <Image priority={true} layout='fill' alt="ecommerce" className="object-contain object-top w-full h-full block" src={`${products[item].img}`} />
                  </a>
                  <div className="mt-4 ">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                    <h2 className="text-gray-800 title-font text-lg font-medium">{products[item].title}</h2>
                    <p className="mt-1">&#8377;{products[item].price}</p>
                    <div className='flex space-x-2 text-gray-700 text-xs ml-1 my-2'>
                      {products[item].size.includes('S') && <div>S</div>}
                      {products[item].size.includes('M') && <div>M</div>}
                      {products[item].size.includes('L') && <div>L</div>}
                      {products[item].size.includes('XL') && <div>XL</div>}
                      {products[item].size.includes('XXL') && <div>XXL</div>}
                    </div>
                    <div className='flex'>
                      {products[item].colour.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-3 h-3 focus:outline-none"></button>}
                      {products[item].colour.includes('white') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-3 h-3 focus:outline-none"></button>}
                      {products[item].colour.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-3 h-3 focus:outline-none"></button>}
                      {products[item].colour.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-3 h-3 focus:outline-none"></button>}
                      {products[item].colour.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-3 h-3 focus:outline-none"></button>}
                      {products[item].colour.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-3 h-3 focus:outline-none"></button>}
                      {products[item].colour.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-3 h-3 focus:outline-none"></button>}
                      {products[item].colour.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-3 h-3 focus:outline-none"></button>}
                      {products[item].colour.includes('violet') && <button className="border-2 border-gray-300 ml-1 bg-violet-500 rounded-full w-3 h-3 focus:outline-none"></button>}
                      {products[item].colour.includes('gray') && <button className="border-2 border-gray-300 ml-1 bg-gray-500 rounded-full w-3 h-3 focus:outline-none"></button>}
                      {products[item].colour.includes('orange') && <button className="border-2 border-gray-300 ml-1 bg-orange-500 rounded-full w-3 h-3 focus:outline-none"></button>}
                      {products[item].colour.includes('teal') && <button className="border-2 border-gray-300 ml-1 bg-teal-500 rounded-full w-3 h-3 focus:outline-none"></button>}
                    </div>
                  </div>
                </div>
              </Link>
            })}


          </div>
        </div>
      </section>
    </div>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Products.find({ category: "T-Shirt" })
  let tshirts = {}
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].colour.includes(item.colour) && item.availableQty > 0) {
        tshirts[item.title].colour.push(item.colour)
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size)
      }
    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        tshirts[item.title].colour = [item.colour]
        tshirts[item.title].size = [item.size]
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  }
}
export default Tshirt
