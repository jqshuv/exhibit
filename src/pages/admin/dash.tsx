// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import NavbarComp from "@/components/NavbarComp"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ChangeEvent, useState, useRef } from "react";
import { ExclamationTriangleIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import initPocketBase from "@/utils/initPocketbase";
import { GetServerSidePropsContext } from "next";
import AdminApplicationModal from "@/components/modals/AdminApplicationModal";

const applications = [
  {
    id: 1,
    applicant: "Jane Cooper",
    applied: "January 3, 2020",
    role: "Regional Paradigm Technician",
    status: "Approved",
  },
  {
    id: 2,
    applicant: "Cody Fisher",
    applied: "January 3, 2020",
    role: "Product Directives Officer",
    status: "Pending",
  },
  {
    id: 3,
    applicant: "Esther Howard",
    applied: "January 3, 2020",
    role: "Forward Response Facilitator",
    status: "Rejected",
  },
]

export default function AdminDashPage({ isLoggedIn, authData, notifications, applications }: any) {
  const [open, setOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState({ application: false})



  if (authData.role === "admin") {
    return (
      <>
        <NavbarComp isLoggedIn={isLoggedIn} authData={authData} notifications={notifications} />

        <AdminApplicationModal show={open} setShow={setOpen} application={selectedApp} />

        <h1 className="text-4xl">Admin Dashboard</h1>

        <div className="relative overflow-x-auto sm:rounded-lg p-6">
          <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
              <label htmlFor="table-search" className="sr-only">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                  </div>
                  <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
              </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Position
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {applications.map((application : any)  => (
                    
                      <tr key={application.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                          <img className="w-10 h-10 rounded-full" src="https://cdn.jqshuv.com/que/hooop/logo.png" alt="Jese image" />
                          <div className="pl-3">
                            <div className="text-base font-semibold">{application.firstname} {application.lastname}</div>
                            <div className="font-normal text-gray-500">{application.expand.user.email}</div>
                          </div>  
                        </th>
                        <td className="px-6 py-4">
                            React Developer
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                {application.status === "Pending" ? (
                                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></div>
                                  ) : application.status === "Rejected" ? (
                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                  ) : (
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                )}
                                {application.status}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" onClick={() => {
                              setSelectedApp(application)
                              setOpen(!open)
                            }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                        </td>
                      </tr>
                    
                  ))}
              </tbody>
          </table>
      </div>

      {/* <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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

          <div className="fixed inset-0 z-10 overflow-y-auto">
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Applicant Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-yellow-400 disabled:bg-gray-500  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Pending
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 disabled:bg-gray-500  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-500 disabled:bg-gray-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
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
      </Transition.Root> */}
      </>
    )
  }

  return (
    <div>
      <h1>You are not authorized to view this page!</h1>
    </div>
  )
} 

// redirect if not admin
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pb = await initPocketBase(context);
  const authData = JSON.parse(JSON.stringify(pb.authStore));

  const notifications = JSON.parse(JSON.stringify(await pb.collection('notifications').getFullList()));
  const applications = JSON.parse(JSON.stringify(await pb.collection('applications').getFullList(200, { expand: 'user' } )));
  
  console.log(applications)

  if (!pb.authStore.isValid) {
    context.res.writeHead(302, { Location: '/auth/login' })
    context.res.end()
    return { props: {} }
  }

  if (authData.baseModel.role !== 'admin') {
    context.res.writeHead(302, { Location: '/auth/login' })
    context.res.end()
    return { props: {} }
  }

  return {
    props: {
      isLoggedIn: pb.authStore.isValid,
      authData: authData.baseModel,
      notifications: notifications,
      applications: applications
    },
  }
}
