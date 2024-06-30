// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData, retrieveDataById } from '@/utils/db/service'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    status: Boolean
    statusCode: number
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) { 
  if(req.query.product![1]) {
    const data = await retrieveDataById('products', req.query.product![1])
    res.status(200).json({ status: true, statusCode: 200, data: data })
  } else {
    const data = await retrieveData('products')
    res.status(200).json({ status: true, statusCode: 200, data: data })
   }
}
