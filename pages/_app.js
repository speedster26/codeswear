import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([])
  const [buyNowCart, setBuyNowCart] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [buyNowSubTot, setBuyNowSubTot] = useState(0)
  const [user, setUser] = useState({value:null})
  const [key, setKey] = useState(null)
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    try {
      router.events.on('routeChangeStart', ()=>{
        setProgress(40)
      })
      router.events.on('routeChangeComplete', ()=>{
        setProgress(100)
      })
      let token = localStorage.getItem('token')
      if(token){
        setUser({value:token})
      }
      else{
        setUser({value:null})
      }
      setKey(Math.random())
      if (localStorage.getItem("cart")) {
        let cartV = JSON.parse(localStorage.getItem("cart"))
        setCart(cartV)
        saveCart(cartV)
      }
      else{
        setCart([])
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, [router.query,router.events])

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subT = 0;
    for (let i = 0; i < myCart.length; i++) {
      subT += myCart[i].price * myCart[i].qty;
    }
    setSubTotal(subT)
  }
  const addToCart = (itemCode, qty, price, name, size, variant, imgUrl, slug) => {
    let myCart = cart;
    let found = false;
    for (let i = 0; i < myCart.length; i++) {
      const element1 = myCart[i];
      const element2 = cart[i];
      if (element1.itemCode === itemCode) {
        element1.qty = element2.qty + 1;
        found = true
        break;
      }
    }
    if (!found) {
      myCart.push({ itemCode, qty, price, name, size, variant, imgUrl, slug })
      toast.success('Added to cart', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setCart(myCart)
    saveCart(myCart)
  }
  const removeFromCart = (itemCode) => {
    let myCart = cart;
    let index;
    let lessThanOne = false
    for (let i = 0; i < myCart.length; i++) {
      const element1 = myCart[i];
      const element2 = cart[i];
      if (element1.itemCode === itemCode) {
        if (element1.qty <= 1) {
          index = i;
          lessThanOne = true;
        }
        else {
          element1.qty = element2.qty - 1;
        }
        break;
      }
    }
    if (lessThanOne) {
      myCart.splice(index, 1)
      toast.success('Removed from cart', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setCart(myCart)
    saveCart(myCart)
  }
  const clearCart = () => {
    if (cart.length != 0) {
      setCart([])
      setSubTotal(0)
      localStorage.removeItem('cart')
      toast.success('Cart cleared', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      toast.warn('Cart is empty', {
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
  const logout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('cart')
    toast.success('Logged out', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setUser({value:null})
    setKey(Math.random())
    setCart([])
    setSubTotal(0)
    router.push('/')
  }

  const addToBuyNowCart = (itemCode, qty, price, name, size, variant, imgUrl, slug) => {
    let myBuyNowCart = buyNowCart
    let found = false;
    console.log(buyNowCart);
    if(myBuyNowCart.length!==0){
      if (myBuyNowCart[0].itemCode === itemCode) {
        myBuyNowCart[0].qty = buyNowCart[0].qty + 1;
        found = true
    }
  }
    if (!found) {
      myBuyNowCart = [{ itemCode, qty, price, name, size, variant, imgUrl, slug }]
    }
    setBuyNowCart(myBuyNowCart)
    saveBuyNowCart(myBuyNowCart)
  }
  const removeFromBuyNowCart = (itemCode) => {
    let myBuyNowCart = buyNowCart;
    let lessThanOne = false
    if (myBuyNowCart[0].itemCode === itemCode) {
      if (myBuyNowCart[0].qty <= 1) {
        lessThanOne = true;
      }
      else {
        myBuyNowCart[0].qty = buyNowCart[0].qty - 1;
      }
    }
    if (lessThanOne) {
      myBuyNowCart = []
    }
    setBuyNowCart(myBuyNowCart)
    saveBuyNowCart(myBuyNowCart)
  }
  const saveBuyNowCart = (myBuyNowCart) => {
    let subT = 0
    if (myBuyNowCart.length !== 0) {
      subT = myBuyNowCart[0].price * myBuyNowCart[0].qty;
    }
    setBuyNowSubTot(subT)
  }
  const clearBuyNowCart = () => {
    setBuyNowCart([])
    saveBuyNowCart([])
  }
  const buyNow = (itemCode, qty, price, name, size, variant, imgUrl, slug) => {
    addToBuyNowCart(itemCode, qty, price, name, size, variant, imgUrl, slug)
    router.push('/checkout')
  }

  return <>

    <Head>
      <title>Rushital.com - Your everyday effortless style</title>
      <meta name="description" content="Rushital.com - Your everyday effortless style" />
      <link rel="icon" href="/logo1.png" />
    </Head>
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
    <LoadingBar
        color='#ffffff'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={300}
    />
   {key && <Navbar key={key} logout={logout} user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} buyNowCart={buyNowCart} setBuyNowCart={setBuyNowCart} clearBuyNowCart={clearBuyNowCart} />}
    <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} buyNowCart={buyNowCart} addToBuyNowCart={addToBuyNowCart} buyNowSubTot={buyNowSubTot} removeFromBuyNowCart={removeFromBuyNowCart} buyNow={buyNow} clearBuyNowCart={clearBuyNowCart} logout={logout} {...pageProps} />
    <Footer cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
  </>
}

export default MyApp
