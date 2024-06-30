import { useRouter } from 'next/router'
import React from 'react'

export default function ShopPage() {

    const { query } = useRouter();

  return (
    <div>
        <h1>Shop Page</h1>
        <p>Detail Product: {query.slug? query.slug[0] : ""} - {query.slug? query.slug[1] : ""}</p>
    </div>
  )
}
