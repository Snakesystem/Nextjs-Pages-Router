import ProductView from '@/views/product'
import React from 'react'
import { productType } from '@/types/product.type'

export default function ProductServer(props: { products: productType[] }) {

    const { products } = props
    console.log('products', products)

  return (
    <div>
        <ProductView products={products} />
    </div>
  )
}

// getServerSideProps adalah function yang dijalankan di server untuk melakukan request (useEffect SSR)
export async function getServerSideProps() {

    const res = await fetch('http://localhost:3000/api/product')
    const data = await res.json()

    return { props: { 
        products: data.data
     } }
}