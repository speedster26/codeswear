import React , { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart , AiFillCloseCircle , AiFillPlusCircle , AiFillMinusCircle } from 'react-icons/ai';
import { BsBagCheckFill } from 'react-icons/bs';

const Navbar = () => {
  const refC = useRef()
  const toggleCart=()=>{
    if(refC.current.classList.contains("hidden")){
      refC.current.classList.toggle("hidden")
      refC.current.classList.toggle("translate-x-full")
    }
    else{

      if(refC.current.classList.contains("translate-x-full")){
        refC.current.classList.remove("translate-x-full")
        refC.current.classList.add("translate-x-0")
      }
      else if(!refC.current.classList.contains("translate-x-full")){
        refC.current.classList.remove("translate-x-0")
        refC.current.classList.add("translate-x-full")
      }
    }
  }
  const refM = useRef()
  const toggleNav=()=>{
    refM.current.classList.toggle("hidden")
  }
  return (
    <div>
    <nav className="bg-[#f47ed8] sticky z-10 shadow-lg">
			<div className="md:mx-8 md:px-4">
				
					<div className="flex space-x-7 justify-between mx-10">
						<div>
							<Link href="/" className="flex justify-center py-4">
								<Image className='cursor-pointer mr-2 h-8 w-8' src="/logo.png" width={240} height={80} alt="Logo" />
							</Link>
						</div>
						<div className="hidden md:flex items-center space-x-1 pr-56">
							<Link href={"/tshirt"}><a className="py-4 px-2 text-pink-100 font-semibold hover:text-pink-500 transition duration-300">Tshirt</a></Link>
							<Link href={"/dress"}><a className="py-4 px-2 text-pink-100 font-semibold hover:text-pink-500 transition duration-300">Dress</a></Link>
							<Link href={"/hoodies"}><a className="py-4 px-2 text-pink-100 font-semibold hover:text-pink-500 transition duration-300">Hoodies</a></Link>
							<Link href={"/mugs"}><a className="py-4 px-2 text-pink-100 font-semibold hover:text-pink-500 transition duration-300">Mugs</a></Link>
						</div>
            <div className="flex justify-center items-center text-pink-100  text-xl ">
              <span onClick={toggleCart} className='hover:text-pink-500 cursor-pointer'><AiOutlineShoppingCart/></span>
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
				<ul className="">
					<Link href={"/tshirt"}><a className="block text-pink-100 font-medium text-center px-2 py-4 hover:bg-pink-500 transition duration-300"><li>Tshirt</li></a></Link>
					<Link href={"/dress"}><a className="block text-pink-100 font-medium text-center px-2 py-4 hover:bg-pink-500 transition duration-300"><li>Dress</li></a></Link>
					<Link href={"/hoodies"}><a className="block text-pink-100 font-medium text-center px-2 py-4 hover:bg-pink-500 transition duration-300"><li>Hoodies</li></a></Link>
					<Link href={"/mugs"}><a className="block text-pink-100 font-medium text-center px-2 py-4 hover:bg-pink-500 transition duration-300"><li>Mugs</li></a></Link>
				</ul>
			</div>
			
		</nav>
      <div ref={refC} className="hidden md:flex flex-col z-10 h-full  sidebar fixed  py-10 pr-1 pl-8 text-black top-0 right-0 bg-pink-100 w-96 transform transition-transform translate-x-full shadow-2xl">
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-[#f47ed8] hover:text-pink-500"><AiFillCloseCircle/></span>
        <ol className='list-decimal font-semibold overflow-y-auto my-5 -mr-7'>
            <div className='item flex my-3 mx-0'>
              <li><div className="font-semibold">Mens Printed Full Sleeve Slim Fit Cotton T-Shirt</div></li>
              <div className="flex font-semibold justify-center space-x-1 items-center w-1/3 text-[#f47ed8]"><AiFillMinusCircle className='cursor-pointer hover:text-pink-500'/><span>1</span><AiFillPlusCircle className='cursor-pointer hover:text-pink-500'/></div>
            </div>
            
            

        </ol>
        <button className="flex mx-auto  text-white bg-[#f47ed8] border-0 py-2 px-8 focus:outline-none hover:bg-pink-500 rounded text-lg"><BsBagCheckFill className='m-1'/>Checkout</button>
      </div>
    </div>
  )
}

export default Navbar
