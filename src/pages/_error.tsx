// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Link from "next/link";

export default function ErrorPage({ statusCode, statusText, statusHint } : any) {
  return (
    <>
      <main className="grid min-h-full place-items-center py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">{statusCode}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">{statusText}</h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">{statusHint}</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <a href="#" className="text-sm font-semibold text-gray-900 dark:text-white">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

ErrorPage.getInitialProps = ({ res, err } : any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  let statusText;
  let statusHint;

  if (statusCode === 404) {
    statusText = "Page not found"
  } else if (statusCode === 500) {
    statusText = "Internal Server Error"
  } else {
    statusText = "An unexpected error has occurred"
  }

  if (statusCode === 404) {
    statusHint = "Sorry, we couldn’t find the page you’re looking for."
  } else if (statusCode === 500) {
    statusHint = "Sorry, we couldn’t find the page you’re looking for."
  } else {
    statusHint = "Sorry, we couldn’t find the page you’re looking for."
  }

  return { statusCode, statusText, statusHint }
}
