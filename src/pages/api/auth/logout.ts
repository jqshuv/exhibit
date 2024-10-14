// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.setHeader("Set-Cookie", 'pb_auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;')
  return res.status(200).redirect('/')
}
