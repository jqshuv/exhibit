// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import capitalize from '@/utils/capitalize'
import NewWindow from "react-new-window";

export default function ModalComp({show, setShow, job, isLoggedIn } : any) {
  const cancelButtonRef = useRef(null)
  const [popup, setPopUp] = useState(false)
  const router = useRouter()

  if (!show) return null;

  function test() {
    console.log()
    router.push(`/?reopen=true&mdljob=${job.id}`)
    setTimeout(() => {
      router.reload()
    }, 1000);
    // setPopUp(false)
  }

  return (
    <>
    
      
      {popup && !isLoggedIn ? (
        <NewWindow url="/auth/login?popup=1" center='screen' onUnload={test} />
      ) : null}

      <Transition.Root show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setShow}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
  
          <div className="fixed inset-0 z-10 overflow-y-auto ">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-20 mx-5 w-full sm:my-8 sm:w-full sm:max-w-5xl">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:text-white dark:bg-gray-800" >
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center min-w-full sm:mt-0 sm:text-left">
                        <div className="overflow-hidden bg-whiteg">
                          <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Job Information</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Personal details and application.</p>
                          </div>
                          <div className="border-t-2 border-gray-200 dark:border-gray-700">
                            <dl className="divide-y-1 divide-gray-700">
                              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-white">Job Title</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-gray-400">{ job.job }</dd>
                              </div>
                              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-white">Location</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-gray-400">{ job.expand.location.location }</dd>
                              </div>
                              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-white">Remote</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-gray-400">{ capitalize(job.remote) }</dd>
                              </div>
                              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-white">Salary ~</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-gray-400">{ job.salary }</dd>
                              </div>
                              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-white">Requirements</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: job.requirements }}>
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700">
                    <button
                      type="button"
                      className="inline-flex w-full mb-3 sm:mb-0 justify-center rounded-md border border-transparent bg-gray-400 disabled:bg-gray-500  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShow(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                    {isLoggedIn ? (
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-500 disabled:bg-gray-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                          setShow(false)
                          router.query.job = job.id
                          router.pathname = '/apply/onboarding'
                          router.push(router)
                        }}
                        ref={cancelButtonRef}
                      >
                        Apply
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 disabled:bg-gray-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setPopUp(!popup)}
                        ref={cancelButtonRef}
                      >
                        Login
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      
    </>
  )
}
