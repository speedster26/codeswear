import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import { Country, State, City } from 'country-state-city';
import Select from 'react-select'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsBagCheckFill, BsFillBagXFill } from 'react-icons/bs';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';



const Checkout = (props) => {
  const { cart, addToCart, removeFromCart, clearCart, subTotal, buyNowCart, buyNowSubTot, addToBuyNowCart, removeFromBuyNowCart, clearBuyNowCart } = props
  const [name, setName] = useState('')
  const [fullAddress, setFullAddress] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState({ country: '', state: '', city: '' })
  const [disabled, setDisabled] = useState(true)
  const router = useRouter();
  // useEffect(() => {
  //   if(cart || buyNowCart){
  //     setDisabled(false)
  //   }
  //   else{
  //     setDisabled(true)
  //   }
  // }, [buyNowCart, cart])
  useEffect(() => {
    if (fname || lname) {
      setName(fname + " " + lname)
    }
    if (fname && lname && email && phone && address && location && pincode.length === 6 && (Object.keys(cart).length !== 0 || buyNowCart.length !== 0)) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
    if (location.city && location.country && location.state) {
      setFullAddress(address + ", " + location.city.label + ", " + location.state.label + ", " + pincode + ", " + location.country.label)
    }
    else {
      setFullAddress("")
    }
  }, [fname, lname, email, phone, address, location, pincode, cart, buyNowCart])




  const countries = Country.getAllCountries();
  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country
  }));
  const handleChange = (e) => {
    if (e.target.name === 'fname') {
      setFname(e.target.value)
    }
    else if (e.target.name === 'lname') {
      setLname(e.target.value)
    }
    else if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name === 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name === 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name === 'pincode') {
      setPincode(e.target.value)
    }
  }
  const initiateBuyNowPayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    let token = localStorage.getItem('token')
    if (token) {
      const data = { token, oid, name, email, phone, address: fullAddress, cart: buyNowCart, total: buyNowSubTot, type: 'buynow' };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let txnRes = await a.json();
      if (txnRes.success) {
        let txnToken = txnRes.txnToken
        var config = {
          "root": "",
          "flow": "DEFAULT",
          "data": {
            "orderId": oid, /* update order id */
            "token": txnToken, /* update token value */
            "tokenType": "TXN_TOKEN",
            "amount": buyNowSubTot /* update amount */
          },
          "handler": {
            "notifyMerchant": async function (eventName, data) {
              console.log("notifyMerchant handler function called");
              console.log("eventName => ", eventName);
              console.log("data => ", data);
              if(eventName === 'APP_CLOSED'){
                await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteorder`, {
                  method: 'POST', // or 'PUT'
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(oid),
                })
              }
            }
          }
        };
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        }).catch(async function onError(error) {
          console.log("error => ", error);
          await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteorder`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(oid),
          })
        });

      }
      else {
        console.log(txnRes.error);
        toast.error(txnRes.error, {
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
      toast.warn('Please login to place an order', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push('/login')
      }, 2000);
    }
  }
  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    let token = localStorage.getItem('token')
    if (token) {
      const data = { token, oid, name, email, phone, address: fullAddress, cart: cart, total: subTotal, type: 'normal' };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let txnRes = await a.json();
      if (txnRes.success) {

        let txnToken = txnRes.txnToken
        var config = {
          "root": "",
          "flow": "DEFAULT",
          "data": {
            "orderId": oid, /* update order id */
            "token": txnToken, /* update token value */
            "tokenType": "TXN_TOKEN",
            "amount": subTotal /* update amount */
          },
          "handler": {
            "notifyMerchant": async function (eventName, data) {
              console.log("notifyMerchant handler function called");
              console.log("eventName => ", eventName);
              console.log("data => ", data);
              if(eventName === 'APP_CLOSED'){
                await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteorder`, {
                  method: 'POST', // or 'PUT'
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(oid),
                })
              }
            }
          }
        };
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        }).catch(async function onError(error) {
          console.log("error => ", error);
          await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteorder`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(oid),
          })
        });

      }
      else {
        toast.error(txnRes.error, {
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
      toast.warn('Please login to place an order', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push('/login')
      }, 2000);
    }
  }
  const updatedStates = (countryId) =>
    State.getStatesOfCountry(countryId).map((state) => ({ label: state.name, value: state.isoCode, ...state }));

  const updatedCities = (countryId, stateId) =>
    City.getCitiesOfState(countryId, stateId).map((city) => ({ label: city.name, value: city.stateCode, ...city }));
  return (
    <><Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
      <Script type="application/javascript" crossOrigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />
      <main>
        <div className='my-8'>

          <h1 className='text-center top-0 text-2xl font-semibold'>Checkout</h1><div className="flex flex-col font-semibold space-y-2 mx-2 my-5 md:w-1/2 md:mx-auto">
            <h2>1. Delivery Details</h2>
            <div className="flex flex-col md:flex-row md:space-x-2">

              <div className="mb-4 font-medium md:w-1/2">
                <label htmlFor="first-name" className="leading-7 text-sm text-gray-600">First Name</label>
                <input onChange={handleChange} type="text" id="fname" name="fname" value={fname} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors  duration-200 ease-in-out" />
              </div>
              <div className="mb-4 font-medium md:w-1/2">
                <label htmlFor="last-name" className="leading-7 text-sm text-gray-600">Last Name</label>
                <input onChange={handleChange} type="text" id="lname" name="lname" value={lname} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors  duration-200 ease-in-out" />
              </div>

            </div>
            <div className="flex flex-col md:flex-row md:space-x-2">

              <div className="mb-4 font-medium md:w-1/2">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input onChange={handleChange} type="email" id="email" name="email" value={email} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors  duration-200 ease-in-out" />
              </div>
              <div className="mb-4 font-medium md:w-1/2">
                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
                <PhoneInput className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors  duration-200 ease-in-out"
                  country="IN"
                  value={phone}
                  onChange={setPhone} />
              </div>

            </div>
            <div className="flex flex-col md:flex-row md:space-x-2">

              <div className="mb-4 font-medium md:w-full">
                <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>

                <textarea onChange={handleChange} name="address" id="address" value={address} cols="3" rows="3" className="w-full resize-none bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors  duration-200 ease-in-out"></textarea>
              </div>


            </div>
            <div className="flex flex-col md:flex-row md:space-x-2">

              <div className="mb-4 font-medium md:w-full">
                <label htmlFor="country" className="leading-7 text-sm text-gray-600">Country</label>
                <Select className="w-full rounded border  focus:border-pink-500 focus:ring-2 text-base outline-none text-gray-700 leading-8 transition-colors  duration-200 ease-in-out"
                  id="country"
                  name="country"
                  label="country"
                  instanceId={'country'}
                  options={updatedCountries}
                  value={location.country ? location.country : null}
                  onChange={(value) => {
                    setLocation({ country: value, state: null, city: null });
                  }} />
              </div>
              <div className="mb-4 font-medium md:w-full">
                <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                <Select className="w-full rounded border  focus:border-pink-500 focus:ring-2 text-base outline-none text-gray-700 leading-8 transition-colors  duration-200 ease-in-out"
                  id="state"
                  name="state"
                  label="state"
                  instanceId={'state'}
                  options={updatedStates(location.country ? location.country.value : null)}
                  value={location.state}
                  onChange={(value) => {
                    setLocation({ country: location.country, state: value, city: null });
                  }} />
              </div>

            </div>
            <div className="flex flex-col md:flex-row md:space-x-2">

              <div className="mb-4 font-medium md:w-full">
                <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                <Select className="w-full bg-white rounded border border-gray-300   focus:border-pink-500 focus:ring-2 text-base outline-none text-gray-700 leading-8 transition-colors  duration-200 ease-in-out"
                  id="city"
                  name="city"
                  label="city"
                  instanceId={'city'}
                  options={updatedCities(location.country ? location.country.value : null, location.state ? location.state.value : null)}
                  value={location.city ? location.city : null}
                  onChange={(value) => {
                    setLocation({ country: location.country, state: location.state, city: value });
                  }} />
              </div>
              <div className="mb-4 font-medium md:w-full">
                <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                <input onChange={handleChange} type="text" id="pincode" name="pincode" value={pincode} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors  duration-200 ease-in-out" />
              </div>

            </div>
          </div><div className="flex flex-col font-semibold space-y-2 mx-2 my-8 md:w-1/2 md:mx-auto">
            <h2>2. Review your cart</h2>
            <div className="flex flex-col font-medium">

              {(buyNowCart.length === 0 && Object.keys(cart).length === 0) && <div className='my-2 '>Cart is Empty!</div>}
              {(buyNowCart.length === 0 && Object.keys(cart).length !== 0) && Object.keys(cart).map((index) => {
                return <div key={cart[index].itemCode} className='item flex my-3 mx-0'>
                  <div className=''><Image alt="ecommerce" width={120} height={120} className="lg:w-1/2 -z-10 w-full lg:h-auto h-64 object-contain object-center rounded" src={cart[index].imgUrl} /></div>
                  <div className="flex flex-col font-normal w-2/5">

                    <div>{cart[index].name}</div>
                    <div>₹{cart[index].price}</div>
                    <div>Colour: {cart[index].variant}</div>
                    <div>Size: {cart[index].size}</div>
                  </div>
                  <div className="flex font-semibold justify-center space-x-1 items-center w-1/ 3 text-[#f47ed8]"><AiFillMinusCircle onClick={() => { removeFromCart(cart[index].itemCode); }} className='cursor-pointer hover:text-pink-500' /><div>{cart[index].qty}</div><AiFillPlusCircle onClick={() => { addToCart(cart[index].itemCode, 1, cart[index].price, cart[index].name, cart[index].size, cart[index].variant, cart[index].imgUrl, cart[index].slug); }} className='cursor-pointer hover:text-pink-500' /></div>
                </div>;
              })}
              {(buyNowCart.length !== 0 && Object.keys(cart).length !== 0) && <div key={buyNowCart[0].itemCode} className='item flex my-3 mx-0'>
                <div className=''><Image alt="ecommerce" width={120} height={120} className="lg:w-1/2 -z-10 w-full lg:h-auto h-64 object-contain object-center rounded" src={buyNowCart[0].imgUrl} /></div>
                <div className="flex flex-col font-normal w-2/5">

                  <div>{buyNowCart[0].name}</div>
                  <div>₹{buyNowCart[0].price}</div>
                  <div>Colour: {buyNowCart[0].variant}</div>
                  <div>Size: {buyNowCart[0].size}</div>
                </div>
                <div className="flex font-semibold justify-center space-x-1 items-center w-1/ 3 text-[#f47ed8]"><AiFillMinusCircle onClick={() => { removeFromBuyNowCart(buyNowCart[0].itemCode); }} className='cursor-pointer hover:text-pink-500' /><div>{buyNowCart[0].qty}</div><AiFillPlusCircle onClick={() => { addToBuyNowCart(buyNowCart[0].itemCode, 1, buyNowCart[0].price, buyNowCart[0].name, buyNowCart[0].size, buyNowCart[0].variant, buyNowCart[0].imgUrl, buyNowCart[0].slug); }} className='cursor-pointer hover:text-pink-500' /></div>
              </div>}
              {(buyNowCart.length !== 0 && Object.keys(cart).length == 0) && <div key={buyNowCart[0].itemCode} className='item flex my-3 mx-0'>
                <div className=''><Image alt="ecommerce" width={120} height={120} className="lg:w-1/2 -z-10 w-full lg:h-auto h-64 object-contain object-center rounded" src={buyNowCart[0].imgUrl} /></div>
                <div className="flex flex-col font-normal w-2/5">

                  <div>{buyNowCart[0].name}</div>
                  <div>₹{buyNowCart[0].price}</div>
                  <div>Colour: {buyNowCart[0].variant}</div>
                  <div>Size: {buyNowCart[0].size}</div>
                </div>
                <div className="flex font-semibold justify-center space-x-1 items-center w-1/ 3 text-[#f47ed8]"><AiFillMinusCircle onClick={() => { removeFromBuyNowCart(buyNowCart[0].itemCode); }} className='cursor-pointer hover:text-pink-500' /><div>{buyNowCart[0].qty}</div><AiFillPlusCircle onClick={() => { addToBuyNowCart(buyNowCart[0].itemCode, 1, buyNowCart[0].price, buyNowCart[0].name, buyNowCart[0].size, buyNowCart[0].variant, buyNowCart[0].imgUrl, buyNowCart[0].slug); }} className='cursor-pointer hover:text-pink-500' /></div>
              </div>}

            </div>
            {(buyNowCart.length === 0 && Object.keys(cart).length === 0) && <div className='flex flex-col text-xl space-y-3 font-medium'>
              <h3>Total: &#8377;{subTotal}</h3>
              <div className="flex space-x-2">

                <button disabled={disabled} onClick={initiatePayment} className="flex mr-5  disabled:bg-pink-200 text-white bg-[#f47ed8] border-0 py-2 px-8 focus:outline-none hover:bg-pink-500 rounded text-lg"><BsBagCheckFill className='m-1' />Pay ₹{subTotal}</button>

              </div>
            </div>}
            {(buyNowCart.length === 0 && Object.keys(cart).length !== 0) && <div className='flex flex-col text-xl space-y-3 font-medium'>
              <h3>Total: &#8377;{subTotal}</h3>
              <div className="flex space-x-2">

                <button disabled={disabled} onClick={initiatePayment} className="flex mr-5  disabled:bg-pink-200 text-white bg-[#f47ed8] border-0 py-2 px-8 focus:outline-none hover:bg-pink-500 rounded text-lg"><BsBagCheckFill className='m-1' />Pay ₹{subTotal}</button>

              </div>
            </div>}
            {(buyNowCart.length !== 0 && Object.keys(cart).length === 0) && <div className='flex flex-col text-xl space-y-3 font-medium'>
              <h3>Total: &#8377;{buyNowSubTot}</h3>
              <div className="flex space-x-2">

                <button disabled={disabled} onClick={initiateBuyNowPayment} className="flex disabled:bg-pink-200  mr-5 text-white bg-[#f47ed8] border-0 py-2 px-8 focus:outline-none hover:bg-pink-500 rounded text-lg"><BsBagCheckFill className='m-1' />Pay ₹{buyNowSubTot}</button>

              </div>
            </div>}
            {(buyNowCart.length !== 0 && Object.keys(cart).length !== 0) && <div className='flex flex-col text-xl space-y-3 font-medium'>
              <h3>Total: &#8377;{buyNowSubTot}</h3>
              <div className="flex space-x-2">

                <button disabled={disabled} onClick={initiateBuyNowPayment} className="flex disabled:bg-pink-200  mr-5 text-white bg-[#f47ed8] border-0 py-2 px-8 focus:outline-none hover:bg-pink-500 rounded text-lg"><BsBagCheckFill className='m-1' />Pay ₹{buyNowSubTot}</button>

              </div>
            </div>}

          </div>
        </div>
      </main>
    </>
  )
}

export default Checkout