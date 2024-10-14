// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Fragment, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import navigationFunc from '@/utils/navigation'
import Link from 'next/link'
import Router from 'next/router'
import { UrlObject } from 'url'


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarComp({ isLoggedIn, authData, notifications, navigation }: any) {

  if (!navigation) {
    navigation = navigationFunc()
  }


  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <img
                        className="block h-8 w-auto"
                        src="/logo.png"
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item: any) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {isLoggedIn && (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >

                        <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-3 max-h-72 overflow-y-auto dark:bg-gray-700">
                          <div className="flex items-center mb-3">
                              <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Notification</span>
                          </div>

                          {notifications.map((notification: { href: string | UrlObject; id: Key; image: any; icon: string; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal; message: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal; createdAt: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal }) => (
                            <div key={notification.id}>
                              <Link href={notification.href}>
                                <div className="flex items-center mb-3">
                                  <div className="relative inline-block shrink-0">
                                      <img className="w-12 h-12 rounded-full" src={notification.image || "/logo.png"} alt="Jese Leos image"/>
                                      {notification.icon && (
                                        <div>
                                          {(notification.icon === 'warning') ? (
                                            <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-yellow-600 rounded-full">
                                              <svg aria-hidden="true" className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v6a1 1 0 102 0V4a1 1 0 00-1-1zm1 10a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd"></path></svg>
                                              <span className="sr-only">Warning</span>
                                            </span>

                                          ) : (
                                            <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                                              <svg aria-hidden="true" className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                              <span className="sr-only">Message icon</span>
                                            </span>
                                          )}
                                        </div>
                                      )}
                                  </div>
                                  <div className="ml-3 text-sm font-normal">
                                    <div className="inline-flex text-sm font-semibold text-gray-900 dark:text-white">{notification.title}</div>
                                    <div className="text-sm font-normal text-gray-900 dark:text-gray-400">{notification.message}</div> 
                                    <span className="text-xs font-medium text-blue-600 dark:text-blue-500">{notification.createdAt}</span>   
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                  {isLoggedIn ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>

                          {authData.avatar ? (
                            <img
                              className="h-8 w-8 rounded-full"
                              src={`${process.env.NEXT_PUBLIC_API_URL}/api/files/users/${authData.id}/${authData.avatar}`}
                              alt=""
                              id="pfpimage"
                            />
                          ) : (
                            <img
                              className="h-8 w-8 rounded-full"
                              src={'https://api.dicebear.com/5.x/avataaars-neutral/svg?seed=' + authData.username + '&eyes=happy&eyebrows=default&mouth=smile&scale=75'}
                              alt=""
                              id="pfpimage"
                            />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                      
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/auth/me"
                                className={classNames(active ? 'bg-gray-100 dark:bg-gray-800' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-white')}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="#"
                                className={classNames(active ? 'bg-gray-100 dark:bg-gray-800' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-white')}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <div className='divide-y divide-gray-200 dark:divide-gray-600'>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="#"
                                  onClick={() => {
                                    Router.push('/api/auth/logout')
                                  }}
                                  className={classNames(active ? 'bg-gray-100 dark:bg-gray-800' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-white')}
                                >
                                  Sign out
                                </Link>
                              )}
                            </Menu.Item>
                            {(isLoggedIn && authData.role === 'admin') && (
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href="/admin/dash"
                                    className={classNames(active ? 'bg-gray-100 dark:bg-gray-800' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-white')}
                                  >
                                    Admin Panel
                                  </Link>
                                )}
                              </Menu.Item>
                            )}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Menu as="div" className="relative ml-3">
                      <Menu.Button onClick={() => {
                        Router.push('/auth/login')
                      }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span className="sr-only">Open user menu</span>
                        Login
                      </Menu.Button>
                    </Menu>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item: any) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
