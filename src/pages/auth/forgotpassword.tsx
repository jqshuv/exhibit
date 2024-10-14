// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import type { GetServerSidePropsContext } from "next";
import initPocketBase from "@/utils/initPocketbase";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import Router from "next/router";


// Fire the site
export default function SignUpPage({ isLoggedIn, originalUrl }: { isLoggedIn: boolean; originalUrl: string }) {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="/favicon.svg"
                alt="Your Company"
              />
              {!isLoggedIn ? (
                <>
                  <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Forgot your password?
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    yet not forgotten
                    </Link>
                  </p>
                </>
                 
              ) : (
                <>
                  <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Reset your password
                  </h2>
                </>
              )}
            </div>
            <form className="mt-8 space-y-6" action="/api/auth/forgotpassword" method="post">
              <input type="hidden" name="remember" defaultValue="true" />
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
                    className="relative block w-full appearance-none mb-3 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                {!isLoggedIn ? (
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    Request Email
                  </button>
                ) : (
                  <>
                    <button type="button" onClick={() => Router.push(originalUrl)} className="group relative flex w-5/12 justify-center rounded-md border border-transparent bg-gray-500 py-2 px-4 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                      Go Back
                    </button>
                    <button type="submit" className="group relative flex w-6/12 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Request Email
                    </button>
                  </>
                )}
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
  const originalUrl = context.req.headers.referer || "/";

  return {
    props: {
      isLoggedIn: pb.authStore.isValid,
      originalUrl: originalUrl,
    },
  };
}

