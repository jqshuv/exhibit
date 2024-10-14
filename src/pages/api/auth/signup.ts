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

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  pb.collection('users').create({
    username: req.body.username || null,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  }).then((response) => {
    pb.collection('users').requestVerification(req.body.email)
    pb.collection('users').authWithPassword(req.body.email, req.body.password).then((response) => {
      res.setHeader("Set-Cookie", pb.authStore.exportToCookie())
      return res.status(200).redirect('/')
    }).catch((error) => {
      return res.status(200).redirect('/')
    })
  }).catch((error) => {
    if (error.response.data.email || error.response.data.password) {
      return res.status(500).redirect('/auth/signup?error=1')
    } else if (error.response.data.passwordConfirm) {
      return res.status(500).redirect('/auth/signup?error=2')
    } else {
      return res.status(500).redirect('/auth/signup?error=1')
    }
  })
}
