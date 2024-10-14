// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import type { GetServerSidePropsContext } from "next";
import initPocketBase from "@/utils/initPocketbase";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";


// Fire the site
export default function LoginPage({ isLoggedIn, isError, isPopUp, isPopUpSuccess }: { isLoggedIn: boolean, isError: boolean, isPopUp: any, isPopUpSuccess: any }) {
  useEffect(() => {
    if (isLoggedIn) {
      Router.push("/dashboard");
    }
    

    if (isError) {
      Router.push("/auth/login", undefined, { shallow: true });
    }
  }, [isLoggedIn, isError]);

  useEffect(() => {
    isPopUpSuccess && window.close()
  }, [isPopUpSuccess])

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-xl">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="/favicon.svg"
                alt="Your Company"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Or{' '}
                <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  sign up for a new account
                </Link>
              </p>
            </div>

            
            {isError && (
                <div id="toast-simple" className="flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
                    <ExclamationCircleIcon className="w-5 h-5 text-red-600" aria-hidden="true" />
                    <div className="pl-4 text-sm font-normal">Password or email is incorrect.</div>
                </div>
            )}
            
            <form className="mt-8 space-y-6" action={`/api/auth/login?popup=${isPopUp}`} method="post">
              {/* <input type="hidden" name="remember" defaultValue="true" /> */}
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-500">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/auth/forgotpassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pb = await initPocketBase(context);
  const isError = context.query.error === "1";
  
  return {
    props: {
      isLoggedIn: pb.authStore.isValid,
      isError,
      isPopUp: context.query.popup || "0",
      isPopUpSuccess: context.query.popupsuccess || 0,
    },
  };
}

