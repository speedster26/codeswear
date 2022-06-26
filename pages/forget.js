import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect } from 'react';

const Forget = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);
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
              Forget Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link href={"/login"}>
                <a className="font-medium text-pink-600 hover:text-pink-500">
                  login
                </a>
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forget;
