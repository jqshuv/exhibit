// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

  const slug = req.query.slug

  var additionalParams = req.query
  delete additionalParams.slug
  var additionalParamsString = ""

  if (Object.keys(additionalParams).length > 0) {
    slug.indexOf("?") > -1 ? additionalParamsString = "&" : additionalParamsString = "?"
    
    for (const [key, value] of Object.entries(additionalParams)) {
      additionalParamsString += `${key}=${value}&`
    }

    additionalParamsString = additionalParamsString.slice(0, -1)
  }
  return res.status(200).redirect(`/${slug}${additionalParamsString}`)
}
