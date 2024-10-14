// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import initPocketBase from "@/utils/initPocketbase"
import PocketBase from "pocketbase"
import { GetServerSidePropsContext } from "next"

import { ChangeEvent, useState } from 'react'
import NavbarComp from "@/components/NavbarComp"
import Router from "next/router"
import DeleteModal from "@/components/modals/DeleteModal"


export default function TestPage({ isLoggedIn, authData, notifications, cookies } : any) {
  const [showMyCoolModal, setShowMyCoolModal] = useState(false)


  function submitContact(e: any) {
    e.preventDefault();
    const newUsername = e.target.username.value;
    const newEmail = e.target.email.value;

    const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);
    pb.authStore.loadFromCookie(cookies);
    pb.collection('users').update(authData.id, { username: newUsername, email: newEmail }).then((res) => {
      console.log(res);
      Router.reload();
    })

  };

  function upload(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files[0];
    const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);
    pb.authStore.loadFromCookie(cookies);

    const formData = new FormData();
    formData.append('avatar', file);

    pb.collection('users').update(authData.id, formData).then((res) => {
      console.log(res);
      Router.reload();
    })
  }



  return (
    <div className="isolate bg-white">

      <NavbarComp isLoggedIn={isLoggedIn} authData={authData} notifications={notifications} />


      <DeleteModal 
        show={showMyCoolModal}
        setShow={setShowMyCoolModal} 
      />

      <div className="relative overflow-x-auto sm:rounded-lg px-5 py-3 sm:px-20 sm:py-14">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={submitContact}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="block w-full mt-1 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="maxi2000"
                          defaultValue={authData.username}
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <div className="mt-1 flex items-center">
                          <button
                            type="button"
                            onClick={() => Router.push('/auth/requestemail')}
                            className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Request Change
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <div className="mt-1 flex items-center">
                        <button
                          type="button"
                          onClick={() => Router.push('/auth/forgotpassword')}
                          className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Request Reset
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Profile photo</label>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 max-w-xs">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600 ">
                            <label
                              htmlFor="fileupload"
                              className="relative cursor-pointer  rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span className="disabled:cursor-default disabled:text-black">Upload a file</span>
                              <input onChange={upload} max="1" id="fileupload" name="fileupload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1"><s>or drag and drop</s></p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="button"
                      onClick={() => setShowMyCoolModal(true)}
                      className="inline-flex mx-3 justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                <p className="mt-1 text-sm text-gray-600">Decide which communications you&apos;d like to receive and how.</p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={submitContact}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <fieldset>
                      <legend className="sr-only">By Email</legend>
                      <div className="text-base font-medium text-gray-900" aria-hidden="true">
                        By Email
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="comments"
                              name="comments"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="comments" className="font-medium text-gray-700">
                              Comments
                            </label>
                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="candidates"
                              name="candidates"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="candidates" className="font-medium text-gray-700">
                              Candidates
                            </label>
                            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="offers"
                              name="offers"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="offers" className="font-medium text-gray-700">
                              Offers
                            </label>
                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend className="contents text-base font-medium text-gray-900">Push Notifications</legend>
                      <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                            Everything
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                            Same as email
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push-nothing"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                            No push notifications
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Init PocketBase
  const pb = await initPocketBase(context);

  const authData = JSON.parse(JSON.stringify(pb.authStore));
  const notifications = JSON.parse(JSON.stringify(await pb.collection('notifications').getFullList()));


  // Return the props if the correct language is set
  return {
    props: {
      isLoggedIn: pb.authStore.isValid,
      authData: authData.baseModel,
      notifications: notifications,
      cookies: context.req.headers.cookie,
    },
  };
}
