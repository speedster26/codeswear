import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, [router])
  
  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    let response = await res.json()
    setEmail('')
    setPassword('')
    if(response.success){
      localStorage.setItem('token',response.token)
      toast.success('Logged in', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}`)
      }, 2000);
    }
    else{
      toast.error(response.error, {
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

return (
  <>
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
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className='flex flex-col'>
          <div className='flex justify-center'>

            <Image width={100} height={60} className="w-10 object-contain object-center" src="/logo2.png"
              alt="Workflow" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href={'/signup'}><a className="font-medium text-pink-600 hover:text-pink-500">
              signup
            </a></Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input onChange={handleChange} value={email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input onChange={handleChange} value={password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link href={'/forget'}><a className="font-medium text-pink-600 hover:text-pink-500">
                Forgot your password?
              </a></Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaLock className="h-5 w-5 text-pink-500 group-hover:text-pink-400" aria-hidden="true" />
              </span>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
)
}

export default Login