// import { productType } from '@/types/product.type'
// import ProductView from '@/views/product'
// import React from 'react'

// export default function StaticPage(props : { products: productType[] }) {

//     const { products } = props

//   return (
//     <div>
//         <ProductView products={products} />
//     </div>
//   )
// }

// // getStaticProps hanya di gunakan pada Static Side Generation (SSG)
// export const getStaticProps = async () => {
//     const res = await fetch('http://localhost:3000/api/product')
//     const data = await res.json() ;
//     return {
//         props: {
//             products: data.data
//         },
//         // revalidate: 10 // digunakan untuk regenerate page setiap 10 detik
//         // jadi misalnya ada perubahan pada data pada DB maka setiap 10 detik page akan di generate ulang
//     }
// }

// // Saat deplyment url fetch harus merupakan https