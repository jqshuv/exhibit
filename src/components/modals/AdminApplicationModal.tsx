// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import capitalize from '@/utils/capitalize'
import NewWindow from "react-new-window";
import { PaperClipIcon } from '@heroicons/react/24/outline';

export default function AdminApplicationModal({show, setShow, application } : any) {
  const cancelButtonRef = useRef(null)

  if (!show) return null;

  console.log(application)

  return (
    <>
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
                          <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Full name</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{application ? application.firstname || null : null} {application ? application.lastname || null : null}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Application ID</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{application ? application.id || null : null}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Full name</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{application ? application.firstname || null : null} {application ? application.lastname || null : null}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Birthdate</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{application ? application.born || null : null}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Attachments <small><small>(Application & CV)</small></small></dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                  <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div className="flex w-0 flex-1 items-center">
                                      <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                      <span className="ml-2 w-0 flex-1 truncate">{application.application || "none"}</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                      <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/files/applications/${application.id}/${application.application}`} target="_blank" rel="noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Download
                                      </a>
                                    </div>
                                  </li>
                                  <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div className="flex w-0 flex-1 items-center">
                                      <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                      <span className="ml-2 w-0 flex-1 truncate">{application.cv || "none"}</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                      <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/files/applications/${application.id}/${application.cv}`} target="_blank" rel="noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Download
                                      </a>
                                    </div>
                                  </li>
                                </ul>
                              </dd>
                            </div>
                          </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-yellow-400 disabled:bg-gray-500  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShow(false)}
                      ref={cancelButtonRef}
                    >
                      Pending
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 disabled:bg-gray-500  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShow(false)}
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-500 disabled:bg-gray-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShow(false)}
                      ref={cancelButtonRef}
                      disabled={true}
                    >
                      Accept
                    </button>
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
