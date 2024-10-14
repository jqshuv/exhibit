// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import initPocketBase from "@/utils/initPocketbase"
import { GetServerSidePropsContext } from "next"

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import NavbarComp from "@/components/NavbarComp"

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function TestPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="isolate bg-white">
      <NavbarComp />
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
    },
  };
}
