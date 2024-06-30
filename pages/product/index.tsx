import { fetcher } from '@/utils/swr/fetcher';
import ProductView from '@/views/product';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

export default function ProductPage() {
  // const [products, setProducts] = useState([])

  const {  data, error, isLoading } = useSWR('/api/product', fetcher)

  // useEffect(() => {
  //   fetch('/api/product').then((res) => {
  //     res.json().then((data) => {
  //       setProducts(data.data)
  //     })
  //   })
  // }, [])

  return (
    <div className="">
      <ProductView products={isLoading ? [] : data?.data} />
    </div>
  )
}
