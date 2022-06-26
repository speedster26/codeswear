import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Change = () => {
    const router = useRouter();
    const [curpassword, setCurpassword] = useState('')
    const [npassword, setNpassword] = useState('')
    const [cnpassword, setCnpassword] = useState('')
    const [token, setToken] = useState('')
    useEffect(() => {
        if (localStorage.getItem("token")) {
            let token = localStorage.getItem('token')
            setToken(token)
        }
    }, [router]);
    const handleChange = (e) => {
        if (e.target.name === 'curpassword') {
            setCurpassword(e.target.value)
        }
        else if (e.target.name === 'npassword') {
            setNpassword(e.target.value)
        }
        else if (e.target.name === 'cnpassword') {
            setCnpassword(e.target.value)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { curpassword, npassword , cnpassword , token};
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/changepassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        let response = await res.json()
        setCurpassword('')
        setNpassword('')
        setCnpassword('')
        if(response.success){
          toast.success('Password Changed', {
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
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="flex flex-col">
                        <div className="flex justify-center">
                            <Image
                                width={100}
                                height={60}
                                className="w-10 object-contain object-center"
                                src="/logo2.png"
                                alt="Workflow"
                            />
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Change Password
                        </h2>

                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="curpassword" className="sr-only">
                                    Current Password
                                </label>
                                <input onChange={handleChange} value={curpassword}
                                    id="curpassword"
                                    name="curpassword"
                                    type="password"
                                    autoComplete="curpassword"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                                    placeholder="Current Password"
                                />
                            </div>
                            <div>
                                <label htmlFor="npassword" className="sr-only">
                                    New Password
                                </label>
                                <input onChange={handleChange} value={npassword}
                                    id="npassword"
                                    name="npassword"
                                    type="password"
                                    autoComplete="npassword"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                                    placeholder="New Password"
                                />
                            </div>
                            <div>
                                <label htmlFor="cnpassword" className="sr-only">
                                    Confirm New Password
                                </label>
                                <input onChange={handleChange} value={cnpassword}
                                    id="cnpassword"
                                    name="cnpassword"
                                    type="password"
                                    autoComplete="cnpassword"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm New Password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <FaLock
                                        className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                                        aria-hidden="true"
                                    />
                                </span>
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Change;
