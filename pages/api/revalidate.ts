// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean;
  message?: string; // optional dengan (?)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.query.token !== process.env.REVALIDATE_TOKEN) { // localhost:3000/api/revalidate?token=12345678 lihat di .env.local REVALIDATE_TOKEN
        return res.status(401).send({ revalidated: false, message: 'Masukan token yang benar' })
    }

    if(req.query.data === 'product') { // localhost:3000/api/revalidate?data=product
        try {
            await res.revalidate('/product/static')
            return res.json({ revalidated: true })
        } catch (error) {
            return res.status(500).send({ revalidated: false })
        }
    } else {
        return res.send({ revalidated: false, message: 'Pilih data mana yang ingin di revalidate' })
    }
}

// Ini revalidate ini digunakan pada Static Side Generation (SSG) yang apa bila api ii di trigger maka SSG akan langsu di regenerate ulang
// localhost:3000/api/revalidate