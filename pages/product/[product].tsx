import { productType } from '@/types/product.type';
import { fetcher } from '@/utils/swr/fetcher';
import DetailProduct from '@/views/DetailProduct';
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr';

export default function DetailProductPage({ product }: { product: productType }) {

    const { query } = useRouter();
    const {  data, error, isLoading } = useSWR(`/api/product/${query.product}`, fetcher)

  return (
    <div>
      {/* Ini untuk CSR */}
      <DetailProduct product={isLoading ? [] : data.data} />

      {/* Ini untuk SSR */}
      {/* <DetailProduct product={product} /> */}
    </div>
  )
}

// Penggunaan dynamic rendering dengan SSR
// getServerSideProps adalah function yang dijalankan di server untuk melakukan request (useEffect SSR)
// export async function getServerSideProps({ params }: { params: { product: string }} ) {

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.product}`)
//   const data = await res.json()

//   return { props: { 
//       product: data.data
//    } }
// }

// Jika menggunakan SSG maka harus mendaftartakan getStaticPaths (untuk mencari path dari mana product id berasal)
// export async function getStaticPaths() {

//   const res = await fetch('http://localhost:3000/api/product') // product menyesuaikan nama file atau bisa id dll
//   const data = await res.json()

//   const paths = data.data.map((product: productType) => ({
//     params: { product: product.id }
//   }))

//   return {
//     paths,
//     fallback: false
//   }
// }

// export const getStaticProps = async ({ params }: { params: { product: string } }) => {
//   const res = await fetch(`http://localhost:3000/api/product/${params.product}`)
//   const data = await res.json()
//   return {
//       props: {
//           product: data.data
//       }   
//   }
// }