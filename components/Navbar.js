import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle, AiFillCaretUp } from 'react-icons/ai';
import { BsBagCheckFill, BsFillBagXFill, BsPersonCircle } from 'react-icons/bs';

const Navbar = (props) => {
  const { logout, user, cart, addToCart, removeFromCart, clearCart, subTotal, buyNowCart, setBuyNowCart, clearBuyNowCart } = props
  const refC = useRef()
  const [reRender, setReRender] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  useEffect(() => {
    if (buyNowCart) {
      setReRender(true)
    }
    else {
      setReRender(false)
    }
  }, [buyNowCart])

  const toggleCart = () => {
    if (refC.current.classList.contains("hidden")) {
      refC.current.classList.toggle("hidden")
      refC.current.classList.toggle("translate-x-full")
    }
    else {

      if (refC.current.classList.contains("translate-x-full")) {
        refC.current.classList.remove("translate-x-full")
        refC.current.classList.add("translate-x-0")
      }
      else if (!refC.current.classList.contains("translate-x-full")) {
        refC.current.classList.remove("translate-x-0")
        refC.current.classList.add("translate-x-full")
      }
    }
  }
  const refM = useRef()
  const toggleNav = () => {
    refM.current.classList.toggle("hidden")
  }
  return (
    <div className='sticky top-0 z-10 '>
      <nav className="bg-[#f47ed8] shadow-xl">
        <div className="md:mx-8 sticky top-0 md:px-4">

          <div className="flex space-x-7 justify-between mx-10">
            <div>
              <Link href="/" className="flex justify-center py-4">
                <a><Image className='mr-2 h-8 w-8' src="/logo.png" width={240} height={80} alt="Logo" /></a>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1 pr-56">
              <Link href={"/tshirt"}><a className="py-4 px-2 text-pink-100 font-semibold hover:text-pink-500 transition duration-300">Tshirt</a></Link>
              <Link href={"/dress"}><a className="py-4 px-2 text-pink-100 font-semibold hover:text-pink-500 transition duration-300">Dress</a></Link>
              <Link href={"/hoodies"}><a className="py-4 px-2 text-pink-100 font-semibold hover:text-pink-500 transition duration-300">Hoodies</a></Link>
              <Link href={"/mugs"}><a className="py-4 px-2 text-pink-100 font-semibold hover:text-pink-500 transition duration-300">Mugs</a></Link>
            </div>
            <div className="flex space-x-3 justify-center items-center text-pink-100  text-xl ">
              {!user.value && <Link href={'/login'}><button className="hidden md:flex bg-white font-semibold text-sm text-[#f47ed8] border-0 py-1 px-3 focus:outline-none hover:bg-pink-500 hover:text-white rounded">Login</button></Link>}
              {user.value && <div>
                <span onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className='hidden md:flex hover:text-pink-500 cursor-pointer'>
                  <BsPersonCircle />
                </span>
                {dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className='flex flex-col items-end absolute text-base font-semibold right-[5.5rem]  '>
                  <div className='text-pink-500 -mb-1 -mr-[0.125rem]'><AiFillCaretUp/></div>
                  <ul className='bg-pink-500 w-32 h-32 flex justify-center flex-col items-center rounded-lg rounded-tr-none'>
                    <li className='hover:bg-pink-200 hover:text-pink-500 flex justify-center w-full'><Link href={'/myaccount'}><a>My Account</a></Link></li>
                    <li className='hover:bg-pink-200 hover:text-pink-500 flex justify-center w-full'><Link href={'/orders'}><a>My Orders</a></Link></li>
                    <li className='hover:bg-pink-200 hover:text-pink-500 flex justify-center w-full cursor-pointer' onClick={logout}><a>Logout</a></li>
                  </ul>
                </div>}
              </div>}
              <span onClick={toggleCart} className='hover:text-pink-500 cursor-pointer'><AiOutlineShoppingCart /></span>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleNav} className="outline-none mobile-menu-button">
                <svg className=" w-6 h-6 text-pink-100 hover:text-pink-500 "
                  x-show="!showMenu"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>

        </div>
        <div ref={refM} className="hidden mobile-menu sticky">
          <ul className="border-t-[1px] border-pink-300">
            <Link href={"/tshirt"}><a className="block text-pink-100 font-medium text-center px-2 py-4 hover:bg-pink-500 transition duration-300"><li>Tshirt</li></a></Link>
            <Link href={"/dress"}><a className="block text-pink-100 font-medium text-center px-2 py-4 hover:bg-pink-500 transition duration-300"><li>Dress</li></a></Link>
            <Link href={"/hoodies"}><a className="block text-pink-100 font-medium text-center px-2 py-4 hover:bg-pink-500 transition duration-300"><li>Hoodies</li></a></Link>
            <Link href={"/mugs"}><a className="block text-pink-100 font-medium text-center px-2 py-4 hover:bg-pink-500 transition duration-300"><li>Mugs</li></a></Link>
          </ul>
          <div className="flex flex-col mx-auto items-center justify-center border-t-[1px] border-pink-300">
            {user.value && <button className="flex text-white font-medium bg-[#f47ed8] border-0 py-1 px-3 my-2 focus:outline-none hover:bg-pink-500 rounded">Login</button>}
            {user.value && <button className="flex text-white font-medium bg-[#f47ed8] border-0 py-1 px-3 my-2 focus:outline-none hover:bg-pink-500 rounded">Signup</button>}
            {!user.value && <button className="flex text-white font-medium bg-[#f47ed8] border-0 py-1 px-3 my-2 focus:outline-none hover:bg-pink-500 rounded">Logout</button>}
          </div>
        </div>

      </nav>
      <div ref={refC} className="hidden md:flex flex-col z-10 h-full w-full sidebar fixed  py-10 pr-1 pl-8 text-black top-0 right-0 bg-white md:w-96 transform transition-transform translate-x-full shadow-2xl">
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-[#f47ed8] hover:text-pink-500"><AiFillCloseCircle /></span>
        <ol className='list-decimal font-semibold overflow-y-auto my-5 -mr-7'>
          {Object.keys(cart).length === 0 && <div className='my-2 '>Cart is Empty!</div>}
          {cart && Object.keys(cart).map((index) => {
            return <li key={cart[index].itemCode}>
              <Link href={`${process.env.NEXT_PUBLIC_HOST}/product/${cart[index].slug}`}><div className='item flex my-3 mx-0'>
                <div className='mr-3'><Image alt="ecommerce" width={120} height={120} className="lg:w-1/2 -z-10 w-full lg:h-auto h-64 object-contain object-center rounded" src={cart[index].imgUrl} /></div>
                <div className="flex flex-col font-normal w-2/5">

                  <div className='h-12 overflow-hidden'>{cart[index].name}</div>
                  <div>₹{cart[index].price}</div>
                  <div>Colour: {cart[index].variant}</div>
                  <div>Size: {cart[index].size}</div>
                </div>
                <div className="flex font-semibold justify-center space-x-1 items-center w-1/ 3 text-[#f47ed8]"><AiFillMinusCircle onClick={() => { removeFromCart(cart[index].itemCode) }} className='cursor-pointer hover:text-pink-500' /><span>{cart[index].qty}</span><AiFillPlusCircle onClick={() => { addToCart(cart[index].itemCode, 1, cart[index].price, cart[index].name, cart[index].size, cart[index].variant, cart[index].imgUrl, cart[index].slug) }} className='cursor-pointer hover:text-pink-500' /></div>
              </div></Link>
            </li>
          })}

        </ol>
        <div className='flex flex-col text-xl space-y-3 font-medium'>
          <h3>Total: ₹{subTotal}</h3>
          <div className="flex space-x-2">

            {Object.keys(buyNowCart).length === 0 && <Link id='cartCheck' href={'/checkout'}><button className="flex mr-5 text-white bg-[#f47ed8] border-0 py-2 px-8 focus:outline-none hover:bg-pink-500 rounded text-lg"><BsBagCheckFill className='m-1' />Checkout</button></Link>}
            {Object.keys(buyNowCart).length !== 0 && <button id='cartCheck' className="flex mr-5 text-white bg-[#f47ed8] border-0 py-2 px-8 focus:outline-none hover:bg-pink-500 rounded text-lg"><BsBagCheckFill className='m-1' onClick={() => refreshCheckout()} />Checkout</button>}
            <button onClick={clearCart} className="flex mr-5  text-white bg-[#f47ed8] border-0 py-2 px-8 focus:outline-none hover:bg-pink-500 rounded text-lg"><BsFillBagXFill className='m-1' />Clear</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
