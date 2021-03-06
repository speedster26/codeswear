import React, { useState , useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import Products from '../../models/Products'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slug = (props) => {
  const { cart, addToCart, removeFromCart, clearCart, subTotal, product, variants, colorSizeSlug, addToBuyNowCart, buyNow } = props
  const [size, setSize] = useState(product.size)
  const [colour, setColour] = useState(product.colour)
  
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState()
  const [service, setService] = useState(null)
  useEffect(() => {
    setColour(product.colour)
    setSize(product.size)
  }, [product.colour, product.size])
  
  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json();
    if(pin.length===6){

      if (pinJson.includes(parseInt(pin))) {
        setService(true)
        toast.success('This pincode is serviceable', {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
    }
    else {
      setService(false)
      toast.error('This pincode is not serviceable', {
        position: "bottom-center",
        autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    else{
      toast.warn('This pincode is not valid', {
        position: "bottom-center",
        autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }
  }
  const onChangePin = (e) => {
    setPin(e.target.value)
  }
  const refreshVariants = (newSize, newColour) => {
    if (newSize === size) {
      let url = `${process.env.NEXT_PUBLIC_HOST}/product/${Object.values(colorSizeSlug[newColour])[0]['slug']}`
      // window.location = url;
      router.push(url)
    }
    else {
      let url = `${process.env.NEXT_PUBLIC_HOST}/product/${colorSizeSlug[newColour][newSize]['slug']}`
      router.push(url)
      // window.location = url;
    }

  }

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden z-0">
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="container px-5 py-20 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image alt="ecommerce" width={400} height={400} className="lg:w-1/2 -z-10 w-full lg:h-auto h-64 object-contain object-center rounded" src={product.img} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(colorSizeSlug).map((col) => { return <button onMouseOver={(e) => refreshVariants(size, e.target.value)} key={col} value={col} className={`border-2 ${colour === col ? `border-gray-600` : null} border-gray-300 bg-${col}-500 ${(col === 'black' || col === 'white') ? `bg-${col}` : ``} rounded-full w-6 h-6 focus:outline-none`}></button> })}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e) => refreshVariants(e.target.value, colour)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                      {Object.keys(colorSizeSlug).map((col) => { if (col === colour) { return Object.keys(colorSizeSlug[col]).map((s) => { return <option value={s} key={s}>{s}</option> }) } })}
                      {/* <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option> */}
                    </select>
                    <span className="absolute right-0 bg- top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between md:justify-start md:space-x-10">
                <span className="font-medium text-xl text-gray-900 w-28">&#8377;	{product.price}</span>
                <button onClick={() => buyNow(product._id, 1, product.price, product.title, product.size, product.colour, product.img, product.slug)} className="flex text-white bg-[#f47ed8] border-0 py-2 px-6 focus:outline-none hover:bg-pink-500 rounded">Buy Now</button>
                <button onClick={() => { addToCart(product._id, 1, product.price, product.title, product.size, product.colour, product.img, product.slug) }} className="flex text-white bg-[#f47ed8] border-0 py-2 px-6 focus:outline-none hover:bg-pink-500 rounded">Add to Cart</button>
                
              </div>
              <div className="flex pin my-5 ">
                <input onChange={onChangePin} type="text" minLength={6} maxLength="6" placeholder='Enter Pincode' className='border-pink-500 border-2 w-48' />
                <button onClick={checkServiceability} className="flex ml-10 text-white bg-[#f47ed8] border-0 py-2 px-6 focus:outline-none hover:bg-pink-500 rounded">Check</button>
              </div>
              {/* {(!service && service != null) && <div className="text-red-700 text-sm mt-3">
                Sorry! We do not deliver to this pincode yet
              </div>}
              {(service && service != null) && <div className="text-green-700 text-sm mt-3">
                Yay! This pincode is serviceable
              </div>} */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Products.findOne({ slug: context.query.slug})
  let variants = await Products.find({ title: product.title , category: product.category , availableQty : {$gt:0} })
  let colorSizeSlug = {} // {red: {XL: {slug: 'wear-the-code-xl-red'}}}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.colour)) {
      colorSizeSlug[item.colour][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.colour] = {}
      colorSizeSlug[item.colour][item.size] = { slug: item.slug }
    }
  }
  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(variants)), colorSizeSlug }, // will be passed to the page component as props
  }
}

export default Slug