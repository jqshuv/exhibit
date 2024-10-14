// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import type { NextApiRequest, NextApiResponse } from 'next'
import Pocketbase from 'pocketbase'

const pb = new Pocketbase(process.env.NEXT_PUBLIC_API_URL);

type Data = {
  name: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
  const rememberMe = req.body["remember-me"] === "on" ? true : false


  pb.collection('users').authWithPassword(req.body.email, req.body.password).then((response) => {
    // console.log(pb.authStore.exportToCookie())

    if (rememberMe) {
      res.setHeader("Set-Cookie", pb.authStore.exportToCookie({ expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 31 * 3) }))
    } else {
      res.setHeader("Set-Cookie", pb.authStore.exportToCookie())
    }
    
    res.setHeader('Content-Type', 'application/json');
    if (req.query.popup) {
      if (req.query.popup == "1") {
        return res.status(200).redirect('/auth/login?popup=1&popupsuccess=1')
      } else {
        return res.status(200).redirect('/')
      }
    } else {
      return res.status(200).redirect('/')
    }
  }).catch((error) => {
    // console.log(error)
    return res.status(200).redirect('/auth/login?error=1')
  })
  
  // res.status(200).json(req.body)


}
