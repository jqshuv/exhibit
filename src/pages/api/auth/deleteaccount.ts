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
  pb.authStore.loadFromCookie(req.headers.cookie)

  pb.collection('users').delete(pb.authStore.model.id).then((response) => {
    pb.authStore.clear()
    res.setHeader("Set-Cookie", pb.authStore.exportToCookie())
    return res.status(200).redirect('/')
  }).catch((error: Data) => {
    return res.status(500).json(error)
  })
}
